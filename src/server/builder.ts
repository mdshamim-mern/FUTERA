import "server-only";
import {api} from "@/lib/api";
import type {Product} from "@/features/products/schema";
import type {Check,CompatibilityOverride} from "@/features/builder/compatibility";
export type BuildQuote={lines:{product:Product;quantity:number}[];overrides:CompatibilityOverride[];checks:Check[];power:{loadWatts:number;minimumWatts:number;recommendedWatts:number}|null;totalMinor:number;stockIssues:{id:string;message:string}[];ignored:number};
export const resolveBuild=(input:unknown)=>api<BuildQuote>("/v1/builder/quote",{method:"POST",body:input});
