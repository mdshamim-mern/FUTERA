import Image from "next/image";
import Link from "next/link";
import { articles } from "@/features/editorial/articles";

export const metadata = { title: "The FUTERA journal", description: "Original practical articles on planning, compatibility and using FUTERA." };
export default function Blog() {
  return <main id="main-content" tabIndex={-1} className="page-container py-12 md:py-16">
    <header className="glass grid overflow-hidden rounded-2xl lg:grid-cols-2">
      <div className="p-7 md:p-10"><p className="text-sm tracking-widest text-primary">THE FUTERA JOURNAL</p><h1 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Better questions.<br/>Better builds.</h1><p className="mt-6 max-w-xl leading-8 text-muted-foreground">Practical field notes for choosing components, reading compatibility checks and keeping a useful configuration. Written for the decisions you actually need to make.</p><a href="#articles" className="mt-6 inline-flex min-h-11 items-center text-primary">Explore the articles ↓</a></div>
      <figure className="relative min-h-64 border-t lg:border-l lg:border-t-0"><Image src="/images/editorial/motherboard-mathew-schwartz.jpg" alt="Editorial X-ray photograph of an electronic circuit board by Mathew Schwartz" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" priority/><figcaption className="absolute inset-x-0 bottom-0 bg-black/80 p-3 text-xs text-white">Editorial photograph by <a className="underline" href="https://unsplash.com/photos/gray-and-black-computer-motherboard-dq7kElwnFFg" target="_blank" rel="noopener noreferrer">Mathew Schwartz / Unsplash</a>. Not a catalog model.</figcaption></figure>
    </header>
    <section id="articles" className="pt-12" aria-labelledby="articles-heading"><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><h2 id="articles-heading" className="font-display text-3xl">The field notes</h2><p className="text-sm text-muted-foreground">{articles.length} original guides · FUTERA editorial</p></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{articles.map((article,index)=><article key={article.slug} className="flex h-full flex-col rounded-2xl border bg-card p-6"><div className="flex justify-between text-xs uppercase tracking-widest text-primary"><span>{article.category}</span><span aria-hidden="true">{String(index+1).padStart(2,"0")}</span></div><h3 className="mt-6 font-display text-2xl leading-snug"><Link href={`/blog/${article.slug}`} className="hover:text-primary">{article.title}</Link></h3><p className="my-5 leading-7 text-muted-foreground">{article.summary}</p><Link href={`/blog/${article.slug}`} className="mt-auto inline-flex min-h-11 items-center text-sm text-primary">Read article <span className="sr-only">: {article.title}</span><span aria-hidden="true"> →</span></Link></article>)}</div></section>
  </main>;
}

