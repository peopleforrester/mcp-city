# Agent guidance for this repo

ABOUTME: Repo-local rules for anyone working on mcp.michaelrishiforrester.com.
ABOUTME: The site renders the keynote's claims, so the keynote's accuracy bar applies here.

- `src/data/gates.ts` is the contract with the deck's gate slides. Change the
  wording there only when the slide changes, and keep every source URL real.
- Nothing above the fold waits on three.js. The scene is lazy, and the poster
  is the floor on phones and under `prefers-reduced-motion`.
- Every 3D interaction has a DOM equivalent. The gate walk is a form first.
- Prose style: no em-dashes, no hedging scaffolds, American English.
- Work on `staging`; promote to `main` once tests pass. Railway deploys `main`.
