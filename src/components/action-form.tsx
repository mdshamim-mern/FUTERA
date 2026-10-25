"use client";
import {useActionState} from "react";
export function ActionForm({action,children,className,success="Changes saved.",error="Could not save. Check the fields and try again.",confirmDelete=false}:{action:(form:FormData)=>Promise<void>;children:React.ReactNode;className?:string;success?:string;error?:string;confirmDelete?:boolean}){
 const [state,submit,pending]=useActionState(async(_state:{ok:boolean;message:string},form:FormData)=>{try{await action(form);return {ok:true,message:success};}catch{return {ok:false,message:error};}},{ok:false,message:""});
 return <form action={submit} className={className} aria-busy={pending} onSubmit={event=>{const button=(event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement|null;if(confirmDelete&&(button?.value==="delete"||button?.dataset.destructive==="true")&&!window.confirm("Delete this saved item? This action cannot be undone."))event.preventDefault();}}><fieldset disabled={pending} className="contents">{children}</fieldset>{(pending||state.message)&&<p role={pending||state.ok?"status":"alert"} className={`w-full text-sm ${state.ok?"text-success":"text-muted-foreground"}`}>{pending?"Saving…":state.message}</p>}</form>;
}
