// ABOUTME: Search the site: pages, slides and notes, the gates, the spec revisions, and every published document.
// ABOUTME: The query lives in ?q= so a search is a link; the index loads on first use and never on other pages.

import { useEffect, useMemo, useState } from "react";
import { search, type Entry } from "../lib/search";
import { PageIntro } from "./Page";

export function SearchPage() {
  const [q, setQ] = useState(() => (typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("q") ?? ""));
  const [index, setIndex] = useState<Entry[] | null>(null);
  useEffect(() => {
    void import("../data/searchIndex").then((m) => setIndex(m.INDEX));
  }, []);
  useEffect(() => {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }, [q]);
  const hits = useMemo(() => (index ? search(index, q) : []), [index, q]);
  return (
    <>
      <PageIntro title="Search">
        <form role="search" className="mt-6 max-w-2xl" onSubmit={(e) => e.preventDefault()}>
          <label className="grid gap-2">
            <span className="text-[color:var(--color-ink-muted)]">Every page, every slide's notes, the gates, the spec, the research and the articles.</span>
            <input type="search" name="q" value={q} onChange={(e) => setQ(e.target.value)} autoFocus placeholder="token passthrough, gateway latency, SOC 2" className="rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-tile)] px-4 py-3 text-lg text-[color:var(--color-ink)]" />
          </label>
        </form>
      </PageIntro>
      <section className="measure-wide pb-16" aria-live="polite" aria-label="Results">
        {!index && q && <p className="text-[color:var(--color-ink-muted)]">Loading the index</p>}
        {index && q && <p className="text-sm text-[color:var(--color-ink-muted)]">{hits.length === 30 ? "The first 30 results" : `${hits.length} ${hits.length === 1 ? "result" : "results"}`}</p>}
        <ol className="mt-4 space-y-5 max-w-3xl">
          {hits.map((h) => (
            <li key={h.entry.url + h.entry.title}>
              <p className="font-mono text-xs uppercase tracking-wide text-[color:var(--color-glow)]">{h.entry.kind}</p>
              <a href={h.entry.url} className="text-lg font-semibold underline underline-offset-4">{h.entry.title}</a>
              <p className="mt-1 text-[color:var(--color-ink-muted)]">{h.snippet}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
