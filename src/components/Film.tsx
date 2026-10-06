// ABOUTME: The shadow-play film, playable on the page: a 720p web encode, with the 1080p cut linked.
// ABOUTME: Narrated; the captions carry the story for anyone watching without sound.

import { useRef } from "react";
import chaptersVtt from "../../public/film/chapters.vtt?raw";
import { TALK } from "../data/links";
import { clock, parseVtt } from "../lib/vtt";

const CHAPTERS = parseVtt(chaptersVtt);

export function Film({ standalone = false }: { standalone?: boolean } = {}) {
  const video = useRef<HTMLVideoElement>(null);
  const jump = (t: number) => {
    const v = video.current;
    if (!v) return;
    v.currentTime = t;
    void v.play();
  };
  return (
    <section id="film" className={standalone ? "measure-wide pb-16" : "measure-wide py-16 border-t border-[color:var(--color-rule)]"} aria-labelledby="film-h">
      {!standalone && <h2 id="film-h" className="text-3xl font-semibold tracking-tight sm:text-4xl">The film</h2>}
      <p className="mt-3 max-w-2xl text-[color:var(--color-ink-muted)]">
        The whole talk as a shadow play: cut paper on a backlit screen, narrated, with captions. Re-cut to the deck as presented. Rendered from the same art as the deck; the voice is synthetic.
      </p>
      <video
        ref={video}
        className="mt-6 w-full rounded-lg bg-black"
        controls
        preload="metadata"
        crossOrigin="anonymous"
        playsInline
        poster="/film/poster.jpg"
        src="/film/shadow-play-720.mp4"
        aria-label="The shadow-play film of the keynote, narrated, with captions"
        data-testid="film"
      >
        <track kind="captions" srcLang="en" label="English" src="/film/captions.en.vtt" default />
        <track kind="chapters" srcLang="en" label="Scenes" src="/film/chapters.vtt" />
        Your browser does not play MP4; <a href={TALK.film}>download the film</a>.
      </video>
      <ol className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3" aria-label="Scenes">
        {CHAPTERS.map((c) => (
          <li key={c.start}>
            <button type="button" onClick={() => jump(c.start)} className="text-left underline underline-offset-4">
              <span className="font-mono text-sm text-[color:var(--color-glow)]">{clock(c.start)}</span> {c.text}
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-[color:var(--color-ink-muted)]">
        <a href={TALK.film} className="underline underline-offset-4">The 1080p cut and the source</a>, on GitHub.
      </p>
    </section>
  );
}
