import "server-only";
import {mutateAdmin} from "./admin";
import {BuildModel,OrderModel,orderStatuses} from "./models/commerce";
import {requireUser} from "./guards";
import {ownerKey} from "./cart";
export async function ownedBuild(id:string){const user=await requireUser();return BuildModel.findOne({_id:id,ownerId:user._id});}
export async function ownedOrder(id:string){const owner=await ownerKey();return owner?OrderModel.findOne({_id:id,ownerKey:owner}):null;}
export async function advanceOrder(id:string,next:typeof orderStatuses[number]){await mutateAdmin({operation:"order",id,next,reason:"Advance order fulfillment"});}
