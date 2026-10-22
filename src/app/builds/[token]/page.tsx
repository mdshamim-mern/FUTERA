import { displayProductPrice } from "@/features/products/format";
import {notFound} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";
import {api,ApiError} from "@/lib/api";
import {env} from "@/lib/env";

import type {BuildQuote} from "@/server/builder";
import {formatPrice} from "@/features/products/format";
import {encodeBuild} from "@/features/builder/schema";
import {Brand} from "@/components/brand";
import {PrintButton} from "@/components/print-button";
export const metadata={title:"Shared build quote",robots:{index:false,follow:false}};
export default async function SharedBuild({params}:{params:Promise<{token:string}>}){const {token}=await params;if(!/^[a-f0-9]{48}$/.test(token)||env.COMMERCE_ENABLED!=="true")notFound();let build:{name:string;quote:BuildQuote};try{build=await api(`/v1/shared-builds/${token}`);}catch(error){if(error instanceof ApiError&&error.status===404)notFound();throw error;}const quote=build.quote,refs=quote.lines.map(l=>({id:l.product.slug,quantity:l.quantity}));const url=new URL(`/builds/${token}`,env.APP_URL).toString();return <main className="page-container py-12 quote-print"><Brand/><h1 className="my-6 font-display text-4xl">{build.name}</h1><p>FUTERA · Build the future of your desk.</p><p className="my-4 text-sm">Indicative quote · {new Date().toISOString().slice(0,10)} · All amounts revalidated at checkout. SAMPLE lines are fictional. No reservation or payment confirmation.</p><table className="my-8 w-full text-left"><thead><tr><th>Component</th><th>Qty</th><th>Unit price</th></tr></thead><tbody>{quote.lines.map(l=><tr key={l.product.slug} className="border-b"><td className="py-3">{l.product.name}</td><td>{l.quantity}</td><td className="price">{displayProductPrice(l.product)}</td></tr>)}</tbody></table><p className="price text-2xl">Subtotal {quote.lines.some(l=>l.product.isReference)?"Not priced":formatPrice(quote.totalMinor)}</p><p className="my-3">Shipping and discounts calculated at checkout. Unknown specifications require review.</p><Image src={await QRCode.toDataURL(url,{width:160,margin:2})} alt="QR code to this public build" width={160} height={160}/><p className="my-3 break-all text-sm">{url}</p><div className="flex flex-wrap items-center gap-5"><PrintButton/><Link className="text-primary print:hidden" href={`/pc-builder?build=${encodeURIComponent(encodeBuild(refs))}`}>Restore in builder</Link></div></main>;}
