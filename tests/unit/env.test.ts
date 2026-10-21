import { describe, expect, it } from "vitest";
import { parseEnv } from "@/lib/env-schema";

describe("environment validation", () => {
  it("allows the foundation to run without MongoDB", () => {
    expect(parseEnv({ MONGODB_URI: "", MONGODB_DB: "" }).MONGODB_URI).toBeUndefined();
  });
  it("requires a complete database configuration", () => {
    expect(() => parseEnv({ MONGODB_URI: "mongodb://localhost:27017" })).toThrow("Invalid environment");
  });
  it("rejects invalid config without leaking credentials", () => {
    expect(() => parseEnv({ MONGODB_URI: "secret-password", MONGODB_DB: "futera" })).toThrow("Invalid environment configuration: MONGODB_URI");
    expect(() => parseEnv({ APP_URL: "not-a-url" })).toThrow("APP_URL");
  });
});
