// ABOUTME: How the MCP spec evolves: every revision from launch to 2026-07-28, what changed and what went away, set against USB's eighteen years.
// ABOUTME: The case for patience while the protocol moves; every line cites the primary page in src/data/spec.ts.

import { DEPRECATION_POLICY, SDK_TIERS, SPEC_READ_ON, SPEC_REVISIONS, type SpecChange } from "../data/spec";
import { USB_YEARS } from "../data/plugs";
import { PageIntro } from "./Page";

const first = new Date(SPEC_REVISIONS[0].date);
const last = new Date(SPEC_REVISIONS[SPEC_REVISIONS.length - 1].date);
const months = Math.round((last.getTime() - first.getTime()) / (1000 * 60 * 60 * 24 * 30.44));

function Cited({ items }: { items: SpecChange[] }) {
  return (
    <ul className="mt-2 space-y-2">
      {items.map((c) => (
        <li key={c.text} className="pl-4 border-l-2 border-[color:var(--color-rule)]">
          {c.text} <a href={c.source} className="text-sm text-[color:var(--color-ink-muted)] underline underline-offset-4">source</a>
        </li>
      ))}
    </ul>
  );
}

export function SpecPage() {
  return (
    <>
      <PageIntro
        title="How the MCP spec evolves"
        lede={<>It took USB {USB_YEARS.span} years to get from USB 1.0 to one plug. MCP has shipped {SPEC_REVISIONS.length} revisions in {months} months, and each one asked something of the people running it. The protocol is moving faster than any of us can migrate. Patience is part of the job.</>}
      >
        <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-3xl">
          <div className="rounded-lg bg-[color:var(--color-tile)] p-5">
            <p className="font-mono text-4xl font-semibold text-[color:var(--color-glow)]">{USB_YEARS.span} years</p>
            <p className="mt-1">USB 1.0 in {USB_YEARS.from} to USB-C in {USB_YEARS.to}. <a href="/usb/" className="underline underline-offset-4">The connector history</a></p>
          </div>
          <div className="rounded-lg bg-[color:var(--color-tile)] p-5">
            <p className="font-mono text-4xl font-semibold text-[color:var(--color-glow)]">{SPEC_REVISIONS.length} revisions</p>
            <p className="mt-1">MCP from {SPEC_REVISIONS[0].id} to {SPEC_REVISIONS[SPEC_REVISIONS.length - 1].id}, {months} months.</p>
          </div>
        </div>
      </PageIntro>

      <section className="measure-wide pb-12" aria-labelledby="revisions-h">
        <h2 id="revisions-h" className="text-2xl font-semibold">Every revision</h2>
        <ol className="mt-6 space-y-10">
          {SPEC_REVISIONS.map((r) => (
            <li key={r.id} id={`rev-${r.id}`} className="grid gap-4 md:grid-cols-[11rem_1fr]">
              <div>
                <p className="font-mono text-xl font-semibold text-[color:var(--color-glow)]">{r.id}</p>
                <p className="text-sm text-[color:var(--color-ink-muted)]">released {r.date}</p>
              </div>
              <div className="max-w-3xl">
                <h3 className="text-xl font-semibold">{r.headline}</h3>
                <Cited items={r.changes} />
                {r.removed.length > 0 && (
                  <>
                    <h4 className="mt-4 font-semibold text-[#ff8fa8]">Deprecated or removed</h4>
                    <Cited items={r.removed} />
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="measure-wide pb-12" aria-labelledby="policy-h">
        <h2 id="policy-h" className="text-2xl font-semibold">How things go away now</h2>
        <p className="mt-2 max-w-3xl text-[color:var(--color-ink-muted)]">Since 2026-07-28 the protocol has a written deprecation policy, so a removal comes with a window.</p>
        <div className="max-w-3xl"><Cited items={DEPRECATION_POLICY} /></div>
      </section>

      <section className="measure-wide pb-12" aria-labelledby="sdks-h">
        <h2 id="sdks-h" className="text-2xl font-semibold">Where the SDKs stand</h2>
        <div className="max-w-3xl"><Cited items={SDK_TIERS} /></div>
      </section>

      <section className="measure-wide pb-16" aria-label="Further reading">
        <p className="max-w-3xl text-[color:var(--color-ink-muted)]">
          Read from the specification, its changelogs and its repository on {SPEC_READ_ON}. For what each change costs the people running MCP, read <a href="/resources/articles/part-1-operational-excellence/" className="underline underline-offset-4">The Protocol Moved Under You and Nobody Migrates You</a>.
        </p>
      </section>
    </>
  );
}
