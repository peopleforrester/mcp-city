// ABOUTME: A video of the presentation: the Linux Foundation recording and Michael's own from the room, each shown once it exists.
// ABOUTME: Set TALK.recordingYouTubeId or TALK.phoneRecording in src/data/links.ts and the page switches from waiting to the player.

import { TALK } from "../data/links";
import { PageIntro } from "./Page";

function YouTube({ id, title }: { id: string; title: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
      <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}`} title={title} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
    </div>
  );
}

export function VideoPage() {
  const id = TALK.recordingYouTubeId;
  const phone = TALK.phoneRecording;
  return (
    <>
      <PageIntro title="A video of the presentation" lede={<>{TALK.title}, {TALK.event}, {TALK.when}.</>} />
      <section className="measure-wide pb-16" aria-label="The recording">
        {id && <YouTube id={id} title={`${TALK.title}, the recording`} />}
        {id && TALK.recordingNote && <p className="mt-3 max-w-2xl text-[color:var(--color-ink-muted)]">{TALK.recordingNote}</p>}
        {phone && (
          <div className={id ? "mt-10" : ""}>
            <h2 className="text-2xl font-semibold">From the room</h2>
            <p className="mt-1 mb-4 text-[color:var(--color-ink-muted)]">Recorded on a phone in the ballroom.</p>
            {phone.kind === "youtube" ? <YouTube id={phone.id} title={`${TALK.title}, from the room`} /> : <video className="w-full rounded-lg bg-black" controls preload="metadata" playsInline src={phone.src} poster={phone.poster} aria-label={`${TALK.title}, recorded from the room`} />}
          </div>
        )}
        {!id && !phone && (
          <p className="max-w-2xl rounded-lg bg-[color:var(--color-tile)] p-5 text-lg">
            The recording will be here once the Linux Foundation posts it. Until then, every slide is on <a href="/presentation/" className="underline underline-offset-4">the presentation page</a> with the words spoken over it, and <a href="/film/" className="underline underline-offset-4">the film</a> tells the same story in six and a half minutes.
          </p>
        )}
        <p className="mt-6 max-w-2xl text-[color:var(--color-ink-muted)]">Follow along with <a href="/presentation/" className="underline underline-offset-4">the slides and speaker notes</a>, or take <a href="/gates/" className="underline underline-offset-4">the approval checklist</a> with you.</p>
      </section>
    </>
  );
}
