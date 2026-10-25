import type {Order} from "@/types/api";
import {formatPrice} from "@/features/products/format";
export function AccountChart({orders}:{orders:Order[]}){
 const groups=new Map<string,{value:number;count:number}>();for(const order of orders){const key=order.status;const old=groups.get(key)??{value:0,count:0};groups.set(key,{value:old.value+order.totalMinor,count:old.count+1});}
 const rows=[...groups];const max=Math.max(1,...rows.map(([,row])=>row.count));
 return <figure className="rounded-2xl border bg-card p-6"><figcaption className="font-display text-xl">Your order activity</figcaption><p className="mt-3 text-xs leading-6 text-muted-foreground">Counts from your displayed order records, grouped by status. Booked amounts are unpaid demo values, not collected payments.</p>{rows.length?<ol className="mt-5 space-y-4">{rows.map(([status,row])=><li key={status}><div className="mb-2 flex flex-wrap justify-between gap-2 text-sm"><span>{status} · {row.count}</span><span>{formatPrice(row.value)}</span></div><div className="h-3 rounded-full bg-muted"><div className="h-3 rounded-full bg-primary" style={{width:`${100*row.count/max}%`}}/></div></li>)}</ol>:<p className="mt-5 text-sm text-muted-foreground">Your chart will appear after your first order.</p>}</figure>;
}
