// ABOUTME: The shadow-play film, playable on the page: a 720p web encode, with the 1080p cut linked.
// ABOUTME: Narrated; the captions carry the story for anyone watching without sound.

import { TALK } from "../data/links";

export function Film({ standalone = false }: { standalone?: boolean } = {}) {
  return (
    <section id="film" className={standalone ? "measure-wide pb-16" : "measure-wide py-16 border-t border-[color:var(--color-rule)]"} aria-labelledby="film-h">
      {!standalone && <h2 id="film-h" className="text-3xl font-semibold tracking-tight sm:text-4xl">The film</h2>}
      <p className="mt-3 max-w-2xl text-[color:var(--color-ink-muted)]">
        The whole talk as a shadow play: cut paper on a backlit screen, narrated, with captions. Re-cut to the deck as presented. Rendered from the same art as the deck; the voice is synthetic.
      </p>
      <video
        className="mt-6 w-full rounded-lg bg-black"
        controls
        preload="none"
        playsInline
        poster="/film/poster.jpg"
        src="/film/shadow-play-720.mp4"
        aria-label="The shadow-play film of the keynote, narrated, with captions"
        data-testid="film"
      >
        Your browser does not play MP4; <a href={TALK.film}>download the film</a>.
      </video>
      <p className="mt-3 text-sm text-[color:var(--color-ink-muted)]">
        <a href={TALK.film} className="underline underline-offset-4">The 1080p cut and the source</a>, on GitHub.
      </p>
    </section>
  );
}
