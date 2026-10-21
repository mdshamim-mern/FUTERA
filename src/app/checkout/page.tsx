import {CheckoutForm} from "@/features/checkout/checkout-form";
import {env} from "@/lib/env";
export default function Checkout(){return <main id="main-content" className="page-container py-14"><h1 className="font-display text-4xl">Checkout</h1>{env.COMMERCE_ENABLED==="true"?<CheckoutForm pickup={env.PICKUP_ADDRESS!}/>:<p className="my-6">Checkout is unavailable until database, sessions and shipping are configured.</p>}</main>;}
export const dynamic="force-dynamic";
