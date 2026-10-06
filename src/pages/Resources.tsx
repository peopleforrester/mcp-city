// ABOUTME: Resources: the research behind the talk, the ledger that sources every figure, the repos, and the site's own source.
// ABOUTME: Rendered research pages replace the GitHub links here as they land.

import manifest from "../../content/collateral/manifest.json";
import { RESOURCES, TALK } from "../data/links";
import { PageIntro } from "./Page";

const TOPICS = [...new Set(manifest.documents.flatMap((d) => ("topic" in d && d.topic ? [d.topic] : [])))];

export function ResourcesPage() {
  return (
    <>
      <PageIntro title="Resources" lede={<>Every figure in the talk has a source. The collateral, with the ledger that checks each claim, is in <a href={TALK.repo} className="underline underline-offset-4">peopleforrester/mcp-for-a-city</a>.</>} />
      <section className="measure-wide pb-12" aria-labelledby="docs-h">
        <h2 id="docs-h" className="text-2xl font-semibold">The documents, readable here</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          <li className="rounded-lg bg-[color:var(--color-tile)] p-5">
            <a href="/resources/art/" className="font-semibold underline underline-offset-4">The art</a>
            <p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">Every picture made for the talk, with captions.</p>
          </li>
          {manifest.documents.filter((d) => !d.slug.startsWith("articles/") && !("topic" in d)).map((d) => (
            <li key={d.slug} className="rounded-lg bg-[color:var(--color-tile)] p-5">
              <a href={`/resources/${d.slug}/`} className="font-semibold underline underline-offset-4">{d.title}</a>
              <p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">{d.src}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="measure-wide pb-12" aria-labelledby="research-h">
        <h2 id="research-h" className="text-2xl font-semibold">The research</h2>
        <p className="mt-2 max-w-2xl text-[color:var(--color-ink-muted)]">What the talk stands on. Each document is dated; where a claim has moved since it was written, a note at the top says so.</p>
        {TOPICS.map((topic) => (
          <div key={topic} className="mt-6">
            <h3 className="text-lg font-semibold">{topic}</h3>
            <ul className="mt-2 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {manifest.documents.filter((d) => "topic" in d && d.topic === topic).map((d) => (
                <li key={d.slug}><a href={`/resources/${d.slug}/`} className="underline underline-offset-4">{d.title}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="measure-wide pb-12" aria-labelledby="articles-h">
        <h2 id="articles-h" className="text-2xl font-semibold">Operating MCP at Scale, the articles</h2>
        <p className="mt-2 max-w-2xl text-[color:var(--color-ink-muted)]">The operational depth the fifteen-minute talk cut. Published as drafts so the sources can be checked in the open; corrections are welcome as issues on the collateral repo. New parts and corrections arrive in <a href="/feed.xml" className="underline underline-offset-4">the feed</a>.</p>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {manifest.documents.filter((d) => d.slug.startsWith("articles/")).map((d) => (
            <li key={d.slug} className="rounded-lg bg-[color:var(--color-tile)] p-5">
              <a href={`/resources/${d.slug}/`} className="font-semibold underline underline-offset-4">{d.title}</a>
              <p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">{"series" in d ? d.series : ""}</p>
              {"status" in d && <p className="mt-2 inline-block rounded bg-[color:var(--color-accent)] px-2 py-0.5 text-xs font-semibold text-black">{d.status}</p>}
            </li>
          ))}
        </ol>
      </section>
      <section className="measure-wide pb-16" aria-labelledby="links-h">
        <h2 id="links-h" className="text-2xl font-semibold">On GitHub</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {RESOURCES.map((r) => (
            <li key={r.url} className="rounded-lg bg-[color:var(--color-tile)] p-5">
              <a href={r.url} className="font-semibold underline underline-offset-4">{r.label}</a>
              <p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">{r.note}</p>
            </li>
          ))}
          <li className="rounded-lg bg-[color:var(--color-tile)] p-5"><a href={TALK.siteSource} className="font-semibold underline underline-offset-4">This site's source</a><p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">peopleforrester/mcp-city, Apache 2.0.</p></li>
        </ul>
      </section>
    </>
  );
}
