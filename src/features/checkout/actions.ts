"use server";
import {redirect} from "next/navigation";
import {ApiError} from "@/lib/api";
import {checkoutForm} from "./schema";
import {reviewCheckout,placeOrder} from "@/server/checkout";
export type ReviewState={error?:string;review?:Awaited<ReturnType<typeof reviewCheckout>>};
export async function reviewOrder(_state:ReviewState,form:FormData):Promise<ReviewState>{try{return {review:await reviewCheckout(checkoutForm(form))};}catch(error){return {error:error instanceof Error&&/cart|stock|Coupon|component|configured|Sample/.test(error.message)?error.message:"Check your address and checkout details, then retry."};}}
export async function confirmOrder(_state:string,form:FormData){let id:string;try{id=await placeOrder(String(form.get("token")??""));}catch(error){return error instanceof ApiError&&error.message.startsWith("Test payment ")?error.message:"Order not created. The quote may be stale, stock changed, or checkout unavailable. Review again.";}redirect(`/orders/${id}`);}
