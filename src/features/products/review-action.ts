"use server";
import {api} from "@/lib/api";
import {revalidatePath} from "next/cache";
import {slugSchema} from "./schema";
export async function submitReview(_previous:{success:boolean;message:string},form:FormData){try{const slug=slugSchema.parse(form.get("slug"));await api(`/v1/products/${slug}/reviews`,{method:"POST",body:{rating:Number(form.get("rating")),body:form.get("body")}});revalidatePath(`/products/${slug}`);return {success:true,message:"Your review has been saved."};}catch{return {success:false,message:"Could not save your review. Sign in and check the rating and text."};}}
