import {NextResponse,type NextRequest} from "next/server";
import {api} from "@/lib/api";
import {env} from "@/lib/env";
export async function GET(request:NextRequest){try{await api("/v1/auth/google/complete",{method:"POST",body:{state:request.nextUrl.searchParams.get("state"),code:request.nextUrl.searchParams.get("code")},mutate:true});}catch{return NextResponse.redirect(new URL("/login?error=google",env.APP_URL));}return NextResponse.redirect(new URL("/account",env.APP_URL));}
