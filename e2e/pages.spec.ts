// ABOUTME: Every page of the site stands on its own: it loads, has one h1 with the page's name, and the nav reaches it.
// ABOUTME: Runs against the preview build and, with E2E_BASE_URL, against the live site.

import { expect, test } from "@playwright/test";

const PAGES: [string, string][] = [
  ["/usb/", "Eighteen years of USB"],
  ["/scale/", "A workforce the size of a city"],
  ["/the-attack/", "The attack"],
  ["/architecture/", "The architecture"],
  ["/film/", "The film"],
  ["/presentation/", "The presentation"],
  ["/resources/", "Resources"],
  ["/resources/source-ledger/", "ledger"],
  ["/resources/art/", "The art"],
  ["/resources/articles/part-2-security/", "Nobody Vets MCP Servers"],
];

for (const [path, name] of PAGES) {
  test(`${path} stands on its own`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(new RegExp(name, "i"));
    const phone = (page.viewportSize()?.width ?? 1280) < 768;
    const nav = page.getByRole("navigation", { name: "Site" });
    if (phone) await expect(nav.getByRole("button", { name: "Menu" })).toBeVisible();
    else await expect(nav.getByText("The presentation", { exact: false }).first()).toBeVisible();
  });
}

test("the presentation shows every slide with its notes", async ({ page }) => {
  await page.goto("/presentation/");
  const slides = page.locator("li[id^=slide-]");
  await expect(slides).toHaveCount(39);
  await expect(slides.first().locator("img")).toHaveAttribute("src", /slides\/01\.webp/);
});

test("the home page carries a card for every page", async ({ page }) => {
  await page.goto("/");
  for (const name of ["MCP approval gates", "The architecture", "Eighteen years of USB", "The presentation", "Resources"]) {
    await expect(page.getByRole("link", { name, exact: true }).first()).toBeVisible();
  }
});

test("the USB history lives only on its own page, and old links follow it", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#plugs")).toHaveCount(0);
  // A fresh load of the old link, the way a bookmark or a shared URL arrives.
  await page.goto("/resources/");
  await page.goto("/#plugs");
  await expect(page).toHaveURL(/\/usb\/$/);
  // And an in-page jump to the old anchor.
  await page.goto("/");
  await page.evaluate(() => { window.location.hash = "plugs"; });
  await expect(page).toHaveURL(/\/usb\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Eighteen years of USB");
});

test("the header groups the pages, and on a phone it is a menu that does not stick", async ({ page }) => {
  await page.goto("/usb/");
  const phone = (page.viewportSize()?.width ?? 1280) < 768;
  const header = page.locator("header");
  if (phone) {
    const box = await header.boundingBox();
    expect(box!.height).toBeLessThan(90);
    await page.getByRole("button", { name: "Menu" }).click();
    await page.locator("#phone-menu summary", { hasText: "The presentation" }).click();
    await page.locator("#phone-menu").getByRole("link", { name: "Slides and speaker notes" }).click();
    await expect(page).toHaveURL(/\/presentation\/$/);
    await page.mouse.wheel(0, 2000);
    await expect(page.locator("header")).not.toBeInViewport();
  } else {
    await page.locator("header nav summary", { hasText: "Resources" }).first().click();
    await page.locator("header").getByRole("link", { name: "What changed" }).first().click();
    await expect(page).toHaveURL(/\/resources\/changes\/$/);
  }
});
