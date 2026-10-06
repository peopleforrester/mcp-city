// ABOUTME: A video of the presentation: the recording embedded once it is posted, with the slide reader beside it.
// ABOUTME: Set TALK.recordingYouTubeId in src/data/links.ts and the page switches from the waiting state to the player.

import { TALK } from "../data/links";
import { PageIntro } from "./Page";

export function VideoPage() {
  const id = TALK.recordingYouTubeId;
  return (
    <>
      <PageIntro title="A video of the presentation" lede={<>{TALK.title}, {TALK.event}, {TALK.when}.</>} />
      <section className="measure-wide pb-16" aria-label="The recording">
        {id ? (
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              title={`${TALK.title}, the recording`}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <p className="max-w-2xl rounded-lg bg-[color:var(--color-tile)] p-5 text-lg">
            The recording will be here once the Linux Foundation posts it. Until then, every slide is on <a href="/presentation/" className="underline underline-offset-4">the presentation page</a> with the words spoken over it, and <a href="/film/" className="underline underline-offset-4">the film</a> tells the same story in five minutes.
          </p>
        )}
        <p className="mt-6 max-w-2xl text-[color:var(--color-ink-muted)]">Follow along with <a href="/presentation/" className="underline underline-offset-4">the slides and speaker notes</a>, or take <a href="/gates/" className="underline underline-offset-4">the approval checklist</a> with you.</p>
      </section>
    </>
  );
}
