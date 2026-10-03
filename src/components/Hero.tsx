// ABOUTME: The top of the page: the city at night, the title, the thesis, and the two ways in.
// ABOUTME: The live skyline loads after first paint and only where motion is welcome; the poster is the floor.

import { lazy, Suspense, useEffect, useState } from "react";
import { TALK } from "../data/links";

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
  return (
    <section className="relative sky min-h-[85vh] overflow-hidden flex items-end">
      <img
        src="/art/city.jpg"
        alt="A city skyline in black silhouette against a cyan and navy backlit sky"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        fetchPriority="high"
      />
      {live && (
        <Suspense fallback={null}>
          <div className="absolute inset-0" data-testid="skyline">
            <Skyline />
          </div>
        </Suspense>
      )}
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
      </div>
    </section>
  );
}
