"use client";
import { Button } from "@/components/ui/button";
export default function Error({reset}:{reset:()=>void}){return <main className="page-container py-20"><h1 className="font-display text-3xl">Builder unavailable</h1><p className="my-5">The catalog could not be loaded. Your local build remains saved.</p><Button onClick={reset}>Try again</Button></main>;}
