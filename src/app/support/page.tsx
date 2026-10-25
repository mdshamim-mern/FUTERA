import Link from "next/link";
import { ArrowUpRight, BookOpen, Bug, GitCompareArrows, LifeBuoy, MessageSquareText, ShieldCheck } from "lucide-react";
import { SupportQuestions } from "@/features/support/support-questions";
export const metadata = { title: "Help & support", description: "Find answers about FUTERA builds, compatibility, comparisons, saved configurations and demo checkout." };
const topics = [
  { icon: ShieldCheck, title: "Build & compatibility", description: "Find the part behind an issue and understand what needs checking.", href: "/pc-builder", action: "Open PC Builder" },
  { icon: GitCompareArrows, title: "Compare your options", description: "Read the specifications of up to three components side by side.", href: "/compare", action: "Open comparison" },
  { icon: BookOpen, title: "Learn the workflow", description: "Practical guides to researching, checking and keeping a configuration.", href: "/guides", action: "Read building guides" },
];
export default function Support() {
  return <main id="main-content" tabIndex={-1} className="page-container workspace-page resource-page">
    <section className="workspace-heading"><div><p className="workspace-label"><LifeBuoy/> FUTERA SUPPORT</p><h1>A clearer path.<br/><span className="text-primary">A better next step.</span></h1><p className="workspace-description">Find an answer, understand a compatibility check or get help with FUTERA. Start with a topic below.</p><div className="workspace-steps"><span><BookOpen/> Practical guides</span><span><ShieldCheck/> Compatibility explained</span><span><MessageSquareText/> Direct contact</span></div></div><div className="workspace-emblem" aria-hidden="true"><LifeBuoy/></div></section>
    <nav aria-label="Support topics" className="resource-topic-grid">{topics.map(topic => <Link key={topic.title} href={topic.href} className="resource-topic"><span className="resource-topic-top"><span className="studio-icon"><topic.icon className="size-5"/></span><ArrowUpRight className="size-4 text-muted-foreground"/></span><h2>{topic.title}</h2><p>{topic.description}</p><span className="resource-action">{topic.action}<ArrowUpRight className="size-4"/></span></Link>)}</nav>
    <SupportQuestions/>
    <div className="support-bottom-grid"><section className="resource-panel support-escalation"><span className="studio-icon"><MessageSquareText className="size-5"/></span><h2>Still need a hand?</h2><p>Contact Md. Shamim about the application, accessibility or feedback. Include the page and a short description so the issue is easier to understand.</p><Link href="/contact" className="resource-button">Contact the owner <ArrowUpRight className="size-4"/></Link></section><section className="resource-panel support-escalation"><span className="studio-icon"><Bug className="size-5"/></span><h2>Something not working?</h2><p>Share reproducible steps in the project issue tracker. Remove passwords, personal addresses, payment information and database credentials before posting.</p><a href="https://github.com/mdshamim-mern/FUTERA/issues" target="_blank" rel="noopener noreferrer" className="resource-button resource-button-secondary">Open issue tracker <ArrowUpRight className="size-4"/></a></section></div>
  </main>;
}
