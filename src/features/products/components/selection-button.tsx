"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
export function SelectionButton({ children, disabled = false, secondary = false }: { children: React.ReactNode; disabled?: boolean; secondary?: boolean }) {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={disabled || pending} variant={secondary ? "outline" : "default"} className="w-full">{pending ? "Saving selection…" : children}</Button>;
}
