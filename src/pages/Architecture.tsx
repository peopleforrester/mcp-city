// ABOUTME: The architecture: the diagram as drawn, then the same diagram made interactive, with what a no does and the attack replayed across it.
// ABOUTME: The Mermaid source sits beside the picture so nobody has to redraw it.

import { Diagram } from "../components/Diagram";
import { TALK } from "../data/links";
import { PageIntro } from "./Page";


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
        <a href="/architecture/architecture.png"><img src="/architecture/architecture-1600.webp" srcSet="/architecture/architecture-800.webp 800w, /architecture/architecture-1600.webp 1600w, /architecture/architecture-2400.webp 2400w" sizes="(min-width: 72rem) 70rem, 100vw" fetchPriority="high" alt="Enterprise MCP architecture: developer district, tool gateway and servers, model gateway and providers, and the control plane of identity, registry, audit and device policy" className="mt-4 w-full h-auto rounded-lg bg-white" width="1600" height="556" /></a>
        <p className="mt-2 text-sm text-[color:var(--color-ink-muted)]"><a href="/architecture/architecture.mmd" className="underline underline-offset-4">Mermaid source</a> · <a href="/architecture/architecture.png" className="underline underline-offset-4">Full-size PNG</a></p>
      </section>
      <section className="measure-wide pb-12" aria-labelledby="walk-h">
        <h2 id="walk-h" className="text-2xl font-semibold">Walk through the diagram</h2>
        <p className="mt-2 mb-4 max-w-2xl text-[color:var(--color-ink-muted)]">Every box, in the order a request travels ({TALK.architectureWalkthrough.runtime}).</p>
        <video
          className="w-full max-w-4xl rounded-lg bg-black"
          controls
          preload="metadata"
          playsInline
          crossOrigin="anonymous"
          poster={TALK.architectureWalkthrough.poster}
          src={TALK.architectureWalkthrough.src}
          aria-label="A walkthrough of the architecture diagram, box by box, narrated, with captions"
          data-testid="walkthrough"
        >
          <track kind="captions" srcLang="en" label="English" src={TALK.architectureWalkthrough.captions} default />
        </video>
      </section>
      <section className="measure-wide pb-16" aria-labelledby="live-h">
        <h2 id="live-h" className="text-2xl font-semibold">Explore the diagram</h2>
        <p className="mt-2 mb-4 max-w-2xl text-[color:var(--color-ink-muted)]">The same diagram, part by part. Click any box to see what it does and what it connects to.</p>
        <Diagram />
      </section>
    </>
  );
}
