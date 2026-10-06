// ABOUTME: The architecture diagram made interactive: the same Mermaid layout as the static picture, with every part and connection explained.
// ABOUTME: Click or tab to a part; "What a no does" lights the side paths; the attack walks CVE-2026-47250 across the real diagram, step by step.

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { ATTACK, ATTACK_SOURCES, DISTRICTS, EDGES, NODES, nodeById } from "../data/city";

type Focus = { nodes: string[]; edges: [string, string][] };

/** What each attack step lights on the diagram; the captions are the deck's own, from src/data/city.ts. */
const TOOL_PATH: [string, string][] = [["A", "P"], ["P", "G"], ["G", "API"], ["API", "SRV"], ["SRV", "T"]];
const ATTACK_FOCUS: Focus[] = [
  { nodes: ["T"], edges: [] },
  { nodes: ["U", "A", "P", "G", "API", "SRV", "T"], edges: [["U", "A"], ...TOOL_PATH] },
  { nodes: ["A", "P", "G", "API", "SRV"], edges: TOOL_PATH.slice(0, 4) },
  { nodes: ["SRV"], edges: [] },
  { nodes: ["SRV"], edges: [] },
];
const ATTACK_WHERE = [
  "In the logs, which the tools read like any other enterprise data.",
  "The ordinary path: the operator asks, the agent calls the logs tool through the proxy, the gateway, the service boundary and the server.",
  "Through the same approved path. The server it reaches is the attacker's, outside this architecture entirely.",
  "From the MCP server's kubectl, to the attacker's server.",
  "Outside your architecture, with a token for a cluster they could not reach.",
];
const SAY_NO: Focus = { nodes: ["A", "OUT", "TM"], edges: [["A", "OUT"], ["A", "TM"]] };

const nodeEl = (root: Element, id: string) => root.querySelector<SVGGElement>(`[id^="arch-flowchart-${id}-"]`);

