// ABOUTME: One-off check of the gate road scene: screenshots at the start, after a fail, and after admission.
// ABOUTME: Run against the preview; images land in shots/.
import { chromium } from "@playwright/test";
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://127.0.0.1:4173/?gpu=1#gates");
await page.waitForSelector("[data-testid=gate-road] canvas", { timeout: 15000 });
const shot = async (name) => {
  await page.getByTestId("gate-road").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);
  const box = await page.getByTestId("gate-road").boundingBox();
  await page.screenshot({ path: `shots/gates-${name}.png`, clip: { x: box.x, y: box.y, width: box.width, height: box.height } });
};
await shot("start");
await page.getByRole("button", { name: /^Pass/ }).click();
await page.getByRole("button", { name: /^Pass/ }).click();
await page.getByRole("button", { name: /^Fail/ }).click();
await shot("fail");
await page.getByRole("button", { name: "3" }).click();
for (let i = 0; i < 4; i++) await page.getByRole("button", { name: /^Pass/ }).click();
await shot("admitted");
console.log("errors:", errors.length, errors.slice(0, 3));
await browser.close();
