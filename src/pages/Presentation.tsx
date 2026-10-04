// ABOUTME: The presentation: the slides, the spoken script, the recording when it exists, and where and when it was given.
// ABOUTME: The slide-by-slide reader lands here once the deck is pulled; the links are live now.

import { TALK } from "../data/links";
import { PageIntro } from "./Page";

export function PresentationPage() {
  return (
    <>
      <PageIntro title="The presentation" lede={<>Fifteen minutes on what happens when governance meets people who route around a no. <a href={TALK.eventUrl} className="underline underline-offset-4">{TALK.event}</a>, {TALK.when}, {TALK.where}.</>} />
      <section className="measure-wide pb-16" aria-label="The presentation's files">
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-lg bg-[color:var(--color-tile)] p-5"><a href={TALK.slidesPdf} className="text-xl font-semibold underline underline-offset-4">The slides</a><p className="mt-1 text-[color:var(--color-ink-muted)]">PDF of the deck as delivered.</p></li>
          <li className="rounded-lg bg-[color:var(--color-tile)] p-5"><a href={TALK.script} className="text-xl font-semibold underline underline-offset-4">The spoken script</a><p className="mt-1 text-[color:var(--color-ink-muted)]">Every word, slide by slide, from the speaker notes.</p></li>
          <li className="rounded-lg bg-[color:var(--color-tile)] p-5"><a href="/presentation/video/" className="text-xl font-semibold underline underline-offset-4">A video of the presentation</a><p className="mt-1 text-[color:var(--color-ink-muted)]">The recording, once the Linux Foundation posts it.</p></li>
          <li className="rounded-lg bg-[color:var(--color-tile)] p-5"><a href="/film/" className="text-xl font-semibold underline underline-offset-4">The film</a><p className="mt-1 text-[color:var(--color-ink-muted)]">The same story as a narrated shadow play.</p></li>
        </ul>
        <p className="mt-8 max-w-2xl text-[color:var(--color-ink-muted)]">The thesis fits in one line: {TALK.thesis}</p>
      </section>
    </>
  );
}
