import Link from "next/link";
import {AuthShell} from "@/components/auth-shell";
import {GoogleButton} from "@/features/account/google-button";
import {AuthForm} from "@/features/account/auth-form";
import {env} from "@/lib/env";
export default function Register(){return <AuthShell register>{env.COMMERCE_ENABLED==="true"?<><AuthForm register/><GoogleButton/></>:<p className="my-6">Account registration is unavailable until commerce is configured.</p>}<p className="mt-7 text-sm text-muted-foreground">Already building with us? <Link className="text-primary underline underline-offset-4" href="/login">Log in</Link></p></AuthShell>;}
export const dynamic="force-dynamic";
