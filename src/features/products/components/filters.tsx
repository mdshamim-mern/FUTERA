import Link from "next/link";
import type { Category } from "@/features/products/schema";
import type { CatalogQuery } from "@/features/products/query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const control = "min-h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm";
export function Filters({ query, categories, brands }: { query: CatalogQuery; categories: Category[]; brands: string[] }) {
  return <form action="/products" className="space-y-5" key={JSON.stringify(query)}>
    <label className="block text-sm">Search<Input className="mt-2" type="search" name="q" defaultValue={query.q} maxLength={80} placeholder="Find your next component"/></label>
    <label className="block text-sm">Category<select className={`${control} mt-2`} name="category" defaultValue={query.category}><option value="">All components</option>{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
    <label className="block text-sm">Brand<select className={`${control} mt-2`} name="brand" defaultValue={query.brand}><option value="">All brands</option>{brands.map((brand) => <option key={brand}>{brand}</option>)}</select></label>
    <fieldset><legend className="text-sm">Price range (৳ BDT)</legend><div className="mt-2 grid grid-cols-2 gap-2"><Input aria-label="Minimum price" name="min" type="number" min={0} max={1000000} step="0.01" placeholder="Min" defaultValue={query.min}/><Input aria-label="Maximum price" name="max" type="number" min={0} max={1000000} step="0.01" placeholder="Max" defaultValue={query.max}/></div></fieldset>
    <label className="block text-sm">Availability<select className={`${control} mt-2`} name="stock" defaultValue={query.stock}><option value="">Any availability</option><option value="available">In stock</option><option value="unavailable">Out of stock</option></select></label>
    <label className="block text-sm">CPU / board socket<select className={`${control} mt-2`} name="socket" defaultValue={query.socket}><option value="">Any socket</option>{["AM5", "AM4", "LGA1700"].map((s) => <option key={s}>{s}</option>)}</select></label>
    <label className="block text-sm">Memory generation<select className={`${control} mt-2`} name="ramType" defaultValue={query.ramType}><option value="">Any memory</option><option>DDR4</option><option>DDR5</option></select></label>
    <label className="block text-sm">Sort by<select className={`${control} mt-2`} name="sort" defaultValue={query.sort}><option value="featured">Featured first</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A to Z</option></select></label>
    <Button type="submit" className="w-full">Apply filters</Button><Link href="/products" className="flex min-h-11 items-center justify-center rounded text-sm text-muted-foreground">Reset filters</Link>
    <p className="text-xs leading-5 text-muted-foreground">Spec filters only include products with a matching specification. Demo prices and stock are educational. Price notes distinguish sourced references from illustrative estimates.</p>
  </form>;
}
