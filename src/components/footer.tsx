import Link from "next/link";
import { Brand } from "@/components/brand";

export function Footer() {
  return <footer className="border-t border-border bg-background"><div className="page-container flex flex-col justify-between gap-8 py-10 sm:flex-row sm:items-center"><div><Brand/><p className="mt-3 text-sm text-muted-foreground">Build the future of your desk.</p></div><div className="text-sm text-muted-foreground sm:text-right"><Link href="/#foundation" className="inline-flex min-h-11 items-center rounded-sm hover:text-foreground">Foundation preview</Link><p className="mt-1 text-xs">Designed for Bangladesh. Built for what’s next.</p></div></div></footer>;
}
