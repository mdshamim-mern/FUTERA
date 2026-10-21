"use client";
import { ErrorState } from "@/components/error-state";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main id="main-content" tabIndex={-1} className="page-container py-24"><ErrorState retry={reset}/></main>;
}
