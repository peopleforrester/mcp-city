
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
