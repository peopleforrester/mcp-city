// ABOUTME: The art: every picture made for the talk, by set, with its caption.
// ABOUTME: Generated for the keynote and released CC BY 4.0 in the collateral repo; the ship outlines are fan art.

import { ART } from "../data/art";
import { PageIntro } from "./Page";

export function ArtPage() {
  return (
    <>
      <PageIntro title="The art" lede="Every picture made for the talk. Text, research and generated art are CC BY 4.0 in the collateral repo; the ship outlines depict designs that belong to their studios and are fan art for a scale comparison." />
      {ART.map((set) => (
        <section key={set.id} id={set.id} className="measure-wide pb-14" aria-labelledby={`${set.id}-h`}>
          <h2 id={`${set.id}-h`} className="text-2xl font-semibold">{set.name}</h2>
          <p className="mt-2 max-w-2xl text-[color:var(--color-ink-muted)]">{set.note}</p>
          <ul className={`mt-5 grid gap-4 ${set.id === "scenes" || set.id === "attack" ? "sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}>
            {set.pictures.map((p) => (
              <li key={p.src} className="rounded-lg bg-[color:var(--color-tile)] p-3">
                <a href={p.src}><img src={p.src} alt={p.caption} loading="lazy" decoding="async" className={`w-full rounded ${set.id === "cables" ? "bg-white" : ""}`} /></a>
                <p className="mt-2 text-sm">{p.caption}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
