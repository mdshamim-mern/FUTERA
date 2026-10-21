import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Cpu, Layers3, ScanLine } from "lucide-react";
import { Badge } from "@/components/badge";
import { GlassCard } from "@/components/glass-card";
import { PcConcept } from "@/components/pc-concept";
import { Button } from "@/components/ui/button";

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
              <Button asChild size="lg"><Link href="#foundation">Explore PC building <ArrowRight aria-hidden="true"/></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="#approach">Discover FUTERA <ArrowUpRight aria-hidden="true"/></Link></Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-warning"/>Foundation preview · Shopping is coming later</p>
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
      <section id="approach" className="page-container py-14 md:py-20" aria-labelledby="approach-title">
        <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-3 text-xs font-medium tracking-[.2em] text-primary">BUILT AROUND YOUR BUILD</p><h2 id="approach-title" className="font-display text-3xl font-medium tracking-tight sm:text-4xl">Great PCs start with the right foundation.</h2></div><span className="shrink-0 font-mono text-xs text-muted-foreground">FUTURE + ERA</span></div>
        <div className="grid gap-8 border-t border-border pt-8 md:grid-cols-3 md:gap-10">
          {[{ icon: Cpu, number: "01", title: "Parts with purpose", text: "A considered hardware experience, shaped around what you want to create, play and achieve." }, { icon: Layers3, number: "02", title: "Clarity before complexity", text: "Clear specifications and understandable compatibility checks are at the heart of our planned builder." }, { icon: ScanLine, number: "03", title: "Made for your next era", text: "Built with Bangladesh in mind, from local currency to a future Bangla-ready experience." }].map(({ icon: Icon, number, title, text }) => <article key={number}><div className="mb-5 flex items-center justify-between"><Icon className="size-6 text-muted-foreground" strokeWidth={1.5} aria-hidden="true"/><span className="font-mono text-xs text-muted-foreground">{number}</span></div><h3 className="font-display text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></article>)}
        </div>
      </section>
      <section id="foundation" className="border-t border-border bg-card" aria-labelledby="foundation-title"><div className="page-container flex flex-col gap-5 py-10 md:flex-row md:items-center md:justify-between"><div><Badge className="mb-4">THE FOUNDATION / PHASE 01</Badge><h2 id="foundation-title" className="font-display text-2xl font-medium">The future is taking shape.</h2></div><p className="max-w-xl text-sm leading-7 text-muted-foreground">You’re exploring FUTERA’s visual foundation. The catalog, custom PC builder and checkout are planned for upcoming phases. No products are available to purchase yet.</p></div></section>
    </main>
  );
}
