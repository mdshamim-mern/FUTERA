"use server";
import { randomUUID, randomBytes } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { AuthError } from "next-auth";
import { signIn,signOut,credentialsSchema } from "@/lib/auth";
import { hashPassword } from "@/lib/password";
import { connectDatabase } from "@/lib/db";
import { commerceEnabled,requireUser } from "@/server/guards";
import { UserModel,BuildModel } from "@/server/models/commerce";
import { limitAuth } from "@/server/auth-rate";
import { mergeGuestCart } from "@/server/cart";
import { resolveBuild } from "@/server/builder";
export async function authenticate(_state:string,form:FormData){
  try{
    commerceEnabled();await limitAuth("account-global",300);
    const input=credentialsSchema.parse({email:form.get("email"),password:form.get("password")});
    if(form.get("mode")==="register"){
      await limitAuth(`register:${input.email}`,5);const name=z.string().trim().min(2).max(80).parse(form.get("name"));
      await connectDatabase();await UserModel.create({_id:randomUUID(),name,email:input.email,passwordHash:await hashPassword(input.password),role:"customer"});
    }
    await signIn("credentials",{...input,redirect:false});
    const user=await UserModel.findOne({email:input.email});if(user)await mergeGuestCart(user._id);
  }catch(error){return error instanceof AuthError?"Unable to log in. Check your credentials or try later.":"Unable to complete this request. Check your details, configuration, or try later.";}
  redirect("/account");
}
export async function logout(){const user=await requireUser();await UserModel.updateOne({_id:user._id},{$inc:{sessionVersion:1}});await signOut({redirectTo:"/login"});}
export async function saveBuildToAccount(input:unknown){const user=await requireUser();const resolved=await resolveBuild(input);if(!resolved.lines.length)throw Error("Select components first.");const build=await BuildModel.create({_id:randomUUID(),ownerId:user._id,name:"My FUTERA build",refs:resolved.lines.map(l=>({id:l.product.slug,quantity:l.quantity}))});return build._id;}
export async function mutateBuild(form:FormData){
  const user=await requireUser();const id=z.uuid().parse(form.get("id"));const build=await BuildModel.findOne({_id:id,ownerId:user._id});if(!build)throw Error("Build not found.");
  const operation=form.get("operation");
  if(operation==="delete")await BuildModel.deleteOne({_id:id,ownerId:user._id});
  else if(operation==="rename"){build.name=z.string().trim().min(1).max(80).parse(form.get("name"));await build.save();}
  else if(operation==="duplicate")await BuildModel.create({_id:randomUUID(),ownerId:user._id,name:`Copy of ${build.name}`.slice(0,80),refs:build.refs.map(r=>({id:r.id,quantity:r.quantity}))});
  else if(operation==="share"){build.shareToken=randomBytes(24).toString("hex");await build.save();}
  else if(operation==="unshare"){build.shareToken=null;await build.save();}
  revalidatePath("/account");
}
