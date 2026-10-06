// ABOUTME: Resources: a short index of the sections, each on its own page: the articles, the research, the talk's documents, the art, the change log.
// ABOUTME: Replaces the single long scroll; every document still has its own page.

import { RESOURCES, TALK } from "../data/links";
import { SECTIONS, TOPICS } from "../lib/sections";
import { PageIntro } from "./Page";

export function ResourcesPage() {
  const [articles, research, talk] = SECTIONS;
  const cards = [
    { href: articles.href, title: "Operating MCP at Scale, the articles", text: `${articles.docs.length} pieces: five parts, one per pillar, and the enterprise checklist.` },
    { href: research.href, title: "The research", text: `${research.docs.length} documents in ${TOPICS.length} topics: what the talk stands on.` },
    { href: "/resources/art/", title: "The art", text: "Every picture made for the talk, with captions." },
    { href: "/resources/changes/", title: "What changed", text: "Every correction and update, newest first, and the feed." },
  ];
  return (
    <>
      <PageIntro title="Resources" lede={<>Every figure in the talk has a source. The collateral is in <a href={TALK.repo} className="underline underline-offset-4">peopleforrester/mcp-for-a-city</a>; everything here is readable on this site.</>} />
      <section className="measure-wide pb-12" aria-label="Sections">
        <ul className="grid gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <li key={c.href} className="rounded-lg bg-[color:var(--color-tile)] p-5">
              <a href={c.href} className="text-xl font-semibold underline underline-offset-4">{c.title}</a>
              <p className="mt-1 text-[color:var(--color-ink-muted)]">{c.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="measure-wide pb-12" aria-labelledby="talk-h">
        <h2 id="talk-h" className="text-2xl font-semibold">{talk.name}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {talk.docs.map((d) => <li key={d.slug}><a href={`/resources/${d.slug}/`} className="underline underline-offset-4">{d.title}</a></li>)}
        </ul>
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
