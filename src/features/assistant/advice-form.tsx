"use client";
import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CornerDownLeft, LoaderCircle, Sparkles } from "lucide-react";
import { askAssistant } from "./actions";
import { Button } from "@/components/ui/button";
import { categoryCodes, categoryLabels } from "@/features/products/schema";

const examples = {
  recommend: [
    { label: "Gaming & streaming", question: "I play competitive games and stream at 1080p. Which components should I compare and why?" },
    { label: "Creative work", question: "I edit 4K video and work with large photo projects. What specifications should I prioritize?" },
    { label: "Everyday productivity", question: "I need a quiet PC for office work, browsing and video calls. Which specifications matter most?" },
  ],
  support: [
    { label: "DDR4 or DDR5?", question: "How do I check whether RAM is compatible with my CPU and motherboard? Explain DDR4 versus DDR5." },
    { label: "Choose a PSU", question: "How should I choose PSU wattage and check the power connectors for a new PC build?" },
    { label: "Check case clearance", question: "What dimensions should I check before choosing a case, graphics card and CPU cooler?" },
  ],
};
export function AdviceForm({ mode, enabled }: { mode: "recommend" | "support"; enabled: boolean }) {
  const [question, setQuestion] = useState("");
  const [state, action, pending] = useActionState(askAssistant, { answer: "", error: "", products: [] });
  return <form action={action} className="assistant-form space-y-5" aria-busy={pending}>
    <input type="hidden" name="mode" value={mode}/>
    <div><p className="mb-2 text-xs text-muted-foreground">Start with a question</p><div className="assistant-prompts">{examples[mode].map(example => <button type="button" key={example.label} disabled={!enabled || pending} onClick={() => setQuestion(example.question)}><CornerDownLeft/>{example.label}</button>)}</div></div>
    {mode === "recommend" && <label className="block">Component category<select name="category" disabled={!enabled || pending} className="builder-control mt-2 block w-full">{categoryCodes.map(code => <option key={code} value={code}>{categoryLabels[code]}</option>)}</select></label>}
    <label className="block">{mode === "recommend" ? "Describe your workload" : "Your PC-building question"}<textarea className="builder-control mt-2 block min-h-36 w-full" name="question" value={question} onChange={event => setQuestion(event.target.value)} required minLength={5} maxLength={1200} disabled={!enabled || pending} aria-describedby={`privacy-${mode}`} placeholder={mode === "recommend" ? "Your apps, games, resolution and budget target…" : "What would you like to understand about your build?"}/></label>
    <p id={`privacy-${mode}`} className="text-xs leading-6 text-muted-foreground">Your question is sent to Google Gemini. Do not include passwords, addresses or other private information. Recommendations use catalog specifications, not your account history.</p>
    <Button className="assistant-submit" disabled={!enabled || pending}>{pending ? <LoaderCircle className="animate-spin motion-reduce:animate-none"/> : <Sparkles/>}{pending ? "Asking AI…" : mode === "recommend" ? "Recommend components" : "Ask for guidance"}{!pending && <ArrowUpRight/>}</Button>
    {pending && <p role="status" className="text-xs text-muted-foreground">Reviewing your question. This may take a moment.</p>}
    {!enabled && <p role="status" className="text-sm text-muted-foreground">AI is unavailable until the owner configures the provider and account service. You can still use catalog filters and the deterministic PC Builder.</p>}
    {state.error && <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm leading-7 text-danger">{state.error}</p>}
    {state.answer && <div role="status" className="assistant-answer space-y-4"><p className="assistant-answer-title"><Sparkles className="size-4"/> Your second opinion</p><p className="whitespace-pre-wrap text-sm leading-7">{state.answer}</p>{state.products.map(p => <Link className="flex min-h-11 items-center text-sm text-primary" href={`/products/${p.slug}`} key={p.slug}>{p.isSample ? "SAMPLE · " : ""}{p.name} →</Link>)}<p className="text-xs leading-6 text-warning">AI can be wrong. Verify specifications and run PC Builder checks before making a decision. No price, stock or compatibility guarantee.</p></div>}
  </form>;
}
