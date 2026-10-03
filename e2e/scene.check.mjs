// ABOUTME: One-off check that the lazy skyline mounts without console errors on a desktop viewport.
// ABOUTME: Run against the preview; prints errors and saves a hero screenshot to test-results/.
import { chromium } from "@playwright/test";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://127.0.0.1:4173/?gpu=1");
await page.waitForSelector("[data-testid=skyline] canvas", { timeout: 15000 });
await page.waitForTimeout(2500);
await page.screenshot({ path: "test-results/hero.png", clip: { x: 0, y: 0, width: 1280, height: 700 } });
console.log("errors:", errors.length, errors.slice(0, 5));
await browser.close();
