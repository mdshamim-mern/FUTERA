import {GoogleButton} from "@/features/account/google-button";
import Link from "next/link";
import {AuthForm} from "@/features/account/auth-form";
import {env} from "@/lib/env";
export default async function Login({searchParams}:{searchParams:Promise<{error?:string}>}){const failed=(await searchParams).error==="google";return <main id="main-content" className="page-container py-14"><h1 className="font-display text-4xl">Welcome back</h1>{failed&&<p role="alert" className="mt-4 text-danger">Google sign-in could not be completed. Try again or use your existing password.</p>}{env.COMMERCE_ENABLED==="true"?<><AuthForm/><GoogleButton/></>:<p className="my-6">Accounts require configured MongoDB and secure session settings. Nothing will be submitted until commerce is enabled.</p>}<Link className="mt-6 inline-flex min-h-11 items-center text-primary" href="/register">Create an account</Link></main>;}
export const dynamic="force-dynamic";
