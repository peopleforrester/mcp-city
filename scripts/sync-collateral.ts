// ABOUTME: Copies the allowlisted public documents from the collateral repo into content/collateral, with provenance.
// ABOUTME: Run with `node scripts/sync-collateral.ts [path-to-mcp-for-a-city]`; nothing outside the allowlist ever crosses.

import { execSync } from "node:child_process";
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

/** Every document the site renders from peopleforrester/mcp-for-a-city. A file not listed here is not published. */
export const COLLATERAL = [
  { src: "research/approval-process-criteria.md", slug: "approval-process-criteria", title: "What an enterprise MCP approval process evaluates" },
  { src: "research/wrapping-mcp-servers.md", slug: "wrapping-mcp-servers", title: "Wrapping an MCP server inside an MCP server" },
  { src: "research/source-ledger.md", slug: "source-ledger", title: "The claim-by-claim source ledger" },
  { src: "sources/sources.md", slug: "sources", title: "The sources slide" },
  { src: "gates/approval-gates.md", slug: "approval-gates", title: "The six approval gates as a checklist" },
];

const repo = resolve(process.argv[2] ?? "../../talks/mcp-for-a-city");
const sha = execSync("git rev-parse --short HEAD", { cwd: repo }).toString().trim();
mkdirSync("content/collateral", { recursive: true });
for (const c of COLLATERAL) copyFileSync(resolve(repo, c.src), `content/collateral/${c.slug}.md`);
writeFileSync("content/collateral/manifest.json", JSON.stringify({ repo: "peopleforrester/mcp-for-a-city", commit: sha, synced: new Date().toISOString().slice(0, 10), documents: COLLATERAL }, null, 1) + "\n");
console.log(`synced ${COLLATERAL.length} documents at ${sha}`);
