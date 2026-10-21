"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, ShoppingBag } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [{ href: "/products", label: "Components" }, { href: "/pc-builder", label: "PC Builder" }, { href: "/compare", label: "Compare" }, { href:"/cart",label:"Cart" }, {href:"/account",label:"Account"}];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border glass border-x-0 border-t-0">
      <div className="page-container flex h-20 items-center justify-between gap-3">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-4 md:flex">
          {links.map((link) => <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden items-center gap-2 text-xs text-muted-foreground lg:inline-flex"><span className="size-1.5 rounded-full bg-primary" />A new era begins</span>
          <Dialog>
            <DialogTrigger asChild><Button variant="ghost" size="icon" aria-label="Cart information"><ShoppingBag className="size-5" aria-hidden="true"/></Button></DialogTrigger>
            <DialogContent className="glass"><DialogHeader><DialogTitle>Your next build starts here</DialogTitle><DialogDescription>Checkout is not available. Explore your saved cart preview.</DialogDescription></DialogHeader><p className="text-sm leading-6 text-muted-foreground">SAMPLE products, prices and stock are fictional. Your saved selections do not reserve inventory.</p><Button asChild><Link href="/selection?mode=cart">View cart preview</Link></Button></DialogContent>
          </Dialog>
          <Sheet>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu"><Menu className="size-5" aria-hidden="true"/></Button></SheetTrigger>
            <SheetContent className="glass"><SheetHeader><SheetTitle>Explore FUTERA</SheetTitle><SheetDescription>Build the future of your desk.</SheetDescription></SheetHeader><nav aria-label="Mobile navigation" className="flex flex-col gap-2 px-4">{links.map((link) => <SheetClose asChild key={link.href}><Link href={link.href} className="flex min-h-12 items-center justify-between rounded-lg px-3 text-sm hover:bg-secondary">{link.label}<ArrowUpRight className="size-4" aria-hidden="true"/></Link></SheetClose>)}</nav><p className="px-7 pt-6 text-xs text-muted-foreground">SAMPLE storefront · Bangladesh</p></SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
