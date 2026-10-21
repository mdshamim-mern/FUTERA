import {expect,it,vi} from "vitest";
vi.mock("server-only",()=>({}));
const request=vi.hoisted(()=>vi.fn().mockResolvedValue({lines:[],checks:[],totalMinor:0}));
vi.mock("@/lib/api",()=>({api:request}));
import {resolveBuild} from "@/server/builder";
it("delegates authoritative build resolution to the independent backend",async()=>{const refs=[{id:"sample-cpu-03",quantity:1}];await resolveBuild(refs);expect(request).toHaveBeenCalledWith("/v1/builder/quote",{method:"POST",body:refs});});
