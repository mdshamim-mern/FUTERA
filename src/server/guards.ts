import "server-only";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { UserModel } from "./models/commerce";
export function commerceEnabled(){if(env.COMMERCE_ENABLED!=="true")throw new Error("Commerce is not configured. No account or order was created.");}
export async function currentUser(){if(env.COMMERCE_ENABLED!=="true")return null;const session=await auth();return session?.user?.id?UserModel.findById(session.user.id):null;}
export async function requireUser(){commerceEnabled();const user=await currentUser();if(!user||user.disabled)throw new Error("Please log in.");return user;}
export async function requireAdmin(){const user=await requireUser();if(user.role!=="admin")throw new Error("Forbidden");return user;}
