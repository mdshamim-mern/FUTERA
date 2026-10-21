"use client";
import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CompareContext = createContext<{ slugs: string[]; toggle: (slug: string) => void } | null>(null);
const storageKey = "futera-compare";
let memory = "[]";
function snapshot() { try { return localStorage.getItem(storageKey) ?? memory; } catch { return memory; } }
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback); window.addEventListener("futera-compare", callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener("futera-compare", callback); };
}
function decode(value: string): string[] {
  try { const parsed: unknown = JSON.parse(value); return Array.isArray(parsed) ? [...new Set(parsed.filter((s): s is string => typeof s === "string" && /^[a-z0-9-]{1,100}$/.test(s)))].slice(0, 3) : []; } catch { return []; }
}
function save(slugs: string[]) {
  memory = JSON.stringify(slugs);
  try { localStorage.setItem(storageKey, memory); } catch { /* Memory-only fallback when storage is unavailable. */ }
  window.dispatchEvent(new Event("futera-compare"));
}
export function CompareProvider({ children }: { children: ReactNode }) {
  const slugs = decode(useSyncExternalStore(subscribe, snapshot, () => "[]"));
  const toggle = (slug: string) => save(slugs.includes(slug) ? slugs.filter((item) => item !== slug) : slugs.length < 3 ? [...slugs, slug] : slugs);
  return <CompareContext value={{ slugs, toggle }}>{children}<div className="sticky bottom-0 z-30 mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background p-4"><p role="status" className="text-sm text-muted-foreground">Compare {slugs.length}/3 selected{slugs.length === 3 ? " — remove one to change your selection" : ""}</p><div className="flex gap-2"><Button variant="ghost" disabled={!slugs.length} onClick={() => save([])}>Clear</Button><Button asChild={slugs.length > 0} disabled={!slugs.length}>{slugs.length ? <Link href={`/compare?items=${slugs.join(",")}`}>Compare products</Link> : "Compare products"}</Button></div></div></CompareContext>;
}
export function CompareToggle({ slug }: { slug: string }) {
  const context = useContext(CompareContext);
  if (!context) return <Link href={`/compare?items=${slug}`} className="inline-flex min-h-11 items-center text-xs text-muted-foreground">Compare</Link>;
  const selected = context.slugs.includes(slug);
  return <Button variant={selected ? "secondary" : "ghost"} size="sm" className="text-xs" aria-pressed={selected} disabled={!selected && context.slugs.length === 3} onClick={() => context.toggle(slug)}>{selected ? "Remove comparison" : "Compare"}</Button>;
}
export function RemoveComparison({ remaining }: { remaining: string[] }) {
  return <Link href={`/compare?items=${remaining.join(",")}`} onClick={() => save(remaining)} className="mt-3 inline-flex min-h-11 items-center rounded text-sm text-muted-foreground">Remove from comparison</Link>;
}
