import {z} from "zod";
const publicUrl=z.url().refine(value=>{if(!URL.canParse(value))return false;const u=new URL(value);return u.protocol==="https:"||(u.protocol==="http:"&&["localhost","127.0.0.1"].includes(u.hostname));},"Public URLs require HTTPS");
export const envSchema=z.object({NODE_ENV:z.enum(["development","test","production"]).default("development"),APP_URL:publicUrl.default("http://localhost:3000"),API_BASE_URL:publicUrl.default("http://127.0.0.1:4000"),COMMERCE_ENABLED:z.enum(["true","false"]).default("false")});
export function parseEnv(input:Record<string,unknown>){const result=envSchema.safeParse(input);if(!result.success)throw Error(`Invalid environment configuration: ${[...new Set(result.error.issues.map(i=>i.path.join(".")))].join(", ")}`);return result.data;}
