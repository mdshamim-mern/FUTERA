"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { env } from "@/lib/env";
import { getProduct } from "@/server/catalog";
import { modeSchema, readSelection, selectionCookie } from "@/server/selections";
import { slugSchema } from "@/features/products/schema";

export async function updateSelection(form: FormData) {
  const mode = modeSchema.safeParse(form.get("mode"));
  const slug = slugSchema.safeParse(form.get("slug"));
  const operation = form.get("operation");
  if (!mode.success || !slug.success || (operation !== "add" && operation !== "remove")) redirect("/products");
  let selected = await readSelection(mode.data);
  if (operation === "remove") selected = selected.filter((value) => value !== slug.data);
  else {
    // Cookie and form fields are untrusted references. Re-read current server data.
    const product = await getProduct(slug.data);
    if (!product) redirect("/products");
    if (mode.data === "cart" && product.stock < 1) redirect(`/products/${slug.data}?notice=unavailable`);
    if (!selected.includes(slug.data)) {
      if (selected.length === 12) redirect(`/selection?mode=${mode.data}&notice=full`);
      selected = [...selected, slug.data];
    }
  }
  (await cookies()).set(selectionCookie(mode.data), JSON.stringify(selected), {
    httpOnly: true, sameSite: "lax", secure: new URL(env.APP_URL).protocol === "https:", path: "/", maxAge: 60 * 60 * 24 * 7,
  });
  revalidatePath("/selection");
  redirect(`/selection?mode=${mode.data}`);
}
