import type { NextConfig } from "next";
import { parseEnv } from "./src/lib/env-schema";

// next.config is evaluated for dev, build and start; validate without exposing values.
parseEnv(process.env);
const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } },
  },
};
export default nextConfig;
