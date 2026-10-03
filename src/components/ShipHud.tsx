// ABOUTME: The ship ladder as a heads-up display beside the descent: the ship whose crew fits the population in view lights up.
// ABOUTME: Pure DOM; reads the scroll progress the hero already measures.

import { SHIPS, activeShip, populationInView } from "../data/ships";

export function ShipHud({ progress }: { progress: number }) {
  const active = activeShip(progress);
  const pop = populationInView(progress);
  return (
    <aside className="pointer-events-none absolute right-6 top-24 hidden w-56 md:block" aria-label="Ship ladder">
      <p className="text-right font-mono text-sm text-[color:var(--color-glow)]">
        {pop >= 1000000 ? "0x7A120" : pop.toLocaleString("en-US")} in view
      </p>
      <ul className="mt-2 space-y-1">
        {[...SHIPS].reverse().map((s) => {
          const on = active?.name === s.name;
          return (
            <li key={s.name} className="flex items-center justify-end gap-2 transition-opacity" style={{ opacity: on ? 1 : 0.3 }} aria-current={on ? "true" : undefined}>
              <span className={`text-right text-xs ${on ? "font-semibold text-white" : "text-[color:var(--color-ink-muted)]"}`}>
                {s.name}
                <br />
                <span className="font-mono">{s.crew.toLocaleString("en-US")}</span>
              </span>
              <img src={s.image} alt="" width="64" height="24" className="h-6 w-16 object-contain" style={{ filter: on ? "drop-shadow(0 0 6px #04c0da)" : "none" }} />
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
