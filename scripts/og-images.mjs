// ABOUTME: Renders a 1200x630 social preview card for every page and points the page's og:image and Twitter tags at it.
// ABOUTME: Run with `node scripts/og-images.mjs` after adding a page; needs Playwright's Chromium, so images are committed, not built on Railway.

import { chromium } from "@playwright/test";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SITE = "https://mcp.michaelrishiforrester.com";
const routes = JSON.parse(readFileSync("content/collateral/manifest.json", "utf8")).documents.map((d) => `resources/${d.slug}`);
const PAGES = ["gates", "wrapping", "usb", "spec", "scale", "the-attack", "architecture", "film", "presentation", "presentation/video", "resources", "resources/research", "resources/articles", "resources/art", "resources/changes", "search", "contact", ...routes];
/** Pages served straight from public/, outside the Vite build. */
const STATIC = [];

const pick = (html, re) => (html.match(re)?.[1] ?? "").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const art = `data:image/webp;base64,${readFileSync("public/art/city-1600.webp").toString("base64")}`;
const font = `data:font/woff2;base64,${readFileSync("public/fonts/bricolage-grotesque-variable.woff2").toString("base64")}`;

function card(title, kicker, line) {
  return `<!doctype html><html><head><style>
@font-face{font-family:B;src:url(${font}) format("woff2-variations");font-weight:200 800}
body{margin:0;width:1200px;height:630px;background:#051932 url(${art}) center 70%/cover;font-family:system-ui,sans-serif;color:#f8f8f2;overflow:hidden}
.v{position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,25,50,.96) 0%,rgba(5,25,50,.85) 55%,rgba(5,25,50,.35) 100%)}
.c{position:absolute;left:72px;top:64px;right:200px;bottom:64px;display:flex;flex-direction:column}
.k{font-size:24px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#ffb86c}
h1{font-family:B,system-ui;font-weight:700;font-size:${title.length > 48 ? 58 : 72}px;line-height:1.05;margin:24px 0 0}
p{font-size:28px;line-height:1.35;color:#b9bbc8;margin:24px 0 0;max-width:860px}
.f{margin-top:auto;font-size:24px;color:#8be9fd}
</style></head><body><div class="v"></div><div class="c"><div class="k">${esc(kicker)}</div><h1>${esc(title)}</h1><p>${esc(line)}</p><div class="f">mcp.michaelrishiforrester.com</div></div></body></html>`;
}

function setTag(html, attr, key, value) {
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*" ?/?>`);
  const tag = `<meta ${attr}="${key}" content="${value}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

mkdirSync("public/og", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const all = [...PAGES.map((p) => [p, `${p}/index.html`]), ...STATIC.map((p) => [p, `public/${p}/index.html`])];
let n = 0;
for (const [route, file] of all) {
  if (!existsSync(file)) throw new Error(`no page at ${file}`);
  let html = readFileSync(file, "utf8");
  const title = pick(html, /<title>([^<]+)<\/title>/);
  const desc = pick(html, /name="description" content="([^"]+)"/);
  const line = desc.length > 150 ? `${desc.slice(0, desc.lastIndexOf(" ", 147))}…` : desc;
  const kicker = route.startsWith("resources/articles/") ? "Operating MCP at Scale" : "Governing MCP for a Workforce the Size of a City";
  const slug = route.replace(/\//g, "-");
  await page.setContent(card(title, kicker, line), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/${slug}.jpg`, type: "jpeg", quality: 82 });
  const img = `${SITE}/og/${slug}.jpg`;
  html = setTag(html, "property", "og:image", img);
  html = setTag(html, "property", "og:title", title);
  if (desc) html = setTag(html, "property", "og:description", desc);
  html = setTag(html, "property", "og:url", `${SITE}/${route}/`);
  html = setTag(html, "name", "twitter:card", "summary_large_image");
  html = setTag(html, "name", "twitter:image", img);
  writeFileSync(file, html);
  n += 1;
  process.stderr.write(`\r${n} of ${all.length} cards`);
}
await browser.close();
process.stderr.write("\n");
