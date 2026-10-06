// ABOUTME: Site search with no dependency: every query word must appear, titles weigh more than body text, and each hit carries a snippet.
// ABOUTME: Pure functions over plain-text entries; the index itself is built in src/data/searchIndex.ts.

export interface Entry { title: string; url: string; kind: string; text: string }
export interface Hit { entry: Entry; score: number; snippet: string }

export const words = (s: string): string[] => s.toLowerCase().normalize("NFKD").match(/[a-z0-9][a-z0-9.\-]*[a-z0-9]|[a-z0-9]/g) ?? [];

/** Markdown to searchable text: drops front matter, comments, code fences, link targets and table rules. */
export function plain(md: string): string {
  return md
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/^\|?[\s:|-]+\|?$/gm, " ")
    .replace(/[#*_>`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function snippetOf(text: string, terms: string[]): string {
  const lower = text.toLowerCase();
  const at = Math.min(...terms.map((t) => lower.indexOf(t)).filter((i) => i >= 0));
  if (!Number.isFinite(at)) return text.slice(0, 180);
  const start = Math.max(0, text.lastIndexOf(" ", Math.max(0, at - 70)) + 1);
  const end = Math.min(text.length, text.indexOf(" ", Math.min(text.length - 1, at + 150)) + 1 || text.length);
  return `${start > 0 ? "… " : ""}${text.slice(start, end).trim()}${end < text.length ? " …" : ""}`;
}

export function search(index: Entry[], query: string, limit = 30): Hit[] {
  const terms = [...new Set(words(query))].filter((t) => t.length > 1 || /\d/.test(t));
  if (!terms.length) return [];
  const hits: Hit[] = [];
  for (const entry of index) {
    const title = entry.title.toLowerCase();
    const body = entry.text.toLowerCase();
    let score = 0;
    let all = true;
    for (const t of terms) {
      const inTitle = title.includes(t);
      let count = 0;
      for (let i = body.indexOf(t); i >= 0 && count < 20; i = body.indexOf(t, i + t.length)) count += 1;
      if (!inTitle && !count) {
        all = false;
        break;
      }
      score += (inTitle ? 10 : 0) + Math.log2(1 + count);
    }
    if (all) hits.push({ entry, score, snippet: snippetOf(entry.text, terms) });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}
