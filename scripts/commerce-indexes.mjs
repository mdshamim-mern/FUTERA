import {existsSync} from "node:fs";
import {loadEnvFile} from "node:process";
import mongoose from "mongoose";
import {commerceModels} from "../src/server/models/commerce.ts";
for(const file of [".env.local",".env"])if(existsSync(file))loadEnvFile(file);
if(!process.env.MONGODB_URI||!process.env.MONGODB_DB)throw Error("Configure MongoDB before creating indexes.");
try{await mongoose.connect(process.env.MONGODB_URI,{dbName:process.env.MONGODB_DB});for(const model of commerceModels)await model.createIndexes();console.log("Commerce indexes created without dropping indexes.");}finally{await mongoose.disconnect();}
