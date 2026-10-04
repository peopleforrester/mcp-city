// ABOUTME: Writes public/gates/index.html, the standalone checklist page the deck's gates QR lands on.
// ABOUTME: Generated from src/data/gates.ts; run with `npx tsx scripts/export-gates-page.ts`.

import { writeFileSync } from "node:fs";
import { GATES } from "../src/data/gates";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const gates = GATES.map(
  (g) => `<section class="gate" style="border-left-color:${["#ff3c64", "#ffc800", "#00c8bc", "#009eff", "#bc37de", "#ed561b"][g.n - 1]}">
<h2>Gate ${g.n}: ${esc(g.title)}</h2>
<p class="muted">Who answers: ${esc(g.who)}</p>
<h3>Ask</h3><ul>${g.ask.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
<h3>Verify</h3><ul class="checks">${g.verify.map((c) => `<li><label><input type="checkbox"> ${esc(c)}</label></li>`).join("")}</ul>
<p class="muted">${esc(g.note)}</p>
<p class="alley"><strong>If this gate says no with no explanation:</strong> ${esc(g.alley)}</p>
<p class="muted">Sources: ${g.sources.map((s) => `<a href="${s.url}">${esc(s.label)}</a>`).join(" · ")}</p>
</section>`,
).join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>The acceptance process: six gates before an MCP server comes online</title>
<meta name="description" content="The six-gate checklist for approving an MCP server, with the ask, the verify steps and the sources, from the MCP Dev Summit Toronto 2026 keynote.">
<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<style>
  :root{--page:#282a36;--ink:#f8f8f2;--muted:#b9bbc8;--link:#8be9fd;--tile:#343746;--accent:#ffb86c}
  @font-face{font-family:"Bricolage Grotesque";font-weight:200 800;font-display:swap;src:url("/fonts/bricolage-grotesque-variable.woff2") format("woff2-variations")}
  html{color-scheme:dark}body{margin:0;background:var(--page);color:var(--ink);font:18px/1.6 system-ui,sans-serif}
  main{max-width:46rem;margin:0 auto;padding:2rem 1rem 4rem}h1,h2,h3{font-family:"Bricolage Grotesque",system-ui,sans-serif;line-height:1.2}
  h1{font-size:2rem;margin:.5rem 0}h2{font-size:1.4rem;margin:0 0 .3rem}h3{font-size:1rem;margin:1rem 0 .2rem;text-transform:uppercase;letter-spacing:.04em}
  a{color:var(--link)}.muted{color:var(--muted);font-size:.95rem}ul{padding-left:1.2rem;margin:.3rem 0}li{margin:.3rem 0}
  .gate{background:var(--tile);border-left:5px solid;padding:1rem 1.2rem;border-radius:6px;margin:1.4rem 0}.checks{list-style:none;padding-left:0}
  .alley{border-top:1px solid #44475a;padding-top:.6rem}nav a{margin-right:1rem}@media print{body{background:#fff;color:#000}.gate{background:#fff;border:1px solid #999}}
</style>
</head>
<body><main>
<nav><a href="/">mcp.michaelrishiforrester.com</a><a href="/#gates">Walk a server through the gates</a><a href="/architecture/">The architecture</a><a href="/wrapping/">Wrapping</a></nav>
<p class="muted">From "Governing MCP for a Workforce the Size of a City", MCP Dev Summit Toronto, 6 October 2026</p>
<h1>The acceptance process: six gates before an MCP server comes online</h1>
<p>A request to allow an MCP server passes through these in order. Print this page, or <a href="/#gates">walk a real server through it</a> and take the result with you.</p>
${gates}
<p><strong>The one rule behind all six:</strong> if you do not give them MCP servers, they build their own. Explain the no, or expect the alley.</p>
<p class="muted">Every source above was read on the date recorded in the <a href="https://github.com/peopleforrester/mcp-for-a-city/blob/main/research/source-ledger.md">source ledger</a>.</p>
</main></body></html>
`;
writeFileSync("public/gates/index.html", html);
console.log("public/gates/index.html written");
