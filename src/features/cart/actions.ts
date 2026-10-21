"use server";
import {api} from "@/lib/api";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
export async function addBuildToCart(input:unknown){await api("/v1/cart/add",{method:"POST",body:input,mutate:true});revalidatePath("/cart");}
export async function addProduct(form:FormData){await addBuildToCart([{id:form.get("id"),quantity:1}]);redirect("/cart");}
export async function changeCart(form:FormData){await api("/v1/cart",{method:"PATCH",body:{id:form.get("id"),quantity:Number(form.get("quantity"))},mutate:true});revalidatePath("/cart");}
export async function toggleWishlist(form:FormData){await api("/v1/wishlist",{method:"POST",body:{id:form.get("id")},mutate:true});revalidatePath("/account");}
