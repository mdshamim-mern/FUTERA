import {it,expect} from "vitest";
import {displayProductPrice} from "@/features/products/format";
it("never presents the reference sentinel as a free retail offer",()=>{expect(displayProductPrice({priceMinor:0,isReference:true})).toBe("Price not supplied");expect(displayProductPrice({priceMinor:123450})).toBe("৳ 1,234.50");});

