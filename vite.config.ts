// ABOUTME: Vite with React and Tailwind; three.js split into its own chunk so first paint never waits on it.
// ABOUTME: Vitest runs in jsdom with the testing-library matchers.

/// <reference types="vitest/config" />
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { PAGES } from "./routes.js";


const SITE = "https://mcp.michaelrishiforrester.com";
/** Pages served from public/ rather than built by Vite. */
const STATIC_PAGES = ["gates", "wrapping"];

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

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap()],
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
