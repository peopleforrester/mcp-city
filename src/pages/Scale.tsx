// ABOUTME: A workforce the size of a city: the ship ladder that gives the headcount a shape, each crew with its source.
// ABOUTME: Same data as the descent's HUD; here it is a page you can read.

import { SHIPS } from "../data/ships";
import { PageIntro } from "./Page";

export function ScalePage() {
  return (
    <>
      <PageIntro
        title="A workforce the size of a city"
        lede="How many people are using MCP in this workforce? The number is hard to picture, so the talk climbs a ladder of ships until one is big enough to hold it."
      />
      <section className="measure-wide pb-16" aria-label="The ship ladder">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SHIPS.map((s, i) => (
            <li key={s.name} className="rounded-lg bg-[color:var(--color-tile)] p-5 flex gap-4 items-center">
              <img src={s.image} alt={`Outline of the ${s.name}`} width="96" height="96" className="h-24 w-24 object-contain shrink-0" loading="lazy" />
              <div>
                <p className="font-mono text-sm text-[color:var(--color-glow)]">{i + 1}</p>
                <h2 className="text-xl font-semibold">{s.name}</h2>
                <p className="font-mono text-2xl">{s.crew.toLocaleString("en-US")}</p>
                <p className="text-sm text-[color:var(--color-ink-muted)]">crew, {s.spoken}. {s.source}.</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-2xl text-[color:var(--color-ink-muted)]">
          Beyond the Death Star the ladder runs out, and the workforce in the talk is still bigger. The ship outlines are generated fan art for a scale comparison; the designs belong to their studios.
        </p>
      </section>
    </>
  );
}
