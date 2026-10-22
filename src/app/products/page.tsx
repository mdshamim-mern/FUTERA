import type { Metadata } from "next";
import Link from "next/link";
import { getBrands, getCategories, listProducts } from "@/server/catalog";
import { catalogHref, parseCatalogQuery, type SearchParams } from "@/features/products/query";
import { ProductCard } from "@/features/products/components/product-card";
import { Filters } from "@/features/products/components/filters";
import { FilterSheet } from "@/features/products/components/filter-sheet";
import { CompareProvider } from "@/features/products/components/compare-toggle";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = { title: "Component catalog", description: "Research hardware with linked manufacturer sources. Reference entries are not retail offers." };
export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const query = parseCatalogQuery(await searchParams);
  const [categories, brands, result] = await Promise.all([getCategories(), getBrands(), listProducts(query)]);
  const filters = <Filters query={query} categories={categories} brands={brands}/>;
  return <main id="main-content" tabIndex={-1} className="page-container py-10 md:py-14">
    <p className="text-xs tracking-[.2em] text-primary">THE BUILD STARTS HERE</p><h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">Find your next component.</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">Explore, narrow down, compare. Reference entries link to manufacturer sources and have no retail price or availability. Any entries marked SAMPLE are fictional demonstrations.</p>
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4"><p role="status" className="text-sm text-muted-foreground">{result.total} components · Page {result.page} of {result.pages}</p><FilterSheet>{filters}</FilterSheet><Link href="/compare" className="inline-flex min-h-11 items-center rounded text-sm text-primary">Open comparison</Link></div>
    <div className="mt-8 grid items-start gap-8 lg:grid-cols-[230px_minmax(0,1fr)]"><aside className="hidden lg:block" aria-label="Catalog filters">{filters}</aside><div className="min-w-0"><CompareProvider key={JSON.stringify(query)}>
      {result.products.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{result.products.map((product, index) => <ProductCard key={product.slug} product={product} priority={index === 0}/>)}</div> : <EmptyState title="No components match these filters" description="Try a wider price range or remove a specification filter."><Button asChild><Link href="/products">Clear all filters</Link></Button></EmptyState>}
      {result.pages > 1 && <nav aria-label="Catalog pagination" className="mt-8 flex flex-wrap items-center justify-center gap-3">{result.page > 1 && <Button variant="outline" asChild><Link href={catalogHref(query, { page: result.page - 1 })}>Previous</Link></Button>}<span className="text-sm text-muted-foreground">{result.page} / {result.pages}</span>{result.page < result.pages && <Button variant="outline" asChild><Link href={catalogHref(query, { page: result.page + 1 })}>Next</Link></Button>}</nav>}
    </CompareProvider></div></div>
  </main>;
}
