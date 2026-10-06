// ABOUTME: Vite with React and Tailwind; three.js split into its own chunk so first paint never waits on it.
// ABOUTME: Vitest runs in jsdom with the testing-library matchers.

/// <reference types="vitest/config" />
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { atomFeed, type FeedDoc } from "./feed.js";
import { PAGES } from "./routes.js";
import { ANALYTICS } from "./src/data/links.js";


const SITE = "https://mcp.michaelrishiforrester.com";
/** Pages served from public/ rather than built by Vite. */
const STATIC_PAGES: string[] = [];

/** Writes dist/sitemap.xml from the page list once the build closes, so a new page is listed without editing XML. */
function sitemap(): Plugin {
  return {
    name: "sitemap",
    apply: "build",
    closeBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const urls = [...PAGES.filter((p: string) => p !== "404"), ...STATIC_PAGES].map((p) => `  <url><loc>${SITE}/${p ? `${p}/` : ""}</loc><lastmod>${today}</lastmod></url>`);
      writeFileSync(resolve(__dirname, "dist/sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
    },
  };
}

/** Adds the visit counter to every built page; data-domains keeps previews and tests from counting. */
function analytics(): Plugin {
  return {
    name: "analytics",
    apply: "build",
    transformIndexHtml: () => [
      {
        tag: "script",
        attrs: { defer: true, src: ANALYTICS.script, "data-website-id": ANALYTICS.websiteId, "data-domains": ANALYTICS.domain },
        injectTo: "head",
      },
    ],
  };
}

/** Writes dist/feed.xml from the change history and points every page's head at it. */
function feed(): Plugin {
  return {
    name: "feed",
    apply: "build",
    transformIndexHtml: () => [
      { tag: "link", attrs: { rel: "alternate", type: "application/atom+xml", title: "What changed", href: "/feed.xml" }, injectTo: "head" },
    ],
    closeBundle() {
      const manifest = JSON.parse(readFileSync(resolve(__dirname, "content/collateral/manifest.json"), "utf8")) as { repo: string; documents: FeedDoc[] };
      writeFileSync(resolve(__dirname, "dist/feed.xml"), atomFeed(manifest.documents, manifest.repo));
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap(), analytics(), feed()],
  build: {
    rollupOptions: {
      // One HTML entry per page; each is real static HTML served by Caddy.
      input: Object.fromEntries(PAGES.map((p: string) => [p || "index", resolve(__dirname, p ? `${p}/index.html` : "index.html")])),
      output: {
        // React gets its own chunk; without it the bundler folds React into "three" and every page downloads the 3D library.
        manualChunks: (id: string) =>
          /node_modules\/(react|react-dom|scheduler)\//.test(id) ? "react" : /node_modules\/(three|@react-three|postprocessing)/.test(id) ? "three" : undefined,
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
