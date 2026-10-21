"use client";
import { ErrorState } from "@/components/error-state";
export default function CatalogError({ reset }: { reset: () => void }) {
  return <main id="main-content" tabIndex={-1} className="page-container py-16"><ErrorState retry={reset}/></main>;
}
