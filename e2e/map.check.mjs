// ABOUTME: One-off check of the living map: screenshots at rest, with say-no on, and mid-replay, plus console errors.
// ABOUTME: Run against the preview; images land in shots/.
import { chromium } from "@playwright/test";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://127.0.0.1:4173/?gpu=1#map");
await page.waitForSelector("[data-testid=city-map] canvas", { timeout: 20000 });
const shot = async (name) => {
  await page.getByTestId("city-map").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);
  const box = await page.getByTestId("city-map").boundingBox();
  await page.screenshot({ path: `shots/map-${name}.png`, clip: { x: box.x, y: box.y, width: box.width, height: box.height } });
};
await shot("rest");
await page.getByRole("button", { name: "Say no" }).click();
await shot("sayno");
await page.getByRole("button", { name: "Replay the attack" }).click();
await page.getByRole("button", { name: /^Next/ }).click();
await page.getByRole("button", { name: /^Next/ }).click();
await shot("replay");
console.log("errors:", errors.length, errors.slice(0, 3));
await browser.close();
