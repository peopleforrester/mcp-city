// ABOUTME: The top of the page: the city at night, the title, the thesis, and the two ways in.
// ABOUTME: On a wide screen the hero is a scroll-driven descent from orbit to one desk; on a phone it is the poster.

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { TALK } from "../data/links";
import { useScrollProgress } from "../lib/useScrollProgress";
import { ShipHud } from "./ShipHud";

const Skyline = lazy(() => import("../scene/Skyline"));

function useLiveScene(): boolean {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 48rem)").matches;
    if (reduced || !wide) return;
    const id = window.setTimeout(() => setLive(true), 300);
    return () => window.clearTimeout(id);
  }, []);
  return live;
}

export function Hero() {
  const live = useLiveScene();
  const section = useRef<HTMLElement>(null);
  const { progress, progressRef } = useScrollProgress(section);
  return (
    <section ref={section} className={live ? "relative h-[300vh]" : "relative"}>
      <div className={`sky relative overflow-hidden flex items-end ${live ? "sticky top-0 h-screen" : "min-h-[85vh]"}`}>
        <img
          src="/art/city-1024.webp"
          srcSet="/art/city-640.webp 640w, /art/city-1024.webp 1024w, /art/city-1600.webp 1600w"
          sizes="100vw"
          alt="A city skyline in black silhouette against a cyan and navy backlit sky"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: live ? 0 : 0.7 }}
          fetchPriority="high"
          decoding="async"
        />
        {live && (
          <Suspense fallback={null}>
            <div className="absolute inset-0" data-testid="skyline">
              <Skyline progress={progressRef} />
            </div>
          </Suspense>
        )}
        {live && <ShipHud progress={progress} />}
        <div className="relative measure-wide pb-16 pt-32">
          <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-accent)]">
            <a href={TALK.eventUrl} className="underline underline-offset-4">{TALK.event}</a>, {TALK.when}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">{TALK.title}</h1>
          <p className="mt-6 max-w-2xl text-xl text-[color:var(--color-ink)]">{TALK.thesis}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#gates" className="rounded-md bg-[color:var(--color-glow)] px-5 py-3 font-semibold text-black hover:opacity-90">
              Walk a server through the six gates
            </a>
            <a href={TALK.slidesPdf} className="rounded-md border border-[color:var(--color-link)] px-5 py-3 font-semibold">
              The slides (PDF)
            </a>
          </div>
          {live && (
            <p className="mt-8 text-sm text-[color:var(--color-ink-muted)]" aria-hidden="true">
              {progress < 0.95 ? "Scroll to descend from orbit to one desk." : "One person, one agent. Now walk the gates."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
