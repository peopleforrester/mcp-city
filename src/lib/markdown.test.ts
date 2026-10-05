// ABOUTME: Relative links in collateral documents resolve against the document's folder, to the site when published here.
// ABOUTME: The source ledger's link to approval-process-criteria.md once pointed at the repo root and 404ed.

import { describe, expect, it } from "vitest";
import { renderMarkdown, resolveRelative } from "./markdown";

const docs = [{ src: "research/approval-process-criteria.md", slug: "approval-process-criteria" }];

describe("markdown links", () => {
  it("resolves against the document's folder", () => {
    expect(resolveRelative("research/source-ledger.md", "approval-process-criteria.md")).toBe("research/approval-process-criteria.md");
    expect(resolveRelative("sources/sources.md", "../research/source-ledger.md")).toBe("research/source-ledger.md");
  });
  it("links a published document to its page on the site", () => {
    const { html } = renderMarkdown("[x](approval-process-criteria.md#gate-1)", "research/source-ledger.md", docs);
    expect(html).toContain('href="/resources/approval-process-criteria/#gate-1"');
  });
  it("links anything else to GitHub at its real path", () => {
    const { html } = renderMarkdown("[x](../diagrams/architecture.mmd)", "sources/sources.md", docs);
    expect(html).toContain('href="https://github.com/peopleforrester/mcp-for-a-city/blob/main/diagrams/architecture.mmd"');
  });
  it("strips front matter and takes the first heading as the title", () => {
    expect(renderMarkdown("---\ntitle: t\n---\n\n# Hello\n\nbody").title).toBe("Hello");
  });
});
