import {defineConfig} from "@playwright/test";
import base from "./playwright.config";
export default defineConfig({...base,testDir:"./tests/current",testIgnore:[],workers:1,fullyParallel:false,timeout:120000,use:{...base.use,baseURL:"http://127.0.0.1:3103"},outputDir:"test-results/current",reporter:[["list"],["html",{open:"never",outputFolder:"playwright-report/current"}]],webServer:{command:"node scripts/e2e-commerce-server.mjs --current",url:"http://127.0.0.1:3103",timeout:240000,reuseExistingServer:false}});
