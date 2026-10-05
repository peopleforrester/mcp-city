// ABOUTME: The film on a page of its own, with the 1080p cut and the source linked.
// ABOUTME: Chapters arrive with the presentation pull; the player stands on its own until then.

import { Film } from "../components/Film";
import { PageIntro } from "./Page";

export function FilmPage() {
  return (
    <>
      <PageIntro title="The film" lede="The whole talk as a shadow play: cut paper on a backlit screen, narrated, with captions. About five minutes." />
      <Film standalone />
    </>
  );
}
