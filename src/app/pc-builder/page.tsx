import type { Metadata } from "next";
import { getBuilderCatalog } from "@/server/catalog";
import { resolveBuild } from "@/server/builder";
import { decodeBuild } from "@/features/builder/schema";
import { Builder } from "@/features/builder/components/builder";
export const metadata:Metadata={title:"PC Builder",description:"Design your FUTERA PC with conservative compatibility checks and clearly labelled sample components.",robots:{index:false,follow:true}};
export default async function BuilderPage({searchParams}:{searchParams:Promise<{build?:string|string[]}>}) {
  const params=await searchParams;
  const [catalog,initial]=await Promise.all([getBuilderCatalog(),resolveBuild(decodeBuild(params.build))]);
  return <main id="main-content" tabIndex={-1} className="page-container py-12"><p className="text-xs uppercase tracking-[.25em] text-primary">FUTERA / Configure your future</p><h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Every part. One vision.</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">Build your PC with transparent compatibility checks. SAMPLE specifications, prices and stock are fictional. Unknown specs need review; a passing check is not a purchase guarantee.</p><Builder catalog={catalog} initial={initial} shared={params.build!==undefined}/></main>;
}
