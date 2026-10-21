import {defineConfig} from "@playwright/test";
import base from "./playwright.config";
export default defineConfig({...base,testMatch:"**/commerce.spec.ts",testIgnore:[],outputDir:"test-results/commerce",reporter:[["list"],["html",{open:"never",outputFolder:"playwright-report/commerce"}]],workers:1,fullyParallel:false,use:{...base.use,baseURL:"http://127.0.0.1:3100"},webServer:{command:"node scripts/e2e-commerce-server.mjs --commerce",url:"http://127.0.0.1:3100",timeout:240000,reuseExistingServer:false}});
