
## 2026-10-04T22:47:54Z · 1.3 · PRD 8 approved (sha256:a320fd99edda)

Michael approved by saying "Start going" and "Read and work your issues as soon
as you're done" after the ten page URLs went live for the deck's QR codes. He
did not answer the four decisions, so these defaults apply until he says
otherwise: (1) gate titles follow the shown gates slide 13, the ask and verify
lists stay; (2) speaker notes publish verbatim as the spoken script, the
headcount line is left as he wrote it; (3) the articles go under Resources;
(4) phase 0 runs tonight including the gate titles, because the site should
match what the room sees.

Naming, same day: page names are plain ("MCP approval gates", "The
architecture", "The presentation", "A video of the presentation", "The film",
"Resources"); "plugs" is retired as a word; no about page, the person lives on
michaelrishiforrester.com. The important collateral sits in the top nav, not
buried under Resources.

## 2026-10-05T23:00:00Z · 2.2 · PRD 8 deviation: the collateral is vendored by an allowlist script, not a submodule

The plan named a git submodule for peopleforrester/mcp-for-a-city. It shipped as
scripts/sync-collateral.ts, which copies only the allowlisted documents into
content/collateral with the source commit in a manifest. A submodule would pull
the whole repo, including art and the PDF, into every Railway build and would
make the allowlist a convention rather than the mechanism. Revisit if the
number of documents makes the manual sync a chore.

## 2026-10-06T03:10:00Z · 2.2 · Talk time corrected to 9:59 EDT, reversing the 2026-10-05 change to 10:15

The 10:15 time came from the keynote repo's notes, which recorded the schedule
as first published. The live schedule, read 2026-10-06 in a browser, lists the
keynote at 09:59 in Ballroom East/Center, between 09:42 and 10:16 sessions.
Raised as #13 by the keynote session. The lesson: check the live source for a
date or time, never a note about it.

## 2026-10-06T03:10:00Z · 2.2 · Self-hosted Umami for visit counts

Umami 3.4.0 (latest release, 2026-09-17, per its GitHub releases) runs as the
`umami` service with its own Postgres (`Postgres-wmvi`) in the mrf-website
Railway project, built from the official image rather than a community
template; none of Railway's Umami templates is verified. The default admin
password was replaced at first boot; credentials are in
`~/secrets/projects/mcp-city.env` and on the service as UMAMI_ADMIN_PASSWORD.
Cookieless and limited to the live domain, so no consent banner.

### REJECTED: a Railway marketplace Umami template
**Why:** none of the four is verified by Railway, and each pins its own image and settings.
**Status:** Permanent while the official image deploys directly.
**Do not suggest:** sharing the main site's Postgres-_k1t with Umami.

## 2026-10-06T03:10:00Z · 2.2 · Eighteen research documents published

Vetted for publication: seven research files stay private (employer figures,
event positioning, talk craft, the internal component plan). The approval
source ledger duplicate was dropped. Publication notes flag stale claims
rather than rewriting the research.
