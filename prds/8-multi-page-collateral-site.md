<!--
ABOUTME: Plan for turning mcp.michaelrishiforrester.com from one page into a site that carries every piece of the keynote's collateral.
ABOUTME: Draft until Michael approves; the research section records what was measured on 2026-10-05.
-->

# PRD 8: a multi-page site that carries every piece of the talk's collateral, kept current with the deck

Status: draft. Approved-by: pending. Issue #8.

Michael, 2026-10-05: the website is awesome, and it needs multiple pages, a lot
more detail, every piece of collateral from the talk represented in its best
format, and the pieces that have not been touched since the main story changed
brought current. His example: the USB history is gone.

## What I measured on 2026-10-05

**The site today.** One React page with anchors (`#gates`, `#map`, `#plugs`,
`#film`, `#talk`, `#resources`, `#about`) plus a static `/wrapping/` page. The
header carries no section links, only "Site source". Everything below the gates
is lazy-loaded, so the served HTML contains none of it. The plug wall does
render on desktop and on a Pixel 7 profile against the live URL, but it is the
fifth section down, unnamed in any nav, and the deck has moved its two USB
slides (41 and 42) and "Twenty years of no" (54) to the hidden appendix. The
site is now the only place that story is told, and nothing points at it.

**The story moved; the public copies did not.** The deck was restructured on
2026-10-04 (issues #14 to #34 in the keynote repo) and reworded again on
2026-10-05. It now shows 39 slides with about 1,950 words of notes, in the run
order recorded in `notes/dry-run-2026-10-04.md`. The public collateral is older:

| Artifact | Last written | State |
|---|---|---|
| `slides/governing-mcp-toronto-2026.pdf` (collateral repo) | 2026-10-03 | exported before the restructure |
| `script/keynote-spoken.md` (collateral repo and site link) | 2026-10-03, from a 2026-10-02 draft of 2,556 words | not the notes that will be spoken |
| `src/data/gates.ts`, `gates/approval-gates.md` | 2026-10-03 | match the six detail slides (now hidden) but not the shown gates slide 13, which asks "Do we have a relationship with the vendor?" and "Is the vendor certified?" |
| `src/data/links.ts` `TALK.when` | 2026-10-03 | says 09:59; the published schedule and the keynote repo say 10:15 to 10:30 EDT |
| sources | 2026-10-04 | current |

**What exists to put on the site.** From the two talk repos, read 2026-10-05:

- The deck: 59 slides in Google Slides (id `1kPEQ80oGdeE74VrZbXx5qHeyak8R3EuSB0hfF2RsDvg`), 39 shown, with speaker notes in Michael's words; the PDF export; the PPTX template.
- The spoken script and its two earlier drafts; the 15-minute cut notes; the run sheet; Q and A prep (private).
- The architecture diagram, Mermaid source and PNG.
- The six gates with the source ledger behind them (`approval-process-source-ledger.md`, 41 KB) and `approval-process-criteria.md`.
- `wrapping-mcp-servers.md`: the six reasons, the tools, the one test.
- Research spikes, public: gateway and registry operations, deployment and migration, vetting and supply chain, token economics, the spec state, security failures, operations at scale, the three pillars (cost, performance, reliability), the component map and three component files, the ship crews.
- Research, private, never crosses: the Accenture envelope and annual-report figures, the Toronto overlap and positioning, the schedule file, `notes/`, `decisions.md`, `PROJECT_STATE.md`, the Microsoft control-plane file unless re-read.
- Art: 23 shadow-play scenes, 8 ship outlines, 7 cable sketches, 5 attack scenes, the rainbow spider, the yellow Death Star, the QR codes.
- The film: narrated 720p on the site, 1080p v0.2 release, captions-only v0.1.
- The three-part article series (operational excellence, security, reliability) with its review notes; the published abstract and fact anchors.
- The three public MCP repos.

## The idea

Keep the city as the front door and give every piece of collateral a page of
its own, each in the format that suits it: a walkable form for the gates, a
living map for the architecture, a slide-by-slide reader for the talk, rendered
HTML for the research (not links into GitHub), a gallery for the art, a player
with chapters for the film. The home page becomes shorter: the descent, one
section per page with a teaser, and a real navigation.

### Pages

| Route | Carries | Format |
|---|---|---|
| `/` | The descent and the ship HUD; one teaser card per page below; the thesis | Scene plus cards; nothing waits on three.js |
| `/talk/` | The talk as given: every shown slide as an image with Michael's notes beside it, in run order, with timings; the PDF, the PPTX, the film, the abstract, the event listing, the recording when posted | Reader; images lazy; notes are the page text |
| `/gates/` | The six-gate walk, the alleys, the result card, Markdown export, print, share links; the checklist as a document; the criteria research rendered; the source ledger rendered claim by claim | Form first, scene on top |
| `/architecture/` | The living map with say-no and the attack replay; the diagram PNG and Mermaid; a glossary of every building with its source; the component map and component research | Map plus rendered documents |
| `/story/` | The CVE-2026-47250 tale in five scenes: plant, ask, run, token, replay, each with the deck's picture, the step text and the advisory source; the security-failures spike | Scroll story |
| `/plugs/` | The connector history from 1981 to 2014 with the sketches and dates, the eighteen years, "MCP is the USB of AI tooling" and why we are not at USB-C yet, "Twenty years of no", and the wrapping section with USB-C closing around USB-A | Timeline; replaces the `/wrapping/` static page, which redirects |
| `/wrapping/` | The six reasons, the tools, the one test, the research rendered | Keeps the QR URL from the deck; becomes a page of the app |
| `/ships/` | The scale ladder: every ship, its crew and source, the headcount it stands for; the fan-art note | Ladder with the outlines |
| `/research/` | Index of every public spike and the ledger, each rendered as HTML with its read dates; a link to the Markdown in the collateral repo | Rendered Markdown |
| `/articles/` | The three-part series once published, the abstract now | Rendered Markdown |
| `/film/` | The narrated film with chapter marks per scene, captions, the 1080p download | Player |
| `/art/` | Every scene, ship, cable and attack image with its caption and the generated-fan-art note | Gallery |
| `/about/` | The person, speaking, contact, newsletter, the three MCP repos | Plain |

### How it stays current

Content is data, generated from the two sources of truth rather than retyped:

- **The deck.** A script in this repo (`scripts/pull-deck.ts`) reads the Slides
  presentation through the API: shown slides in order, each slide's text and
  notes, and a PNG per slide via the thumbnail endpoint. It writes
  `content/talk/*.json` and `public/slides/*.png` with the deck revision id and
  the read date. Re-run it whenever the deck changes; the talk page, the gate
  titles and the spoken script regenerate from it. The collateral repo's
  `script/keynote-spoken.md` and PDF are regenerated in the same run.
- **The collateral repo.** `mcp-for-a-city` is vendored as a git submodule at
  `content/collateral/`, so research, art and the diagram are read from it at
  build time and a bump of the submodule is the only step after it changes. The
  existing direction stays: `gates.ts` here generates the collateral repo's
  checklist, so gates flow out, and everything else flows in.
- A Vitest check fails the build when the deck revision recorded in
  `content/talk/` is older than the one the API reports, so stale cannot ship
  silently.

### Technique

- **Vite multi-page build**, one HTML entry per route, shared chrome and data,
  no router dependency. Each page is real static HTML served by Caddy with its
  own title, description and Open Graph image, which is also the fix for
  issue #3 (first paint on phones) because the text is in the HTML before any
  script. The SPA fallback stays only for share links and the old anchors,
  which redirect to their pages.
- Markdown is rendered at build time to HTML (a build-time renderer,
  version read from npm at 2.1), with headings turned into anchors and the
  source ledger's tables kept as tables.
- The three.js scenes stay lazy and in-view only, as today; each page mounts
  only its own scene.
- Tests: every page builds, has a title and one `h1`, and every internal link
  resolves (Vitest over `dist/`); every slide in `content/talk/` has an image
  and notes; every research file in the submodule that is marked public is
  rendered; Playwright walks the nav on desktop and phone and checks the gates
  still work with keyboard only; Lighthouse mobile stays at or above today's
  84 and the aim is 90 once the HTML carries the text.

### Scrub

Nothing from `notes/`, `decisions.md`, `PROJECT_STATE.md`, `research/ecosystem/`
or the article review notes crosses to the site. Every file read from the
submodule is listed in an allowlist in `content/manifest.ts`; a file not on the
list is not rendered. The employer is not named on the site. Speaker notes are
read before they are published, because they are Michael's spoken words and
one slide's note carries a headcount figure he has not settled.

## Phases

| Phase | Ships | Done when |
|---|---|---|
| **0. Current before the keynote** (2026-10-05, tonight) | Time fixed to 10:15; gate titles follow slide 13 if Michael says so (decision 1); header nav with a link to every section including the plugs; deck re-exported to PDF and the spoken script regenerated from the current notes into the collateral repo; `/wrapping/` checked against slide 20's six reasons | Live, e2e green against the URL, QR pages unchanged |
| **1. The shell** (week of 2026-10-06) | Multi-page build, chrome, nav, sitemap, redirects from the anchors; gates, architecture, plugs, film and about on their own pages; home trimmed to the descent and the cards | Every page builds and links resolve; Lighthouse mobile not below 84 |
| **2. The talk and the story** | `pull-deck.ts`, the talk reader with slides and notes, the story page, the ships page, the staleness check | Notes match the live deck revision; recording link slot ready |
| **3. Research, articles, art** | Submodule, Markdown rendering, the research index and ledger pages, the gallery, the articles page | Every allowlisted file rendered; no private file present in `dist/` (a test greps for it) |
| **4. Polish** | Prerender audit against #3, Railway IaC (#2), Open Graph images per page, the shader pass from #6, Awwwards worth considering | Issues #2, #3 and #6 closed |

Phase 0 is what tomorrow's audience sees. Phases 1 to 4 land in place on the
same URL.

## Decisions for Michael

1. **Gate titles.** Follow the shown slide 13 ("Do we have a relationship with
   the vendor?", "Is the vendor certified?") or keep the detail-slide wording
   the site has now? The checklist export follows whichever you pick.
2. **Speaker notes public.** The talk page publishes your notes as the spoken
   script, verbatim. Yes, or edited by you first? And the headcount line on
   slide 1: about 750,000 (your note) or about 814,000 (the fact anchors)?
3. **Articles.** Publish the three-part series on `/articles/` as they stand,
   hold them for michaelrishiforrester.com, or both with the main site
   canonical?
4. **Phase 0 scope tonight.** The nav, the time, the regenerated script and PDF
   are safe. Changing gate wording the night before is your call.

## Not in scope

The talk itself, the film's content, the newsletter mechanics (MRF-website
#101), and the Remotion version of the slides.

## Sources

- The live Slides deck, read 2026-10-05 through the Slides API: 59 slides, 39 shown, notes per slide.
- `~/repos/talks/MCP_for_a_city`: `notes/dry-run-2026-10-04.md` (run order), `PROJECT_STATE.md` phase history through 2026-10-05, `decisions.md` PRD 12 entries, `prds/12-*.md`.
- `~/repos/talks/mcp-for-a-city`: file list and `git log` dates, read 2026-10-05.
- Live site: `curl`, Playwright on desktop and Pixel 7 against https://mcp.michaelrishiforrester.com/, 2026-10-05.
- Railway: `railway status`, `railway domain`, `railway deployment list`, 2026-10-05.
