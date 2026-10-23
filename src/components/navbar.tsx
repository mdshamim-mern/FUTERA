"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, ShoppingBag, UserRound } from "lucide-react";
import {ThemeToggle} from "@/components/theme-toggle";
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {logout} from "@/features/account/actions";
import type {SessionUser} from "@/types/api";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [{ href: "/products", label: "Components" }, { href: "/pc-builder", label: "PC Builder" }, { href: "/compare", label: "Compare" }, { href:"/cart",label:"Cart" }, {href:"/account",label:"Account"}];

export function Navbar({commerceEnabled=false,user=null,theme="dark"}:{commerceEnabled?:boolean;user?:SessionUser|null;theme?:"light"|"dark"}) {
  const navigation=[...links,{href:"/about",label:"About"},{href:"/assistant",label:"AI help"},...(user?[{href:"/account#saved-builds",label:"Saved builds"}]:[{href:"/login",label:"Log in"},{href:"/register",label:"Register"}])];
  return (
    <header className="sticky top-0 z-40 border-b border-border glass border-x-0 border-t-0">
      <div className="page-container flex h-20 items-center justify-between gap-3">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-3 xl:flex">
          {navigation.map((link) => <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</Link>)}
        </nav>
        <div className="flex items-center gap-0 sm:gap-2">
          <ThemeToggle initialTheme={theme}/>
          <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="Profile menu"><UserRound aria-hidden="true"/></Button></DropdownMenuTrigger><DropdownMenuContent align="end">{user?<><DropdownMenuItem asChild><Link href="/account#profile">Profile</Link></DropdownMenuItem><DropdownMenuItem asChild><Link href="/account">My account</Link></DropdownMenuItem>{user.role==="admin"&&<DropdownMenuItem asChild><Link href="/admin">Administration</Link></DropdownMenuItem>}<DropdownMenuItem onSelect={()=>void logout()}>Logout</DropdownMenuItem></>:<><DropdownMenuItem asChild><Link href="/login">Log in</Link></DropdownMenuItem><DropdownMenuItem asChild><Link href="/register">Register</Link></DropdownMenuItem></>}</DropdownMenuContent></DropdownMenu>
          <Dialog>
            <DialogTrigger asChild><Button variant="ghost" size="icon" aria-label="Cart information"><ShoppingBag className="size-5" aria-hidden="true"/></Button></DialogTrigger>
            <DialogContent className="glass"><DialogHeader><DialogTitle>Your next build starts here</DialogTitle><DialogDescription>{commerceEnabled?"Review your cart, delivery and unpaid COD order at checkout.":"Checkout is not available. Explore your saved cart preview."}</DialogDescription></DialogHeader><p className="text-sm leading-6 text-muted-foreground">Reference entries are not for sale. Any SAMPLE entries are fictional. Saved selections do not reserve inventory.</p><Button asChild><Link href={commerceEnabled?"/cart":"/selection?mode=cart"}>{commerceEnabled?"Open cart":"View cart preview"}</Link></Button></DialogContent>
          </Dialog>
          <Sheet>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu"><Menu className="size-5" aria-hidden="true"/></Button></SheetTrigger>
            <SheetContent className="glass"><SheetHeader><SheetTitle>Explore FUTERA</SheetTitle><SheetDescription>Build the future of your desk.</SheetDescription></SheetHeader><nav aria-label="Mobile navigation" className="flex flex-col gap-2 px-4">{navigation.map((link) => <SheetClose asChild key={link.href}><Link href={link.href} className="flex min-h-12 items-center justify-between rounded-lg px-3 text-sm hover:bg-secondary">{link.label}<ArrowUpRight className="size-4" aria-hidden="true"/></Link></SheetClose>)}</nav><p className="px-7 pt-6 text-xs text-muted-foreground">Hardware research · Bangladesh</p></SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
