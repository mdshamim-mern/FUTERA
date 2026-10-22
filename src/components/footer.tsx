import Link from "next/link";
import { Brand } from "@/components/brand";

export function Footer() {
  return <footer className="border-t border-border bg-background"><div className="page-container grid gap-8 py-10 md:grid-cols-3"><div><Brand/><p className="mt-3 text-sm text-muted-foreground">Build the future of your desk.</p><p className="mt-4 text-xs text-muted-foreground">Designed for Bangladesh. Built for what’s next.</p></div><nav aria-label="Footer" className="grid grid-cols-2 gap-x-5 text-sm">{[["/products","Components"],["/pc-builder","PC Builder"],["/about","About"],["/support","Help & support"],["/privacy","Privacy"],["/contact","Contact"]].map(([href,label])=><Link key={href} href={href} className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground">{label}</Link>)}</nav><div><p className="font-medium">Follow the project</p><a href="https://github.com/mdshamim-mern/FUTERA" className="inline-flex min-h-11 items-center text-primary">GitHub ↗</a><p className="text-xs leading-6 text-muted-foreground">Project demonstration. Sample orders do not create a real purchase or delivery commitment.</p></div></div></footer>;
}
