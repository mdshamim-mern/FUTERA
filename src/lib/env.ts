import "server-only";
import { parseEnv } from "@/lib/env-schema";

export const env = parseEnv({
  NODE_ENV: process.env.NODE_ENV,
  APP_URL: process.env.APP_URL,
  CATALOG_SOURCE: process.env.CATALOG_SOURCE,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DB: process.env.MONGODB_DB,
});
