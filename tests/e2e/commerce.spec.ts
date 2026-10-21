import {test,expect} from "@playwright/test";
test("guest build merges at registration and COD creates an unpaid private order",async({page,browser},info)=>{
  test.setTimeout(120000);
  await page.goto("/pc-builder");await page.getByRole("button",{name:"Office",exact:true}).click();
  await page.getByRole("button",{name:"Add whole build to cart"}).click();
  await expect(page.getByRole("heading",{name:"Your cart",exact:true})).toBeVisible();
  await page.goto("/register");await page.getByRole("textbox",{name:"Name",exact:true}).fill("SAMPLE Test Customer");
  const email=`sample-${info.project.name}-${Date.now()}@example.test`;await page.getByRole("textbox",{name:"Email",exact:true}).fill(email);
  await page.getByLabel("Password (12–128 characters)").fill("SAMPLE-test-password-123!");await page.getByRole("button",{name:"Register",exact:true}).click();
  await expect(page.getByRole("heading",{name:"Hello, SAMPLE Test Customer"})).toBeVisible({timeout:15000});
  const forbidden=await page.request.get("/admin");expect(forbidden.status()).toBe(403);
  const forbiddenApi=await page.request.get("/api/admin/test");expect(forbiddenApi.status()).toBe(403);
  await page.goto("/pc-builder");await expect(page.getByRole("button",{name:"Save to account"})).toBeEnabled();await page.getByRole("button",{name:"Save to account"}).click();
  await expect(page.getByRole("status")).toContainText("Saved to your account");
  await page.goto("/account");await page.getByRole("button",{name:"share",exact:true}).click();
  const publicLink=page.getByRole("link",{name:"Public share / printable quote"});await expect(publicLink).toBeVisible();
  const sharePath=await publicLink.getAttribute("href");
  await page.goto("/cart");await expect(page.getByText("SAMPLE CPU Orbit 3",{exact:true})).toBeVisible();await page.getByRole("link",{name:"Checkout",exact:true}).click();
  await page.getByRole("textbox",{name:"Name",exact:true}).fill("SAMPLE Test Customer");await page.getByRole("textbox",{name:"BD phone"}).fill("01000000000");
  await page.getByRole("combobox",{name:"Division",exact:true}).selectOption({label:"Dhaka"});
  await page.getByRole("combobox",{name:"District",exact:true}).selectOption({index:1});await page.getByRole("combobox",{name:"Upazila",exact:true}).selectOption({index:1});
  await page.getByRole("textbox",{name:"Street / house"}).fill("SAMPLE address, no delivery");
  await expect(page.getByRole("radio",{name:"bKash — coming soon"})).toBeDisabled();
  await page.getByRole("button",{name:"Review order",exact:true}).click();await expect(page.getByRole("heading",{name:"Review your order"})).toBeVisible();
  await page.getByRole("button",{name:"Confirm COD order"}).click();await expect(page.getByRole("heading",{name:"Order confirmed"})).toBeVisible();
  await expect(page.getByText("Cash on Delivery · Payment: unpaid")).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const orderUrl=page.url();const stranger=await browser.newContext();const other=await stranger.newPage();await other.goto(orderUrl);await expect(other.getByRole("heading",{name:"Order confirmed"})).toHaveCount(0);
  await other.goto(`http://127.0.0.1:3100${sharePath}`);await expect(other.getByRole("heading",{name:"My FUTERA build"})).toBeVisible();await expect(other.getByText("SAMPLE Test Customer",{exact:true})).toHaveCount(0);await expect(other.getByRole("img",{name:"QR code to this public build"})).toBeVisible();await other.emulateMedia({media:"print"});await other.screenshot({path:info.outputPath("quote-print.png"),fullPage:true});const pdf=await other.pdf({path:info.outputPath("sample-build-quote.pdf"),format:"A4"});expect(pdf.length).toBeGreaterThan(1000);await stranger.close();
  const oldCookies=await page.context().cookies();await page.goto("/account");await page.getByRole("button",{name:"Log out",exact:true}).click();await expect(page).toHaveURL(/\/login$/);await page.goto(orderUrl);await expect(page.getByRole("heading",{name:"Order confirmed"})).toHaveCount(0);
  const revoked=await browser.newContext();await revoked.addCookies(oldCookies);const stale=await revoked.newPage();await stale.goto(orderUrl);await expect(stale.getByRole("heading",{name:"Order confirmed"})).toHaveCount(0);await revoked.close();
  await page.goto("/login");await page.getByRole("textbox",{name:"Email",exact:true}).fill(email);await page.getByLabel("Password (12–128 characters)").fill("SAMPLE-test-password-123!");await page.getByRole("button",{name:"Log in",exact:true}).click();await expect(page).toHaveURL(/\/account$/);await page.goto(orderUrl);await expect(page.getByRole("heading",{name:"Order confirmed"})).toBeVisible();
});

test("admin edits a product and the storefront reflects it",async({page,browser},info)=>{
 test.setTimeout(120000);
 await page.goto("/admin");await expect(page).toHaveURL(/\/login$/);
 await page.getByRole("textbox",{name:"Email",exact:true}).fill("admin@example.test");
 await page.getByLabel("Password (12–128 characters)").fill("SAMPLE-admin-password-123!");
 await page.getByRole("button",{name:"Log in",exact:true}).click();await expect(page).toHaveURL(/\/account$/);
 for(const view of ["overview","products","orders","users","coupons","shipping","compatibility","audit"]){
  await page.goto(`/admin?view=${view}`);await expect(page.getByRole("heading",{name:"Store administration"})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${view}`).toBe(true);
 }
 await page.goto("/admin?view=products&product=sample-monitor-02");
 await expect(page.getByRole("heading",{name:"Monitor specifications"})).toBeVisible();
 const name=`SAMPLE Admin Monitor ${info.project.name}`;await page.getByRole("textbox",{name:"name",exact:true}).fill(name);
 await page.getByLabel("Audit reason").first().fill("Correct sample monitor title");
 await page.getByRole("button",{name:"Save product",exact:true}).click();
 await expect(page.getByRole("dialog")).toBeVisible();
 const mutation=page.waitForRequest(request=>request.method()==="POST"&&!!request.headers()["next-action"]);
 await page.getByRole("button",{name:"Confirm change",exact:true}).click();const captured=await mutation;
 await expect(page.getByRole("status").first()).toContainText("Saved.");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:info.outputPath("admin-product.png"),fullPage:true});
 const guest=await browser.newContext();const storefront=await guest.newPage();await storefront.goto("http://127.0.0.1:3100/products/sample-monitor-02");
 await expect(storefront.getByRole("heading",{name,exact:true})).toBeVisible();
 // Replay the action against a public route: the action must enforce its own guard.
 const replay=await guest.request.post("http://127.0.0.1:3100/",{headers:{"next-action":captured.headers()["next-action"],"content-type":captured.headers()["content-type"],origin:"http://127.0.0.1:3100"},data:captured.postDataBuffer()!,maxRedirects:0});
 // Next forwards this public-route action to /admin; its proxy denial may be
 // represented by an empty JSON transport response instead of a redirect status.
 if(replay.status()===200)expect(await replay.text()).toBe("{}");
 else {expect([303,307]).toContain(replay.status());expect(replay.headers()["x-action-redirect"]??replay.headers().location).toContain("/login");}
 await storefront.reload();await expect(storefront.getByRole("heading",{name,exact:true})).toBeVisible();await guest.close();
 await page.goto("/admin?view=audit");await expect(page.getByRole("cell").filter({hasText:"Correct sample monitor title"}).first()).toBeVisible();
});
