import "server-only";
import {api} from "@/lib/api";
export const mutateAdmin=(input:unknown)=>api("/v1/admin/mutations",{method:"POST",body:input,mutate:true});
