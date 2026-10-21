"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from "zod";
import {readCart,writeCart,mergeReferences} from "@/server/cart";
import {getProducts} from "@/server/catalog";
import {parseReferences} from "@/features/builder/schema";
import {slugSchema} from "@/features/products/schema";
import {requireUser} from "@/server/guards";
import {UserModel} from "@/server/models/commerce";
export async function addBuildToCart(input:unknown){const refs=parseReferences(input);if(!refs.length)throw Error("Select products first.");const combined=mergeReferences(await readCart(),refs),products=await getProducts(combined.map(r=>r.id));if(combined.some(r=>!products.some(p=>p.slug===r.id&&p.stock>=r.quantity)))throw Error("Some components are unavailable or exceed stock.");await writeCart(combined);revalidatePath("/cart");}
export async function addProduct(form:FormData){await addBuildToCart([{id:slugSchema.parse(form.get("id")),quantity:1}]);redirect("/cart");}
export async function changeCart(form:FormData){const id=slugSchema.parse(form.get("id")),quantity=z.coerce.number().int().min(0).max(8).parse(form.get("quantity"));const refs=await readCart();await writeCart(quantity?refs.map(r=>r.id===id?{...r,quantity}:r):refs.filter(r=>r.id!==id));revalidatePath("/cart");}
export async function toggleWishlist(form:FormData){const user=await requireUser(),id=slugSchema.parse(form.get("id"));if(user.wishlist.includes(id))await UserModel.updateOne({_id:user._id},{$pull:{wishlist:id}});else await UserModel.updateOne({_id:user._id,"wishlist.99":{$exists:false}},{$addToSet:{wishlist:id}});revalidatePath("/account");revalidatePath(`/products/${id}`);}
