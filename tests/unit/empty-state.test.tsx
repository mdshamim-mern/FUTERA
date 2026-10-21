import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { EmptyState } from "@/components/empty-state";
import Link from "next/link";

it("shows an accessible empty state and a recovery action", () => {
  render(<EmptyState title="Nothing here yet" description="Explore the foundation."><Link href="/#foundation">Explore</Link></EmptyState>);
  expect(screen.getByRole("heading", { name: "Nothing here yet" })).toBeVisible();
  expect(screen.getByRole("link", { name: "Explore" })).toHaveAttribute("href", "/#foundation");
});
