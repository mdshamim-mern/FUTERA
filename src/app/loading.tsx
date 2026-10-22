import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <main id="main-content" tabIndex={-1} className="page-container min-h-screen py-24" aria-busy="true" aria-label="Loading FUTERA"><span role="status" className="sr-only">Loading FUTERA</span><Skeleton className="mb-8 h-6 w-40"/><Skeleton className="mb-4 h-16 w-full max-w-xl"/><Skeleton className="mb-10 h-16 w-3/4 max-w-md"/><Skeleton className="h-12 w-40"/></main>;
}
