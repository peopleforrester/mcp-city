// ABOUTME: Renders a collateral Markdown document to HTML at build time, with the ABOUTME header stripped.
// ABOUTME: Links into the collateral repo's own paths are rewritten to the GitHub blob so they still resolve.

import { marked } from "marked";

const REPO = "https://github.com/peopleforrester/mcp-for-a-city/blob/main/";

export function renderMarkdown(md: string): { title: string; html: string } {
  const body = md.replace(/^---\n[\s\S]*?\n---\n\s*/, "").replace(/^<!--[\s\S]*?-->\s*/, "");
  const title = body.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "";
  const withoutTitle = body.replace(/^#\s+.+\n/m, "");
  const html = marked.parse(withoutTitle, { gfm: true, async: false }) as string;
  return { title, html: html.replace(/href="(?!https?:|#|\/|mailto:)([^"]+)"/g, (_, p) => `href="${REPO}${p.replace(/^\.\.\//, "")}"`) };
}
