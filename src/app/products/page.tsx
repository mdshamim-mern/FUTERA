import type {Metadata} from "next";
import Link from "next/link";
import {ArrowRight,ArrowRightLeft,CircuitBoard,Search,SlidersHorizontal,X} from "lucide-react";
import {getBrands,getCategories,listProducts} from "@/server/catalog";
import {catalogHref,parseCatalogQuery,type SearchParams,type CatalogQuery} from "@/features/products/query";
import {categoryLabels} from "@/features/products/schema";
import {ProductCard} from "@/features/products/components/product-card";
import {Filters} from "@/features/products/components/filters";
import {FilterSheet} from "@/features/products/components/filter-sheet";
import {CompareProvider} from "@/features/products/components/compare-toggle";
import {EmptyState} from "@/components/empty-state";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
export const metadata:Metadata={title:"Component catalog",description:"Explore sourced hardware, compare specifications and plan your next PC."};
export const dynamic="force-dynamic";
export default async function ProductsPage({searchParams}:{searchParams:Promise<SearchParams>}){
 const query=parseCatalogQuery(await searchParams);const [categories,brands,result]=await Promise.all([getCategories(),getBrands(),listProducts(query)]);const filters=<Filters query={query} categories={categories} brands={brands}/>;
 const chips:{label:string;name:string;changes:Partial<CatalogQuery>}[]=[];
 if(query.q)chips.push({name:"Search",label:`“${query.q}”`,changes:{q:""}});
 if(query.category)chips.push({name:"Category",label:categoryLabels[query.category],changes:{category:""}});
 if(query.brand)chips.push({name:"Brand",label:query.brand,changes:{brand:""}});
 if(query.min!==undefined||query.max!==undefined)chips.push({name:"Price",label:`৳ ${query.min??0} – ${query.max??"Any"}`,changes:{min:undefined,max:undefined}});
 if(query.stock)chips.push({name:"Availability",label:query.stock==="available"?"In stock":"Out of stock",changes:{stock:""}});
 if(query.socket)chips.push({name:"Socket",label:query.socket,changes:{socket:""}});
 if(query.ramType)chips.push({name:"Memory",label:query.ramType,changes:{ramType:""}});
 return <main id="main-content" tabIndex={-1} className="catalog-page page-container">
  <header className="catalog-intro"><div><p className="eyebrow"><CircuitBoard className="size-4" aria-hidden="true"/>THE BUILD STARTS HERE</p><h1>Find your next component.</h1><p className="catalog-intro-copy">The right build starts with the details. Explore real hardware, compare source-linked specifications, and make room for your next idea.</p></div><Link prefetch={false} href="/pc-builder" className="catalog-builder-link"><span className="studio-icon"><CircuitBoard className="size-5" aria-hidden="true"/></span><span><strong>Make it a complete build</strong><span>Check your parts in PC Builder</span></span><ArrowRight className="size-4 shrink-0" aria-hidden="true"/></Link></header>
  <nav aria-label="Component categories" className="catalog-categories"><Link prefetch={false} href={catalogHref(query,{category:"",page:1})} aria-current={!query.category?"page":undefined}>All components</Link>{categories.map(category=><Link prefetch={false} key={category.slug} href={catalogHref(query,{category:category.slug,page:1})} aria-current={query.category===category.slug?"page":undefined}>{category.name}</Link>)}</nav>
  <div className="catalog-toolbar"><form action="/products" className="catalog-search">{Object.entries(query).filter(([key,value])=>key!=="q"&&key!=="page"&&value!==undefined&&value!=="").map(([key,value])=><input key={key} type="hidden" name={key} value={String(value)}/>)}<Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true"/><label className="sr-only" htmlFor="catalog-search">Search components</label><Input id="catalog-search" name="q" type="search" defaultValue={query.q} maxLength={80} placeholder="Find a model, brand or component"/><Button type="submit" variant="ghost" size="icon" aria-label="Search catalog"><ArrowRight className="size-4" aria-hidden="true"/></Button></form><div className="catalog-toolbar-actions"><FilterSheet>{filters}</FilterSheet><Link prefetch={false} href="/compare" className="catalog-compare-link"><ArrowRightLeft className="size-4" aria-hidden="true"/>Open comparison</Link></div></div>
  <div className="catalog-result-heading"><p role="status">{result.total} components · Page {result.page} of {result.pages}</p><p className="text-xs text-muted-foreground">Source-linked prices · demonstrative stock</p></div>
  {!!chips.length&&<nav className="catalog-filter-chips" aria-label="Applied filters">{chips.map(chip=><Link prefetch={false} key={chip.name} href={catalogHref(query,{...chip.changes,page:1})} aria-label={`Remove ${chip.name} filter`}>{chip.label}<X className="size-3 shrink-0" aria-hidden="true"/></Link>)}<Link prefetch={false} href="/products" className="catalog-clear-all">Clear all</Link></nav>}
  <div className="catalog-layout"><aside className="catalog-filter-panel hidden lg:block" aria-label="Catalog filters"><div className="catalog-filter-heading"><SlidersHorizontal className="size-4 text-primary" aria-hidden="true"/><h2>Refine your search</h2></div>{filters}</aside><div className="min-w-0"><CompareProvider key={JSON.stringify(query)}>{result.products.length?<div className="catalog-product-grid">{result.products.map((product,index)=><ProductCard key={product.slug} product={product} priority={index===0}/>)}</div>:<EmptyState title="No components match these filters" description="Try a wider price range or remove a specification filter."><Button asChild><Link href="/products">Clear all filters</Link></Button></EmptyState>}{result.pages>1&&<nav aria-label="Catalog pagination" className="catalog-pagination">{result.page>1&&<Button variant="outline" asChild><Link href={catalogHref(query,{page:result.page-1})}>Previous</Link></Button>}<span>{result.page} / {result.pages}</span>{result.page<result.pages&&<Button variant="outline" asChild><Link href={catalogHref(query,{page:result.page+1})}>Next</Link></Button>}</nav>}</CompareProvider></div></div>
 </main>;
}
