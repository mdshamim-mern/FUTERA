"use client";
import {Button} from "./ui/button";
export default function CommerceError({reset}:{reset:()=>void}){return <main className="page-container py-16"><h1 className="text-3xl">Request unavailable</h1><p className="my-5">Check your login and connection, then try again. No payment success is implied.</p><Button onClick={reset}>Try again</Button></main>;}
