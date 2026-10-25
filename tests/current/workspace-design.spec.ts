import { expect, test } from "@playwright/test";

test("product, assistant and builder workspaces remain responsive and usable", async ({ page, context }, testInfo) => {
  for (const theme of ["light", "dark"]) {
    await context.addCookies([{ name: "futera-theme", value: theme, url: testInfo.project.use.baseURL as string }]);
    await page.goto("/products");
    const productLink = page.locator(".catalog-card-main").first();
    await expect(productLink).toBeVisible();
    await productLink.click();
    await expect(page.locator(".detail-summary h1")).toBeVisible();
    await expect(page.getByRole("button", { name: "Add to build shortlist", exact: true })).toBeVisible();
    const thumbnails = page.locator(".detail-thumbnails button");
    if (await thumbnails.count() > 1) {
      await thumbnails.nth(1).click();
      await expect(thumbnails.nth(1)).toHaveAttribute("aria-pressed", "true");
      await thumbnails.first().focus();
      await page.keyboard.press("Enter");
      await expect(thumbnails.first()).toHaveAttribute("aria-pressed", "true");
    }
    await page.getByRole("navigation", { name: "Product sections" }).getByRole("link", { name: "Specifications", exact: true }).click();
    await expect(page.locator("#specifications table")).toBeVisible();
    await expect(page.locator("#reviews")).toBeAttached();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`details-${theme}.png`) });

    await page.goto("/assistant");
    await expect(page.getByRole("heading", { name: "Component recommendations", exact: true })).toBeVisible();
    for (const panel of await page.locator(".assistant-panel").all()) {
      const prompt = panel.locator(".assistant-prompts button").first();
      if (await prompt.isEnabled()) {
        await prompt.click();
        const question = panel.locator("textarea");
        await expect(question).not.toHaveValue("");
        await question.fill("abc");
        expect(await question.evaluate((element: HTMLTextAreaElement) => element.checkValidity())).toBe(false);
        await prompt.click();
        expect(await question.evaluate((element: HTMLTextAreaElement) => element.checkValidity())).toBe(true);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`assistant-${theme}.png`) });

    await page.goto("/pc-builder");
    await expect(page.getByRole("button", { name: "Select CPU", exact: true })).toBeEnabled();
    await page.getByRole("button", { name: "Select CPU", exact: true }).click();
    const picker = page.locator(".builder-picker");
    await expect(picker.getByRole("heading", { name: "Select CPU", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await picker.locator("article").first().getByRole("button", { name: /^Select / }).click();
    await expect(page.locator("#part-cpu .builder-selected")).toBeVisible();
    await expect(page.locator("#part-cpu").getByRole("button", { name: /^Change / })).toBeEnabled();
    if ((page.viewportSize()?.width ?? 0) < 1024) {
      await page.getByRole("button", { name: "View summary", exact: true }).click();
      await expect(page.getByRole("heading", { name: "Your build at a glance", exact: true })).toBeVisible();
      await expect(page.getByRole("dialog").getByText("1/7 required parts selected", { exact: true })).toBeVisible();
      await page.getByRole("dialog").getByRole("button", { name: "Close", exact: true }).click();
      await expect(page.getByRole("dialog")).toHaveCount(0);
    } else {
      await expect(page.getByTestId("desktop-summary").getByText("1/7 required parts selected", { exact: true })).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator("#part-cpu").scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath(`builder-${theme}.png`) });
    await page.locator("#part-cpu").getByRole("button", { name: /^Remove / }).click();
    await expect(page.getByRole("button", { name: "Select CPU", exact: true })).toBeEnabled();
  }
});
