import { expect, test } from "@playwright/test";

test("guides, help search and contact channels remain usable across themes", async ({ page, context }, testInfo) => {
  for (const theme of ["light", "dark"]) {
    await context.addCookies([{ name: "futera-theme", value: theme, url: testInfo.project.use.baseURL as string }]);
    await page.goto("/guides");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Build with a\s*clearer plan\./);
    const topics = page.getByRole("navigation", { name: "Guide topics", exact: true });
    await expect(topics.getByRole("link")).toHaveCount(3);
    await topics.getByRole("link").nth(1).click();
    await expect(page).toHaveURL(/#compatibility$/);
    await expect(page.locator("#compatibility h2")).toBeInViewport();
    await page.getByRole("navigation", { name: "Guide contents", exact: true }).getByRole("link").nth(2).click();
    await expect(page).toHaveURL(/#sharing$/);
    await expect(page.locator("#sharing h2")).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`guides-${theme}.png`) });

    await page.goto("/support");
    const search = page.getByRole("searchbox", { name: "Search help topics", exact: true });
    await expect(page.locator(".support-faq-list details")).toHaveCount(7);
    await search.fill("compare");
    await expect(page.locator(".support-faq-list details")).toHaveCount(1);
    await expect(page.getByRole("status")).toContainText("1 answer");
    const summary = page.locator(".support-faq-list summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".support-faq-list details")).toHaveAttribute("open", "");
    await expect(page.locator(".support-faq-list details p")).toBeVisible();
    await page.getByRole("button", { name: "Clear help search", exact: true }).click();
    await expect(page.locator(".support-faq-list details")).toHaveCount(7);
    await search.fill("zzzz-no-matching-topic");
    await expect(page.getByRole("heading", { name: "No matching help topics", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Show all answers", exact: true }).click();
    await expect(page.locator(".support-faq-list details")).toHaveCount(7);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`support-${theme}.png`) });

    await page.goto("/contact");
    await expect(page.locator('main a[href="mailto:mdshamim.mern@gmail.com"]')).toBeVisible();
    await expect(page.locator('main a[href="tel:+8801865190471"]')).toBeVisible();
    const social = page.getByRole("navigation", { name: "Contact social channels", exact: true });
    await expect(social.getByRole("link")).toHaveCount(4);
    for (const link of await social.getByRole("link").all()) {
      await expect(link).toHaveAttribute("href", /^https:\/\//);
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    await expect(page.getByRole("link", { name: "View area on Google Maps", exact: true })).toHaveAttribute("href", /google\.com\/maps\/search\/\?api=1&query=/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`contact-${theme}.png`) });
    await page.getByRole("link", { name: "Help & support", exact: true }).first().click();
    await expect(page).toHaveURL(/\/support$/);
    await page.getByRole("navigation", { name: "Support topics", exact: true }).getByRole("link").nth(2).click();
    await expect(page).toHaveURL(/\/guides$/);
  }
});
