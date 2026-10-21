import { z } from "zod";

const optionalText = z.preprocess(
  (value) => value === "" ? undefined : value,
  z.string().trim().min(1).optional(),
);

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_URL: z.url().default("http://localhost:3000"),
  CATALOG_SOURCE: z.enum(["sample", "mongodb"]).default("sample"),
  MONGODB_URI: optionalText.pipe(z.string().regex(/^mongodb(?:\+srv)?:\/\//).optional()),
  MONGODB_DB: optionalText.pipe(z.string().regex(/^[a-zA-Z0-9_-]+$/).optional()),
}).superRefine((env, ctx) => {
  if (Boolean(env.MONGODB_URI) !== Boolean(env.MONGODB_DB)) {
    ctx.addIssue({ code: "custom", path: ["MONGODB_URI"], message: "Configure both MongoDB variables or neither." });
  }
  if (env.CATALOG_SOURCE === "mongodb" && !env.MONGODB_URI) {
    ctx.addIssue({ code: "custom", path: ["CATALOG_SOURCE"], message: "MongoDB catalog requires database configuration." });
  }
});

export function parseEnv(input: Record<string, unknown>) {
  const result = envSchema.safeParse(input);
  if (!result.success) {
    // Report variable names only: never print credentials or Zod input values.
    const fields = [...new Set(result.error.issues.map((issue) => issue.path.join(".")))];
    throw new Error(`Invalid environment configuration: ${fields.join(", ")}`);
  }
  return result.data;
}
