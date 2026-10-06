// ABOUTME: Every published document belongs to exactly one Resources section, and previous and next stay inside it.
// ABOUTME: Guards the navigation the document pages draw from src/lib/sections.ts.

import { describe, expect, it } from "vitest";
import manifest from "../../content/collateral/manifest.json";
import { SECTIONS, TOPICS, neighbours, sectionOf } from "./sections";

describe("resources sections", () => {
  it("places every document in exactly one section", () => {
    for (const d of manifest.documents) expect(SECTIONS.filter((s) => s.docs.some((x) => x.slug === d.slug))).toHaveLength(1);
  });
  it("leads the articles with the checklist and groups research by topic", () => {
    expect(sectionOf("articles/operating-mcp-checklist").docs[0].slug).toBe("articles/operating-mcp-checklist");
    expect(TOPICS.length).toBeGreaterThanOrEqual(4);
  });
  it("keeps previous and next within the section", () => {
    const first = SECTIONS[1].docs[0];
    expect(neighbours(first.slug).prev).toBeNull();
    expect(sectionOf(neighbours(first.slug).next!.slug).id).toBe("research");
  });
});
