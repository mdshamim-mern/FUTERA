// @vitest-environment node
import {beforeAll,afterAll,beforeEach,it,expect,vi} from "vitest";
import mongoose from "mongoose";
import {MongoMemoryReplSet} from "mongodb-memory-server";
import {randomUUID} from "node:crypto";
const identity=vi.hoisted(()=>({id:""}));
vi.mock("server-only",()=>({}));
vi.mock("@/lib/env",()=>({env:{COMMERCE_ENABLED:"true",APP_URL:"http://localhost:3100",AUTH_SECRET:"TEST-ONLY-not-a-deployment-secret-123456789",SHIPPING_HOME_MINOR:10000,SHIPPING_PICKUP_MINOR:0}}));
vi.mock("@/lib/db",()=>({connectDatabase:async()=>mongoose}));
vi.mock("@/lib/auth",async()=>({auth:async()=>({user:{id:identity.id}}),signIn:vi.fn(),signOut:vi.fn(),credentialsSchema:(await import("zod")).z.object({})}));
vi.mock("next/headers",()=>({cookies:async()=>({get:()=>undefined,set:vi.fn(),delete:vi.fn()})}));
vi.mock("next/cache",()=>({revalidatePath:vi.fn()}));
vi.mock("next/navigation",()=>({redirect:vi.fn()}));
vi.mock("next-auth",()=>({AuthError:class extends Error{}}));
import {UserModel,CartModel,OrderModel,BuildModel,CouponModel,commerceModels} from "@/server/models/commerce";
import {ProductModel} from "@/server/models/catalog";
import {sampleProducts} from "@/features/products/sample-data";
import {requireUser,requireAdmin} from "@/server/guards";
import {ownedBuild,ownedOrder,advanceOrder} from "@/server/account";
import {mutateBuild} from "@/features/account/actions";
import {reviewCheckout,placeOrder} from "@/server/checkout";
import {locations,type CheckoutInput} from "@/features/checkout/schema";
import {limitAuth} from "@/server/auth-rate";
import {mergeReferences} from "@/server/cart";
let replica:MongoMemoryReplSet;
const district=locations[0].districts[0];
const input:CheckoutInput={address:{name:"SAMPLE Buyer",phone:"01000000000",division:locations[0].id,district:district.id,upazila:district.upazilas[0].id,street:"SAMPLE test address"},method:"home",coupon:"",payment:"COD"};
beforeAll(async()=>{replica=await MongoMemoryReplSet.create({instanceOpts:[{launchTimeout:60000}],binary:{version:"8.2.6"},replSet:{count:1}});await mongoose.connect(replica.getUri(),{dbName:"futera_unit_sample"});await Promise.all([...commerceModels,ProductModel].map(m=>m.createIndexes()));},180000);
afterAll(async()=>{await mongoose.disconnect();await replica?.stop();});
beforeEach(async()=>{await Promise.all([...commerceModels,ProductModel].map(m=>m.collection.deleteMany({})));identity.id=randomUUID();await UserModel.create({_id:identity.id,name:"SAMPLE",email:"sample@example.test",passwordHash:"test-only",role:"customer"});await ProductModel.create(sampleProducts.find(p=>p.slug==="sample-cpu-03")!);await CartModel.create({_id:`user:${identity.id}`,refs:[{id:"sample-cpu-03",quantity:1}]});});
it("blocks unauthenticated, disabled and non-admin guards",async()=>{await expect(requireAdmin()).rejects.toThrow("Forbidden");await UserModel.updateOne({_id:identity.id},{$set:{disabled:true}});await expect(requireUser()).rejects.toThrow();identity.id="";await expect(requireUser()).rejects.toThrow();});
it("blocks another user's build reads and mutations and private order reads",async()=>{
  const id=randomUUID();await BuildModel.create({_id:id,ownerId:"another-user",name:"Private",refs:[]});expect(await ownedBuild(id)).toBeNull();
  const form=new FormData();form.set("id",id);form.set("operation","delete");await expect(mutateBuild(form)).rejects.toThrow("Build not found");expect(await BuildModel.countDocuments({_id:id})).toBe(1);
  await OrderModel.create({_id:randomUUID(),ownerKey:"user:another-user",requestId:randomUUID(),address:input.address,method:"home",lines:[],timeline:[]});const other=await OrderModel.findOne();expect(await ownedOrder(other!._id)).toBeNull();
});
it("rejects forged quote and stale prices without consuming stock",async()=>{const review=await reviewCheckout(input);await expect(placeOrder(review.token+"x")).rejects.toThrow("Invalid quote");await ProductModel.updateOne({slug:"sample-cpu-03"},{$inc:{priceMinor:100}});await expect(placeOrder(review.token)).rejects.toThrow("changed");expect(await OrderModel.countDocuments()).toBe(0);expect((await ProductModel.findOne()).stock).toBe(5);});
it("rejects depleted stock and coupons after review",async()=>{const review=await reviewCheckout(input);await ProductModel.updateOne({slug:"sample-cpu-03"},{$set:{stock:0}});await expect(placeOrder(review.token)).rejects.toThrow();expect(await OrderModel.countDocuments()).toBe(0);});
it("atomically creates one unpaid COD order and makes retries idempotent",async()=>{const review=await reviewCheckout(input);const id=await placeOrder(review.token);expect(await placeOrder(review.token)).toBe(id);expect(await OrderModel.countDocuments()).toBe(1);expect((await OrderModel.findById(id))?.paymentStatus).toBe("unpaid");expect((await ProductModel.findOne()).stock).toBe(4);expect((await CartModel.findOne())?.refs).toHaveLength(0);});
it("concurrent confirmation of the same quote consumes stock only once",async()=>{const review=await reviewCheckout(input);const ids=await Promise.all([placeOrder(review.token),placeOrder(review.token)]);expect(ids[0]).toBe(ids[1]);expect(await OrderModel.countDocuments()).toBe(1);expect((await ProductModel.findOne()).stock).toBe(4);});
it("binds signed checkout quotes to the authenticated owner",async()=>{const review=await reviewCheckout(input);identity.id=randomUUID();await UserModel.create({_id:identity.id,name:"SAMPLE Other",email:"other@example.test",passwordHash:"test-only"});await expect(placeOrder(review.token)).rejects.toThrow("Quote expired");expect(await OrderModel.countDocuments()).toBe(0);});
it("rechecks coupon exhaustion and rolls back inventory",async()=>{await CouponModel.create({_id:"SAMPLE10",percent:10,maximumDiscountMinor:100000,startsAt:0,endsAt:Date.now()+60000,maxUses:1,used:0,active:true});const review=await reviewCheckout({...input,coupon:"SAMPLE10"});await CouponModel.updateOne({_id:"SAMPLE10"},{$set:{used:1}});await expect(placeOrder(review.token)).rejects.toThrow();expect((await ProductModel.findOne()).stock).toBe(5);});
it("rate limits persist in MongoDB instead of resetting per process",async()=>{await limitAuth("sample-account",1);await expect(limitAuth("sample-account",1)).rejects.toThrow("Too many attempts");});
it("merges guest quantities without silently dropping excess units",()=>{expect(mergeReferences([{id:"sample",quantity:1}],[{id:"sample",quantity:2}])).toEqual([{id:"sample",quantity:3}]);expect(()=>mergeReferences([{id:"sample",quantity:8}],[{id:"sample",quantity:1}])).toThrow("8 units");});
it("permits only an admin to advance exactly one order timeline step",async()=>{const {token}=await reviewCheckout(input);const id=await placeOrder(token);await expect(advanceOrder(id,"Assembling")).rejects.toThrow("Forbidden");await UserModel.updateOne({_id:identity.id},{$set:{role:"admin"}});await expect(advanceOrder(id,"Testing")).rejects.toThrow("Invalid transition");await advanceOrder(id,"Assembling");expect((await OrderModel.findById(id))?.timeline.map(t=>t.status)).toEqual(["Confirmed","Assembling"]);});
it("owner can rename, duplicate, rotate/revoke share and delete saved builds",async()=>{const id=randomUUID();await BuildModel.create({_id:id,ownerId:identity.id,name:"Original",refs:[{id:"sample-cpu-03",quantity:1}]});const form=new FormData();form.set("id",id);form.set("name","Renamed");form.set("operation","rename");await mutateBuild(form);expect((await ownedBuild(id))?.name).toBe("Renamed");form.set("operation","duplicate");await mutateBuild(form);expect(await BuildModel.countDocuments({ownerId:identity.id})).toBe(2);form.set("operation","share");await mutateBuild(form);expect((await ownedBuild(id))?.shareToken).toMatch(/^[a-f0-9]{48}$/);form.set("operation","unshare");await mutateBuild(form);expect((await ownedBuild(id))?.shareToken).toBeNull();form.set("operation","delete");await mutateBuild(form);expect(await ownedBuild(id)).toBeNull();});



