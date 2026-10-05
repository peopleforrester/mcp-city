// ABOUTME: Renders a collateral Markdown document to HTML, with the ABOUTME header and front matter stripped.
// ABOUTME: Relative links resolve against the document's own folder: to the site's page when it is published here, else to GitHub.

import { marked } from "marked";

const REPO = "https://github.com/peopleforrester/mcp-for-a-city/blob/main/";

/** Resolves `target` against the folder of `from`, both repo-relative paths, the way a Markdown viewer on GitHub would. */
export function resolveRelative(from: string, target: string): string {
  const parts = from.split("/").slice(0, -1);
  for (const seg of target.split("/")) {
    if (seg === "..") parts.pop();
    else if (seg !== "." && seg !== "") parts.push(seg);
  }
  return parts.join("/");
}

export function renderMarkdown(md: string, src = "", docs: { src: string; slug: string }[] = []): { title: string; html: string } {
  const body = md.replace(/^---\n[\s\S]*?\n---\n\s*/, "").replace(/^<!--[\s\S]*?-->\s*/, "");
  const title = body.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "";
  const withoutTitle = body.replace(/^#\s+.+\n/m, "");
  const html = marked.parse(withoutTitle, { gfm: true, async: false }) as string;
  return {
    title,
    html: html.replace(/href="(?!https?:|#|\/|mailto:)([^"#]+)(#[^"]*)?"/g, (_, path: string, hash = "") => {
      const resolved = resolveRelative(src, path);
      const local = docs.find((d) => d.src === resolved);
      return `href="${local ? `/resources/${local.slug}/` : REPO + resolved}${hash}"`;
    }),
  };
}
