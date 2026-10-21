"use client";
import {useActionState} from "react";
import {authenticate} from "./actions";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
export function AuthForm({register=false}:{register?:boolean}){const [error,action,pending]=useActionState(authenticate,"");return <form action={action} className="mt-6 max-w-md space-y-4"><input type="hidden" name="mode" value={register?"register":"login"}/>{register&&<label className="block">Name<Input name="name" autoComplete="name" required minLength={2} maxLength={80}/></label>}<label className="block">Email<Input name="email" type="email" autoComplete="username" required maxLength={254}/></label><label className="block">Password (12–128 characters)<Input name="password" type="password" autoComplete={register?"new-password":"current-password"} minLength={12} maxLength={128} required/></label>{error&&<p role="alert" className="text-danger">{error}</p>}<Button disabled={pending}>{pending?"Please wait…":register?"Register":"Log in"}</Button></form>;}
