// ABOUTME: Relative links in collateral documents resolve against the document's folder, to the site when published here.
// ABOUTME: The source ledger's link to approval-process-criteria.md once pointed at the repo root and 404ed.

import { describe, expect, it } from "vitest";
import { renderMarkdown, resolveRelative } from "./markdown";

const docs = [{ src: "06-research-and-source-ledger/approval-process-criteria.md", slug: "approval-process-criteria" }];

describe("markdown links", () => {
  it("resolves against the document's folder", () => {
    expect(resolveRelative("06-research-and-source-ledger/source-ledger.md", "approval-process-criteria.md")).toBe("06-research-and-source-ledger/approval-process-criteria.md");
    expect(resolveRelative("07-sources-slide/sources.md", "../06-research-and-source-ledger/source-ledger.md")).toBe("06-research-and-source-ledger/source-ledger.md");
  });
  it("links a published document to its page on the site", () => {
    const { html } = renderMarkdown("[x](approval-process-criteria.md#gate-1)", "06-research-and-source-ledger/source-ledger.md", docs);
    expect(html).toContain('href="/resources/approval-process-criteria/#gate-1"');
  });
  it("links anything else to GitHub at its real path", () => {
    const { html } = renderMarkdown("[x](../05-architecture-diagrams/architecture.mmd)", "07-sources-slide/sources.md", docs);
    expect(html).toContain('href="https://github.com/peopleforrester/mcp-for-a-city/blob/main/05-architecture-diagrams/architecture.mmd"');
  });
  it("strips front matter and takes the first heading as the title", () => {
    expect(renderMarkdown("---\ntitle: t\n---\n\n# Hello\n\nbody").title).toBe("Hello");
  });
});
