// ABOUTME: A rendered collateral document: the title, where it came from and when, then the HTML.
// ABOUTME: The Markdown is bundled raw by Vite and parsed in the browser; prerendering it to static HTML is tracked in #3.

import manifest from "../../content/collateral/manifest.json";
import { renderMarkdown } from "../lib/markdown";
import { neighbours, sectionOf } from "../lib/sections";
import { PageIntro } from "./Page";

export function DocumentPage({ slug, markdown }: { slug: string; markdown: string }) {
  const doc = manifest.documents.find((d) => d.slug === slug)!;
  const { title, html } = renderMarkdown(markdown, doc.src, manifest.documents);
  const section = sectionOf(slug);
  const { prev, next } = neighbours(slug);
  return (
    <>
      <PageIntro title={title ? ("prefix" in doc && doc.prefix ? `${doc.prefix}: ${title}` : title) : doc.title} lede={<>{doc.series && <>{doc.series}. </>}{doc.status && <span className="rounded bg-[color:var(--color-accent)] px-2 py-0.5 text-sm font-semibold text-black">{doc.status}</span>}{doc.status && " "}From <a href={`https://github.com/${manifest.repo}/blob/main/${doc.src}`} className="underline underline-offset-4">{manifest.repo}</a>, as of commit {manifest.commit}, synced {manifest.synced}. <a href="/resources/" className="underline underline-offset-4">Resources</a> / <a href={section.href} className="underline underline-offset-4">{section.name}</a>.{doc.status && <> Corrections are welcome as <a href={`https://github.com/${manifest.repo}/issues`} className="underline underline-offset-4">issues on the repo</a>.</>}</>} />
      <div className="measure-wide pb-12 grid gap-10 lg:grid-cols-[1fr_16rem]">
        <article className="prose-doc" dangerouslySetInnerHTML={{ __html: html }} />
        <nav aria-label={`In ${section.name}`} className="text-sm lg:sticky lg:top-24 lg:self-start">
          <p className="font-semibold uppercase tracking-wide text-[color:var(--color-glow)]"><a href={section.href} className="hover:underline">{section.name}</a></p>
          <ul className="mt-2 space-y-1">
            {section.docs.map((x) => (
              <li key={x.slug}>{x.slug === slug ? <span aria-current="page" className="font-semibold">{x.title}</span> : <a href={`/resources/${x.slug}/`} className="text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-link)] hover:underline">{x.title}</a>}</li>
            ))}
          </ul>
        </nav>
      </div>
      <nav aria-label="Previous and next" className="measure-wide pb-10 flex flex-wrap justify-between gap-4">
        {prev ? <a href={`/resources/${prev.slug}/`} className="underline underline-offset-4">Previous: {prev.title}</a> : <span />}
        {next && <a href={`/resources/${next.slug}/`} className="underline underline-offset-4">Next: {next.title}</a>}
      </nav>
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
