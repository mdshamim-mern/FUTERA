"use client";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryCodes, categoryLabels, type CategoryCode, type Product } from "@/features/products/schema";
import { formatPrice, specLabel, specValue } from "@/features/products/format";
import { checkCompatibility, checkOverrides, type CompatibilityOverride, type Part } from "../compatibility";
import type { BuildReference } from "../schema";
export function Picker({overrides,category,replaceId,catalog,refs,onClose,onSelect}:{overrides:CompatibilityOverride[];category:CategoryCode|"other";replaceId?:string;catalog:Product[];refs:BuildReference[];onClose:()=>void;onSelect:(p:Product)=>void}) {
  const [search,setSearch]=useState(""); const [brand,setBrand]=useState(""); const [maximum,setMaximum]=useState(""); const [spec,setSpec]=useState(""); const [sort,setSort]=useState("price-asc"); const [compatible,setCompatible]=useState(true); const [quick,setQuick]=useState<Product|null>(null); const [extraCategory,setExtraCategory]=useState<CategoryCode>("ram");
  const actual=category==="other"?extraCategory:category;
  const quickTrigger=useRef<HTMLButtonElement|null>(null);
  const candidates=useMemo(()=>catalog.filter(p=>p.category===actual).map(product=>{
    const single=!["ram","ssd","hdd","case-fan","monitor","keyboard","mouse","ups"].includes(product.category);
    const current=refs.filter(r=>r.id!==replaceId && r.id!==product.slug).flatMap(r=>{const p=catalog.find(p=>p.slug===r.id);return p && (!single || p.category!==product.category)?[{id:p.slug,category:p.category,quantity:r.quantity,specs:p.specs}]:[];});
    const candidate:Part={id:product.slug,category:product.category,quantity:1,specs:product.specs};
    const checks=[...checkCompatibility([...current,candidate]),...checkOverrides([...current,candidate],overrides)].filter(c=>c.involved.includes(product.slug));
    const errors=checks.filter(c=>c.status==="error"); const unknown=checks.some(c=>c.status==="unknown");
    return {product,errors,unknown,warnings:checks.filter(c=>c.status==="warning")};
  }),[catalog,actual,refs,replaceId,overrides]);
  const visible=candidates.filter(({product:p,errors})=>(!compatible || !errors.length) && p.name.toLowerCase().includes(search.toLowerCase()) && (!brand || p.brand===brand) && (!maximum || p.priceMinor<=Number(maximum)*100) && (!spec || Object.values(p.specs).some(v=>String(v).toLowerCase().includes(spec.toLowerCase())))).sort((a,b)=>sort==="name"?a.product.name.localeCompare(b.product.name):sort==="price-desc"?b.product.priceMinor-a.product.priceMinor:a.product.priceMinor-b.product.priceMinor);
  return <>
    <Dialog open onOpenChange={open=>{if(!open && !quick)onClose();}}><DialogContent className="glass builder-picker sm:max-w-4xl" onInteractOutside={event=>{if(quick)event.preventDefault();}} onEscapeKeyDown={event=>{if(quick)event.preventDefault();}}><DialogHeader><DialogTitle>Select {categoryLabels[actual]}</DialogTitle><DialogDescription>Fictional SAMPLE options. Unknown checks are unverified, never compatible. Prices and stock are checked on selection.</DialogDescription></DialogHeader>
      {category==="other" && <label className="text-sm">Component category<select className="builder-control w-full" value={extraCategory} onChange={e=>setExtraCategory(e.target.value as CategoryCode)}>{categoryCodes.map(c=><option key={c} value={c}>{categoryLabels[c]}</option>)}</select></label>}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="col-span-2 text-sm">Search components<Input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search sample names" /></label>
        <label className="text-sm">Brand<select className="builder-control w-full" value={brand} onChange={e=>setBrand(e.target.value)}><option value="">All brands</option>{[...new Set(candidates.map(c=>c.product.brand))].map(b=><option key={b}>{b}</option>)}</select></label>
        <label className="text-sm">Sort<select className="builder-control w-full" value={sort} onChange={e=>setSort(e.target.value)}><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name</option></select></label>
        <label className="text-sm">Max price (৳)<Input type="number" min="0" value={maximum} onChange={e=>setMaximum(e.target.value)}/></label>
        <label className="text-sm">Spec filter<Input value={spec} onChange={e=>setSpec(e.target.value)} placeholder="AM5, DDR5, ATX…"/></label>
        <label className="col-span-2 flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" checked={compatible} onChange={e=>setCompatible(e.target.checked)} className="size-5 accent-cyan-400"/>Show only compatible</label>
      </div>
      <p className="text-xs text-muted-foreground">Known conflicts are hidden by default. Unverified options remain available to complete an unfinished build and are labelled below.</p>
      <div className="grid gap-3 sm:grid-cols-2" aria-live="polite">
        {!visible.length && <p className="col-span-full py-8">No components match. Clear filters or show incompatible options.</p>}
        {visible.map(({product:p,errors,unknown,warnings})=><article key={p.slug} className={`rounded-xl border p-4 ${errors.length?"border-danger/50 bg-danger/5":"bg-card"}`}>
          <div className="flex gap-3"><Image src={p.images[0].src} alt="" width={56} height={56} className={errors.length?"opacity-40":""}/><div className="min-w-0"><h3 className="text-sm font-semibold">{p.name}</h3><p className="mt-1 text-sm price">{formatPrice(p.priceMinor)}</p></div></div>
          <p className="my-2 text-xs text-muted-foreground">{Object.entries(p.specs).slice(0,3).map(([k,v])=>`${specLabel(k)}: ${specValue(v)}`).join(" · ")}</p>
          <p className={`text-xs ${errors.length?"text-danger":unknown||warnings.length?"text-warning":"text-success"}`}>{errors.length?errors.map(e=>e.message).join(" "):unknown?"Unverified — more parts or specifications needed":warnings.length?warnings.map(w=>w.message).join(" "):"✓ Selected-part checks pass"}</p>
          <p className="mt-2 text-xs">SAMPLE stock: {p.stock}</p><div className="mt-3 flex flex-wrap gap-2"><Button variant={errors.length?"outline":"default"} onClick={()=>onSelect(p)} aria-label={`Select ${p.name}`}>Select</Button><Button variant="ghost" onClick={event=>{quickTrigger.current=event.currentTarget;setQuick(p);}} aria-label={`Quick view ${p.name}`}>Quick view</Button></div>
        </article>)}
      </div>
    </DialogContent></Dialog>
    <Sheet open={!!quick} onOpenChange={open=>{if(!open)setQuick(null);}}><SheetContent className="glass w-full sm:max-w-lg" onCloseAutoFocus={event=>{event.preventDefault();quickTrigger.current?.focus();}}><SheetHeader><SheetTitle>{quick?.name ?? "Quick view"}</SheetTitle><SheetDescription>SAMPLE specifications, not real product claims.</SheetDescription></SheetHeader>{quick && <div className="space-y-4 px-4 pb-8"><Image src={quick.images[0].src} alt={quick.images[0].alt} width={320} height={200} className="w-full"/><p>{quick.description}</p><dl>{Object.entries(quick.specs).map(([key,value])=><div key={key} className="border-b py-2 text-sm"><dt className="text-muted-foreground">{specLabel(key)}</dt><dd className="break-words">{specValue(value)}</dd></div>)}</dl></div>}</SheetContent></Sheet>
  </>;
}
