import { expect, it, vi } from "vitest";
vi.mock("server-only",()=>({}));
vi.mock("@/server/settings",()=>({compatibilitySettings:async()=>({overrides:[]})}));
vi.mock("@/server/catalog",async()=>{
  const {sampleProducts}=await import("@/features/products/sample-data");
  return {getProducts:async(ids:string[])=>sampleProducts.filter(p=>ids.includes(p.slug))};
});
import { resolveBuild } from "@/server/builder";
it("re-resolves reference IDs and calculates authoritative sample totals",async()=>{
  const quote=await resolveBuild([{id:"sample-ram-03",quantity:2},{id:"missing-product",quantity:1}]);
  expect(quote.lines).toHaveLength(1);expect(quote.ignored).toBe(1);expect(quote.totalMinor).toBe(1200000);
  expect((await resolveBuild([{id:"sample-ram-03",quantity:2,priceMinor:1}])).totalMinor).toBe(0);
});
it("normalizes single slots, omits competing CPUs, and reports stock failures",async()=>{
  const quote=await resolveBuild([{id:"sample-cpu-01",quantity:8},{id:"sample-cpu-02",quantity:1},{id:"sample-ram-03",quantity:8}]);
  expect(quote.lines).toHaveLength(2);expect(quote.lines[0].quantity).toBe(1);expect(quote.stockIssues).toHaveLength(2);
});
