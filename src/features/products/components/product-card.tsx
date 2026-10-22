import { displayProductPrice } from "@/features/products/format";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/features/products/schema";
import { categoryLabels } from "@/features/products/schema";
import { specValue } from "@/features/products/format";
import { CompareToggle } from "@/features/products/components/compare-toggle";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="flex min-w-0 flex-col rounded-xl border border-border bg-card" data-testid="product-card">
      <Link href={`/products/${product.slug}`} className="group rounded-t-xl p-4">
        <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-background">
          <Image src={product.images[0].src} alt={product.images[0].alt} fill preload={priority} sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, (max-width: 1279px) 32vw, 17vw" className="object-contain"/>
          <span className="absolute left-3 top-3 rounded bg-background px-2 py-1 text-[10px] font-semibold tracking-widest text-primary">{product.isReference ? "REFERENCE" : product.isSample ? "SAMPLE" : categoryLabels[product.category]}</span>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{product.brand} / {categoryLabels[product.category]}</p>
        <h2 className="mt-2 font-display text-lg leading-6 font-medium group-hover:text-primary">{product.name}</h2>
      </Link>
      <div className="flex flex-1 flex-col px-4 pb-4">
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{product.description}</p><p className="mb-5 text-xs leading-6 text-muted-foreground">{Object.values(product.specs).slice(0, 3).map(specValue).join(" · ")}</p>
        <div className="mt-auto border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">{product.isReference ? "Information only · not for sale" : product.isSample ? "Illustrative sample price" : "Catalog price"}</p>
          <p className="price mt-1 text-xl font-semibold">{displayProductPrice(product)}</p>
          <p className={`mt-1 text-xs ${product.stock > 0 ? "text-success" : "text-muted-foreground"}`}>{product.isReference ? "Retail availability not supplied" : `${product.isSample ? "Sample availability: " : "Availability: "}${product.stock > 0 ? "in stock" : "out of stock"}`}</p>
          <div className="mt-4 flex items-center justify-between gap-2"><CompareToggle slug={product.slug}/><Link href={`/products/${product.slug}`} className="inline-flex min-h-11 items-center gap-1 rounded px-2 text-xs text-primary">View Details <ArrowUpRight aria-hidden="true" className="size-4"/></Link></div>
        </div>
      </div>
    </article>
  );
}
