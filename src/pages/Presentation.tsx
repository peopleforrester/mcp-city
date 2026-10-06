// ABOUTME: The presentation: every shown slide with the speaker notes beside it, in run order, then the files.
// ABOUTME: Slides and notes come from content/presentation/slides.json, pulled from the live deck; edit the deck, not this page.

import deck from "../../content/presentation/slides.json";
import { TALK } from "../data/links";
import { PageIntro } from "./Page";

const words = deck.slides.reduce((n, s) => n + s.notes.split(/\s+/).filter(Boolean).length, 0);

export function PresentationPage() {
  return (
    <>
      <PageIntro title="The presentation" lede={<>Fifteen minutes on what happens when governance meets people who route around a no. <a href={TALK.eventUrl} className="underline underline-offset-4">{TALK.event}</a>, {TALK.when}, {TALK.where}.</>}>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <li><a href={TALK.slidesPdf} className="font-semibold underline underline-offset-4">The slides as a PDF</a></li>
          <li><a href={TALK.script} className="font-semibold underline underline-offset-4">The spoken script</a></li>
          <li><a href="/presentation/video/" className="font-semibold underline underline-offset-4">A video of the presentation</a></li>
          <li><a href="/film/" className="font-semibold underline underline-offset-4">The film</a></li>
        </ul>
        <p className="mt-6 max-w-2xl text-lg">The question it answers: what was the most effective lever for MCP adoption? A relationship with the users who consume your MCP servers.</p>
        <p className="mt-4 text-sm text-[color:var(--color-ink-muted)]">{deck.slides.length} slides shown, about {words.toLocaleString("en-US")} spoken words. Pulled from the deck on {deck.read}.</p>
      </PageIntro>
      <section className="measure-wide pb-16" aria-label="The slides with the speaker notes">
        <ol className="space-y-10">
          {deck.slides.map((s) => (
            <li key={s.objectId} id={`slide-${s.n}`} className="grid gap-5 md:grid-cols-[1.1fr_1fr] items-start">
              <a href={`#slide-${s.n}`} className="block">
                <img src={s.image} alt={s.title ? `Slide ${s.n}: ${s.title}` : `Slide ${s.n}`} width="1280" height="720" className="w-full rounded-lg bg-white" loading={s.n <= 2 ? "eager" : "lazy"} decoding="async" />
              </a>
              <div>
                <p className="font-mono text-sm text-[color:var(--color-glow)]">{s.n} of {deck.slides.length}</p>
                {s.title && <h2 className="mt-1 text-xl font-semibold">{s.title}</h2>}
                <p className="mt-2 whitespace-pre-line">{s.notes}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
