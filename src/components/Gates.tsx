// ABOUTME: The six gates as a walk: one gate at a time, pass or fail, the alley when a gate says no.
// ABOUTME: A plain form underneath, so it works with a keyboard, a screen reader and no canvas.

import { useEffect, useMemo, useState } from "react";
import { GATES, GATE_COLORS } from "../data/gates";
import { checklistMarkdown, currentGate, decodeWalk, emptyWalk, encodeWalk, shareUrl, summary, type Walk } from "../lib/walk";

function readWalkFromUrl(): Walk {
  if (typeof window === "undefined") return emptyWalk();
  return decodeWalk(new URLSearchParams(window.location.search).get("g"));
}

export function Gates() {
  const [walk, setWalk] = useState<Walk>(readWalkFromUrl);
  const [copied, setCopied] = useState(false);
  const gate = currentGate(walk);
  const result = useMemo(() => summary(walk), [walk]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = encodeWalk(walk);
    if (code === "UUUUUU") url.searchParams.delete("g");
    else url.searchParams.set("g", code);
    window.history.replaceState(null, "", url);
  }, [walk]);

  const answer = (verdict: "pass" | "fail") => {
    if (!gate) return;
    setWalk((w) => w.map((v, i) => (i === gate.n - 1 ? verdict : v)));
  };

  const download = () => {
    const blob = new Blob([checklistMarkdown(walk)], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "mcp-approval-gates.md";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl(walk, `${window.location.origin}/`));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard refused; the URL bar already carries the code */
    }
  };

  const lastFailed = [...walk].map((v, i) => (v === "fail" ? i : -1)).filter((i) => i >= 0).at(-1);

  return (
    <section id="gates" className="measure-wide py-16" aria-labelledby="gates-h">
      <h2 id="gates-h" className="text-3xl font-semibold tracking-tight sm:text-4xl">Six gates before yes</h2>
      <p className="mt-3 max-w-2xl text-[color:var(--color-ink-muted)]">
        A request to allow an MCP server passes through these in order. Bring a real server. Answer honestly. Where a gate says no, look at what the user builds instead.
      </p>

      <ol className="mt-8 flex flex-wrap gap-2" aria-label="Progress through the gates">
        {GATES.map((g, i) => {
          const v = walk[i];
          const active = gate?.n === g.n;
          return (
            <li key={g.n}>
              <button
                type="button"
                onClick={() => setWalk((w) => w.map((x, j) => (j >= i ? "open" : x)))}
                aria-current={active ? "step" : undefined}
                className={`rounded-full border px-3 py-1 text-sm font-semibold ${active ? "ring-2 ring-white" : ""}`}
                style={{ borderColor: GATE_COLORS[i], color: v === "open" ? GATE_COLORS[i] : "#000", background: v === "open" ? "transparent" : GATE_COLORS[i] }}
                title={v === "open" ? `Gate ${g.n}` : `Gate ${g.n}: ${v}. Click to walk again from here.`}
              >
                {g.n} {v === "pass" ? "✓" : v === "fail" ? "✕" : ""}
              </button>
            </li>
          );
        })}
      </ol>

      {gate ? (
        <article className="mt-8 grid gap-8 rounded-lg border-l-4 bg-[color:var(--color-tile)] p-6 md:grid-cols-2" style={{ borderColor: GATE_COLORS[gate.n - 1] }} aria-live="polite">
          <div className="md:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: GATE_COLORS[gate.n - 1] }}>Gate {gate.n} of 6</p>
            <h3 className="mt-1 text-2xl font-semibold">{gate.title}</h3>
            <p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">Who answers: {gate.who}</p>
          </div>
          <div>
            <h4 className="font-semibold">Ask</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5">{gate.ask.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
          <div>
            <h4 className="font-semibold">Verify</h4>
            <ul className="mt-2 space-y-2">
              {gate.verify.map((c, i) => (
                <li key={c} className="flex gap-2">
                  <input type="checkbox" id={`v-${gate.n}-${i}`} className="mt-1.5" />
                  <label htmlFor={`v-${gate.n}-${i}`}>{c}</label>
                </li>
              ))}
            </ul>
          </div>
          <p className="md:col-span-2 text-sm text-[color:var(--color-ink-muted)]">{gate.note}</p>
          <p className="md:col-span-2 text-sm">
            Sources:{" "}
            {gate.sources.map((s, i) => (
              <span key={s.url}>{i > 0 && " · "}<a href={s.url} className="underline underline-offset-4">{s.label}</a></span>
            ))}
          </p>
          <div className="md:col-span-2 flex flex-wrap gap-3">
            <button type="button" onClick={() => answer("pass")} className="rounded-md bg-[color:var(--color-glow)] px-5 py-2 font-semibold text-black">
              Pass: lift the barrier
            </button>
            <button type="button" onClick={() => answer("fail")} className="rounded-md border border-[color:var(--gate-1)] px-5 py-2 font-semibold text-[color:var(--gate-1)]">
              Fail: the barrier stays down
            </button>
          </div>
        </article>
      ) : (
        <article className="mt-8 rounded-lg border-l-4 border-[color:var(--color-accent)] bg-[color:var(--color-tile)] p-6" aria-live="polite" data-testid="result">
          <h3 className="text-2xl font-semibold">
            {result.admitted ? "Admitted. The server's building lights up in the registry district." : `${result.passed} of 6 gates passed.`}
          </h3>
          {!result.admitted && (
            <p className="mt-2">
              {result.failed} said no. The walk is honest about that, and so is the talk: a no that is never explained is a server the user writes themselves.
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={download} className="rounded-md bg-[color:var(--color-glow)] px-5 py-2 font-semibold text-black">Download the checklist (Markdown)</button>
            <button type="button" onClick={share} className="rounded-md border border-[color:var(--color-link)] px-5 py-2 font-semibold">{copied ? "Link copied" : "Copy a link to this walk"}</button>
            <button type="button" onClick={() => setWalk(emptyWalk())} className="rounded-md px-5 py-2 font-semibold underline underline-offset-4">Walk again</button>
          </div>
        </article>
      )}

      {lastFailed !== undefined && (
        <aside className="mt-6 grid gap-6 rounded-lg border border-[color:var(--gate-1)] p-6 md:grid-cols-[200px_1fr]" data-testid="alley">
          <img src="/art/alley.jpg" alt="" className="h-32 w-full rounded object-cover md:h-full" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--gate-1)]">The side alley, gate {lastFailed + 1}</p>
            <p className="mt-2 text-lg">{GATES[lastFailed].alley}</p>
            <p className="mt-2 text-sm text-[color:var(--color-ink-muted)]">If you do not give them MCP servers, they build their own. The alley is not logged, not scoped and not revocable. Explain the no, or expect the alley.</p>
          </div>
        </aside>
      )}
    </section>
  );
}
