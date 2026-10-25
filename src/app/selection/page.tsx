import { displayProductPrice } from "@/features/products/format";
import Link from "next/link";
import type { Metadata } from "next";
import { getProducts } from "@/server/catalog";
import { modeSchema, readSelection } from "@/server/selections";
import { updateSelection } from "@/features/products/actions";
import { formatPrice } from "@/features/products/format";
import type { SearchParams } from "@/features/products/query";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = { title: "Your preview selections", robots: { index: false, follow: false } };
export default async function SelectionPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const mode = modeSchema.safeParse(params.mode).data ?? "cart";
  const references = await readSelection(mode);
  const products = await getProducts(references);
  return <main id="main-content" tabIndex={-1} className="page-container py-14"><h1 className="font-display text-4xl font-semibold">{mode === "cart" ? "Your cart preview" : "Your build shortlist"}</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">A saved selection, not an order or a compatibility-checked build. All prices and availability are refreshed from the server. No checkout or reservation is performed.</p><nav className="my-6 flex flex-wrap gap-3" aria-label="Selection type"><Button asChild variant="outline"><Link href="/selection?mode=cart">Cart preview</Link></Button><Button asChild variant="outline"><Link href="/selection?mode=build">Build shortlist</Link></Button></nav>
  {params.notice === "full" && <p role="alert" className="mb-5 text-warning">You can save up to 12 components. Remove one before adding another.</p>}
  {products.length < references.length && <p role="status" className="mb-5 text-warning">Some saved components are no longer in the catalog and were omitted.</p>}
  {products.length ? <div className="space-y-4">{products.map((product) => <article key={product.slug} className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center"><div><Link href={`/products/${product.slug}`} className="inline-flex min-h-11 items-center font-medium text-primary">{product.name}</Link><p className="text-sm text-muted-foreground">{product.isSample ? "Sample price: " : "Catalog price: "}{displayProductPrice(product)} · {product.isReference ? "Availability not supplied" : product.stock ? "Available in catalog" : "Currently unavailable"}</p></div><form action={updateSelection}><input type="hidden" name="mode" value={mode}/><input type="hidden" name="slug" value={product.slug}/><input type="hidden" name="operation" value="remove"/><Button type="submit" variant="outline" aria-label={`Remove ${product.name}`}>Remove</Button></form></article>)}<p className="price border-t border-border py-5 font-medium">Illustrative selection subtotal: {products.some(p=>p.isReference)?"Not priced":formatPrice(products.reduce((total, p) => total + p.priceMinor, 0))}</p><p className="text-xs text-muted-foreground">Shipping, taxes and discounts are not calculated. This is not a payable amount.</p></div> : <EmptyState title="Your selection is empty" description="Browse components and save a product from its detail page."><Button asChild><Link href="/products">Browse components</Link></Button></EmptyState>}
  </main>;
}
