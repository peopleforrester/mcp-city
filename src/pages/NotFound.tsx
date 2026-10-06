// ABOUTME: The not-found page: says plainly that the address is wrong and offers every page instead.
// ABOUTME: Caddy serves it with a 404 status for any path that matches no file.

import { isGroup, NAV } from "../data/nav";
import { PageIntro } from "./Page";

export function NotFoundPage() {
  return (
    <>
      <PageIntro title="Not found" lede="Nothing lives at this address. It may have moved when the site grew from one page to many. Everything is still here:" />
      <section className="measure-wide pb-16" aria-label="Every page">
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          <li><a href="/" className="font-semibold underline underline-offset-4">Home</a></li>
          {NAV.flatMap((item) => (isGroup(item) ? item.links : [item])).map((l) => (
            <li key={l.href}><a href={l.href} className="underline underline-offset-4">{l.label}</a></li>
          ))}
        </ul>
      </section>
    </>
  );
}
