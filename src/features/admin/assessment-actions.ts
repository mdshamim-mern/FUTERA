"use server";
import {revalidatePath} from "next/cache";
import {api,ApiError} from "@/lib/api";
import {requireAdmin} from "@/server/guards";
export async function assessmentAction(_state:{ok:boolean;message:string},form:FormData){
 try{await requireAdmin();const operation=String(form.get("operation"));const payload:Record<string,unknown>={operation,revision:Number(form.get("revision"))};if(operation==="create"){payload.source=String(form.get("source"));payload.slug=String(form.get("slug"));}if(operation==="update"){for(const key of ["slug","name","description"])payload[key]=String(form.get(key));payload.priceMinor=Math.round(Number(form.get("price"))*100);payload.stock=Number(form.get("stock"));}if(operation==="delete")payload.slug=String(form.get("slug"));await api("/v1/admin/assessment",{method:"POST",body:payload});revalidatePath("/admin/assessment");return {ok:true,message:operation==="reset"?"Workspace reset.":"Workspace saved. Storefront records are unchanged."};}catch(error){return {ok:false,message:error instanceof ApiError?error.message:"Could not save. Check the fields and reload before retrying."};}
}
