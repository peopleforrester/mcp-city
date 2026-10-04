// ABOUTME: Resources: the research behind the talk, the ledger that sources every figure, the repos, and the site's own source.
// ABOUTME: Rendered research pages replace the GitHub links here as they land.

import manifest from "../../content/collateral/manifest.json";
import { RESOURCES, TALK } from "../data/links";
import { PageIntro } from "./Page";

export function ResourcesPage() {
  return (
    <>
      <PageIntro title="Resources" lede={<>Every figure in the talk has a source. The collateral, with the ledger that checks each claim, is in <a href={TALK.repo} className="underline underline-offset-4">peopleforrester/mcp-for-a-city</a>.</>} />
      <section className="measure-wide pb-12" aria-labelledby="docs-h">
        <h2 id="docs-h" className="text-2xl font-semibold">The documents, readable here</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {manifest.documents.map((d) => (
            <li key={d.slug} className="rounded-lg bg-[color:var(--color-tile)] p-5">
              <a href={`/resources/${d.slug}/`} className="font-semibold underline underline-offset-4">{d.title}</a>
              <p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">{d.src}</p>
            </li>
          ))}
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
