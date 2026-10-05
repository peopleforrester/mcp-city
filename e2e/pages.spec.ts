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
    await expect(page.getByRole("navigation").first().getByRole("link", { name: "The presentation" })).toBeVisible();
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
  await page.goto("/#plugs");
  await expect(page).toHaveURL(/\/usb\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Eighteen years of USB");
});
