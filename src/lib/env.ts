import "server-only";
import { parseEnv } from "@/lib/env-schema";

export const env = parseEnv({
  NODE_ENV: process.env.NODE_ENV,
  APP_URL: process.env.APP_URL,
  CATALOG_SOURCE: process.env.CATALOG_SOURCE,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DB: process.env.MONGODB_DB,
  COMMERCE_ENABLED: process.env.COMMERCE_ENABLED,
  AUTH_SECRET: process.env.AUTH_SECRET,
  SHIPPING_HOME_MINOR: process.env.SHIPPING_HOME_MINOR,
  SHIPPING_PICKUP_MINOR: process.env.SHIPPING_PICKUP_MINOR,
  PICKUP_ADDRESS: process.env.PICKUP_ADDRESS,
});
