import type {Product,CategoryCode} from "@/features/products/schema";
import {requiredCategories,type BuildReference} from "./schema";
import {checkCompatibility} from "./compatibility";

/** Uses current inventory, never fixture IDs. Unknown specifications stay unknown. */
export function createStarter(catalog:Product[],budgetBdt:number,useCase:string){
 const available=catalog.filter(p=>p.active&&!p.isReference&&p.stock>0&&p.priceMinor>0);
 const selected:Product[]=[];
 const quantity=(p:Product)=>p.category==="ram"&&useCase!=="Office"&&typeof p.specs.capacityGb==="number"&&p.specs.capacityGb<16?2:1;
 const weights:Partial<Record<CategoryCode,number>>={cpu:.25,motherboard:.2,ram:.12,ssd:.1,case:.1,psu:.13,"cpu-cooler":.1,gpu:.3};
 const categories:CategoryCode[]=[...requiredCategories];
 if(useCase!=="Office"&&available.some(p=>p.category==="gpu"))categories.push("gpu");
 for(const category of categories){
  const candidates=available.filter(p=>p.category===category&&p.stock>=quantity(p)).sort((a,b)=>a.priceMinor-b.priceMinor||a.slug.localeCompare(b.slug));
  const compatible=candidates.filter(p=>!checkCompatibility([...selected,p].map(part=>({id:part.slug,category:part.category,quantity:quantity(part),specs:part.specs}))).some(c=>c.status==="error"&&!(c.ruleId==="display-output"&&useCase!=="Office"&&available.some(item=>item.category==="gpu"))));
  const ceiling=budgetBdt*100*(weights[category]??.1);
  const affordable=compatible.filter(p=>p.priceMinor*quantity(p)<=ceiling);
  const chosen=affordable.at(-1)??compatible[0];
  if(!chosen)return {refs:[] as BuildReference[],totalMinor:0,missing:category,overBudget:false,hasGpu:false};
  selected.push(chosen);
 }
 const totalMinor=selected.reduce((sum,p)=>sum+p.priceMinor*quantity(p),0);
 return {refs:selected.map(p=>({id:p.slug,quantity:quantity(p)})),totalMinor,missing:null,overBudget:totalMinor>budgetBdt*100,hasGpu:selected.some(p=>p.category==="gpu")};
}
