// ABOUTME: Copies the allowlisted public documents from the collateral repo into content/collateral, with provenance.
// ABOUTME: Run with `node scripts/sync-collateral.ts [path-to-mcp-for-a-city]`; nothing outside the allowlist ever crosses.

import { execSync } from "node:child_process";
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";

/** Every document the site renders from peopleforrester/mcp-for-a-city. A file not listed here is not published. */
export interface Collateral {
  src: string;
  slug: string;
  title: string;
  series?: string;
  status?: string;
  /** The research topic a document is listed under on the Resources page. */
  topic?: string;
}

export const COLLATERAL: Collateral[] = [
  { src: "research/approval-process-criteria.md", slug: "approval-process-criteria", title: "What an enterprise MCP approval process evaluates" },
  { src: "research/wrapping-mcp-servers.md", slug: "wrapping-mcp-servers", title: "Wrapping an MCP server inside an MCP server" },
  { src: "research/source-ledger.md", slug: "source-ledger", title: "The claim-by-claim source ledger" },
  { src: "sources/sources.md", slug: "sources", title: "The sources slide" },
  { src: "gates/approval-gates.md", slug: "approval-gates", title: "The six approval gates as a checklist" },
  { src: "research/bestpractice/mcp-gateway-and-registry-operations.md", slug: "research/mcp-gateway-and-registry-operations", title: "Operating MCP Gateways and Registries", topic: "Operating MCP" },
  { src: "research/bestpractice/mcp-server-deployment-and-migration.md", slug: "research/mcp-server-deployment-and-migration", title: "Deploying MCP After 2026-07-28", topic: "Operating MCP" },
  { src: "research/ops/mcp-operations-at-scale-2026-09.md", slug: "research/mcp-operations-at-scale-2026-09", title: "What Breaks at MCP Scale", topic: "Operating MCP" },
  { src: "research/scale/mcp-at-scale-architecture-2026-09.md", slug: "research/mcp-at-scale-architecture-2026-09", title: "MCP Enterprise Architecture Survey", topic: "Operating MCP" },
  { src: "research/bestpractice/VERIFIED-transport-and-quote-audit.md", slug: "research/VERIFIED-transport-and-quote-audit", title: "MCP Routing Headers Verified", topic: "Operating MCP" },
  { src: "research/bestpractice/mcp-server-vetting-and-supply-chain.md", slug: "research/mcp-server-vetting-and-supply-chain", title: "Vetting MCP Servers", topic: "Security and vetting" },
  { src: "research/security/mcp-security-failures-2026-09.md", slug: "research/mcp-security-failures-2026-09", title: "MCP Security Failures Catalogue", topic: "Security and vetting" },
  { src: "research/ecosystem/microsoft-mcp-control-plane.md", slug: "research/microsoft-mcp-control-plane", title: "Microsoft's MCP Governance Stack", topic: "Security and vetting" },
  { src: "research/bestpractice/mcp-token-economics-and-tool-consolidation.md", slug: "research/mcp-token-economics-and-tool-consolidation", title: "MCP Token Economics", topic: "Cost, performance and reliability" },
  { src: "research/pillars/cost.md", slug: "research/cost", title: "The Total Cost of MCP", topic: "Cost, performance and reliability" },
  { src: "research/pillars/performance.md", slug: "research/performance", title: "MCP Latency and Throughput", topic: "Cost, performance and reliability" },
  { src: "research/pillars/reliability.md", slug: "research/reliability", title: "MCP Reliability at Scale", topic: "Cost, performance and reliability" },
  { src: "research/components/inference-gateways.md", slug: "research/inference-gateways", title: "AI Gateways on the Inference Path", topic: "The layers around MCP" },
  { src: "research/components/artifact-registries.md", slug: "research/artifact-registries", title: "Model, Prompt and Agent Registries", topic: "The layers around MCP" },
  { src: "research/components/supporting-layers.md", slug: "research/supporting-layers", title: "Observability, Secrets and Sandboxing", topic: "The layers around MCP" },
  { src: "research/spec/mcp-specification-state-2026-09.md", slug: "research/mcp-specification-state-2026-09", title: "MCP Specification, September 2026", topic: "The specification and the numbers" },
  { src: "research/ecosystem/registry-count-verification.md", slug: "research/registry-count-verification", title: "Counting the MCP Ecosystem", topic: "The specification and the numbers" },
  { src: "research/craft/ship-crews.md", slug: "research/ship-crews", title: "Starship Crew Sizes", topic: "The specification and the numbers" },
  { src: "articles/part-1-operational-excellence.md", slug: "articles/part-1-operational-excellence", title: "The Protocol Moved Under You and Nobody Migrates You", series: "Operating MCP at Scale, part 1: operational excellence", status: "draft, under review" },
  { src: "articles/part-2-security.md", slug: "articles/part-2-security", title: "Nobody Vets MCP Servers, and Everyone Is Right About Why", series: "Operating MCP at Scale, part 2: security", status: "draft, under review" },
  { src: "articles/part-3-reliability.md", slug: "articles/part-3-reliability", title: "Your Health Check Is Speaking a Different Protocol Version", series: "Operating MCP at Scale, part 3: reliability", status: "draft, under review" },
];

