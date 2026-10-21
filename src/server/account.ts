import "server-only";
import {BuildModel,OrderModel,orderStatuses} from "./models/commerce";
import {requireUser,requireAdmin} from "./guards";
import {ownerKey} from "./cart";
export async function ownedBuild(id:string){const user=await requireUser();return BuildModel.findOne({_id:id,ownerId:user._id});}
export async function ownedOrder(id:string){const owner=await ownerKey();return owner?OrderModel.findOne({_id:id,ownerKey:owner}):null;}
export async function advanceOrder(id:string,next:typeof orderStatuses[number]){await requireAdmin();const index=orderStatuses.indexOf(next);if(index<1)throw Error("Invalid transition");const result=await OrderModel.updateOne({_id:id,status:orderStatuses[index-1]},{$set:{status:next},$push:{timeline:{status:next,at:new Date()}}});if(!result.modifiedCount)throw Error("Invalid transition");}
