import Link from "next/link";
import type { Metadata } from "next";
import { getProducts } from "@/server/catalog";
import { compareSlugs, type SearchParams } from "@/features/products/query";
import { formatPrice, specLabel, specValue } from "@/features/products/format";
import { categoryLabels } from "@/features/products/schema";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { RemoveComparison } from "@/features/products/components/compare-toggle";
export const metadata: Metadata = { title: "Compare components" };
export default async function ComparePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const slugs = compareSlugs((await searchParams).items);
  const products = await getProducts(slugs);
  const specs = [...new Set(products.flatMap((p) => Object.keys(p.specs)))];
  return <main id="main-content" tabIndex={-1} className="page-container py-14"><p className="text-xs tracking-widest text-primary">SIDE BY SIDE</p><h1 className="mt-3 font-display text-4xl font-semibold">Make the details count.</h1><p className="mt-4 text-sm leading-7 text-muted-foreground">Compare up to 3 components. SAMPLE specifications and prices are fictional. Comparison does not establish compatibility.</p><Button asChild variant="outline" className="my-6"><Link href="/products">Choose components</Link></Button>
  {products.length !== slugs.length && <p role="status" className="mb-4 text-warning">Some requested products could not be found.</p>}
  {!products.length ? <EmptyState title="Nothing to compare yet" description="Choose up to three products using Compare on the catalog cards."/> : <><div className="grid gap-4 md:grid-cols-3">{products.map((p) => <article key={p.slug} className="rounded-xl border border-border bg-card p-5"><p className="text-xs text-primary">{p.isSample ? "SAMPLE / " : ""}{categoryLabels[p.category]}</p><h2 className="mt-3 font-display text-lg"><Link href={`/products/${p.slug}`} className="inline-flex min-h-11 items-center">{p.name}</Link></h2><p className="price mt-3 font-semibold">{formatPrice(p.priceMinor)}</p><RemoveComparison remaining={products.filter((item) => item.slug !== p.slug).map((item) => item.slug)}/></article>)}</div>
  {new Set(products.map((p) => p.category)).size > 1 && <p className="mt-6 text-sm text-warning">You’re comparing different categories. Some specifications do not apply.</p>}
  <div className="mt-8 space-y-5">{specs.map((key) => <section key={key} className="rounded-xl border border-border p-5" aria-label={specLabel(key)}><h2 className="mb-4 text-sm font-semibold text-primary">{specLabel(key)}</h2><dl className="grid gap-4 md:grid-cols-3">{products.map((p) => <div key={p.slug} className="min-w-0"><dt className="text-xs text-muted-foreground">{p.name}</dt><dd className="mt-2 break-words text-sm">{key in p.specs ? specValue(p.specs[key]) : "Not applicable"}</dd></div>)}</dl></section>)}</div></>}
  </main>;
}
