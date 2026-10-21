"use server";
import {revalidatePath} from "next/cache";
import {z} from "zod";
import {requireUser} from "@/server/guards";
import {UserModel} from "@/server/models/commerce";
import {addressSchema} from "@/features/checkout/schema";
export async function saveAddress(form:FormData){const user=await requireUser();const address=addressSchema.parse(Object.fromEntries(form));const result=await UserModel.updateOne({_id:user._id,"addresses.9":{$exists:false}},{$push:{addresses:address}});if(!result.modifiedCount)throw Error("Maximum ten saved addresses.");revalidatePath("/account");}
export async function deleteAddress(form:FormData){const user=await requireUser();const index=z.coerce.number().int().min(0).max(9).parse(form.get("index"));user.addresses.splice(index,1);await user.save();revalidatePath("/account");}
