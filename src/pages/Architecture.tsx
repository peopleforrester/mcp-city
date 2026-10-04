// ABOUTME: The architecture: the diagram as drawn, then the same architecture as a living map you can click, say no to, and replay the attack across.
// ABOUTME: The Mermaid source sits beside the picture so nobody has to redraw it.

import { lazy, Suspense } from "react";
import { PageIntro } from "./Page";

const Map = lazy(() => import("../components/Map").then((m) => ({ default: m.Map })));

export function ArchitecturePage() {
  return (
    <>
      <PageIntro
        title="The architecture"
        lede="A person, a device, an agent, one gate every call goes through, and the tools. Everything else on this page is that gate done properly."
      />
      <section className="measure-wide pb-12" aria-labelledby="diagram-h">
        <h2 id="diagram-h" className="text-2xl font-semibold">Here is the architecture diagram</h2>
        <p className="mt-2 max-w-2xl text-[color:var(--color-ink-muted)]">Four zones: the managed device, tool traffic through the tool gateway, model traffic through the model gateway, and the control plane of identity, registry, audit and device policy.</p>
        <a href="/architecture/architecture.png"><img src="/architecture/architecture.png" alt="Enterprise MCP architecture: developer district, tool gateway and servers, model gateway and providers, and the control plane of identity, registry, audit and device policy" className="mt-4 w-full rounded-lg bg-white" width="1600" height="1000" /></a>
        <p className="mt-2 text-sm text-[color:var(--color-ink-muted)]"><a href="/architecture/architecture.mmd" className="underline underline-offset-4">Mermaid source</a> · <a href="/architecture/architecture.png" className="underline underline-offset-4">Full-size PNG</a></p>
      </section>
      <section className="measure-wide pb-4" aria-labelledby="map-h">
        <h2 id="map-h" className="text-2xl font-semibold">The same architecture, alive</h2>
        <p className="mt-2 max-w-2xl text-[color:var(--color-ink-muted)]">Click a building. Then say no, and watch where the traffic goes. Replay the attack to follow one poisoned log line across the city.</p>
      </section>
      <Suspense fallback={<div className="measure-wide pb-16 text-[color:var(--color-ink-muted)]">Loading the map</div>}>
        <Map standalone />
      </Suspense>
    </>
  );
}
