import {MongoMemoryReplSet} from "mongodb-memory-server";
import mongoose from "mongoose";
import {randomBytes} from "node:crypto";
import {spawn} from "node:child_process";
import {sampleProducts,sampleCategories} from "../src/features/products/sample-data.ts";
import {ProductModel,CategoryModel} from "../src/server/models/catalog.ts";
import {commerceModels} from "../src/server/models/commerce.ts";
const replica=await MongoMemoryReplSet.create({instanceOpts:[{launchTimeout:60000}],replSet:{count:1},binary:{version:"8.2.6"}});
await mongoose.connect(replica.getUri(),{dbName:"futera_e2e_sample"});
await Promise.all([ProductModel,CategoryModel,...commerceModels].map(m=>m.createIndexes()));
await CategoryModel.create(sampleCategories);
await ProductModel.create(sampleProducts.map(p=>({...p,stock:p.stock?40:0})));
await mongoose.disconnect();
const child=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--hostname","127.0.0.1","--port","3100"],{stdio:"inherit",windowsHide:true,env:{...process.env,APP_URL:"http://127.0.0.1:3100",CATALOG_SOURCE:"mongodb",COMMERCE_ENABLED:"true",MONGODB_URI:replica.getUri(),MONGODB_DB:"futera_e2e_sample",AUTH_SECRET:randomBytes(48).toString("hex"),SHIPPING_HOME_MINOR:"10000",SHIPPING_PICKUP_MINOR:"0",PICKUP_ADDRESS:"SAMPLE test pickup desk — not a real fulfillment location"}});
let stopping=false;async function stop(){if(stopping)return;stopping=true;child.kill();await replica.stop();process.exit();}
process.on("SIGTERM",stop);process.on("SIGINT",stop);child.on("exit",stop);


