import {AuthForm} from "@/features/account/auth-form";
import {env} from "@/lib/env";
export default function Register(){return <main id="main-content" className="page-container py-14"><h1 className="font-display text-4xl">Your FUTERA account</h1>{env.COMMERCE_ENABLED==="true"?<AuthForm register/>:<p className="my-6">Account registration is unavailable until commerce is configured.</p>}</main>;}
export const dynamic="force-dynamic";
