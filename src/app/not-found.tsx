import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <main id="main-content" tabIndex={-1} className="page-container py-24"><EmptyState title="This page is still beyond the horizon" description="The page you’re looking for doesn’t exist. Return to FUTERA to explore the catalog."><Button asChild><Link href="/">Back to FUTERA</Link></Button></EmptyState></main>;
}
