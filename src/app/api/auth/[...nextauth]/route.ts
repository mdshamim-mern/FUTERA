import { handlers } from "@/lib/auth";
import { env } from "@/lib/env";
import { limitAuth } from "@/server/auth-rate";
import type {NextRequest} from "next/server";
async function handle(request:NextRequest){
  if(env.COMMERCE_ENABLED!=="true")return new Response("Authentication unavailable",{status:503});
  if(new URL(request.url).host!==new URL(env.APP_URL).host)return new Response("Invalid host",{status:400});
  if(request.method==="POST"&&request.headers.get("origin")!==new URL(env.APP_URL).origin)return new Response("Invalid origin",{status:403});
  try{await limitAuth("auth-http-global",1000);}catch{return new Response("Try later",{status:429});}
  return request.method==="POST"?handlers.POST(request):handlers.GET(request);
}
export const GET=handle,POST=handle;
