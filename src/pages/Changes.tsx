// ABOUTME: What changed: every commit to every published document, newest first, so a reader can see what was corrected and when.
// ABOUTME: Built from the history the sync script records in content/collateral/manifest.json.

import manifest from "../../content/collateral/manifest.json";
import { PageIntro } from "./Page";

const rows = manifest.documents
  .flatMap((d) => d.history.map((h) => ({ ...h, title: d.title, slug: d.slug })))
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

export function ChangesPage() {
  return (
    <>
      <PageIntro title="What changed" lede={<>Every figure on this site has a source, and sources move. This is every change to every published document, newest first, each linked to its commit in <a href={`https://github.com/${manifest.repo}`} className="underline underline-offset-4">{manifest.repo}</a>. Follow it in a feed reader: <a href="/feed.xml" className="underline underline-offset-4">/feed.xml</a>.</>} />
      <section className="measure-wide pb-16" aria-label="Changes">
        <ol className="space-y-3">
          {rows.map((r) => (
            <li key={`${r.slug}-${r.sha}`} className="grid gap-1 sm:grid-cols-[7rem_1fr]">
              <span className="font-mono text-sm text-[color:var(--color-glow)]">{r.date}</span>
              <span>
                <a href={`/resources/${r.slug}/`} className="font-semibold underline underline-offset-4">{r.title}</a>
                <span className="text-[color:var(--color-ink-muted)]"> · <a href={`https://github.com/${manifest.repo}/commit/${r.sha}`} className="underline underline-offset-4">{r.subject}</a></span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
