// ABOUTME: Builds the Atom feed of every change to every published document from the collateral manifest.
// ABOUTME: Used by the Vite build to write dist/feed.xml; pure so the tests can check the output.

export interface FeedDoc { slug: string; title: string; history: { date: string; sha: string; subject: string }[] }

const SITE = "https://mcp.michaelrishiforrester.com";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function atomFeed(docs: FeedDoc[], repo: string, limit = 100): string {
  const entries = docs
    .flatMap((d) => d.history.map((h) => ({ ...h, title: d.title, slug: d.slug })))
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
    .slice(0, limit);
  const updated = `${entries[0]?.date ?? "2026-10-03"}T00:00:00Z`;
  const items = entries.map((e) => `  <entry>
    <id>${SITE}/resources/${e.slug}/#${e.sha}</id>
    <title>${esc(`${e.title}: ${e.subject}`)}</title>
    <link href="${SITE}/resources/${e.slug}/"/>
    <link rel="related" href="https://github.com/${repo}/commit/${e.sha}"/>
    <updated>${e.date}T00:00:00Z</updated>
    <summary>${esc(e.subject)}</summary>
  </entry>`);
  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${SITE}/feed.xml</id>
  <title>Governing MCP for a Workforce the Size of a City: what changed</title>
  <subtitle>Every new article, correction and research update, newest first.</subtitle>
  <link rel="self" href="${SITE}/feed.xml"/>
  <link href="${SITE}/resources/changes/"/>
  <author><name>Michael Rishi Forrester</name></author>
  <updated>${updated}</updated>
${items.join("\n")}
</feed>
`;
}
