import "server-only";
import {parseEnv} from "./env-schema";
export const env=parseEnv({NODE_ENV:process.env.NODE_ENV,APP_URL:process.env.APP_URL,API_BASE_URL:process.env.API_BASE_URL,COMMERCE_ENABLED:process.env.COMMERCE_ENABLED});
