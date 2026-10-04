// ABOUTME: The living architecture map: the 3D city on a wide screen, the same data as an SVG everywhere, and the panel for a building.
// ABOUTME: Two switches: "say no" shows the bypass alleys and darkens audit; "replay the attack" walks the CVE across the city.

import { lazy, Suspense, useEffect, useState } from "react";
import { useInView } from "../lib/useInView";
import { ATTACK, ATTACK_SOURCES, DISTRICTS, EDGES, EDGE_COLORS, NODES, nodeById } from "../data/city";
import { useLiveScene } from "../lib/useLiveScene";

const CityMap = lazy(() => import("../scene/CityMap"));

function FlatMap({ sayNo, selected, tracerAt, onSelect }: { sayNo: boolean; selected: string | null; tracerAt: string | null; onSelect: (id: string | null) => void }) {
  const sx = (x: number) => (x + 50) * 6;
  const sz = (z: number) => (z + 26) * 6;
  return (
    <svg viewBox="0 0 600 380" className="w-full rounded-lg bg-[color:var(--color-night)]" role="img" aria-label="The architecture as a map: four districts, the buildings in each, and the roads between them">
      {DISTRICTS.map((d) => (
        <g key={d.id}>
          <rect x={sx(d.plate[0] - d.plate[2] / 2)} y={sz(d.plate[1] - d.plate[3] / 2)} width={d.plate[2] * 6} height={d.plate[3] * 6} fill={d.color} opacity={0.15} rx="6" />
          <text x={sx(d.plate[0] - d.plate[2] / 2) + 6} y={sz(d.plate[1] - d.plate[3] / 2) + 14} fill={d.color} fontSize="11" fontWeight="600">{d.name}</text>
        </g>
      ))}
      {EDGES.filter((e) => e.kind !== "bypass" || sayNo).map((e) => {
        const a = nodeById(e.from);
        const b = nodeById(e.to);
        return <line key={`${e.from}-${e.to}`} x1={sx(a.x)} y1={sz(a.z)} x2={sx(b.x)} y2={sz(b.z)} stroke={EDGE_COLORS[e.kind]} strokeWidth={e.kind === "bypass" ? 3 : 1.5} strokeDasharray={e.kind === "control" ? "4 3" : e.kind === "bypass" ? "6 4" : undefined} opacity={0.8}><title>{`${a.name} to ${b.name}: ${e.label}`}</title></line>;
      })}
      {NODES.filter((n) => n.district !== "bypass" || sayNo).map((n) => {
        const on = selected === n.id || tracerAt === n.id;
        const dark = n.district === "audit" && sayNo;
        return (
          <g key={n.id} onClick={() => onSelect(selected === n.id ? null : n.id)} className="cursor-pointer" role="button" aria-label={n.name} tabIndex={0} onKeyDown={(ev) => ev.key === "Enter" && onSelect(n.id)}>
            <rect x={sx(n.x) - 9} y={sz(n.z) - 9} width="18" height="18" rx="3" fill={on ? "#04c0da" : dark ? "#1b2535" : "#02050c"} stroke={n.district === "bypass" ? "#ff3c64" : "#04c0da"} strokeWidth={tracerAt === n.id ? 3 : 1} />
            <text x={sx(n.x)} y={sz(n.z) + 20} fill="#f8f8f2" fontSize="9" textAnchor="middle">{n.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function Map({ standalone = false }: { standalone?: boolean } = {}) {
  const { live } = useLiveScene(900);
  const [mapRef, mapInView] = useInView();
  const [mapSeen, setMapSeen] = useState(false);
  useEffect(() => {
    if (mapInView) setMapSeen(true);
  }, [mapInView]);
  const [sayNo, setSayNo] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<number>(-1);
  const tracerAt = step >= 0 ? ATTACK[step].at : null;
  const node = selected ? nodeById(selected) : null;
  const edgesOf = selected ? EDGES.filter((e) => e.from === selected || e.to === selected) : [];

  return (
    <section id="map" className={standalone ? "measure-wide pb-16" : "measure-wide py-16 border-t border-[color:var(--color-rule)]"} aria-labelledby="map-h">
      {!standalone && <h2 id="map-h" className="text-3xl font-semibold tracking-tight sm:text-4xl">The architecture</h2>}
      <p className="mt-3 max-w-2xl text-[color:var(--color-ink-muted)]">
        A person, an agent, one gate every call goes through, the tools. Everything else is that gate done properly. Click a building. Then say no, and watch where the traffic goes.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={() => setSayNo((v) => !v)} aria-pressed={sayNo} className="rounded-md border px-4 py-2 font-semibold" style={{ borderColor: "#ff3c64", color: sayNo ? "#000" : "#ff8fa8", background: sayNo ? "#ff3c64" : "transparent" }}>
          {sayNo ? "You said no. The alleys are lit." : "Say no"}
        </button>
        <button type="button" onClick={() => setStep((s) => (s + 1 >= ATTACK.length ? -1 : s + 1))} className="rounded-md border border-[color:var(--color-link)] px-4 py-2 font-semibold">
          {step < 0 ? "Replay the attack" : step + 1 < ATTACK.length ? `Next: step ${step + 2} of ${ATTACK.length}` : "Done. Replay again"}
        </button>
        {step >= 0 && (
          <button type="button" onClick={() => setStep(-1)} className="rounded-md px-4 py-2 font-semibold underline underline-offset-4">Stop</button>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          {live ? (
            <div ref={mapRef} className="h-[28rem] overflow-hidden rounded-lg bg-[color:var(--color-night)]" data-testid="city-map">
              {mapSeen && (
                <Suspense fallback={null}>
                  <CityMap active={mapInView} sayNo={sayNo} selected={selected} tracerAt={tracerAt} onSelect={setSelected} />
                </Suspense>
              )}
            </div>
          ) : (
            <FlatMap sayNo={sayNo} selected={selected} tracerAt={tracerAt} onSelect={setSelected} />
          )}
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[color:var(--color-ink-muted)]" aria-label="Road colors">
            {(Object.keys(EDGE_COLORS) as (keyof typeof EDGE_COLORS)[]).map((k) => (
              <li key={k} className="flex items-center gap-1"><span className="inline-block h-2 w-5 rounded" style={{ background: EDGE_COLORS[k] }} /> {k === "bypass" ? "bypass (when you say no)" : k}</li>
            ))}
          </ul>
        </div>
        <aside className="rounded-lg bg-[color:var(--color-tile)] p-5" aria-live="polite" data-testid="map-panel">
          {step >= 0 ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "#ff8fa8" }}>Attack replay, step {step + 1} of {ATTACK.length}</p>
              <h3 className="mt-1 text-xl font-semibold">{ATTACK[step].title}</h3>
              <p className="mt-2">{ATTACK[step].said}</p>
              <p className="mt-3 text-sm text-[color:var(--color-ink-muted)]">At: {nodeById(ATTACK[step].at).name}</p>
              <p className="mt-3 text-sm">
                {ATTACK_SOURCES.map((s, i) => (
                  <span key={s.url}>{i > 0 && " · "}<a href={s.url} className="underline underline-offset-4">{s.label}</a></span>
                ))}
              </p>
            </>
          ) : node ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-glow)]">{DISTRICTS.find((d) => d.id === node.district)?.name ?? (node.district === "audit" ? "Audit" : "Bypass")}</p>
              <h3 className="mt-1 text-xl font-semibold">{node.name}</h3>
              <p className="mt-2">{node.what}</p>
              {edgesOf.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-[color:var(--color-ink-muted)]">
                  {edgesOf.map((e) => (
                    <li key={`${e.from}-${e.to}`}>
                      <span className="inline-block h-2 w-3 rounded mr-1" style={{ background: EDGE_COLORS[e.kind] }} />
                      {e.from === selected ? `to ${nodeById(e.to).name}` : `from ${nodeById(e.from).name}`}: {e.label}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold">Pick a building</h3>
              <p className="mt-2 text-[color:var(--color-ink-muted)]">
                Four districts: the managed device, tool traffic, model traffic, and the control plane. Audit sits below them all, and the two bypass alleys only appear when you say no.
              </p>
              {sayNo && <p className="mt-3" style={{ color: "#ff8fa8" }}>Nothing on the alleys is logged. The audit district goes dark along them.</p>}
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