/** The HTML entry and the mount module for /resources/<slug>/, so a new document is one line in the allowlist. */
function writeEntry(c: Collateral) {
  const route = `resources/${c.slug}`;
  const desc = (c.series ? `${c.series}. ` : "") + "From the collateral of Governing MCP for a Workforce the Size of a City, MCP Dev Summit Toronto 2026.";
  mkdirSync(route, { recursive: true });
  writeFileSync(
    `${route}/index.html`,
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${c.title}</title>
    <meta name="description" content="${desc}" />
    <meta property="og:title" content="${c.title}" />
    <meta property="og:image" content="https://mcp.michaelrishiforrester.com/og/${route.replace(/\//g, "-")}.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://mcp.michaelrishiforrester.com/og/${route.replace(/\//g, "-")}.jpg" />
    <meta property="og:url" content="https://mcp.michaelrishiforrester.com/${route}/" />
    <link rel="canonical" href="https://mcp.michaelrishiforrester.com/${route}/" />
    <meta name="theme-color" content="#051932" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/entries/${route}.tsx"></script>
  </body>
</html>
`,
  );
  const entry = `src/entries/${route}.tsx`;
  mkdirSync(dirname(entry), { recursive: true });
  const up = relative(dirname(entry), ".").replace(/\\/g, "/");
  writeFileSync(
    entry,
    `// ABOUTME: Entry for /${route}/. Mounts the rendered document into the shared shell.
// ABOUTME: Generated by scripts/sync-collateral.ts from the allowlist; the Markdown is in content/collateral.

import markdown from "${up}/content/collateral/${c.slug}.md?raw";
import { mountPage } from "${up}/src/pages/mount";
import { DocumentPage } from "${up}/src/pages/Document";

mountPage(<DocumentPage slug="${c.slug}" markdown={markdown} />);
`,
  );
}

const repo = resolve(process.argv[2] ?? "../../talks/mcp-for-a-city");
const sha = execSync("git rev-parse --short HEAD", { cwd: repo }).toString().trim();
mkdirSync("content/collateral", { recursive: true });
/** Every commit that touched a document in the collateral repo, newest first: the public record of what changed and when. */
function historyOf(src: string): { date: string; sha: string; subject: string }[] {
  const out = execSync(`git log --follow --format=%as%x09%h%x09%s -- ${JSON.stringify(src)}`, { cwd: repo }).toString().trim();
  return out ? out.split("\n").map((line) => { const [date, sha, subject] = line.split("\t"); return { date, sha, subject }; }) : [];
}

for (const c of COLLATERAL) {
  const dest = `content/collateral/${c.slug}.md`;
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(resolve(repo, c.src), dest);
  writeEntry(c);
}
writeFileSync("content/collateral/manifest.json", JSON.stringify({ repo: "peopleforrester/mcp-for-a-city", commit: sha, synced: new Date().toISOString().slice(0, 10), documents: COLLATERAL.map((c) => ({ ...c, history: historyOf(c.src) })) }, null, 1) + "\n");
console.log(`synced ${COLLATERAL.length} documents at ${sha}`);
