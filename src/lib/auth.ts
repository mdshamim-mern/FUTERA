import "server-only";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { env } from "./env";
import { connectDatabase } from "./db";
import { verifyPassword } from "./password";
import { UserModel } from "@/server/models/commerce";
import { limitAuth } from "@/server/auth-rate";
export const credentialsSchema=z.object({email:z.email().max(254).transform(v=>v.toLowerCase()),password:z.string().min(12).max(128)});
export const {handlers,auth,signIn,signOut}=NextAuth({
  secret:env.AUTH_SECRET,trustHost:true,useSecureCookies:new URL(env.APP_URL).protocol==="https:",
  session:{strategy:"jwt",maxAge:60*60*24},pages:{signIn:"/login"},
  providers:[Credentials({credentials:{email:{type:"email"},password:{type:"password"}},authorize:async(raw)=>{
    if(env.COMMERCE_ENABLED!=="true")return null;
    await limitAuth("credentials-global",300);
    const parsed=credentialsSchema.safeParse(raw);if(!parsed.success)return null;
    await limitAuth(`login:${parsed.data.email}`);
    await connectDatabase();const user=await UserModel.findOne({email:parsed.data.email}).select("+passwordHash");
    // A fixed dummy hash still performs scrypt for unknown accounts.
    const valid=await verifyPassword(parsed.data.password,user?.passwordHash??`scrypt-v1:${"0".repeat(32)}:${"0".repeat(128)}`);
    if(!user||user.disabled||!valid)return null;
    return {id:user._id,name:user.name,email:user.email,version:user.sessionVersion};
  }})],
  callbacks:{jwt({token,user}){if(user){token.sub=user.id;token.version=(user as {version?:number}).version;}return token;},async session({session,token}){
    if(token.sub&&env.COMMERCE_ENABLED==="true"){
      await connectDatabase();const user=await UserModel.findById(token.sub);
      session.user.id=user&&!user.disabled&&user.sessionVersion===token.version?user._id:"";
    }else session.user.id="";
    return session;
  }},
});
