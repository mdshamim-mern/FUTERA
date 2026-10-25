import {cookies} from "next/headers";
import "server-only";
import {api,ApiError} from "@/lib/api";
import type {SessionUser} from "@/types/api";
export async function currentUser(){if(!(await cookies()).get("futera-session"))return null;const user=await api<SessionUser|null>("/v1/auth/session");return user?{...user,_id:user.id,disabled:false}:null;}
export async function requireUser(){const user=await currentUser();if(!user)throw new ApiError(401,"Please log in.");return user;}
export async function requireAdmin(){const user=await requireUser();if(user.role!=="admin")throw new ApiError(403,"Forbidden");return user;}
