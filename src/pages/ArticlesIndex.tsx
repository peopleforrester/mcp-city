// ABOUTME: The articles index: the Operating MCP at Scale series, the enterprise checklist first, each part with its own page.
// ABOUTME: Drafts are marked; corrections arrive in the feed and as issues on the collateral repo.

import { SECTIONS } from "../lib/sections";
import { PageIntro } from "./Page";

export function ArticlesIndexPage() {
  const articles = SECTIONS.find((s) => s.id === "articles")!.docs;
  return (
    <>
      <PageIntro title="Operating MCP at Scale" lede={<>The operational depth the fifteen-minute talk cut, one part per pillar, and a checklist that pulls the actions from all five into one place. Start with the checklist if you run a platform team. New parts and corrections arrive in <a href="/feed.xml" className="underline underline-offset-4">the feed</a>.</>} />
      <section className="measure-wide pb-16" aria-label="The series">
        <ol className="space-y-4 max-w-3xl">
          {articles.map((d) => (
            <li key={d.slug} className="rounded-lg bg-[color:var(--color-tile)] p-5">
              <p className="text-sm text-[color:var(--color-ink-muted)]">{d.series}</p>
              <a href={`/resources/${d.slug}/`} className="text-xl font-semibold underline underline-offset-4">{d.title}</a>
              {d.status && <p className="mt-2 inline-block rounded bg-[color:var(--color-accent)] px-2 py-0.5 text-xs font-semibold text-black">{d.status}</p>}
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
