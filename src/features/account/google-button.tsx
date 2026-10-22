import {api} from "@/lib/api";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
async function start(){"use server";const url=await api<string>("/v1/auth/google/start",{method:"POST",body:{},mutate:true});if(new URL(url).origin!=="https://accounts.google.com")throw Error("Invalid identity provider");redirect(url);}
export async function GoogleButton(){const config=await api<{googleEnabled:boolean}>("/v1/config");return config.googleEnabled?<form action={start} className="mt-4"><Button variant="outline">Continue with Google</Button></form>:null;}
