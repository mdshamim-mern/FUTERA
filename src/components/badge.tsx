import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium tracking-wide text-muted-foreground", className)} {...props} />;
}
