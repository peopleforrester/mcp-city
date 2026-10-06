// ABOUTME: Everything the site search covers, flattened to text: the pages, every slide's notes, the gates, the spec revisions, and every published document.
// ABOUTME: Imported lazily by the search page only, so no other page downloads the corpus.

import manifest from "../../content/collateral/manifest.json";
import deck from "../../content/presentation/slides.json";
import { plain, type Entry } from "../lib/search";
import { NAV, isGroup } from "./nav";
import { GATES } from "./gates";
import { SPEC_REVISIONS } from "./spec";

const docs = import.meta.glob("../../content/collateral/**/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

const pages: Entry[] = NAV.flatMap((i) => (isGroup(i) ? i.links : [i]))
  .filter((l) => !l.href.includes("#"))
  .map((l) => ({ title: l.label, url: l.href, kind: "Page", text: l.label }));

const slides: Entry[] = deck.slides.map((s) => ({ title: s.title || `Slide ${s.n}`, url: `/presentation/#slide-${s.n}`, kind: `Slide ${s.n}`, text: s.notes }));

const gates: Entry[] = GATES.map((g) => ({
  title: `Gate ${g.n}: ${g.title}`,
  url: "/gates/",
  kind: "Approval gate",
  text: [g.who, ...g.ask, ...g.verify, g.note, g.alley].join(" "),
}));

const spec: Entry[] = SPEC_REVISIONS.map((r) => ({
  title: `MCP ${r.id}: ${r.headline}`,
  url: `/spec/#rev-${r.id}`,
  kind: "Spec revision",
  text: [...r.changes, ...r.removed].map((c) => c.text).join(" "),
}));

const documents: Entry[] = manifest.documents.map((d) => ({
  title: d.title,
  url: `/resources/${d.slug}/`,
  kind: d.slug.startsWith("articles/") ? "Article" : "topic" in d ? "Research" : "Document",
  text: plain(docs[`../../content/collateral/${d.slug}.md`] ?? ""),
}));

export const INDEX: Entry[] = [...pages, ...gates, ...spec, ...slides, ...documents];
