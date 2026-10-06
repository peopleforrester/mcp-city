// ABOUTME: Every page of the site stands on its own: it loads, has one h1 with the page's name, and the nav reaches it.
// ABOUTME: Runs against the preview build and, with E2E_BASE_URL, against the live site.

import { expect, test } from "@playwright/test";

const PAGES: [string, string][] = [
  ["/usb/", "Eighteen years of USB"],
  ["/spec/", "How the MCP spec evolves"],
  ["/scale/", "A workforce the size of a city"],
  ["/the-attack/", "The attack"],
  ["/architecture/", "The architecture"],
  ["/film/", "The film"],
  ["/presentation/", "The presentation"],
  ["/resources/", "Resources"],
  ["/resources/source-ledger/", "ledger"],
  ["/resources/art/", "The art"],
  ["/resources/articles/part-2-security/", "Everyone Vets MCP Servers Alone"],
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
  for (const name of ["The MCP acceptance process", "The architecture", "How the MCP spec evolves", "The presentation", "Resources"]) {
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

test("an unknown address gets the not-found page with every page listed", async ({ page }) => {
  await page.goto("/404/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Not found");
  await expect(page.getByRole("link", { name: "Slides and speaker notes" }).last()).toBeVisible();
});

test("the film carries captions and a chapter list that seeks the video", async ({ page }) => {
  await page.goto("/film/");
  await expect(page.locator('video track[kind="captions"]')).toHaveAttribute("src", "/film/captions.en.vtt");
  const scenes = page.getByRole("list", { name: "Scenes" }).getByRole("button");
  await expect(scenes).toHaveCount(11);
  const caps = await page.request.get("/film/captions.en.vtt");
  expect(caps.ok()).toBeTruthy();
  expect(await caps.text()).toContain("WEBVTT");
});

test("search finds a slide, a gate and a document, and the query is a link", async ({ page }) => {
  await page.goto("/search/?q=passthrough");
  await expect(page.getByRole("searchbox")).toHaveValue("passthrough");
  const results = page.getByRole("region", { name: "Results" }).getByRole("link");
  await expect(results.first()).toBeVisible();
  expect(await results.count()).toBeGreaterThan(2);
  await page.getByRole("searchbox").fill("SOC 2 Type II");
  await expect(page.getByRole("link", { name: /Gate 6/ })).toBeVisible();
  await expect(page).toHaveURL(/q=SOC\+2\+Type\+II|q=SOC%202%20Type%20II/);
});

test("every page carries the cookieless visit counter, limited to the live domain", async ({ page }) => {
  for (const path of ["/", "/presentation/", "/gates/", "/resources/articles/part-1-operational-excellence/"]) {
    await page.goto(path);
    const tag = page.locator("script[data-website-id]");
    await expect(tag).toHaveCount(1);
    await expect(tag).toHaveAttribute("data-domains", "mcp.michaelrishiforrester.com");
  }
  expect((await page.context().cookies()).length).toBe(0);
});

test("the hero gives the keynote's scheduled slot", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Tuesday, October 6, 2026, 9:59 EDT")).toBeVisible();
});


test("the gates page walks by keyboard and its share links reopen the walk there", async ({ page }) => {
  await page.goto("/gates/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("six gates");
  for (let i = 0; i < 6; i++) {
    const pass = page.getByRole("button", { name: /Pass: lift the barrier/ });
    await pass.focus();
    await page.keyboard.press("Enter");
  }
  await expect(page.getByTestId("result")).toContainText("Admitted");
  await expect(page).toHaveURL(/\/gates\/\?g=PPPPPP$/);
  await page.goto("/gates/?g=PFUUUU");
  await expect(page.getByTestId("alley")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Gate 6:/ }).first()).toBeVisible();
});

test("the feed is served and every page points at it", async ({ page }) => {
  const res = await page.request.get("/feed.xml");
  expect(res.ok()).toBeTruthy();
  expect(await res.text()).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
  await page.goto("/resources/");
  await expect(page.locator('link[rel="alternate"][type="application/atom+xml"]')).toHaveAttribute("href", "/feed.xml");
});

test("pressing / opens search, but not while typing", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 768, "a keyboard shortcut is for keyboards");
  await page.goto("/gates/");
  await page.locator("main").click({ position: { x: 5, y: 5 } });
  await page.keyboard.press("/");
  await expect(page).toHaveURL(/\/search\/$/);
  await page.getByRole("searchbox").fill("a/b");
  await expect(page.getByRole("searchbox")).toHaveValue("a/b");
  await expect(page.getByRole("link", { name: "Search" }).first()).toHaveAttribute("aria-keyshortcuts", "/");
});

test("the film section invites, gives the runtime, and links the download and the repo", async ({ page }) => {
  await page.goto("/film/");
  await expect(page.getByText("Watch the short shadow-play version of the talk (5 min 17 s).")).toBeVisible();
  await expect(page.getByRole("link", { name: "Download the 1080p cut" })).toHaveAttribute("href", /mcp-city-film\/releases\/tag\//);
  await expect(page.getByRole("link", { name: "The film's source on GitHub" })).toHaveAttribute("href", "https://github.com/peopleforrester/mcp-city-film");
});
