import Link from "next/link";
import { contact } from "@/lib/contact";
export const metadata = { title: "Contact FUTERA", description: "Contact the FUTERA project owner in Agargaon, Dhaka." };
export default function Page() {
  return <main id="main-content" className="page-container py-14"><article className="max-w-3xl space-y-7">
    <p className="text-sm text-primary">Talk to the project owner</p><h1 className="font-display text-4xl">Contact FUTERA</h1>
    <p className="leading-8 text-muted-foreground">Have a question about the PC builder, an accessibility issue, or feedback on FUTERA? Contact Md. Shamim through the channels below.</p>
    <address className="grid gap-4 rounded-2xl border border-border p-6 not-italic">
      <a className="inline-flex min-h-11 items-center break-all text-primary" href={`mailto:${contact.email}`}>{contact.email}</a>
      <a className="inline-flex min-h-11 items-center text-primary" href={`tel:${contact.phone}`}>{contact.phoneLabel}</a><p>{contact.location}</p>
      <p className="text-sm leading-6 text-muted-foreground">Project contact location supplied by the owner; this is not a confirmed retail showroom or pickup point. Arrange any meeting directly before visiting.</p>
    </address>
    <nav aria-label="Contact social channels" className="flex flex-wrap gap-x-6 gap-y-2">{contact.socials.map(({label,href})=><a key={label} href={href} className="inline-flex min-h-11 items-center text-primary">{label} ↗</a>)}</nav>
    <p className="leading-8 text-muted-foreground">For reproducible software bugs, use the public issue tracker. Never post passwords, payment details, or personal order information there.</p>
    <div className="flex flex-wrap gap-6"><Link className="inline-flex min-h-11 items-center text-primary" href="/support">Help & support →</Link><a className="inline-flex min-h-11 items-center text-primary" href="https://github.com/mdshamim-mern/FUTERA/issues">Project issue tracker ↗</a></div>
  </article></main>;
}
