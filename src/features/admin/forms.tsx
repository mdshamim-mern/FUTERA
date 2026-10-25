"use client";
import {useActionState,useState} from "react";
import {z} from "zod";
import {useDemoReadOnly} from "./access-context";
import {adminAction} from "./actions";
import {categoryCodes,categoryLabels,specSchemas,type Product,type CategoryCode} from "@/features/products/schema";
import {Button} from "@/components/ui/button";
import {Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription} from "@/components/ui/dialog";

const control="mt-1 min-h-11 w-full min-w-0 rounded-md border border-border bg-background p-2 text-sm";
export function MutationForm({payload,label="Save changes",children}:{payload:Record<string,unknown>;label?:string;children?:React.ReactNode}){
 const [state,action,pending]=useActionState(adminAction,{ok:false,message:""});
 const readOnly=useDemoReadOnly();
 const [reason,setReason]=useState("");const [open,setOpen]=useState(false);
 return <div className="space-y-3">{children}<label className="block text-sm">Audit reason<input className={control} value={reason} onChange={e=>setReason(e.target.value)} minLength={5} maxLength={300} required/></label>
 <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><Button type="button" disabled={readOnly||reason.trim().length<5||pending}>{label}</Button></DialogTrigger><DialogContent><DialogTitle>Confirm {label.toLowerCase()}</DialogTitle><DialogDescription>This changes live store data and records your account and reason in the audit log. Review the values before confirming.</DialogDescription><p className="break-words text-sm">{reason}</p><form action={form=>{action(form);setOpen(false);}}><input type="hidden" name="payload" value={JSON.stringify({...payload,reason})}/><Button type="submit" disabled={pending}>Confirm change</Button></form><Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button></DialogContent></Dialog>
 <p className="text-xs text-muted-foreground">{readOnly?"Demo administrator cannot change store data.":""}</p><p role={state.ok?"status":"alert"} className={state.ok?"text-success":"text-warning"}>{pending?"Saving…":state.message}</p></div>;
}
type FieldShape={type?:string|string[];enum?:unknown[];anyOf?:FieldShape[]};
function SpecInput({name,shape,value,onChange}:{name:string;shape:FieldShape;value:unknown;onChange:(value:unknown)=>void}){
 const inner=shape.anyOf?.find(s=>s.type!=="null")??shape;
 const kind=Array.isArray(inner.type)?inner.type.find(t=>t!=="null"):inner.type;
 if(inner.enum||kind==="boolean")return <label className="text-sm">{name}<select className={control} value={value===null||value===undefined?"":String(value)} onChange={e=>onChange(e.target.value===""?null:kind==="boolean"?e.target.value==="true":e.target.value)}><option value="">Unknown</option>{(inner.enum??[true,false]).map(v=><option key={String(v)} value={String(v)}>{String(v)}</option>)}</select></label>;
 return <label className="text-sm">{name}{kind==="array"?" (comma separated)":""}<input className={control} type={kind==="number"||kind==="integer"?"number":"text"} step="any" value={Array.isArray(value)?value.join(", "):value===null||value===undefined?"":String(value)} placeholder="Unknown" onChange={e=>onChange(e.target.value===""?null:kind==="array"?e.target.value.split(",").map(v=>v.trim()):kind==="number"||kind==="integer"?Number(e.target.value):e.target.value)}/></label>;
}
export function ProductForm({initial,updatedAt,vocabulary}:{initial?:Product;updatedAt?:string;vocabulary:{sockets:string[];formFactors:string[]}}){
 const blank=(category:CategoryCode)=>Object.fromEntries(Object.keys(specSchemas[category].shape).map(k=>[k,null]));
 const [product,setProduct]=useState<Product>(initial??{slug:"",sku:"",name:"",brand:"",category:"cpu",description:"",priceMinor:0,stock:0,active:false,isSample:true,featured:false,images:[{src:"/placeholders/component.svg",alt:"Neutral CPU placeholder"}],specs:blank("cpu")});
 const fields=z.toJSONSchema(specSchemas[product.category]).properties as Record<string,FieldShape>;
 return <MutationForm payload={{operation:"product",product,existing:!!initial,expectedUpdatedAt:updatedAt}} label={initial?"Save product":"Create product"}>
 <div className="grid min-w-0 gap-4 sm:grid-cols-2">{(["slug","sku","name","brand","description","priceMinor","stock"] as const).map(key=><label key={key} className="text-sm">{key==="priceMinor"?"Price (poisha; 100 = ৳1)":key=== "stock"?"Stock (use adjustments after creation)":key}<input className={control} aria-label={key} readOnly={!!initial&&(key==="slug"||key==="stock")} type={key==="priceMinor"||key==="stock"?"number":"text"} value={product[key]} onChange={e=>setProduct({...product,[key]:key==="priceMinor"||key==="stock"?Number(e.target.value):e.target.value})}/></label>)}
 <label className="text-sm">Category<select className={control} value={product.category} onChange={e=>{const category=e.target.value as CategoryCode;setProduct({...product,category,specs:blank(category),images:[{src:"/placeholders/component.svg",alt:`Neutral ${categoryLabels[category]} placeholder`}]});}}>{categoryCodes.map(c=><option key={c} value={c}>{categoryLabels[c]}</option>)}</select></label>
 {(["active","isSample","featured"] as const).map(key=><label className="flex min-h-11 items-center gap-3" key={key}><input type="checkbox" checked={product[key]} onChange={e=>setProduct({...product,[key]:e.target.checked})}/>{key}</label>)}</div>
 <h2 className="font-display text-xl">{categoryLabels[product.category]} specifications</h2><p className="text-sm text-muted-foreground">Reference sockets: {vocabulary.sockets.join(", ")||"not configured"}. Reference form factors: {vocabulary.formFactors.join(", ")||"not configured"}.</p><p className="text-sm text-muted-foreground">Blank values mean unknown, never compatible. Existing product photos are preserved. New product media must use an approved local catalog asset.</p>
 <div className="grid min-w-0 gap-4 sm:grid-cols-2">{Object.entries(fields).map(([key,shape])=><SpecInput key={`${product.category}-${key}`} name={key} shape={shape} value={product.specs[key]} onChange={value=>setProduct({...product,specs:{...product.specs,[key]:value as Product["specs"][string]}})}/>)}</div>
 </MutationForm>;
}
export function InventoryForm({id,stock}:{id:string;stock:number}){const [delta,setDelta]=useState(0);return <MutationForm payload={{operation:"inventory",id,expectedStock:stock,delta}} label="Adjust inventory"><label>Quantity adjustment (negative to remove)<input className={control} type="number" value={delta} onChange={e=>setDelta(Number(e.target.value))}/></label><p>Current stock: {stock}. Result: {stock+delta}.</p></MutationForm>;}
export function ArchiveForm({products}:{products:{slug:string;name:string}[]}){const [ids,setIds]=useState<string[]>([]);return <MutationForm payload={{operation:"archive",ids}} label={`Archive selected (${ids.length})`}><fieldset><legend>Select products to archive</legend>{products.map(p=><label key={p.slug} className="flex min-h-11 gap-3 items-center text-sm"><input type="checkbox" checked={ids.includes(p.slug)} onChange={e=>setIds(e.target.checked?[...ids,p.slug]:ids.filter(id=>id!==p.slug))}/><span className="break-words">{p.name}</span></label>)}</fieldset></MutationForm>;}
export function ConfigForm({operation,initial}:{operation:"shipping"|"compatibility"|"coupon";initial:Record<string,unknown>}){
 const [value,setValue]=useState(initial);const [invalid,setInvalid]=useState<string[]>([]);
 return <MutationForm payload={invalid.length?{operation:"invalid"}:{operation,[operation==="coupon"?"coupon":"value"]:value}} label={`Save ${operation}`}>
 <div className="grid min-w-0 gap-4 sm:grid-cols-2">{Object.entries(initial).map(([key,v])=> typeof v==="boolean"?<label className="flex min-h-11 gap-3 items-center" key={key}><input type="checkbox" checked={Boolean(value[key])} onChange={e=>setValue({...value,[key]:e.target.checked})}/>{key}</label>:Array.isArray(v)?<label className="text-sm sm:col-span-2" key={key}>{key} (JSON array)<textarea className={control} rows={5} defaultValue={JSON.stringify(v,null,2)} onChange={e=>{try{setValue({...value,[key]:JSON.parse(e.target.value)});setInvalid(invalid.filter(k=>k!==key));}catch{setInvalid([...new Set([...invalid,key])]);}}}/></label>:<label className="text-sm" key={key}>{key}<input className={control} type={typeof v==="number"?"number":"text"} value={String(value[key])} onChange={e=>setValue({...value,[key]:typeof v==="number"?Number(e.target.value):e.target.value})}/></label>)}</div>
 {invalid.length>0&&<p role="alert">Invalid JSON: {invalid.join(", ")}</p>}</MutationForm>;
}
