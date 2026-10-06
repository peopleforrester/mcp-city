// ABOUTME: Groups the published documents into the sections Resources is organized by: the articles, the research by topic, and the talk's documents.
// ABOUTME: The document pages use it for their breadcrumb, previous and next links, and the list of their neighbours.

import manifest from "../../content/collateral/manifest.json";

export interface Doc { slug: string; title: string; src: string; topic?: string; series?: string; status?: string }
export interface Section { id: "articles" | "research" | "talk"; name: string; href: string; docs: Doc[] }

const docs = manifest.documents as Doc[];

export const SECTIONS: Section[] = [
  { id: "articles", name: "The articles", href: "/resources/articles/", docs: docs.filter((d) => d.slug.startsWith("articles/")) },
  { id: "research", name: "The research", href: "/resources/research/", docs: docs.filter((d) => d.topic) },
  { id: "talk", name: "Documents from the talk", href: "/resources/#talk-h", docs: docs.filter((d) => !d.slug.startsWith("articles/") && !d.topic) },
];

export const TOPICS = [...new Set(docs.flatMap((d) => (d.topic ? [d.topic] : [])))];

export function sectionOf(slug: string): Section {
  return SECTIONS.find((s) => s.docs.some((d) => d.slug === slug))!;
}

export function neighbours(slug: string): { prev: Doc | null; next: Doc | null } {
  const list = sectionOf(slug).docs;
  const i = list.findIndex((d) => d.slug === slug);
  return { prev: i > 0 ? list[i - 1] : null, next: i < list.length - 1 ? list[i + 1] : null };
}
