import "server-only";
import {api} from "@/lib/api";
import type {z} from "zod";
import {shippingSchema,compatibilitySchema} from "@/features/admin/schema";
export const shippingSettings=()=>api<z.infer<typeof shippingSchema>>("/v1/shipping");
export const compatibilitySettings=()=>api<z.infer<typeof compatibilitySchema>>("/v1/admin/report?view=compatibility");
