import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import mongoose from "mongoose";
import { sampleCategories, sampleProducts } from "../src/features/products/sample-data.ts";
import { CategoryModel, ProductModel } from "../src/server/models/catalog.ts";
import { parseEnv } from "../src/lib/env-schema.ts";

for (const file of [".env.local", ".env"]) if (existsSync(file)) loadEnvFile(file);

async function seed() {
  for (const category of sampleCategories) await new CategoryModel(category).validate();
  for (const product of sampleProducts) await new ProductModel(product).validate();
  if (process.argv.includes("--dry-run")) {
    console.log(`SAMPLE dry run: validated ${sampleCategories.length} categories and ${sampleProducts.length} products. No database writes.`);
    return;
  }
  const env = parseEnv(process.env);
  if (env.NODE_ENV === "production" || !env.MONGODB_URI || !env.MONGODB_DB?.endsWith("_sample")) {
    throw new Error("SAMPLE seed requires non-production NODE_ENV, MONGODB_URI and a database name ending in _sample. Use --dry-run without Atlas.");
  }
  await mongoose.connect(env.MONGODB_URI, { dbName: env.MONGODB_DB, autoIndex: false, serverSelectionTimeoutMS: 5000 });
  // Preflight every collision before any writes. Never delete unrelated records.
  for (const [Model, records] of [[CategoryModel, sampleCategories], [ProductModel, sampleProducts]]) {
    for (const data of records) {
      const conditions = [{ slug: data.slug }];
      if ("sku" in data) conditions.push({ sku: data.sku });
      const conflicts = await Model.find({ $or: conditions }).lean();
      if (conflicts.some((record) => !record.isSample || record.slug !== data.slug)) throw new Error("Seed collision with protected or mismatched data. No overwrite allowed.");
    }
  }
  await CategoryModel.createIndexes();
  await ProductModel.createIndexes();
  for (const [Model, records] of [[CategoryModel, sampleCategories], [ProductModel, sampleProducts]]) {
    for (const data of records) {
      const document = await Model.findOne({ slug: data.slug }) ?? new Model();
      document.set(data);
      await document.save();
    }
  }
  console.log(`SAMPLE seed complete: upserted ${sampleCategories.length} categories and ${sampleProducts.length} fictional products. Prices and stock are illustrative only.`);
}
try { await seed(); }
catch (error) {
  console.error(error instanceof Error && /^(SAMPLE|Seed collision)/.test(error.message) ? error.message : "SAMPLE seed failed validation or database access. Connection details withheld.");
  process.exitCode = 1;
} finally { await mongoose.disconnect(); }
