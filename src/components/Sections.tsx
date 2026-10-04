// ABOUTME: The plain parts below the city: the talk, the resources, the person.
// ABOUTME: Fast, linkable, readable with the canvas gone.

import { PERSON, RESOURCES, TALK } from "../data/links";

export function Talk() {
  return (
    <section id="talk" className="measure-wide py-16 border-t border-[color:var(--color-rule)]" aria-labelledby="talk-h">
      <h2 id="talk-h" className="text-3xl font-semibold tracking-tight sm:text-4xl">The presentation</h2>
      <p className="mt-3 max-w-2xl text-[color:var(--color-ink-muted)]">
        Fifteen minutes on what happens when governance meets people who route around a no. {TALK.when}, {TALK.where}.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li className="rounded-lg bg-[color:var(--color-tile)] p-5"><a href="#film" className="font-semibold underline underline-offset-4">The shadow-play film</a><p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">Six minutes, the whole story, narrated, cut paper on a backlit screen. Plays below.</p></li>
        <li className="rounded-lg bg-[color:var(--color-tile)] p-5"><a href={TALK.slidesPdf} className="font-semibold underline underline-offset-4">The slides</a><p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">PDF, as delivered.</p></li>
        <li className="rounded-lg bg-[color:var(--color-tile)] p-5"><a href={TALK.script} className="font-semibold underline underline-offset-4">The spoken script</a><p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">Every word, slide by slide.</p></li>
        <li className="rounded-lg bg-[color:var(--color-tile)] p-5"><span className="font-semibold">The recording</span><p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">Linked here once the foundation posts it.</p></li>
      </ul>
    </section>
  );
}

export function Resources() {
  return (
    <section id="resources" className="measure-wide py-16 border-t border-[color:var(--color-rule)]" aria-labelledby="res-h">
      <h2 id="res-h" className="text-3xl font-semibold tracking-tight sm:text-4xl">Resources</h2>
      <p className="mt-3 max-w-2xl text-[color:var(--color-ink-muted)]">
        Everything the QR code promised lives in <a href={TALK.repo} className="underline underline-offset-4">peopleforrester/mcp-for-a-city</a>.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {RESOURCES.map((r) => (
          <li key={r.url} className="rounded-lg bg-[color:var(--color-tile)] p-5">
            <a href={r.url} className="font-semibold underline underline-offset-4">{r.label}</a>
            <p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">{r.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="measure-wide py-16 border-t border-[color:var(--color-rule)]" aria-labelledby="about-h">
      <h2 id="about-h" className="text-3xl font-semibold tracking-tight sm:text-4xl">{PERSON.name}</h2>
      <p className="mt-3 max-w-2xl">{PERSON.bio}</p>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {PERSON.links.map((l) => (
          <li key={l.url}><a href={l.url} className="font-medium underline underline-offset-4">{l.label}</a></li>
        ))}
      </ul>
    </section>
  );
}
