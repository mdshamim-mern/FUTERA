import { Skeleton } from "@/components/ui/skeleton";
export function CatalogSkeleton() {
  return <main id="main-content" tabIndex={-1} className="page-container py-12" aria-busy="true"><p role="status" className="sr-only">Loading catalog</p><Skeleton className="mb-10 h-12 w-2/3"/><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({length: 6}, (_, i) => <div key={i} className="rounded-xl border border-border p-4"><Skeleton className="aspect-[3/2] w-full"/><Skeleton className="mt-5 h-6 w-3/4"/><Skeleton className="mt-4 h-5 w-1/2"/></div>)}</div></main>;
}
