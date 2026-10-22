import { expect, test } from "@playwright/test";

test("foundation is responsive, keyboard accessible and honest about availability", async ({ page, request }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Build Your Dream PC. Perfectly Compatible.");
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  expect(await page.getByRole("link", { name: "Skip to content" }).evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  if (testInfo.project.name === "mobile-360") {
    const menu = page.getByRole("button", { name: "Open menu" });
    await menu.click();
    await expect(page.getByRole("dialog", { name: "Explore FUTERA" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
  }
  await page.getByRole("button", { name: "Cart information" }).click();
  await expect(page.getByRole("dialog", { name: "Your next build starts here" })).toBeVisible();
  expect(await page.getByRole("dialog").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  const close = await page.getByRole("button", { name: "Close", exact: true }).boundingBox();
  expect(close?.width).toBeGreaterThanOrEqual(44);
  expect(close?.height).toBeGreaterThanOrEqual(44);
  await expect(page.getByText("Checkout is not available. Explore your saved cart preview.")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.screenshot({ path: testInfo.outputPath("home.png"), fullPage: true });
  const health = await request.get("/api/health");
  expect(health.ok()).toBe(true);
  expect(await health.json()).toEqual({ status: "ok", service: "futera", check: "liveness" });
});

test("theme persists, home sections and public information remain usable",async({page},info)=>{
 await page.goto("/");await expect(page.locator("main section")).toHaveCount(10);
 await page.getByRole("button",{name:"Switch to light mode"}).click();await expect(page.locator("html")).toHaveAttribute("data-theme","light");await page.reload();await expect(page.locator("html")).toHaveAttribute("data-theme","light");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:info.outputPath("home-light.png"),fullPage:true});
 for(const path of ["/about","/contact","/privacy","/support","/assistant"]){await page.goto(path);await expect(page.getByRole("heading",{level:1})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await expect(page.getByRole("button",{name:"Recommend components"})).toBeDisabled();await expect(page.getByRole("button",{name:"Ask for guidance"})).toBeDisabled();
});
