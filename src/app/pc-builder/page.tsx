import { Cpu, Layers3, ShieldCheck, Zap } from "lucide-react";
import type { Metadata } from "next";
import { getBuilderCatalog } from "@/server/catalog";
import { resolveBuild } from "@/server/builder";
import { decodeBuild } from "@/features/builder/schema";
import { Builder } from "@/features/builder/components/builder";
export const metadata:Metadata={title:"PC Builder",description:"Design your FUTERA PC with conservative compatibility checks and source-linked component specifications.",robots:{index:false,follow:true}};
export default async function BuilderPage({searchParams}:{searchParams:Promise<{build?:string|string[]}>}) {
  const params=await searchParams;
  const [catalog,initial]=await Promise.all([getBuilderCatalog(),resolveBuild(decodeBuild(params.build))]);
  return <main id="main-content" tabIndex={-1} className="page-container workspace-page builder-page"><section className="workspace-heading"><div><p className="workspace-label"><Cpu/> FUTERA / CONFIGURE YOUR FUTURE</p><h1>Every part.<br/><span className="text-primary">One vision.</span></h1><p className="workspace-description">Bring your next PC together, one component at a time. Explore the catalog, check the fit and keep a clear view of your build.</p><div className="workspace-steps"><span><Layers3/> 7 essential components</span><span><ShieldCheck/> Live compatibility checks</span><span><Zap/> Power estimates</span></div></div><div className="workspace-emblem" aria-hidden="true"><Cpu/></div></section><p className="mt-4 text-xs leading-6 text-muted-foreground">Prices link to research sources. Checkout and inventory are educational demonstrations. Unknown specifications need review; passing checks are not a purchase guarantee.</p><Builder catalog={catalog} initial={initial} shared={params.build!==undefined}/></main>;
}
