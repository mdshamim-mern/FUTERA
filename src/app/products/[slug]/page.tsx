import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, GitCompareArrows, Layers3 } from "lucide-react";
import { ActionForm } from "@/components/action-form";
import { Badge } from "@/components/badge";
import { Button } from "@/components/ui/button";
import { addProduct, toggleWishlist } from "@/features/cart/actions";
import { updateSelection } from "@/features/products/actions";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { Reviews } from "@/features/products/components/reviews";
import { SelectionButton } from "@/features/products/components/selection-button";
import { displayProductPrice, specLabel, specValue } from "@/features/products/format";
import { parseCatalogQuery, type SearchParams } from "@/features/products/query";
import { categoryLabels } from "@/features/products/schema";
import { env } from "@/lib/env";
import { getProduct, listProducts } from "@/server/catalog";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<SearchParams> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  return { title: product?.name ?? "Product not found", description: product?.description };
}
export default async function ProductPage({ params, searchParams }: Props) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();
  const search = await searchParams;
  const unavailable = search.notice === "unavailable";
  const reviewPage = Math.max(1, Math.min(10000, Number.parseInt(String(search.reviews)) || 1));
  const related = (await listProducts(parseCatalogQuery({ category: product.category }))).products.filter(p => p.slug !== product.slug).slice(0, 4);
  const highlights = Object.entries(product.specs).filter(([, value]) => value !== null && value !== undefined && (!Array.isArray(value) || value.length > 0)).slice(0, 4);
  return <main id="main-content" tabIndex={-1} className="page-container workspace-page detail-page">
    <nav aria-label="Breadcrumb" className="detail-breadcrumb">
      <Link href="/products"><ArrowLeft className="size-3.5"/> Components</Link><span aria-hidden="true">/</span>
      <Link href={`/products?category=${product.category}`}>{categoryLabels[product.category]}</Link>
    </nav>
    <div className="detail-layout">
      <ProductGallery images={product.images} name={product.name}/>
      <div className="detail-summary">
        <Badge>{product.isSample ? "SAMPLE · FICTIONAL PRODUCT" : `${product.brand} / ${categoryLabels[product.category]}`}</Badge>
        <h1 className="font-display">{product.name}</h1>
        <p className="detail-sku">SKU {product.sku}</p>
        <div className="detail-spec-highlights">{highlights.map(([key, value]) => <span key={key}><small>{specLabel(key)}</small>{specValue(value)}</span>)}</div>
        <div className="detail-price-box">
          <p className="detail-price-label">{product.isReference ? (product.marketPrice ? "Observed market price · retailer offer may change" : "Manufacturer specifications") : product.isSample ? "Illustrative sample price — not an offer" : product.isDemo ? "Sourced price reference · demo checkout" : "Catalog price — revalidated before purchase"}</p>
          <p className="price mt-2 font-semibold">{displayProductPrice(product)}</p>
          {product.marketPrice && <div className="mt-3 text-xs leading-6 text-muted-foreground"><p>{product.marketPrice.note}</p><a href={product.marketPrice.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-primary">View price source · {product.marketPrice.checkedAt} <ArrowUpRight className="size-3.5"/></a></div>}
          <p className={`detail-stock ${product.stock > 0 ? "text-success" : "text-muted-foreground"}`}>{product.isReference ? "Available for specification comparison" : `${product.isDemo ? "Demo stock" : product.isSample ? "Sample availability" : "Catalog availability"}: ${product.stock > 0 ? `${product.stock} in stock` : "out of stock"}`}</p>
        </div>
        {unavailable && <p role="alert" className="mt-4 text-sm text-warning">This item is no longer available for the cart preview.</p>}
        <div className="detail-purchase-actions">
          {env.COMMERCE_ENABLED === "true" && <form action={addProduct}><input type="hidden" name="id" value={product.slug}/><SelectionButton disabled={!product.stock}>Add to cart</SelectionButton></form>}
          <form action={updateSelection}><input type="hidden" name="slug" value={product.slug}/><input type="hidden" name="mode" value="build"/><input type="hidden" name="operation" value="add"/><SelectionButton secondary>Add to build shortlist</SelectionButton></form>
        </div>
        <div className="detail-secondary-actions">
          <Link href={`/compare?items=${product.slug}`}><GitCompareArrows className="size-4"/> Compare this component</Link>
          {env.COMMERCE_ENABLED === "true" && <ActionForm action={toggleWishlist} success="Wishlist updated." error="Log in to update your wishlist, then try again."><input type="hidden" name="id" value={product.slug}/><Button variant="ghost">Save / remove wishlist</Button></ActionForm>}
        </div>
        <p className="mt-4 border-t pt-4 text-xs leading-6 text-muted-foreground">Preview selections are saved for 7 days and remain separate from your commerce cart. Demo checkout revalidates prices and stock. No payment is collected or physical delivery promised.</p>
      </div>
    </div>
    <nav aria-label="Product sections" className="detail-tabs"><a href="#overview">Overview</a><a href="#specifications">Specifications</a><a href="#reviews">Reviews</a><a href="#related">Related components</a></nav>
    <section id="overview" className="detail-section" aria-labelledby="overview-heading"><p className="workspace-label"><Layers3/> THE COMPONENT, EXPLAINED</p><h2 id="overview-heading" className="mt-3">Overview</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">{product.description}</p></section>
    <section id="specifications" className="detail-section" aria-labelledby="specs-heading"><h2 id="specs-heading">Specifications</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{product.isSample ? "Illustrative specifications for this fictional sample. " : ""}Unknown values are never treated as compatible.</p><div className="mt-6 overflow-hidden rounded-2xl border border-border"><table className="w-full table-fixed text-left text-sm"><caption className="sr-only">Specifications for {product.name}</caption><tbody>{Object.entries(product.specs).map(([key, value]) => <tr key={key} className="border-b border-border last:border-0"><th scope="row" className="w-2/5 break-words font-medium text-muted-foreground">{specLabel(key)}</th><td className="break-words leading-6">{specValue(value)}</td></tr>)}</tbody></table></div></section>
    {product.sourceUrl && <section className="detail-section"><h2>Specification source</h2><a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-sm text-primary">View specification source <ArrowUpRight className="size-4"/></a><p className="max-w-4xl text-xs leading-7 text-muted-foreground">Reviewed {product.reviewedAt}. Unknown fields require confirmation. Photo credits are shown in the gallery. Demo stock is illustrative. Pricing notes distinguish observed references from estimates; no retailer affiliation or physical fulfillment is implied.</p></section>}
    <Reviews slug={product.slug} page={reviewPage}/>
    <section id="related" className="detail-section"><div className="flex flex-wrap items-center justify-between gap-3"><h2>Related components</h2><Link href={`/products?category=${product.category}`} className="inline-flex min-h-11 items-center gap-1 text-xs text-primary">Explore category <ArrowUpRight className="size-4"/></Link></div><div className="detail-related-grid">{related.map(p => <Link key={p.slug} href={`/products/${p.slug}`} className="detail-related-card"><div className="detail-related-image"><Image src={p.images[0].src} alt={p.images[0].alt} fill sizes="(max-width: 639px) 80vw, (max-width: 1023px) 40vw, 22vw"/></div><p className="mt-4 text-xs text-muted-foreground">{p.brand}</p><h3>{p.name}</h3><p className="price mt-auto font-semibold">{displayProductPrice(p)}</p><span className="mt-4 inline-flex min-h-11 items-center gap-1 text-xs text-primary">View Details <ArrowUpRight className="size-3.5"/></span></Link>)}</div>{!related.length && <p className="mt-5 text-sm text-muted-foreground">No other components in this category yet.</p>}</section>
  </main>;
}
