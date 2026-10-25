import Link from "next/link";
import { Bot, BrainCircuit, CheckCheck, MessageSquareText, Sparkles, ArrowUpRight, Search, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api";
import { AdviceForm } from "@/features/assistant/advice-form";
export const metadata = { title: "AI build assistance" };
export default async function Assistant() {
  const config = await api<{ aiEnabled: boolean }>("/v1/config");
  return <main id="main-content" className="workspace-page page-container assistant-page">
    <section className="workspace-heading"><div><p className="workspace-label"><Sparkles/> FUTERA INTELLIGENCE</p><h1>Good questions.<br/><span className="text-primary">Smarter next steps.</span></h1><p className="workspace-description">A second opinion for your next PC. Explore components from the FUTERA catalog or get clear guidance on the choices that matter.</p><div className="workspace-steps"><span><Search/> Catalog-grounded suggestions</span><span><ShieldCheck/> You stay in control</span><span><Bot/> Google Gemini</span></div></div><div className="workspace-emblem" aria-hidden="true"><BrainCircuit/></div></section>
    <div className="assistant-grid">{(["recommend", "support"] as const).map(mode => <section key={mode} className="assistant-panel"><div className="assistant-panel-header"><span className="studio-icon">{mode === "recommend" ? <BrainCircuit className="size-5"/> : <MessageSquareText className="size-5"/>}</span><div><h2>{mode === "recommend" ? "Component recommendations" : "PC-building help"}</h2><p>{mode === "recommend" ? "Your workload. A more focused shortlist." : "From the first part to the final compatibility check."}</p></div></div><AdviceForm mode={mode} enabled={config.aiEnabled}/></section>)}</div>
    <aside className="workspace-note"><p className="flex max-w-2xl items-start gap-3 text-xs leading-7 text-muted-foreground"><CheckCheck className="mt-1 size-5 shrink-0 text-primary"/>AI helps you explore. PC Builder checks compatibility using deterministic rules; unknown specs still need verification.</p><Link href="/pc-builder" className="inline-flex min-h-11 items-center gap-2 text-sm text-primary">Check your build <ArrowUpRight className="size-4"/></Link></aside>
  </main>;
}
