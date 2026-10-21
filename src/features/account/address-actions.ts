"use server";
import {api} from "@/lib/api";
import {revalidatePath} from "next/cache";
export async function saveAddress(form:FormData){await api("/v1/account/addresses",{method:"POST",body:Object.fromEntries(form),mutate:true});revalidatePath("/account");}
export async function deleteAddress(form:FormData){await api(`/v1/account/addresses/${encodeURIComponent(String(form.get("index")))}`,{method:"DELETE",mutate:true});revalidatePath("/account");}
