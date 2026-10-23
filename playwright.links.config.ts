import {defineConfig} from "@playwright/test";
import base from "./playwright.config";
export default defineConfig({
  ...base,
  testMatch:"**/links-and-buttons.spec.ts",
  testIgnore:[],
  timeout:180000,
  projects:base.projects?.filter(project=>["mobile-360","desktop-1440"].includes(project.name??"")),
});
