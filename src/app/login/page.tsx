import Link from "next/link";
import {AuthForm} from "@/features/account/auth-form";
import {env} from "@/lib/env";
export default function Login(){return <main id="main-content" className="page-container py-14"><h1 className="font-display text-4xl">Welcome back</h1>{env.COMMERCE_ENABLED==="true"?<AuthForm/>:<p className="my-6">Accounts require configured MongoDB and secure session settings. Nothing will be submitted until commerce is enabled.</p>}<Link className="mt-6 inline-flex min-h-11 items-center text-primary" href="/register">Create an account</Link></main>;}
export const dynamic="force-dynamic";
