import {CheckoutForm} from "@/features/checkout/checkout-form";
import {env} from "@/lib/env";
import {shippingSettings} from "@/server/settings";
export default async function Checkout(){const shipping=env.COMMERCE_ENABLED==="true"?await shippingSettings():null;return <main id="main-content" className="page-container py-14"><h1 className="font-display text-4xl">Checkout</h1>{env.COMMERCE_ENABLED==="true"?<CheckoutForm pickup={shipping!.pickupAddress}/>:<p className="my-6">Checkout is unavailable until database, sessions and shipping are configured.</p>}</main>;}
export const dynamic="force-dynamic";
