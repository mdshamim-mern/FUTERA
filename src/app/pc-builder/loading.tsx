import { Skeleton } from "@/components/ui/skeleton";
export default function Loading(){return <main className="page-container space-y-5 py-12" aria-label="Loading PC builder"><Skeleton className="h-14 w-3/4"/>{Array.from({length:7},(_,i)=><Skeleton key={i} className="h-32 w-full"/>)}</main>;}
