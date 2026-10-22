"use client";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
const cases = [
  { id: "gaming", title: "Gaming", headline: "Make room for your next world.", text: "Start by exploring graphics and processor specifications. Match the components to your games, display and budget; performance varies by workload.", category: "gpu", cta: "Explore graphics cards" },
  { id: "creating", title: "Creating", headline: "More space for your ideas.", text: "Compare memory capacity and storage interfaces for your creative workflow. Catalog specifications describe components, not benchmark results.", category: "ram", cta: "Explore memory" },
  { id: "everyday", title: "Everyday", headline: "A thoughtful daily companion.", text: "Begin with a processor and build outward. Check the socket, memory generation and the specifications your day-to-day work needs.", category: "cpu", cta: "Explore processors" },
];
export function UseCaseTabs() {
  return <Tabs defaultValue="gaming"><TabsList className="mb-7 flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">{cases.map((item) => <TabsTrigger key={item.id} value={item.id} className="min-h-11 flex-none rounded-full border border-border px-5 data-[state=active]:bg-secondary">{item.title}</TabsTrigger>)}</TabsList>{cases.map((item) => <TabsContent key={item.id} value={item.id} className="rounded-2xl border border-border bg-card p-6 md:p-10"><div className="max-w-2xl"><h3 className="font-display text-3xl font-medium">{item.headline}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p><Button asChild className="mt-6" variant="outline"><Link href={`/products?category=${item.category}`}>{item.cta}</Link></Button></div></TabsContent>)}</Tabs>;
}
