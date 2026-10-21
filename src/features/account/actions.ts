"use server";
import {api} from "@/lib/api";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
export async function authenticate(_state:string,form:FormData){try{await api(form.get("mode")==="register"?"/v1/auth/register":"/v1/auth/login",{method:"POST",body:Object.fromEntries(form),mutate:true});}catch{return "Unable to complete this request. Check your details and try again.";}redirect("/account");}
export async function logout(){await api("/v1/auth/logout",{method:"POST",body:{},mutate:true});redirect("/login");}
export async function saveBuildToAccount(input:unknown){return api<string>("/v1/builds",{method:"POST",body:input,mutate:true});}
export async function mutateBuild(form:FormData){await api(`/v1/builds/${encodeURIComponent(String(form.get("id")))}`,{method:"PATCH",body:Object.fromEntries(form),mutate:true});revalidatePath("/account");}
