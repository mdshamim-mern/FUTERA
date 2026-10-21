import { expect, test } from "@playwright/test";

test("browse, URL-filter, open a product and save a preview selection", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore components", exact: true }).first().click();
  await expect(page).toHaveURL(/\/products/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  if ((page.viewportSize()?.width ?? 0) < 1024) await page.getByRole("button", { name: "Filters & sort" }).click();
  const filters = (page.viewportSize()?.width ?? 0) < 1024 ? page.getByRole("dialog", { name: "Filter components" }) : page.getByRole("complementary", { name: "Catalog filters" });
  await filters.getByRole("combobox", { name: "Category", exact: true }).selectOption("cpu");
  await filters.getByRole("combobox", { name: "Availability", exact: true }).selectOption("available");
  await filters.getByRole("combobox", { name: "Sort by", exact: true }).selectOption("price-asc");
  await filters.getByRole("button", { name: "Apply filters" }).click();
  await expect(page).toHaveURL(/category=cpu/);
  await expect(page.getByTestId("product-card")).toHaveCount(7);
  await expect(page.getByTestId("product-card").first()).toContainText("SAMPLE CPU Vector 2");
  await page.screenshot({ path: testInfo.outputPath("products.png"), fullPage: true });
  await page.getByRole("link", { name: /SAMPLE CPU Vector 2/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("SAMPLE CPU Vector 2");
  await expect(page.getByRole("table")).toContainText("LGA1700");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Show image 2" }).click();
  await expect(page.getByRole("button", { name: "Show image 2" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Add to cart preview" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Your cart preview");
  await expect(page.getByRole("main")).toContainText("SAMPLE CPU Vector 2");
  await page.reload();
  await expect(page.getByRole("main")).toContainText("SAMPLE CPU Vector 2");
  await page.getByRole("button", { name: "Remove SAMPLE CPU Vector 2" }).click();
  await expect(page.getByRole("heading", { name: "Your selection is empty" })).toBeVisible();
  await page.goto("/products/sample-cpu-01");
  await expect(page.getByRole("button", { name: "Add to cart preview" })).toBeDisabled();
  await page.getByRole("button", { name: "Add to build shortlist" }).click();
  await expect(page.getByRole("heading", { name: "Your build shortlist" })).toBeVisible();
  await expect(page.getByRole("main")).toContainText("SAMPLE CPU Origin 1");
});

test("comparison cap, pagination, empty results and missing products", async ({ page }) => {
  await page.goto("/products");
  await page.getByRole("button", { name: "Compare", exact: true }).first().click();
  await page.getByRole("link", { name: "Next", exact: true }).click();
  await expect(page.getByText("Compare 1/3 selected", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Compare", exact: true }).first().click();
  await page.getByRole("button", { name: "Compare", exact: true }).first().click();
  await expect(page.getByRole("button", { name: "Compare", exact: true }).first()).toBeDisabled();
  await page.getByRole("link", { name: "Compare products", exact: true }).click();
  await expect(page.getByRole("link", { name: "Remove from comparison" })).toHaveCount(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("link", { name: "Remove from comparison" }).first().click();
  await expect(page.getByRole("link", { name: "Remove from comparison" })).toHaveCount(2);
  await page.goto("/products?q=absolutely-no-match");
  await expect(page.getByRole("heading", { name: "No components match these filters" })).toBeVisible();
  await page.goto("/products/not-a-product");
  // App Router can stream HTTP 200 before notFound resolves; verify the rendered contract.
  await expect(page.getByRole("heading", { name: "This page is still beyond the horizon" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", "noindex");
});
