import { PackageOpen } from "lucide-react";

export function EmptyState({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return <div className="rounded-xl border border-border p-8 text-center"><PackageOpen className="mx-auto mb-4 size-8 text-muted-foreground" aria-hidden="true"/><h2 className="font-display text-xl font-semibold">{title}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>{children && <div className="mt-5">{children}</div>}</div>;
}
