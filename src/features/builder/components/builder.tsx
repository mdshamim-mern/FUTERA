"use client";
import { displayProductPrice } from "@/features/products/format";

import { useEffect, useState } from "react";
import { Battery, CircuitBoard, Cpu, Fan, Gpu, HardDrive, Keyboard, Layers3, MemoryStick, Monitor, Mouse, PcCase, Plus, PlugZap, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import {createStarter} from "../starter";
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

const partIcons: Record<CategoryCode, typeof Cpu> = {cpu:Cpu,motherboard:CircuitBoard,ram:MemoryStick,ssd:HardDrive,hdd:HardDrive,gpu:Gpu,psu:PlugZap,case:PcCase,"cpu-cooler":Fan,"case-fan":Fan,monitor:Monitor,keyboard:Keyboard,mouse:Mouse,ups:Battery};

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
    if(catalog.some(p=>p.isReference)){setNotice("Reference catalog: choose parts manually. No verified prices are available for a budget-based starter.");return;}
    if(catalog.some(p=>!p.isSample)){
      const result=createStarter(catalog,nextBudget,nextUse);
      if(result.missing){setNotice(`No available ${categoryLabels[result.missing]} can complete this starter without a known conflict. Select parts manually.`);return;}
      change(result.refs);setNotice(`Loaded ${result.refs.length} current catalog parts for ${nextUse}. Demo subtotal ${formatPrice(result.totalMinor)}.${result.overBudget?" Available parts exceed your target; adjust the selection or budget.":""}${!result.hasGpu&&nextUse!=="Office"?" No discrete GPU is available in this catalog; graphics requirements still need review.":""} Review all warnings and unknown specifications.`);return;
    }
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
    <div className="builder-summary-heading"><div><p className="workspace-label">Your next machine</p><h2 className="mt-2 font-display text-2xl">Build Summary</h2></div><span className="studio-icon" aria-hidden="true"><Layers3 className="size-5"/></span></div>
    <p className="builder-progress"><span>{complete}/7 required parts selected</span><strong>{Math.round(complete/7*100)}%</strong></p><progress className="w-full accent-primary" value={complete} max={7} aria-label="Required parts selected"/>
    <div className="builder-total-panel" aria-live="polite"><p className="text-xs text-muted-foreground">{quote.lines.every(l=>l.product.isSample)?"SAMPLE subtotal":"Catalog subtotal"}</p><p key={quote.totalMinor} className="price builder-total text-3xl font-semibold">{pending?"Verifying…":error?"Unavailable":quote.lines.some(l=>l.product.isReference)?"Not priced":formatPrice(quote.totalMinor)}</p><p className="mt-2 text-xs text-muted-foreground">Server recalculated. Excludes shipping, taxes and discounts. Not a checkout total or stock reservation.</p></div>
    <PowerGauge power={quote.power} capacity={typeof psu?.specs.wattage==="number"?psu.specs.wattage:undefined}/>
    <section className="builder-health" aria-label="Build health"><h3 className={`font-medium ${healthy&&!error?"text-success":"text-warning"}`}><ShieldCheck/>{pending?"Checking build…":error?"Verification unavailable":healthy?"Healthy build":"Build needs attention"}</h3><p className="mt-2 text-xs text-muted-foreground">{error?"Displayed specifications are from the last successful check. Retry to verify the current selection.":healthy?"All implemented checks pass for the declared specs. SAMPLE compatibility is illustrative; verify real hardware before buying.":"Unknown checks never count as compatible. Select missing parts and review issues."}</p>
      <ul className="mt-3 max-h-64 space-y-1 overflow-y-auto">{!pending && issues.map((issue,i)=><li key={`${issue.ruleId}-${i}`}><button className="min-h-11 w-full rounded-md py-2 text-left text-xs hover:bg-surface" onClick={()=>scrollTo(issue.involved[0])}>{issue.status==="error"?"❌":issue.status==="warning"?"⚠️":"?"} {issue.message}</button></li>)}{!pending && quote.stockIssues.map(s=><li key={s.id}><button className="min-h-11 text-left text-xs text-danger" onClick={()=>scrollTo(s.id)}>{s.message}</button></li>)}</ul>
    </section>
    <section className="builder-performance"><h3 className="text-sm font-medium"><TrendingUp/>Performance estimate</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">FPS estimate unavailable: this catalog has no verified benchmark dataset. {quote.lines.some(l=>l.product.category==="gpu")?"Bottleneck hint (estimate): game, resolution, memory and CPU/GPU balance all affect performance. No numeric bottleneck score is claimed.":"Bottleneck hint (estimate): integrated graphics can limit demanding games and GPU rendering. A discrete GPU may help; workload matters."}</p></section>
  </div>;
  return <TooltipProvider><div className="builder-root pb-28 lg:pb-0">
    <section className="builder-start" aria-label="Quick start"><div className="builder-start-head"><span className="studio-icon" aria-hidden="true"><Sparkles className="size-5"/></span><div><p className="workspace-label">A HEAD START</p><h2 className="mt-1 font-display">Start with a direction</h2></div></div><p className="mt-3 text-muted-foreground">Load available catalog parts, then review the actual subtotal and compatibility checks. Budget targets are not guaranteed quotes.</p><div className="builder-start-options"><div><p>01 / Budget target</p><div className="flex flex-wrap gap-2">{[50000,80000,120000,200000].map(b=><Button key={b} variant={budget===b?"default":"outline"} aria-pressed={budget===b} disabled={!ready} onClick={()=>starter(b)}>{b===200000?"৳200k+":`৳${b/1000}k`}</Button>)}</div></div><div><p>02 / Your workload</p><div className="flex flex-wrap gap-2">{["Gaming","Editing","Office","AI/ML"].map(u=><Button key={u} variant={useCase===u?"secondary":"ghost"} aria-pressed={useCase===u} disabled={!ready} onClick={()=>starter(budget,u)}>{u}</Button>)}</div></div></div></section>
    <p role="status" className="my-4 text-sm text-primary">{notice}</p>
    {error && <div role="alert" className="mb-5 rounded-xl border border-danger p-4"><p>{error}</p><Button className="mt-3" variant="outline" onClick={()=>replace([...refs])}>Retry verification</Button></div>}
    {quote.ignored>0 && <p role="status" className="mb-4 text-warning">Unavailable or duplicate single-slot components were safely omitted.</p>}
    <div className="builder-workspace-grid">
      <div className="min-w-0 space-y-4" aria-busy={pending}>
        {categoryCodes.map(category=>{
          const lines=quote.lines.filter(l=>l.product.category===category);
          const required=requiredCategories.some(c=>c===category);
          const PartIcon=partIcons[category];
          return <section key={category} id={`part-${category}`} tabIndex={-1} className="builder-part"><div className="builder-part-header"><div className="builder-part-title"><span className="builder-part-icon" aria-hidden="true"><PartIcon/></span><h2 className="font-display">{categoryLabels[category]}<span className="builder-part-kind">{required?"Required":"Optional"}</span></h2></div>{!lines.length && <Button variant="outline" disabled={!ready||pending} onClick={()=>setPicker({category})} aria-label={`Select ${categoryLabels[category]}`}><Plus className="size-3.5"/>Select</Button>}</div>
            {!lines.length && <p className="builder-empty"><Plus aria-hidden="true"/>{pending?"Checking saved components…":"Choose a component to make this build yours."}</p>}
            {lines.map(({product:p,quantity})=>{
              const relevant=quote.checks.filter(c=>c.involved.includes(p.slug)), bad=relevant.filter(c=>c.status!=="ok");
              const stockIssue=Boolean(p.isReference)||quantity>p.stock;
              const status=stockIssue||bad.some(c=>c.status==="error")?"❌":bad.length?"⚠️":"✅";
              return <article key={p.slug} id={`part-${p.slug}`} tabIndex={-1} className="builder-selected scroll-mt-28"><div className="flex items-start gap-3"><Image src={p.images[0].src} alt="" width={64} height={64} className="builder-selected-image"/><div className="min-w-0 flex-1"><h3 className="text-sm font-semibold">{p.name}</h3><p className="price mt-1 text-sm">{displayProductPrice(p)} each</p><p className={`mt-1 text-xs ${stockIssue?"text-danger":"text-success"}`}>{p.isReference?"Reference only; availability not supplied":`${p.isSample?"SAMPLE ":""}stock: ${p.stock}${stockIssue?" — insufficient":""}`}</p></div><Tooltip><TooltipTrigger asChild><button className="min-h-11 min-w-11 rounded-md" aria-label={`${categoryLabels[category]} compatibility: ${stockIssue?"insufficient stock":bad.map(c=>c.status).join(", ")||"checks pass"}`}>{status}</button></TooltipTrigger><TooltipContent className="max-w-64">{stockIssue?"Requested quantity exceeds stock. ":""}{bad.length?bad.map(c=>c.message).join(" "):"All implemented checks involving this component pass."}</TooltipContent></Tooltip></div>
                <div className="builder-spec-chips">{Object.entries(p.specs).slice(0,4).map(([k,v])=><span key={k} className="rounded-md bg-surface px-2 py-1 text-xs text-muted-foreground">{specLabel(k)}: {specValue(v)}</span>)}</div>
                <div className="builder-row-controls"><label className="flex items-center gap-2 text-xs">Qty<select className="builder-control" aria-label={`Quantity ${p.name}`} value={quantity} disabled={pending||["cpu","motherboard","gpu","psu","case","cpu-cooler"].includes(category)} onChange={e=>change(refs.map(r=>r.id===p.slug?{...r,quantity:Number(e.target.value)}:r))}>{Array.from({length:8},(_,i)=><option key={i+1}>{i+1}</option>)}</select></label><Button variant="outline" disabled={pending} onClick={()=>setPicker({category,id:p.slug})} aria-label={`Change ${p.name}`}>Change</Button><Button variant="ghost" disabled={pending} onClick={()=>change(refs.filter(r=>r.id!==p.slug))} aria-label={`Remove ${p.name}`}>Remove</Button></div>
              </article>;
            })}
          </section>;
        })}
        <Button variant="outline" className="w-full" disabled={!ready||pending||refs.length>=24} onClick={()=>setPicker({category:"other"})}>Add other component</Button>
      </div>
      <aside className="builder-summary hidden max-h-[calc(100dvh-7rem)] overflow-y-auto lg:sticky lg:top-24 lg:block" data-testid="desktop-summary">{summaryBody}</aside>
    </div>
    <section className="builder-actions my-8 space-y-4"><p className="workspace-label">YOUR WORK, SAVED</p><h2 className="font-display text-xl">Keep your build</h2><div className="flex flex-wrap gap-2"><Button disabled={pending||!!error||!quote.lines.length} onClick={()=>saveLocal()}>Save build</Button><Button variant="outline" disabled={pending||!quote.lines.length} onClick={()=>saveLocal(true)}>Duplicate</Button><Button variant="outline" disabled={!ready} onClick={()=>{change([]);setNotice("Build reset. Saved builds remain on this device.");}}>Reset</Button><Button variant="outline" disabled={pending||!!error} onClick={()=>void copy()}>Copy link</Button><Button variant="outline" disabled={pending||!!error} onClick={()=>{window.open(`https://wa.me/?text=${encodeURIComponent(`My FUTERA build: ${url()}`)}`,"_blank","noopener,noreferrer");}}>WhatsApp</Button><Button variant="outline" disabled={pending||!!error} onClick={()=>void messenger()}>Messenger</Button><Button variant="outline" disabled={pending||!!error} onClick={()=>window.print()}>Print</Button><Button disabled={pending||!!error||complete!==7||quote.checks.some(c=>c.status==="error")||quote.stockIssues.length>0} onClick={async()=>{try{await addBuildToCart(refs);router.push("/cart");}catch{setNotice("Could not add build. Check commerce configuration, stock or cart limits.");}}}>Add whole build to cart</Button><Button variant="outline" disabled={pending||!quote.lines.length} onClick={async()=>{try{await saveBuildToAccount(refs);setNotice("Saved to your account. Visit Account to rename, share or restore it.");}catch{setNotice("Log in and enable commerce before saving to your account.");}}}>Save to account</Button></div>
      <p className="text-xs text-muted-foreground">Adding selected parts does not confirm compatibility: review every warning and unknown specification. Known conflicts and insufficient stock block the whole-build action. Messenger uses the device share chooser or a copy-link fallback; nothing is sent automatically.</p>
      {shareUrl && <label className="block text-sm">Share link<input readOnly value={shareUrl} onFocus={e=>e.target.select()} className="builder-control mt-2 w-full"/></label>}
      {saved.length>0 && <div className="space-y-2"><h3 className="text-sm">Saved on this device</h3>{saved.map((s,i)=><Button key={i} variant="ghost" className="mr-2 max-w-full whitespace-normal" onClick={()=>{change(s.refs);setNotice(`Restored ${s.name}.`);}}>Restore {s.name}</Button>)}</div>}
    </section>
    <div className="builder-bottom glass fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 px-5 py-3 lg:hidden"><div className="min-w-0"><p className="text-xs">{complete}/7 selected</p><p className="price text-sm font-semibold">{pending?"Verifying…":error?"Unavailable":formatPrice(quote.totalMinor)}</p></div><Button onClick={()=>setSummary(true)}>View summary</Button></div>
    <Sheet open={summary} onOpenChange={setSummary}><SheetContent side="bottom" className="glass max-h-[90dvh] rounded-t-2xl"><SheetHeader><SheetTitle>Your build at a glance</SheetTitle><SheetDescription>Live checks against declared component specifications.</SheetDescription></SheetHeader><div className="builder-summary mx-4 mb-6">{summaryBody}</div></SheetContent></Sheet>
    {picker && <Picker overrides={quote.overrides} key={`${picker.category}-${picker.id}`} category={picker.category} replaceId={picker.id} catalog={catalog} refs={refs} onClose={()=>setPicker(null)} onSelect={select}/>}
    <div className="builder-print-summary hidden">{summaryBody}</div>
  </div></TooltipProvider>;
}
