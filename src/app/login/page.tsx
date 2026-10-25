import {AuthShell} from "@/components/auth-shell";
import {api} from "@/lib/api";
import {GoogleButton} from "@/features/account/google-button";
import Link from "next/link";
import {AuthForm} from "@/features/account/auth-form";
import {env} from "@/lib/env";
export default async function Login({searchParams}:{searchParams:Promise<{error?:string}>}){const failed=(await searchParams).error==="google";let demo:{email:string;password:string;admin?:{email:string;password:string}|null}|undefined;try{if(env.COMMERCE_ENABLED==="true")demo=await api("/v1/demo/account");}catch{/* Optional demo credentials are absent outside isolated deployments. */}return <AuthShell>{failed&&<p role="alert" className="mt-4 text-danger">Google sign-in could not be completed. Try again or use your existing password.</p>}{env.COMMERCE_ENABLED==="true"?<><AuthForm demo={demo}/><GoogleButton/></>:<p className="my-6">Accounts require configured MongoDB and secure session settings. Nothing will be submitted until commerce is enabled.</p>}<Link className="mt-6 inline-flex min-h-11 items-center text-primary" href="/register">Create an account</Link></AuthShell>;}
export const dynamic="force-dynamic";
