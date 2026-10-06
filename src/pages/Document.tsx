// ABOUTME: A rendered collateral document: the title, where it came from and when, then the HTML.
// ABOUTME: The Markdown is bundled raw by Vite and parsed in the browser; prerendering it to static HTML is tracked in #3.

import manifest from "../../content/collateral/manifest.json";
import { renderMarkdown } from "../lib/markdown";
import { PageIntro } from "./Page";

export function DocumentPage({ slug, markdown }: { slug: string; markdown: string }) {
  const doc = manifest.documents.find((d) => d.slug === slug)!;
  const { title, html } = renderMarkdown(markdown, doc.src, manifest.documents);
  return (
    <>
      <PageIntro title={title || doc.title} lede={<>{doc.series && <>{doc.series}. </>}{doc.status && <span className="rounded bg-[color:var(--color-accent)] px-2 py-0.5 text-sm font-semibold text-black">{doc.status}</span>}{doc.status && " "}From <a href={`https://github.com/${manifest.repo}/blob/main/${doc.src}`} className="underline underline-offset-4">{manifest.repo}</a>, as of commit {manifest.commit}, synced {manifest.synced}. Part of <a href="/resources/" className="underline underline-offset-4">Resources</a>.{doc.status && <> Corrections are welcome as <a href={`https://github.com/${manifest.repo}/issues`} className="underline underline-offset-4">issues on the repo</a>.</>}</>} />
      <article className="measure-wide pb-12 prose-doc" dangerouslySetInnerHTML={{ __html: html }} />
      <section className="measure-wide pb-16" aria-labelledby="history-h">
        <h2 id="history-h" className="text-xl font-semibold">What changed</h2>
        <ol className="mt-3 space-y-1 text-sm text-[color:var(--color-ink-muted)]">
          {doc.history.map((h) => (
            <li key={h.sha}>
              <span className="font-mono">{h.date}</span> <a href={`https://github.com/${manifest.repo}/commit/${h.sha}`} className="underline underline-offset-4">{h.subject}</a>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm"><a href="/resources/changes/" className="underline underline-offset-4">Every change across the site</a></p>
      </section>
    </>
  );
}
