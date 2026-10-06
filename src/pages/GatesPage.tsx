// ABOUTME: The approval gates: walk a real server through the six gates, then the full checklist with every verify step and source.
// ABOUTME: The deck's gates QR lands here; the walk's share links (?g=) open here, and the page prints as the clean checklist.

import { Gates } from "../components/Gates";
import { GATES, GATE_COLORS } from "../data/gates";
import { PageIntro } from "./Page";

export function GatesPage() {
  return (
    <>
      <PageIntro
        title="The acceptance process: six gates before an MCP server comes online"
        lede="The six areas we evaluate an MCP server on before it comes online: the relationship with the vendor, a real business need, how well it is built, whether it speaks the current spec, our security standards, and the vendor's certification. Walk a real server through them below, then take the checklist with you; every verify step names its source."
      />
      <Gates standalone />
      <section className="measure-wide pb-16" aria-labelledby="checklist-h">
        <h2 id="checklist-h" className="text-3xl font-semibold tracking-tight">The full checklist</h2>
        <ol className="mt-6 space-y-6 max-w-3xl">
          {GATES.map((g) => (
            <li key={g.n} id={`gate-${g.n}`} className="rounded-lg bg-[color:var(--color-tile)] p-5 border-l-4" style={{ borderLeftColor: GATE_COLORS[g.n - 1] }}>
              <h3 className="text-xl font-semibold">Gate {g.n}: {g.title}</h3>
              <p className="text-sm text-[color:var(--color-ink-muted)]">Who answers: {g.who}</p>
              <h4 className="mt-3 text-sm font-semibold uppercase tracking-wide">Ask</h4>
              <ul className="mt-1 list-disc pl-5 space-y-1">{g.ask.map((a) => <li key={a}>{a}</li>)}</ul>
              <h4 className="mt-3 text-sm font-semibold uppercase tracking-wide">Verify</h4>
              <ul className="mt-1 space-y-1">
                {g.verify.map((c, i) => (
                  <li key={c} className="flex gap-2">
                    <input type="checkbox" id={`c-${g.n}-${i}`} className="mt-1.5" />
                    <label htmlFor={`c-${g.n}-${i}`}>{c}</label>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-[color:var(--color-ink-muted)]">{g.note}</p>
              <p className="mt-3 border-t border-[color:var(--color-rule)] pt-3"><strong>If this gate says no with no explanation:</strong> {g.alley}</p>
              <p className="mt-2 text-sm">
                Sources: {g.sources.map((s, i) => <span key={s.url}>{i > 0 && " · "}<a href={s.url} className="underline underline-offset-4">{s.label}</a></span>)}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl"><strong>Behind all six:</strong> say no when you must, and explain why. The worst thing you can do is say no with no reason and no path.</p>
      </section>
    </>
  );
}
