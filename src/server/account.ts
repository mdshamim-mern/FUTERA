import "server-only";
import {api,ApiError} from "@/lib/api";
import type {Account,Order} from "@/types/api";
export const accountData=()=>api<Account>("/v1/account");
export async function ownedOrder(id:string){try{return await api<Order>(`/v1/orders/${encodeURIComponent(id)}`);}catch(error){if(error instanceof ApiError&&[401,404].includes(error.status))return null;throw error;}}
