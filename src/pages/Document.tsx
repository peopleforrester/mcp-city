// ABOUTME: A rendered collateral document: the title, where it came from and when, then the HTML.
// ABOUTME: The Markdown is imported raw and rendered at build time by Vite, so the page is text with no runtime parser.

import manifest from "../../content/collateral/manifest.json";
import { renderMarkdown } from "../lib/markdown";
import { PageIntro } from "./Page";

export function DocumentPage({ slug, markdown }: { slug: string; markdown: string }) {
  const doc = manifest.documents.find((d) => d.slug === slug)!;
  const { title, html } = renderMarkdown(markdown);
  return (
    <>
      <PageIntro title={title || doc.title} lede={<>{doc.series && <>{doc.series}. </>}{doc.status && <span className="rounded bg-[color:var(--color-accent)] px-2 py-0.5 text-sm font-semibold text-black">{doc.status}</span>}{doc.status && " "}From <a href={`https://github.com/${manifest.repo}/blob/main/${doc.src}`} className="underline underline-offset-4">{manifest.repo}</a>, as of commit {manifest.commit}, synced {manifest.synced}. Part of <a href="/resources/" className="underline underline-offset-4">Resources</a>.{doc.status && <> Corrections are welcome as <a href={`https://github.com/${manifest.repo}/issues`} className="underline underline-offset-4">issues on the repo</a>.</>}</>} />
      <article className="measure-wide pb-16 prose-doc" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
