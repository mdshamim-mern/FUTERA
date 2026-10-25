"use client";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
export function FilterSheet({ children }: { children: React.ReactNode }) {
  return <Sheet><SheetTrigger asChild><Button variant="outline" className="lg:hidden"><SlidersHorizontal aria-hidden="true"/>Filters & sort</Button></SheetTrigger><SheetContent aria-label="Filter components" aria-labelledby={undefined} className="glass w-[min(90vw,360px)]"><SheetHeader><SheetTitle>Filter components</SheetTitle><SheetDescription>Refine your catalog. Filters are saved in the URL.</SheetDescription></SheetHeader><div className="px-5 pb-8">{children}</div></SheetContent></Sheet>;
}
