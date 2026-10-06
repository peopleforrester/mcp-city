// ABOUTME: The research index: every research document behind the talk, by topic, each with its own page.
// ABOUTME: Each document is dated, and a note at its top flags anything that has moved since it was written.

import { SECTIONS, TOPICS } from "../lib/sections";
import { PageIntro } from "./Page";

export function ResearchIndexPage() {
  const research = SECTIONS.find((s) => s.id === "research")!.docs;
  return (
    <>
      <PageIntro title="The research" lede="What the talk stands on. Each document is dated; where a claim has moved since it was written, a note at the top says so." />
      <section className="measure-wide pb-16 grid gap-6 md:grid-cols-2" aria-label="Research by topic">
        {TOPICS.map((topic) => (
          <div key={topic} className="rounded-lg bg-[color:var(--color-tile)] p-5">
            <h2 className="text-xl font-semibold">{topic}</h2>
            <ul className="mt-3 space-y-2">
              {research.filter((d) => d.topic === topic).map((d) => (
                <li key={d.slug}><a href={`/resources/${d.slug}/`} className="underline underline-offset-4">{d.title}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
