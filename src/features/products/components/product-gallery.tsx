"use client";
import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/features/products/schema";

export function ProductGallery({ images, name }: { images: Product["images"]; name: string }) {
  const [active, setActive] = useState(0);
  return <div className="min-w-0"><div className="relative aspect-[3/2] rounded-2xl border border-border bg-card"><Image src={images[active].src} alt={images[active].alt} fill sizes="(max-width: 767px) 90vw, 50vw" className="rounded-2xl object-contain" priority/></div><div className="mt-4 flex gap-3" aria-label={`${name} gallery`}>{images.map((image, index) => <button key={image.src} type="button" aria-label={`Show image ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)} className={`relative h-20 w-24 rounded-lg border-2 ${active === index ? "border-primary" : "border-border"}`}><Image src={image.src} alt="" fill sizes="96px" className="rounded-md object-contain"/></button>)}</div><p className="mt-3 text-xs text-muted-foreground">Neutral illustrations only. No product photography or manufacturer endorsement.</p></div>;
}
