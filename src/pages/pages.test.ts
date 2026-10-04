/// <reference types="node" />
// ABOUTME: Every route in the Vite page list has its HTML entry, its entry module, a title and a description.
// ABOUTME: Catches a page added to one place and not the others before the build silently drops it.

import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PAGES } from "../../routes";

describe("pages", () => {
  it("lists the home page and at least the planned routes", () => {
    for (const p of ["", "usb", "scale", "the-attack", "architecture", "film", "presentation", "resources"]) expect(PAGES).toContain(p);
  });
  it.each(PAGES.filter(Boolean))("/%s/ has an entry, a title, a description and a canonical", (p) => {
    const html = readFileSync(`${p}/index.html`, "utf8");
    expect(existsSync(`src/entries/${p}.tsx`)).toBe(true);
    expect(html).toMatch(/<title>[^<]+<\/title>/);
    expect(html).toMatch(/name="description" content="[^"]+"/);
    expect(html).toContain(`href="https://mcp.michaelrishiforrester.com/${p}/"`);
    expect(html).toContain(`/src/entries/${p}.tsx`);
  });
  it("keeps no static stub where a page entry exists", () => {
    for (const p of PAGES.filter(Boolean)) expect(existsSync(`public/${p}/index.html`)).toBe(false);
  });
});
