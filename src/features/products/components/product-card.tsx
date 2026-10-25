import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight,ExternalLink} from "lucide-react";
import type {Product} from "@/features/products/schema";
import {categoryLabels} from "@/features/products/schema";
import {displayProductPrice,specValue,specLabel} from "@/features/products/format";
import {CompareToggle} from "./compare-toggle";

export function ProductCard({product,priority=false}:{product:Product;priority?:boolean}){
 const specs=Object.entries(product.specs).filter(([,value])=>value!==null&&value!==undefined&&(!Array.isArray(value)||value.length)).slice(0,2);
 const availability=product.isReference?"Specification reference":`${product.isDemo?"Demo stock":product.isSample?"Sample stock":"Availability"}: ${product.stock>0?"in stock":"out of stock"}`;
 return <article className="catalog-card" data-testid="product-card">
  <Link prefetch={false} href={`/products/${product.slug}`} className="catalog-card-main group">
   <div className="catalog-card-media"><Image src={product.images[0].src} alt={product.images[0].alt} fill preload={priority} sizes="(max-width:639px) 90vw,(max-width:1023px) 45vw,(max-width:1279px) 32vw,18vw" className="object-contain"/><span className="catalog-category-badge">{categoryLabels[product.category]}</span></div>
   <p className="catalog-card-brand">{product.brand}</p><h2 title={product.name} className="catalog-card-title group-hover:text-primary">{product.name}</h2>
  </Link>
  <div className="catalog-card-body"><p className="catalog-card-description">{product.description}</p><div className="catalog-card-specs">{specs.map(([key,value])=><span key={key} title={`${specLabel(key)}: ${specValue(value)}`}>{specLabel(key)}: {specValue(value)}</span>)}</div>
   <div className="catalog-card-price"><p className="text-[10px] font-medium tracking-wide text-muted-foreground">{product.isReference?(product.marketPrice?"Observed market price":"Manufacturer specifications"):product.isDemo?(product.marketPrice?.kind==="illustrative"?"Illustrative demo price":"Sourced price reference"):product.isSample?"Illustrative sample price":"Catalog price"}</p><p className="price mt-1 font-display text-2xl font-semibold tracking-tight">{displayProductPrice(product)}</p>{product.marketPrice&&<a href={product.marketPrice.sourceUrl} target="_blank" rel="noopener noreferrer" className="catalog-price-source">{product.marketPrice.kind==="illustrative"?"Product source":"Price reference"} · {product.marketPrice.checkedAt}<ExternalLink className="size-3 shrink-0" aria-hidden="true"/></a>}<p className={`catalog-stock ${product.stock>0&&!product.isReference?"text-success":"text-muted-foreground"}`}><span aria-hidden="true"/>{availability}</p></div>
   <div className="catalog-card-actions"><CompareToggle slug={product.slug}/><Link prefetch={false} href={`/products/${product.slug}`} className="catalog-details">View Details <ArrowUpRight className="size-3.5" aria-hidden="true"/></Link></div>
  </div>
 </article>;
}
