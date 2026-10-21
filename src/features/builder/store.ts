"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { parseReferences, type BuildReference } from "./schema";
type Saved = { name: string; refs: BuildReference[] };
type Store = { refs: BuildReference[]; saved: Saved[]; replace: (refs: BuildReference[]) => void; save: (duplicate?: boolean) => void };
export const useBuilder = create<Store>()(persist((set,get)=>({
  refs:[], saved:[],
  replace:(refs)=>set({refs:parseReferences(refs)}),
  save:(duplicate=false)=>set({saved:[...get().saved,{name:`${duplicate?"Copy":"Build"} ${new Date().toLocaleString()}`,refs:parseReferences(get().refs)}].slice(-10)}),
}),{
  name:"futera-builder-v1",skipHydration:true,
  partialize:({refs,saved})=>({refs,saved}),
  merge:(persisted,current)=>{
    const value=persisted as {refs?:unknown;saved?:unknown} | null;
    const saved=Array.isArray(value?.saved)?value.saved.slice(-10).flatMap((s:unknown)=>{
      if (!s || typeof s!=="object" || !("name" in s) || typeof s.name!=="string" || !("refs" in s)) return [];
      return [{name:s.name.slice(0,80),refs:parseReferences(s.refs)}];
    }):[];
    return {...current,refs:parseReferences(value?.refs),saved};
  },
}));
