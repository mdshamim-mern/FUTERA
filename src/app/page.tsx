import Link from "next/link";
import {Suspense} from "react";
import {ArrowRight,ArrowUpRight,CircuitBoard,Layers3,ScanLine,ShieldCheck} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import {PcConcept} from "@/components/pc-concept";
import {Button} from "@/components/ui/button";
import {StorefrontSections} from "@/features/products/components/storefront-sections";
export const dynamic="force-dynamic";
export default function Home(){return <main id="main-content" tabIndex={-1} className="home-page">
 <section className="home-hero" aria-labelledby="hero-title"><div className="hero-layout page-container">
  <div className="hero-copy"><p className="hero-badge"><span aria-hidden="true"/>A NEW ERA OF PC BUILDING</p><h1 id="hero-title"><span>Build Your Dream PC.</span>{" "}<span className="text-primary">Perfectly Compatible.</span></h1><p className="hero-description">Your ambition, built with intention. Explore components, understand what fits, and bring your next PC to life with FUTERA.</p><div className="hero-ctas"><Button asChild size="lg"><Link prefetch={false} href="/pc-builder">Build your PC <ArrowRight aria-hidden="true"/></Link></Button><Button asChild size="lg" variant="outline"><Link prefetch={false} href="/products">Explore components <ArrowUpRight aria-hidden="true"/></Link></Button></div><p className="hero-note"><ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden="true"/>Source-linked specs. Clear compatibility checks.</p></div>
  <div className="hero-workspace" aria-label="PC planning workspace illustration"><div className="hero-workspace-top"><span className="flex items-center gap-2"><CircuitBoard className="size-4 text-primary" aria-hidden="true"/>YOUR NEXT WORKSPACE</span><span className="hero-workspace-dots" aria-hidden="true"><i/><i/><i/></span></div><div className="hero-art"><div className="hero-orbit" aria-hidden="true"/><PcConcept/></div><div className="hero-workspace-bottom"><span className="studio-icon"><ScanLine className="size-5" aria-hidden="true"/></span><div><p className="font-display text-sm font-semibold">Every part has its place.</p><p className="mt-1 text-xs text-muted-foreground">Plan. Check. Refine.</p></div><Layers3 className="ml-auto size-5 text-primary" aria-hidden="true"/></div><p className="hero-art-caption">Original FUTERA concept · explore your own configuration</p></div>
 </div></section>
 <Suspense fallback={<section className="page-container min-h-screen py-14" aria-busy="true" aria-label="Loading components"><Skeleton className="h-10 w-2/3"/><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[0,1,2,3].map(i=><Skeleton key={i} className="h-96"/>)}</div></section>}><StorefrontSections/></Suspense>
</main>;}
