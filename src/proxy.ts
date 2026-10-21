import {NextResponse,type NextRequest} from "next/server";
import {currentUser} from "@/server/guards";
export async function proxy(request:NextRequest){
 const user=await currentUser();
 if(!user)return NextResponse.redirect(new URL("/login",request.url));
 if(user.disabled||user.role!=="admin")return new NextResponse("Forbidden",{status:403});
 return NextResponse.next();
}
export const config={matcher:["/admin/:path*","/api/admin/:path*"]};
