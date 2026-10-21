"use client";
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { categoryCodes, categoryLabels, type Product, type CategoryCode } from "@/features/products/schema";
import { formatPrice, specLabel, specValue } from "@/features/products/format";
import type { BuildQuote } from "@/server/builder";
import { useBuilder } from "../store";
import { encodeBuild, requiredCategories, type BuildReference } from "../schema";
import { quoteBuild } from "../actions";
import { PowerGauge } from "./power-gauge";
import { Picker } from "./picker";
import {addBuildToCart} from "@/features/cart/actions";
import {saveBuildToAccount} from "@/features/account/actions";

export function Builder({catalog,initial,shared}:{catalog:Product[];initial:BuildQuote;shared:boolean}) {
  const router=useRouter();
  const {refs,saved,replace,save}=useBuilder();
  const [ready,setReady]=useState(false), [quote,setQuote]=useState(initial), [pending,setPending]=useState(true), [error,setError]=useState("");
  const [picker,setPicker]=useState<{category:CategoryCode|"other";id?:string}|null>(null), [summary,setSummary]=useState(false), [notice,setNotice]=useState("");
  const [budget,setBudget]=useState(80000), [useCase,setUseCase]=useState("Gaming"), [shareUrl,setShareUrl]=useState("");
  useEffect(()=>{
    let active=true;
    async function hydrate() {
      try { await useBuilder.persist.rehydrate(); } catch { if(active)setNotice("Local storage is unavailable. This build will last for this visit only."); }
      if (!active) return;
      if (shared) replace(initial.lines.map(l=>({id:l.product.slug,quantity:l.quantity})));
      setReady(true);
    }
    void hydrate(); return ()=>{active=false;};
  },[initial,replace,shared]);
  useEffect(()=>{
    if (!ready) return;
    let active=true;
    async function refresh() {
      setPending(true); setError("");
      try { const next=await quoteBuild(refs); if(active)setQuote(next); }
      catch { if(active)setError("Could not verify prices and stock. Retry before relying on this build."); }
      finally { if(active)setPending(false); }
    }
    void refresh(); return ()=>{active=false;};
  },[refs,ready]);
  const complete=requiredCategories.filter(c=>quote.lines.some(l=>l.product.category===c)).length;
  const issues=quote.checks.filter(c=>c.status!=="ok");
  const healthy=complete===7 && issues.length===0 && quote.stockIssues.length===0;
  const psu=quote.lines.find(l=>l.product.category==="psu")?.product;
  function change(next:BuildReference[]) { setPending(true);setShareUrl("");window.history.replaceState(null,"","/pc-builder"); try { replace(next); } catch { setNotice("Local storage is unavailable. Changes remain in memory for this visit."); } }
  function select(product:Product) {
    const single=!["ram","ssd","hdd","case-fan","monitor","keyboard","mouse","ups"].includes(product.category);
    const next=refs.filter(r=>r.id!==picker?.id && r.id!==product.slug && (!single || catalog.find(p=>p.slug===r.id)?.category!==product.category));
    change([...next,{id:product.slug,quantity:1}]);setPicker(null);
  }
  function starter(nextBudget=budget,nextUse=useCase) {
    setBudget(nextBudget);setUseCase(nextUse);
    const tier=nextBudget>=120000?"07":"03";
    const categories:CategoryCode[]=[...requiredCategories,...(nextUse!=="Office"?["gpu" as const]:[])];
    const next=categories.flatMap(category=>{
      const id=`sample-${category}-${["cpu","motherboard","ram"].includes(category)?tier:category==="psu"?nextBudget>=120000||nextUse==="AI/ML"?"08":"02":category==="gpu"?nextUse==="AI/ML"?"08":nextBudget>=120000?"07":"03":"02"}`;
      return catalog.some(p=>p.slug===id && p.isSample)?[{id,quantity:((nextUse==="Editing" && ["ram","ssd"].includes(category)) || (nextUse==="AI/ML" && category==="ram"))?2:1}]:[];
    });
    if (next.length!==categories.length) {setNotice("Starter SAMPLE products are unavailable in this catalog.");return;}
    change(next);setNotice(`Loaded a ${nextUse} SAMPLE starter for a ${formatPrice(nextBudget*100)} target. The verified sample subtotal may exceed this target; this is not a priced offer.`);
  }
  function scrollTo(id?:string) {
    setSummary(false);
    window.setTimeout(()=>{const el=document.getElementById(`part-${id ?? "cpu"}`);el?.scrollIntoView({block:"center"});el?.focus({preventScroll:true});},100);
  }
  function url() { const value=new URL("/pc-builder",window.location.origin);value.searchParams.set("build",encodeBuild(quote.lines.map(l=>({id:l.product.slug,quantity:l.quantity}))));setShareUrl(value.toString());return value.toString(); }
  async function copy() {const link=url();try{await navigator.clipboard.writeText(link);setNotice("Build link copied. Recipients get fresh catalog prices and compatibility checks.");}catch{setNotice("Clipboard unavailable. Select and copy the share link below.");}}
  async function messenger() {const link=url();try{if(navigator.share){await navigator.share({title:"My FUTERA build",url:link});}else{await navigator.clipboard.writeText(link);setNotice("Link copied. Paste it into Messenger; this browser has no app share chooser.");}}catch{setNotice("Sharing was cancelled or unavailable. Copy the link below to Messenger.");}}
  function saveLocal(duplicate=false) {try {save(duplicate);setNotice(duplicate?"A separate local copy was saved. You can keep editing this build.":"Build saved on this device. Prices will be refreshed when restored.");}catch{setNotice("Could not save: browser storage is unavailable or full.");}}
  const summaryBody=<div className="space-y-5">
    <div><p className="text-xs uppercase tracking-widest text-primary">Your next machine</p><h2 className="mt-2 font-display text-2xl">Build Summary</h2></div>
    <p className="text-sm">{complete}/7 required parts selected</p><progress className="h-2 w-full accent-cyan-400" value={complete} max={7} aria-label="Required parts selected"/>
    <div aria-live="polite"><p className="text-xs text-muted-foreground">{quote.lines.every(l=>l.product.isSample)?"SAMPLE subtotal":"Catalog subtotal"}</p><p key={quote.totalMinor} className="price builder-total text-3xl font-semibold">{pending?"Verifying…":error?"Unavailable":formatPrice(quote.totalMinor)}</p><p className="mt-2 text-xs text-muted-foreground">Server recalculated. Excludes shipping, taxes and discounts. Not a checkout total or stock reservation.</p></div>
    <PowerGauge power={quote.power} capacity={typeof psu?.specs.wattage==="number"?psu.specs.wattage:undefined}/>
    <section className="rounded-xl border p-4" aria-label="Build health"><h3 className={`font-medium ${healthy&&!error?"text-success":"text-warning"}`}>{pending?"Checking build…":error?"Verification unavailable":healthy?"Healthy build":"Build needs attention"}</h3><p className="mt-2 text-xs text-muted-foreground">{error?"Displayed specifications are from the last successful check. Retry to verify the current selection.":healthy?"All implemented checks pass for the declared specs. SAMPLE compatibility is illustrative; verify real hardware before buying.":"Unknown checks never count as compatible. Select missing parts and review issues."}</p>
      <ul className="mt-3 max-h-64 space-y-1 overflow-y-auto">{!pending && issues.map((issue,i)=><li key={`${issue.ruleId}-${i}`}><button className="min-h-11 w-full rounded-md py-2 text-left text-xs hover:bg-surface" onClick={()=>scrollTo(issue.involved[0])}>{issue.status==="error"?"❌":issue.status==="warning"?"⚠️":"?"} {issue.message}</button></li>)}{!pending && quote.stockIssues.map(s=><li key={s.id}><button className="min-h-11 text-left text-xs text-danger" onClick={()=>scrollTo(s.id)}>{s.message}</button></li>)}</ul>
    </section>
    <section className="rounded-xl border p-4"><h3 className="text-sm font-medium">Performance estimate</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">FPS estimate unavailable: fictional SAMPLE parts have no benchmark evidence. {quote.lines.some(l=>l.product.category==="gpu")?"Bottleneck hint (estimate): game, resolution, memory and CPU/GPU balance all affect performance. No numeric bottleneck score is claimed.":"Bottleneck hint (estimate): integrated graphics can limit demanding games and GPU rendering. A discrete GPU may help; workload matters."}</p></section>
  </div>;
  return <TooltipProvider><div className="builder-root pb-28 lg:pb-0">
    <section className="my-8 rounded-2xl border bg-card p-5" aria-label="Quick start"><h2 className="font-display text-xl">Start with a direction</h2><p className="mt-2 text-sm text-muted-foreground">Budget targets and use cases load editable SAMPLE builds.</p><div className="mt-4 flex flex-wrap gap-2">{[50000,80000,120000,200000].map(b=><Button key={b} variant={budget===b?"default":"outline"} disabled={!ready} onClick={()=>starter(b)}>{b===200000?"৳200k+":`৳${b/1000}k`}</Button>)}</div><div className="mt-3 flex flex-wrap gap-2">{["Gaming","Editing","Office","AI/ML"].map(u=><Button key={u} variant={useCase===u?"secondary":"ghost"} disabled={!ready} onClick={()=>starter(budget,u)}>{u}</Button>)}</div></section>
    <p role="status" className="my-4 text-sm text-primary">{notice}</p>
    {error && <div role="alert" className="mb-5 rounded-xl border border-danger p-4"><p>{error}</p><Button className="mt-3" variant="outline" onClick={()=>replace([...refs])}>Retry verification</Button></div>}
    {quote.ignored>0 && <p role="status" className="mb-4 text-warning">Unavailable or duplicate single-slot components were safely omitted.</p>}
    <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)]">
      <div className="min-w-0 space-y-4" aria-busy={pending}>
        {categoryCodes.map(category=>{
          const lines=quote.lines.filter(l=>l.product.category===category);
          const required=requiredCategories.some(c=>c===category);
          return <section key={category} id={`part-${category}`} tabIndex={-1} className="scroll-mt-28 rounded-xl border bg-card p-4 sm:p-5"><div className="mb-3 flex items-center justify-between gap-3"><h2 className="font-display text-lg">{categoryLabels[category]} <span className="ml-1 text-xs font-normal text-muted-foreground">{required?"Required":"Optional"}</span></h2>{!lines.length && <Button variant="outline" disabled={!ready||pending} onClick={()=>setPicker({category})} aria-label={`Select ${categoryLabels[category]}`}>Select</Button>}</div>
            {!lines.length && <p className="text-xs text-muted-foreground">{pending?"Checking saved components…":"No component selected."}</p>}
            {lines.map(({product:p,quantity})=>{
              const relevant=quote.checks.filter(c=>c.involved.includes(p.slug)), bad=relevant.filter(c=>c.status!=="ok");
              const stockIssue=quantity>p.stock;
              const status=stockIssue||bad.some(c=>c.status==="error")?"❌":bad.length?"⚠️":"✅";
              return <article key={p.slug} id={`part-${p.slug}`} tabIndex={-1} className="scroll-mt-28 border-t py-4 first:border-0"><div className="flex items-start gap-3"><Image src={p.images[0].src} alt="" width={64} height={64} className="rounded-lg bg-background"/><div className="min-w-0 flex-1"><h3 className="text-sm font-semibold">{p.name}</h3><p className="price mt-1 text-sm">{formatPrice(p.priceMinor)} each</p><p className={`mt-1 text-xs ${stockIssue?"text-danger":"text-success"}`}>{p.isSample?"SAMPLE ":""}stock: {p.stock}{stockIssue?" — insufficient":""}</p></div><Tooltip><TooltipTrigger asChild><button className="min-h-11 min-w-11 rounded-md" aria-label={`${categoryLabels[category]} compatibility: ${stockIssue?"insufficient stock":bad.map(c=>c.status).join(", ")||"checks pass"}`}>{status}</button></TooltipTrigger><TooltipContent className="max-w-64">{stockIssue?"Requested quantity exceeds stock. ":""}{bad.length?bad.map(c=>c.message).join(" "):"All implemented checks involving this component pass."}</TooltipContent></Tooltip></div>
                <div className="my-3 flex flex-wrap gap-2">{Object.entries(p.specs).slice(0,4).map(([k,v])=><span key={k} className="rounded-md bg-surface px-2 py-1 text-xs text-muted-foreground">{specLabel(k)}: {specValue(v)}</span>)}</div>
                <div className="flex flex-wrap items-center gap-2"><label className="flex items-center gap-2 text-xs">Qty<select className="builder-control" aria-label={`Quantity ${p.name}`} value={quantity} disabled={pending||["cpu","motherboard","gpu","psu","case","cpu-cooler"].includes(category)} onChange={e=>change(refs.map(r=>r.id===p.slug?{...r,quantity:Number(e.target.value)}:r))}>{Array.from({length:8},(_,i)=><option key={i+1}>{i+1}</option>)}</select></label><Button variant="outline" disabled={pending} onClick={()=>setPicker({category,id:p.slug})} aria-label={`Change ${p.name}`}>Change</Button><Button variant="ghost" disabled={pending} onClick={()=>change(refs.filter(r=>r.id!==p.slug))} aria-label={`Remove ${p.name}`}>Remove</Button></div>
              </article>;
            })}
          </section>;
        })}
        <Button variant="outline" className="w-full" disabled={!ready||pending||refs.length>=24} onClick={()=>setPicker({category:"other"})}>Add other component</Button>
      </div>
      <aside className="glass hidden max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl p-6 lg:sticky lg:top-24 lg:block" data-testid="desktop-summary">{summaryBody}</aside>
    </div>
    <section className="builder-actions my-8 space-y-4"><h2 className="font-display text-xl">Keep your build</h2><div className="flex flex-wrap gap-2"><Button disabled={pending||!!error||!quote.lines.length} onClick={()=>saveLocal()}>Save build</Button><Button variant="outline" disabled={pending||!quote.lines.length} onClick={()=>saveLocal(true)}>Duplicate</Button><Button variant="outline" disabled={!ready} onClick={()=>{change([]);setNotice("Build reset. Saved builds remain on this device.");}}>Reset</Button><Button variant="outline" disabled={pending||!!error} onClick={()=>void copy()}>Copy link</Button><Button variant="outline" disabled={pending||!!error} onClick={()=>{window.open(`https://wa.me/?text=${encodeURIComponent(`My FUTERA build: ${url()}`)}`,"_blank","noopener,noreferrer");}}>WhatsApp</Button><Button variant="outline" disabled={pending||!!error} onClick={()=>void messenger()}>Messenger</Button><Button variant="outline" disabled={pending||!!error} onClick={()=>window.print()}>Print</Button><Button disabled={pending||!healthy} onClick={async()=>{try{await addBuildToCart(refs);router.push("/cart");}catch{setNotice("Could not add build. Check commerce configuration, stock or cart limits.");}}}>Add whole build to cart</Button><Button variant="outline" disabled={pending||!quote.lines.length} onClick={async()=>{try{await saveBuildToAccount(refs);setNotice("Saved to your account. Visit Account to rename, share or restore it.");}catch{setNotice("Log in and enable commerce before saving to your account.");}}}>Save to account</Button></div>
      <p className="text-xs text-muted-foreground">Messenger uses your device’s share chooser or a copy-link fallback. Nothing is sent automatically. Local saves keep IDs and quantities only.</p>
      {shareUrl && <label className="block text-sm">Share link<input readOnly value={shareUrl} onFocus={e=>e.target.select()} className="builder-control mt-2 w-full"/></label>}
      {saved.length>0 && <div className="space-y-2"><h3 className="text-sm">Saved on this device</h3>{saved.map((s,i)=><Button key={i} variant="ghost" className="mr-2 max-w-full whitespace-normal" onClick={()=>{change(s.refs);setNotice(`Restored ${s.name}.`);}}>Restore {s.name}</Button>)}</div>}
    </section>
    <div className="builder-bottom glass fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 px-5 py-3 lg:hidden"><div className="min-w-0"><p className="text-xs">{complete}/7 selected</p><p className="price text-sm font-semibold">{pending?"Verifying…":error?"Unavailable":formatPrice(quote.totalMinor)}</p></div><Button onClick={()=>setSummary(true)}>View summary</Button></div>
    <Sheet open={summary} onOpenChange={setSummary}><SheetContent side="bottom" className="glass max-h-[90dvh] rounded-t-2xl"><SheetHeader><SheetTitle>Your build at a glance</SheetTitle><SheetDescription>Live checks against declared component specifications.</SheetDescription></SheetHeader><div className="px-5 pb-8">{summaryBody}</div></SheetContent></Sheet>
    {picker && <Picker key={`${picker.category}-${picker.id}`} category={picker.category} replaceId={picker.id} catalog={catalog} refs={refs} onClose={()=>setPicker(null)} onSelect={select}/>}
    <div className="builder-print-summary hidden">{summaryBody}</div>
  </div></TooltipProvider>;
}


