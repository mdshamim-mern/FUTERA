import Link from "next/link";
import {requireAdmin} from "@/server/guards";
export const dynamic="force-dynamic";
export const metadata={title:"FUTERA administration",robots:{index:false,follow:false}};
export default async function AdminLayout({children}:{children:React.ReactNode}){
 await requireAdmin();return <main id="main-content" className="page-container min-w-0 py-10"><h1 className="font-display text-3xl">Store administration</h1><nav aria-label="Administration" className="my-6 flex flex-wrap gap-2">{["overview","products","orders","users","coupons","shipping","compatibility","audit"].map(view=><Link key={view} className="min-h-11 rounded-md border px-3 py-2 capitalize" href={`/admin?view=${view}`}>{view}</Link>)}</nav>{children}</main>;
}
