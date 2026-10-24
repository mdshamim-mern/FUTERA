import "server-only";
import {api} from "@/lib/api";
import type {CheckoutInput} from "@/features/checkout/schema";
export type Quote={lines:{id:string;name:string;quantity:number;unitMinor:number}[];subtotalMinor:number;discountMinor:number;shippingMinor:number;totalMinor:number;isSample:boolean;isDemo?:boolean};
export const reviewCheckout=(body:CheckoutInput)=>api<{quote:Quote;token:string}>("/v1/checkout/review",{method:"POST",body,mutate:true});
export const placeOrder=(token:string)=>api<string>("/v1/checkout/confirm",{method:"POST",body:{token},mutate:true});
