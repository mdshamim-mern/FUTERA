import {api} from "@/lib/api";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
async function start(){"use server";const url=await api<string>("/v1/auth/google/start",{method:"POST",body:{},mutate:true});if(new URL(url).origin!=="https://accounts.google.com")throw Error("Invalid identity provider");redirect(url);}
export async function GoogleButton(){const config=await api<{googleEnabled:boolean}>("/v1/config");return config.googleEnabled?<form action={start} className="mt-4"><Button variant="outline" className="w-full gap-3 rounded-xl"><svg viewBox="0 0 24 24" aria-hidden="true" className="size-4"><path fill="currentColor" d="M21.8 12.2c0-.7-.1-1.5-.2-2.2H12v4h5.5a4.8 4.8 0 0 1-2 3.1c-3.2 2.2-7.5.1-7.5-3.8a5.9 5.9 0 0 1 9.8-4.5l2.9-2.9A10 10 0 1 0 22 12z"/></svg>Continue with Google</Button></form>:null;}
