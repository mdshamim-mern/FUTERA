import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ArrowUpRight, Check, ScanLine } from "lucide-react";
import { Badge } from "@/components/badge";
import { GlassCard } from "@/components/glass-card";
import { PcConcept } from "@/components/pc-concept";
import { Button } from "@/components/ui/button";
import { StorefrontSections } from "@/features/products/components/storefront-sections";

export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="relative border-b border-border" aria-labelledby="hero-title">
        <div className="page-container grid min-h-[60svh] items-center gap-4 py-6 md:h-[65svh] md:min-h-0 md:grid-cols-[1.1fr_1fr]">
          <div className="relative z-10 min-w-0">
            <Badge className="mb-4 border-primary/20 text-primary"><span className="size-1.5 rounded-full bg-primary"/>THE NEXT ERA OF PC BUILDING</Badge>
            <h1 id="hero-title" className="max-w-[690px] font-display text-[clamp(1.7rem,4vw,3.6rem)] leading-[1.06] font-semibold tracking-[-.055em]">Build Your<br className="hidden lg:block"/> Dream PC.{" "}<br/><span className="text-primary">Perfectly{" "}<br className="hidden lg:block"/> Compatible.</span></h1>
            <p className="mt-4 max-w-[440px] text-sm leading-6 text-muted-foreground">Your ambition. Your components. One seamless build. Meet FUTERA — a new era of PC hardware and compatibility-first builds for Bangladesh.</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href="/products">Explore components <ArrowRight aria-hidden="true"/></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/pc-builder">Build your PC <ArrowUpRight aria-hidden="true"/></Link></Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-warning"/>Source-linked research · No unverified purchase offers</p>
          </div>
          <div className="hero-grid relative hidden min-w-0 rounded-3xl md:block">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-[#8273be]/[.07]" aria-hidden="true"/>
            <div className="relative mx-auto max-w-[360px]"><PcConcept /></div>
            <GlassCard className="relative mx-3 -mt-5 flex items-center gap-3 rounded-xl p-4 sm:mx-7">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><ScanLine aria-hidden="true" className="size-5"/></span>
              <div><p className="font-display text-sm font-medium">Every detail. In harmony.</p><p className="mt-1 text-xs text-muted-foreground">Compatibility-first, by design.</p></div>
              <span className="ml-auto text-primary"><Check className="size-4" aria-hidden="true"/></span>
            </GlassCard>
            <p className="my-5 text-center font-mono text-[10px] tracking-[.16em] text-muted-foreground">FUTERA / CONCEPT 01 — NOT A PRODUCT LISTING</p>
          </div>
        </div>
      </section>
      <Suspense fallback={<section className="page-container min-h-screen py-14" aria-busy="true" aria-label="Loading components"><Skeleton className="h-10 w-2/3"/><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[0,1,2,3].map(i=><Skeleton key={i} className="h-96"/>)}</div></section>}><StorefrontSections /></Suspense>
    </main>
  );
}
