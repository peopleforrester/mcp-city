/// <reference types="node" />
// ABOUTME: No published collateral document carries a site-relative link, which breaks the moment text is quoted from another site.
// ABOUTME: Two such links, copied from the MCP spec and from Microsoft Learn, resolved to 404s on this site before this check existed.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import manifest from "../../content/collateral/manifest.json";

describe("collateral documents", () => {
  it.each(manifest.documents.map((d) => d.slug))("%s has no site-relative links", (slug) => {
    const md = readFileSync(`content/collateral/${slug}.md`, "utf8");
    expect(md.match(/\]\(\/[^)]*\)/g) ?? []).toEqual([]);
  });
});
