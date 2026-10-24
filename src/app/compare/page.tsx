import Image from "next/image";
import {ArrowRightLeft,Plus,ScanLine} from "lucide-react";
import { displayProductPrice } from "@/features/products/format";
import Link from "next/link";
import type { Metadata } from "next";
import { getProducts } from "@/server/catalog";
import { compareSlugs, type SearchParams } from "@/features/products/query";
import { specLabel, specValue } from "@/features/products/format";
import { categoryLabels } from "@/features/products/schema";
import { Button } from "@/components/ui/button";
import { RemoveComparison } from "@/features/products/components/compare-toggle";
export const metadata: Metadata = { title: "Compare components" };
export default async function ComparePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const slugs = compareSlugs((await searchParams).items);
  const products = await getProducts(slugs);
  const specs = [...new Set(products.flatMap((p) => Object.keys(p.specs)))];
  return <main id="main-content" tabIndex={-1} className="studio-page page-container py-12 md:py-16"><p className="eyebrow"><ArrowRightLeft className="size-4"/> SIDE BY SIDE</p><h1 className="mt-6 font-display text-4xl leading-tight font-semibold md:text-6xl">Make the details count.</h1><p className="mt-4 text-sm leading-7 text-muted-foreground">Three components. One clear view. Compare the specifications that matter, then check how your parts fit in PC Builder.</p><Button asChild variant="outline" className="my-6"><Link href="/products">Choose components</Link></Button>
  {products.length !== slugs.length && <p role="status" className="mb-4 text-warning">Some requested products could not be found.</p>}
  {!products.length ? <section className="studio-panel p-6 md:p-10"><div className="grid gap-4 md:grid-cols-3">{[1,2,3].map(n=><Link key={n} href="/products" className="group flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed bg-background/40 p-6 text-center hover:border-primary"><span className="studio-icon group-hover:bg-primary/10"><Plus className="size-5"/></span><h2 className="mt-5 font-display text-lg">Choose component {n}</h2><p className="mt-2 text-xs text-muted-foreground">Browse the catalog and tap Compare</p></Link>)}</div><div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6"><div><h2 className="font-display text-xl">Nothing to compare yet</h2><p className="mt-2 text-sm text-muted-foreground">Choose up to three products using Compare on the catalog cards.</p></div><ScanLine className="size-7 text-primary"/></div></section> : <><div className="grid gap-4 md:grid-cols-3">{products.map((p) => <article key={p.slug} className="studio-panel min-w-0 p-6"><div className="relative mb-5 aspect-[3/2] rounded-xl bg-background/70"><Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="(max-width:768px) 90vw, 30vw" className="object-contain p-3"/></div><p className="text-xs text-primary">{p.isSample ? "SAMPLE / " : ""}{categoryLabels[p.category]}</p><h2 className="mt-3 font-display text-lg"><Link href={`/products/${p.slug}`} className="inline-flex min-h-11 items-center">{p.name}</Link></h2><p className="price mt-3 font-semibold">{displayProductPrice(p)}</p><RemoveComparison remaining={products.filter((item) => item.slug !== p.slug).map((item) => item.slug)}/></article>)}</div>
  {new Set(products.map((p) => p.category)).size > 1 && <p className="mt-6 text-sm text-warning">You’re comparing different categories. Some specifications do not apply.</p>}
  <div className="mt-8 space-y-5">{specs.map((key) => <section key={key} className="studio-panel p-6" aria-label={specLabel(key)}><h2 className="mb-4 text-sm font-semibold text-primary">{specLabel(key)}</h2><dl className="grid gap-4 md:grid-cols-3">{products.map((p) => <div key={p.slug} className="min-w-0"><dt className="text-xs text-muted-foreground">{p.name}</dt><dd className="mt-2 break-words text-sm">{key in p.specs ? specValue(p.specs[key]) : "Not applicable"}</dd></div>)}</dl></section>)}</div></>}
  </main>;
}
