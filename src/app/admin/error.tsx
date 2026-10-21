"use client";
import {Button} from "@/components/ui/button";
export default function ErrorPage({reset}:{reset:()=>void}){return <div role="alert" className="space-y-4"><h2>Administration could not load.</h2><p>Check your session and database connection.</p><Button onClick={reset}>Try again</Button></div>;}
