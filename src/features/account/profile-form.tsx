"use client";
import {useActionState} from "react";
import {updateProfile} from "./actions";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
export function ProfileForm({name,email}:{name:string;email:string}){
 const [state,action,pending]=useActionState(updateProfile,{success:false,message:""});
 return <form action={action} className="max-w-lg space-y-4"><p className="break-all text-sm text-muted-foreground">{email}</p><label className="block">Display name<Input name="name" defaultValue={name} minLength={2} maxLength={80} required autoComplete="name"/></label><Button disabled={pending}>{pending?"Saving…":"Save profile"}</Button>{state.message&&<p role={state.success?"status":"alert"} className={state.success?"text-success":"text-danger"}>{state.message}</p>}</form>;
}
