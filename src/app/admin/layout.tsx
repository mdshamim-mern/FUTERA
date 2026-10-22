import Link from "next/link";
import {requireAdmin} from "@/server/guards";
export const dynamic="force-dynamic";
export const metadata={title:"FUTERA administration",robots:{index:false,follow:false}};
export default async function AdminLayout({children}:{children:React.ReactNode}){
 await requireAdmin();return <main id="main-content" className="page-container min-w-0 py-10"><h1 className="font-display text-3xl">Store administration</h1><div className="mt-7 grid gap-8 lg:grid-cols-[190px_minmax(0,1fr)]"><aside><nav aria-label="Administration" className="sticky top-24 grid gap-2 rounded-xl border bg-card p-3">{["overview","products","orders","users","coupons","shipping","compatibility","audit"].map(view=><Link key={view} className="min-h-11 rounded-md border px-3 py-2 capitalize" href={`/admin?view=${view}`}>{view}</Link>)}<Link className="min-h-11 rounded-md border px-3 py-2" href="/account#profile">Profile</Link></nav></aside><div className="min-w-0">{children}</div></div></main>;
}
