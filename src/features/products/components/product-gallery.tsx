"use client";
import { useState } from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import type { Product } from "@/features/products/schema";

export function ProductGallery({ images, name }: { images: Product["images"]; name: string }) {
  const [active, setActive] = useState(0);
  const selected = images[active] ?? images[0];
  return <div className="detail-gallery"><div className="detail-gallery-stage"><Image src={selected.src} alt={selected.alt} fill sizes="(max-width: 1023px) 90vw, 45vw" className="object-contain" priority/><span className="detail-image-count" aria-hidden="true"><Images className="size-3"/>{active + 1} / {images.length}</span></div><div className="detail-thumbnails" aria-label={`${name} gallery`}>{images.map((image, index) => <button key={image.src} type="button" aria-label={`Show image ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)}><Image src={image.src} alt="" fill sizes="76px" className="object-contain"/></button>)}</div><div className="detail-media-notes"><p aria-live="polite">{selected.alt}</p>{selected.credit ? <div><span>{selected.credit}</span><div><a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer">Media source ↗</a>{selected.licenseUrl && <a href={selected.licenseUrl} target="_blank" rel="noopener noreferrer">Photo license ↗</a>}</div></div> : <p>Original category illustration; model photography is not available.</p>}</div></div>;
}
