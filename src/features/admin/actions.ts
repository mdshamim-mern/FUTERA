"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from "zod";
import {requireAdmin} from "@/server/guards";
import {mutateAdmin} from "@/server/admin";
export async function adminAction(_previous:{message:string;ok:boolean},form:FormData){
 // Actions can be replayed against another route, outside the proxy matcher.
 try{await requireAdmin();}catch{redirect("/login");}
 try {
  const raw=form.get("payload");if(typeof raw!=="string"||raw.length>50000)throw Error("Invalid form.");
  await mutateAdmin(JSON.parse(raw));
  for(const path of ["/admin","/products","/pc-builder","/checkout","/account","/orders","/builds","/"])revalidatePath(path,"layout");
  return {ok:true,message:"Saved. The storefront now uses the updated data."};
 }catch(error){
  if(error instanceof z.ZodError)return {ok:false,message:error.issues.slice(0,4).map(issue=>`${issue.path.join(".")}: ${issue.message}`).join("; ")};
  const message=error instanceof Error?error.message:"Save failed.";
  return {ok:false,message:message.length<200&&!message.includes("Mongo")?message:"Invalid data or conflicting update. Check the fields and reload."};
 }
}
