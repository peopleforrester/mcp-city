// ABOUTME: One-off check of the scroll-driven descent: screenshots at orbit, mid-descent and the desk, plus console errors.
// ABOUTME: Run against the preview; images land in test-results/.
import { chromium } from "@playwright/test";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://127.0.0.1:4173/");
await page.waitForSelector("[data-testid=skyline] canvas", { timeout: 15000 });
for (const [name, frac] of [["orbit", 0], ["mid", 0.5], ["desk", 1]]) {
  await page.evaluate((f) => window.scrollTo(0, (document.documentElement.scrollHeight * 0 + 1600) * f), frac);
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `shots/descent-${name}.png`, clip: { x: 0, y: 0, width: 1280, height: 800 } });
}
console.log("errors:", errors.length, errors.slice(0, 3));
await browser.close();
