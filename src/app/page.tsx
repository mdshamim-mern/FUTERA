import Link from "next/link";
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
        <div className="page-container grid items-center gap-4 pb-12 pt-14 md:grid-cols-[1.1fr_1fr] md:gap-4 md:py-20 lg:py-24">
          <div className="relative z-10 min-w-0">
            <Badge className="mb-7 border-primary/20 text-primary"><span className="size-1.5 rounded-full bg-primary"/>THE NEXT ERA OF PC BUILDING</Badge>
            <h1 id="hero-title" className="max-w-[690px] font-display text-[clamp(2.6rem,5.1vw,4.65rem)] leading-[1.06] font-semibold tracking-[-.055em]">Build Your<br className="hidden lg:block"/> Dream PC.{" "}<br/><span className="text-primary">Perfectly{" "}<br className="hidden lg:block"/> Compatible.</span></h1>
            <p className="mt-7 max-w-[440px] text-base leading-7 text-muted-foreground">Your ambition. Your components. One seamless build. Meet FUTERA — a new era of PC hardware and compatibility-first builds for Bangladesh.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href="/products">Explore components <ArrowRight aria-hidden="true"/></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/pc-builder">Build your PC <ArrowUpRight aria-hidden="true"/></Link></Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-warning"/>SAMPLE catalog · No live purchase offers</p>
          </div>
          <div className="hero-grid relative mt-7 min-w-0 rounded-3xl md:mt-0">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-[#8273be]/[.07]" aria-hidden="true"/>
            <div className="relative"><PcConcept /></div>
            <GlassCard className="relative mx-3 -mt-5 flex items-center gap-3 rounded-xl p-4 sm:mx-7">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><ScanLine aria-hidden="true" className="size-5"/></span>
              <div><p className="font-display text-sm font-medium">Every detail. In harmony.</p><p className="mt-1 text-xs text-muted-foreground">Compatibility-first, by design.</p></div>
              <span className="ml-auto text-primary"><Check className="size-4" aria-hidden="true"/></span>
            </GlassCard>
            <p className="my-5 text-center font-mono text-[10px] tracking-[.16em] text-muted-foreground">FUTERA / CONCEPT 01 — NOT A PRODUCT LISTING</p>
          </div>
        </div>
      </section>
      <StorefrontSections />
    </main>
  );
}
