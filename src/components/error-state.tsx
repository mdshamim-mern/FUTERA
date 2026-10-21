"use client";

import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorState({ retry }: { retry: () => void }) {
  return <div role="alert" className="rounded-xl border border-border p-8 text-center"><TriangleAlert aria-hidden="true" className="mx-auto mb-4 size-8 text-warning"/><h2 className="font-display text-xl font-semibold">Something went wrong</h2><p className="mt-2 text-muted-foreground">We couldn’t load this view. Please try again.</p><Button className="mt-5" onClick={retry}>Try again</Button></div>;
}