export function Diagram() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [sayNo, setSayNo] = useState(false);
  const [step, setStep] = useState(-1);

  // Load the pre-rendered SVG once and make every part focusable.
  useEffect(() => {
    let cancelled = false;
    void fetch("/architecture/architecture.svg")
      .then((r) => r.text())
      .then((svg) => {
        const root = host.current;
        if (cancelled || !root) return;
        root.innerHTML = svg;
        for (const n of NODES) {
          const el = nodeEl(root, n.id);
          if (!el) continue;
          el.setAttribute("tabindex", "0");
          el.setAttribute("role", "button");
          el.setAttribute("aria-label", n.name);
          el.dataset.node = n.id;
        }
        root.querySelectorAll<SVGPathElement>('[id^="arch-L_"]').forEach((p) => {
          const m = p.id.match(/^arch-L_([A-Za-z0-9]+)_([A-Za-z0-9]+)_\d+$/);
          if (m) p.dataset.edge = `${m[1]}>${m[2]}`;
        });
        setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Clicks and keys on the injected SVG pick a part; handled on the container, so they work from the first render.
  const pick = (e: MouseEvent | KeyboardEvent) => {
    const g = (e.target as Element).closest<SVGGElement>("[data-node]");
    if (!g) return;
    if ("key" in e && e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    setSayNo(false);
    setStep(-1);
    setSelected((s) => (s === g.dataset.node ? null : g.dataset.node!));
  };

  // Whatever is in focus stays bright; everything else dims.
  const focus = useMemo<Focus | null>(
    () =>
      step >= 0 ? ATTACK_FOCUS[step] : sayNo ? SAY_NO : selected
    ? { nodes: [selected, ...EDGES.filter((e) => e.from === selected || e.to === selected).map((e) => (e.from === selected ? e.to : e.from))], edges: EDGES.filter((e) => e.from === selected || e.to === selected).map((e) => [e.from, e.to] as [string, string]) }
    : null,
    [step, sayNo, selected],
  );
  useEffect(() => {
    const root = host.current;
    if (!root || !ready) return;
    root.dataset.focus = focus ? "on" : "off";
    root.querySelectorAll<SVGElement>("[data-node]").forEach((el) => el.classList.toggle("hl", !!focus?.nodes.includes(el.dataset.node!)));
    root.querySelectorAll<SVGElement>("[data-edge]").forEach((el) => el.classList.toggle("hl", !!focus?.edges.some(([a, b]) => el.dataset.edge === `${a}>${b}`)));
  }, [focus, ready]);

  const node = selected ? nodeById(selected) : null;
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button type="button" aria-pressed={sayNo} onClick={() => { setSelected(null); setStep(-1); setSayNo((v) => !v); }} className="rounded-md border px-4 py-2 font-semibold" style={{ borderColor: "#ff3c64", color: sayNo ? "#000" : "#ff8fa8", background: sayNo ? "#ff3c64" : "transparent" }}>
          What a no does
        </button>
        <button type="button" onClick={() => { setSelected(null); setSayNo(false); setStep((s) => (s + 1 >= ATTACK.length ? -1 : s + 1)); }} className="rounded-md border border-[color:var(--color-link)] px-4 py-2 font-semibold">
          {step < 0 ? "Replay the attack: CVE-2026-47250" : step + 1 < ATTACK.length ? `Next: step ${step + 2} of ${ATTACK.length}` : "Done. Start again"}
        </button>
        {(step >= 0 || sayNo || selected) && (
          <button type="button" onClick={() => { setStep(-1); setSayNo(false); setSelected(null); }} className="rounded-md px-4 py-2 font-semibold underline underline-offset-4">Clear</button>
        )}
      </div>

      <div className="mt-4 grid gap-4">
        <aside className="min-h-[9rem] rounded-lg bg-[color:var(--color-tile)] p-5" aria-live="polite" data-testid="diagram-panel">
          {step >= 0 ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#ff8fa8]">CVE-2026-47250, step {step + 1} of {ATTACK.length}</p>
              <h3 className="mt-1 text-xl font-semibold">{ATTACK[step].title}</h3>
              <p className="mt-2">{ATTACK[step].said}</p>
              <p className="mt-3 text-sm text-[color:var(--color-ink-muted)]">Where: {ATTACK_WHERE[step]}</p>
              <p className="mt-3 text-sm">{ATTACK_SOURCES.map((s, i) => <span key={s.url}>{i > 0 && " · "}<a href={s.url} className="underline underline-offset-4">{s.label}</a></span>)} · <a href="/the-attack/" className="underline underline-offset-4">The attack, illustrated</a></p>
            </>
          ) : sayNo ? (
            <>
              <h3 className="text-xl font-semibold">What a no does</h3>
              <p className="mt-2">Say no to an Outlook or Teams server with no reason and no path, and users ask the agent anyway. It writes a script against classic Outlook&apos;s COM interface, and it drives Teams through the approved browser in remote-debugging mode.</p>
              <p className="mt-2">The two red dashed paths go straight from the agent to Outlook and Teams. Neither crosses the MCP gateway, so nothing about them reaches the audit log.</p>
            </>
          ) : node ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-glow)]">{DISTRICTS.find((d) => d.id === node.district)?.name ?? (node.district === "audit" ? "Audit" : "Around the gateway")}</p>
              <h3 className="mt-1 text-xl font-semibold">{node.name}</h3>
              <p className="mt-2">{node.what}</p>
              <ul className="mt-3 space-y-1 text-sm text-[color:var(--color-ink-muted)]">
                {EDGES.filter((e) => e.from === node.id || e.to === node.id).map((e) => (
                  <li key={`${e.from}-${e.to}`}>{e.from === node.id ? `To ${nodeById(e.to).name}` : `From ${nodeById(e.from).name}`}: {e.label}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold">Pick a part of the diagram</h3>
              <p className="mt-2 text-[color:var(--color-ink-muted)]">Click or tab to any box to see what it does and what it connects to. Or see what a no does, or replay the attack from the talk.</p>
            </>
          )}
        </aside>
        <div className="overflow-x-auto rounded-lg bg-white p-2">
          <div ref={host} onClick={pick} onKeyDown={pick} className="diagram min-w-[64rem]" data-testid="diagram" aria-label="The architecture diagram; each part is a button" />
          {!ready && <p className="p-6 text-black">Loading the diagram</p>}
        </div>
      </div>

      <details className="mt-6 max-w-3xl">
        <summary className="cursor-pointer font-semibold">The diagram in words</summary>
        {DISTRICTS.map((d) => (
          <div key={d.id} className="mt-4">
            <h3 className="font-semibold">{d.name}</h3>
            <ul className="mt-1 list-disc pl-5 space-y-1">
              {NODES.filter((n) => n.district === d.id).map((n) => <li key={n.id}><strong>{n.name}.</strong> {n.what}</li>)}
            </ul>
          </div>
        ))}
        <h3 className="mt-4 font-semibold">Every connection</h3>
        <ul className="mt-1 list-disc pl-5 space-y-1">
          {EDGES.map((e) => <li key={`${e.from}-${e.to}`}>{nodeById(e.from).name} to {nodeById(e.to).name}: {e.label}</li>)}
        </ul>
      </details>
    </div>
  );
}
