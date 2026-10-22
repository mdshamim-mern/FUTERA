import Link from "next/link";
import { Brand } from "@/components/brand";
import { contact } from "@/lib/contact";
export function Footer() {
  return <footer className="border-t border-border bg-background"><div className="page-container grid gap-8 py-10 md:grid-cols-3">
    <div><Brand/><p className="mt-3 text-sm text-muted-foreground">Build the future of your desk.</p><p className="mt-4 text-xs text-muted-foreground">Designed for Bangladesh. Built for what’s next.</p></div>
    <nav aria-label="Footer" className="grid grid-cols-2 gap-x-5 text-sm">{[["/products","Components"],["/pc-builder","PC Builder"],["/about","About"],["/guides","Building guides"],["/support","Help & support"],["/privacy","Privacy"],["/contact","Contact"]].map(([href,label])=><Link key={href} href={href} className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground">{label}</Link>)}</nav>
    <div className="min-w-0 text-sm"><p className="font-medium">Contact & follow</p><a href={`mailto:${contact.email}`} className="flex min-h-11 items-center break-all text-primary">{contact.email}</a><a href={`tel:${contact.phone}`} className="flex min-h-11 items-center text-primary">{contact.phoneLabel}</a><p className="text-muted-foreground">{contact.location}</p><nav aria-label="Social links" className="flex flex-wrap gap-x-4">{contact.socials.map(({label,href})=><a key={label} href={href} className="inline-flex min-h-11 items-center text-primary">{label}</a>)}<a href="https://github.com/mdshamim-mern/FUTERA" className="inline-flex min-h-11 items-center text-primary">GitHub</a></nav><p className="text-xs leading-6 text-muted-foreground">Reference catalog; no retail offer or delivery commitment. Any SAMPLE entries are fictional.</p></div>
  </div></footer>;
}

