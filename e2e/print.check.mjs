// ABOUTME: One-off check that the print stylesheet yields the checklist and nothing else, as a PDF.
// ABOUTME: Run against the preview; the PDF lands in shots/.
import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("http://127.0.0.1:4173/?g=PPFPPP#gates");
await page.emulateMedia({ media: "print" });
const text = await page.evaluate(() => document.body.innerText);
await page.pdf({ path: "shots/checklist.pdf", format: "Letter", printBackground: false });
console.log("gates on page:", (text.match(/Gate \d:/g) || []).length, "| hero title present:", text.includes("Walk a server through"));
await browser.close();
