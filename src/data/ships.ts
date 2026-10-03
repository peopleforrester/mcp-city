// ABOUTME: The ship ladder from the keynote: seven crews from 428 to 1.2 million, each with its source.
// ABOUTME: Figures as verified for the talk on 2026-10-02; the HUD lights the ship whose crew fits the population in view.

export interface Ship {
  name: string;
  crew: number;
  spoken: string;
  image: string;
  source: string;
}

export const SHIPS: Ship[] = [
  { name: "USS Enterprise", crew: 428, spoken: "four hundred and twenty-eight", image: "/art/ships/enterprise.png", source: "Memory Alpha, citing TOS \"Charlie X\"" },
  { name: "Enterprise-D", crew: 1014, spoken: "about a thousand", image: "/art/ships/enterprise-d.png", source: "Memory Alpha, citing TNG \"Remember Me\"" },
  { name: "Galactica", crew: 2800, spoken: "about twenty-eight hundred", image: "/art/ships/galactica.png", source: "Battlestar Galactica wiki, citing the 2004 miniseries" },
  { name: "UNSC Infinity", crew: 17151, spoken: "seventeen thousand", image: "/art/ships/infinity.png", source: "Halopedia, pre-2558 refit" },
  { name: "Imperial Star Destroyer", crew: 37085, spoken: "thirty-seven thousand", image: "/art/ships/star-destroyer.png", source: "Wookieepedia, Imperial I-class, low end of the range" },
  { name: "Executor", crew: 279144, spoken: "two hundred and eighty thousand", image: "/art/ships/executor.png", source: "Wookieepedia, Executor-class, Legends continuity" },
  { name: "Death Star", crew: 1200000, spoken: "one point two million", image: "/art/ships/death-star.png", source: "Wookieepedia, DS-1, 1,186,295 to 1,206,293" },
];

/** Population in view for a descent progress of 0 (orbit, the whole city) to 1 (one desk). */
export function populationInView(progress: number): number {
  const top = Math.log10(SHIPS[SHIPS.length - 1].crew);
  const p = Math.min(1, Math.max(0, progress));
  return Math.round(10 ** (top * (1 - p)));
}

/** The largest ship whose crew still fits the population in view; null once fewer than the smallest crew remain. */
export function activeShip(progress: number): Ship | null {
  const pop = populationInView(progress);
  const fits = SHIPS.filter((s) => s.crew <= pop);
  return fits.length ? fits[fits.length - 1] : null;
}
