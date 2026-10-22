import {Reviews} from "@/features/products/components/reviews";
import {listProducts} from "@/server/catalog";
import {parseCatalogQuery} from "@/features/products/query";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/server/catalog";
import { categoryLabels } from "@/features/products/schema";
import { formatPrice, specLabel, specValue } from "@/features/products/format";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { SelectionButton } from "@/features/products/components/selection-button";
import { updateSelection } from "@/features/products/actions";
import { Badge } from "@/components/badge";
import type { SearchParams } from "@/features/products/query";
import {env} from "@/lib/env";
import {Button} from "@/components/ui/button";
import {addProduct,toggleWishlist} from "@/features/cart/actions";
type Props = { params: Promise<{ slug: string }>; searchParams: Promise<SearchParams> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  return { title: product?.name ?? "Product not found", description: product?.description };
}
export default async function ProductPage({ params, searchParams }: Props) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();
  const search=await searchParams;const unavailable=search.notice==="unavailable";const reviewPage=Math.max(1,Math.min(10000,Number.parseInt(String(search.reviews))||1));const related=(await listProducts(parseCatalogQuery({category:product.category}))).products.filter(p=>p.slug!==product.slug).slice(0,4);
  return <main id="main-content" tabIndex={-1} className="page-container py-10">
    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><Link href="/products" className="inline-flex min-h-11 items-center rounded">Components</Link><span aria-hidden="true">/</span><Link href={`/products?category=${product.category}`} className="inline-flex min-h-11 items-center rounded">{categoryLabels[product.category]}</Link></nav>
    <div className="grid items-start gap-10 md:grid-cols-2"><ProductGallery images={product.images} name={product.name}/><div className="min-w-0"><Badge>{product.isSample ? "SAMPLE · FICTIONAL PRODUCT" : product.brand}</Badge><h1 className="mt-5 font-display text-3xl leading-tight font-semibold md:text-4xl">{product.name}</h1><p className="mt-3 text-sm text-muted-foreground">{product.brand} · SKU {product.sku}</p><p className="mt-6 text-sm leading-7 text-muted-foreground">{product.description}</p><div className="my-7 border-y border-border py-6"><p className="text-xs text-muted-foreground">{product.isSample ? "Illustrative sample price — not an offer" : "Catalog price — revalidated before purchase"}</p><p className="price mt-2 text-3xl font-semibold">{formatPrice(product.priceMinor)}</p><p className="mt-2 text-sm text-muted-foreground">{product.isSample ? "Sample availability" : "Catalog availability"}: {product.stock > 0 ? `${product.stock} in stock` : "out of stock"}</p></div>
    {unavailable && <p role="alert" className="mb-4 text-sm text-warning">This item is no longer available for the cart preview.</p>}
    <div className="grid gap-3 sm:grid-cols-2">{(["cart", "build"] as const).map((mode) => <form action={updateSelection} key={mode}><input type="hidden" name="slug" value={product.slug}/><input type="hidden" name="mode" value={mode}/><input type="hidden" name="operation" value="add"/><SelectionButton secondary={mode === "build"} disabled={mode === "cart" && product.stock === 0}>{mode === "cart" ? "Add to cart preview" : "Add to build shortlist"}</SelectionButton></form>)}</div><Link href={`/compare?items=${product.slug}`} className="mt-3 inline-flex min-h-11 items-center rounded text-sm text-primary">Compare this component →</Link><p className="mt-3 text-xs leading-6 text-muted-foreground">Preview selections are saved for 7 days and remain separate from your commerce cart. Checkout revalidates prices and stock; SAMPLE data is fictional.</p></div></div>
    {env.COMMERCE_ENABLED==="true"&&<div className="mt-8 flex flex-wrap gap-3"><form action={addProduct}><input type="hidden" name="id" value={product.slug}/><Button disabled={!product.stock}>Add to cart</Button></form><form action={toggleWishlist}><input type="hidden" name="id" value={product.slug}/><Button variant="outline">Toggle wishlist (login required)</Button></form></div>}
    <section className="mt-14" aria-labelledby="specs-heading"><h2 id="specs-heading" className="font-display text-2xl font-medium">The details that matter.</h2><p className="mt-3 text-sm text-muted-foreground">{product.isSample ? "Illustrative specifications for this fictional sample. " : ""}Unknown values are never treated as compatible.</p><div className="mt-6 rounded-xl border border-border"><table className="w-full table-fixed text-left text-sm"><caption className="sr-only">Specifications for {product.name}</caption><tbody>{Object.entries(product.specs).map(([key, value]) => <tr key={key} className="border-b border-border last:border-0"><th scope="row" className="w-2/5 break-words p-4 font-medium text-muted-foreground">{specLabel(key)}</th><td className="break-words p-4 leading-6">{specValue(value)}</td></tr>)}</tbody></table></div></section>
    <Reviews slug={product.slug} page={reviewPage}/><section className="mt-14"><h2 className="font-display text-2xl">Related components</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{related.map(p=><Link key={p.slug} href={`/products/${p.slug}`} className="rounded-xl border bg-card p-5"><p className="text-xs text-muted-foreground">{p.brand}</p><h3 className="my-3 font-medium">{p.name}</h3><p className="text-sm text-primary">View Details →</p></Link>)}</div></section>
  </main>;
}
