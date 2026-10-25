import {describe,it,expect} from "vitest";
import {createStarter} from "@/features/builder/starter";
import {sampleProducts} from "@/features/products/sample-data";
const catalog=sampleProducts.filter(p=>p.slug.endsWith("-03")).map(p=>({...p,slug:p.slug.replace("sample-","real-"),name:p.name.replace("SAMPLE ",""),isSample:false,isDemo:true}));
describe("current catalog starters",()=>{
 it("resolves actual IDs rather than fixture names",()=>{const result=createStarter(catalog,200000,"Office");expect(result.missing).toBeNull();expect(result.refs).toHaveLength(7);expect(result.refs.every(r=>r.id.startsWith("real-"))).toBe(true);expect(result.totalMinor).toBeGreaterThan(0);});
 it("includes an available GPU for graphics workloads",()=>{const result=createStarter(catalog,200000,"Gaming");expect(result.refs).toHaveLength(8);expect(result.hasGpu).toBe(true);});
 it("reports insufficient inventory and budget without inventing prices",()=>{expect(createStarter(catalog.filter(p=>p.category!=="psu"),80000,"Office").missing).toBe("psu");expect(createStarter(catalog,1,"Office").overBudget).toBe(true);});
 it("rejects known socket conflicts and inactive inventory",()=>{const wrong=catalog.map(p=>p.category==="motherboard"?{...p,specs:{...p.specs,socket:"wrong"}}:p);expect(createStarter(wrong,200000,"Office").missing).toBe("motherboard");expect(createStarter(catalog.map(p=>({...p,active:false})),200000,"Office").refs).toEqual([]);});
});
