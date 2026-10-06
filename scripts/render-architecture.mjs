// ABOUTME: Renders public/architecture/architecture.mmd to an SVG with Mermaid 11.17.2, the major version the static PNG was drawn with.
// ABOUTME: Run with `node scripts/render-architecture.mjs` after the diagram changes; needs Playwright's Chromium, so the SVG is committed.

import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

const MERMAID = "https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.esm.min.mjs";
const source = readFileSync("public/architecture/architecture.mmd", "utf8");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 2400, height: 1400 } });
await page.setContent(`<!doctype html><html><body style="margin:0;background:#fff"><div id="out"></div>
<script type="module">
  import mermaid from "${MERMAID}";
  mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
  const { svg } = await mermaid.render("arch", ${JSON.stringify(source)});
  document.getElementById("out").innerHTML = svg;
  window.done = true;
</script></body></html>`);
await page.waitForFunction(() => window.done === true, null, { timeout: 60000 });
const svg = await page.$eval("#out", (el) => el.innerHTML);
await browser.close();
writeFileSync("public/architecture/architecture.svg", svg);
console.log(`architecture.svg: ${svg.length} bytes`);
