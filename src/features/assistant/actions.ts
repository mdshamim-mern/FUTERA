"use server";
import {api,ApiError} from "@/lib/api";
export type AdviceState={answer:string;error:string;products:{slug:string;name:string;isSample:boolean}[]};
export async function askAssistant(_previous:AdviceState,form:FormData):Promise<AdviceState>{try{const result=await api<{answer:string;products:AdviceState["products"]}>("/v1/ai/advice",{method:"POST",body:{mode:form.get("mode"),question:form.get("question"),...(form.get("category")?{category:form.get("category")}: {})}});return {...result,error:""};}catch(error){return {answer:"",products:[],error:error instanceof ApiError&&error.status===401?"Please log in to use AI assistance.":"AI assistance is unavailable or the request limit was reached. Please try again later."};}}
