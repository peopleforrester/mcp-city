/// <reference types="node" />
// ABOUTME: Every page names its own social preview card, and the card exists under public/og.
// ABOUTME: A new page without a card fails here; run `node scripts/og-images.mjs` to make one.

import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PAGES } from "../../routes";

const files = [...PAGES.filter((p) => p && p !== "404").map((p) => `${p}/index.html`), "public/gates/index.html", "public/wrapping/index.html", "public/presentation/video/index.html"];

describe("social preview cards", () => {
  it.each(files)("%s has its own card", (file) => {
    const html = readFileSync(file, "utf8");
    const img = html.match(/property="og:image" content="https:\/\/mcp\.michaelrishiforrester\.com(\/og\/[^"]+)"/)?.[1];
    expect(img, "og:image points at /og/").toBeTruthy();
    expect(existsSync(`public${img}`)).toBe(true);
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
  });
});
