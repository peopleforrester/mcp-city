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
      <PageIntro title={title || doc.title} lede={<>From <a href={`https://github.com/${manifest.repo}/blob/main/${doc.src}`} className="underline underline-offset-4">{manifest.repo}</a>, as of commit {manifest.commit}, synced {manifest.synced}. Part of <a href="/resources/" className="underline underline-offset-4">Resources</a>.</>} />
      <article className="measure-wide pb-16 prose-doc" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
