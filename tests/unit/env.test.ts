import {expect,it} from "vitest";
import {parseEnv} from "@/lib/env-schema";
it("allows local non-secret frontend defaults",()=>{expect(parseEnv({}).API_BASE_URL).toBe("http://127.0.0.1:4000");});
it("rejects insecure public endpoints without exposing input",()=>{expect(()=>parseEnv({API_BASE_URL:"http://example.test"})).toThrow("API_BASE_URL");expect(()=>parseEnv({APP_URL:"invalid-private-input"})).toThrow("APP_URL");});
it("does not return backend secrets",()=>{expect(parseEnv({MONGODB_URI:"private",AUTH_SECRET:"private"})).not.toHaveProperty("MONGODB_URI");});
