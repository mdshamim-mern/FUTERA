import {api} from "@/lib/api";
import {CheckoutForm} from "@/features/checkout/checkout-form";
import {env} from "@/lib/env";
import {shippingSettings} from "@/server/settings";
export default async function Checkout(){const enabled=env.COMMERCE_ENABLED==="true"&&(await api<{checkoutEnabled:boolean}>("/v1/config")).checkoutEnabled;const shipping=enabled?await shippingSettings():null;return <main id="main-content" className="page-container py-14"><h1 className="font-display text-4xl">Demo checkout</h1><p className="mt-4 text-sm text-muted-foreground">Demo store — prices, stock and orders are illustrative. This exercise collects no payment and creates no real delivery commitment.</p>{enabled?<CheckoutForm pickup={shipping!.pickupAddress}/>:<p className="my-6">Retail checkout is disabled. Reference entries have no verified price, stock or delivery offer.</p>}</main>;}
export const dynamic="force-dynamic";
