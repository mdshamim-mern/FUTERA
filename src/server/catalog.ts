import "server-only";
import {api,ApiError} from "@/lib/api";
import type {Product,Category} from "@/features/products/schema";
import type {CatalogQuery} from "@/features/products/query";
export const getCategories=()=>api<Category[]>("/v1/categories");
export const getBrands=()=>api<string[]>("/v1/brands");
export async function listProducts(query:CatalogQuery){const params=new URLSearchParams();for(const [key,value] of Object.entries(query))if(value!==undefined&&value!=="")params.set(key,String(value));return api<{products:Product[];total:number;page:number;pages:number}>(`/v1/products?${params}`);}
export async function getProduct(slug:string):Promise<Product|null>{try{return await api<Product>(`/v1/products/${encodeURIComponent(slug)}`);}catch(error){if(error instanceof ApiError&&error.status===404)return null;throw error;}}
export const getProducts=(ids:string[])=>api<Product[]>(`/v1/products/by-ids?ids=${encodeURIComponent(ids.join(","))}`);
export const getBuilderCatalog=()=>api<Product[]>("/v1/builder/catalog");
