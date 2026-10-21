import "server-only";
import {api} from "@/lib/api";
import type {BuildReference} from "@/features/builder/schema";
export const readCart=()=>api<BuildReference[]>("/v1/cart");
