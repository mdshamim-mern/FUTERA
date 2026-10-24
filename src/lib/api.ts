import "server-only";
import {cookies} from "next/headers";
import {env} from "./env";
export class ApiError extends Error {constructor(public status:number,message:string){super(message);}}
/** Only the backend owns sessions, roles, persistence and final prices. */
export async function api<T>(path:string,options:{method?:string;body?:unknown;mutate?:boolean}={}):Promise<T>{
 if(!path.startsWith("/v1/")||path.includes(".."))throw Error("Invalid API path");
 const jar=await cookies();
 const response=await fetch(new URL(path,env.API_BASE_URL),{method:options.method??"GET",cache:"no-store",headers:{"Content-Type":"application/json",Origin:new URL(env.APP_URL).origin,Cookie:jar.toString()},body:options.body===undefined?undefined:JSON.stringify(options.body),signal:AbortSignal.timeout(path==="/v1/ai/advice"?30000:20000)});
 if(options.mutate){for(const header of response.headers.getSetCookie()){
  const [pair,...attributes]=header.split(";");const index=pair.indexOf("=");const name=pair.slice(0,index);if(!["futera-session","futera-guest","futera-oauth"].includes(name))continue;
  const attrs=Object.fromEntries(attributes.map(a=>{const [k,...v]=a.trim().split("=");return [k.toLowerCase(),v.join("=")];}));
  jar.set(name,decodeURIComponent(pair.slice(index+1)),{httpOnly:true,secure:env.APP_URL.startsWith("https:"),sameSite:"lax",path:"/",...(attrs["max-age"]!==undefined?{maxAge:Number(attrs["max-age"])}:{}),...(attrs.expires?{expires:new Date(attrs.expires)}:{})});
 }}
 const payload=await response.json();if(!response.ok)throw new ApiError(response.status,payload.error??"API request failed");return payload.data as T;
}
