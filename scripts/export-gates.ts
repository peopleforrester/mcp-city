// ABOUTME: Prints the six gates as the Markdown checklist carried by the collateral repo.
// ABOUTME: Run with `npx tsx scripts/export-gates.ts > ../mcp-for-a-city/04-approval-gates-checklist/approval-gates.md`.

import { GATES } from "../src/data/gates";

const lines: string[] = [
  "<!--",
  "ABOUTME: The six approval gates from the keynote, as a checklist a platform team can use on Monday.",
  "ABOUTME: Generated from the site's gate data; edit src/data/gates.ts in peopleforrester/mcp-city, not this file.",
  "-->",
  "",
  "# MCP server approval: six gates before yes",
  "",
  'From "Governing MCP for a Workforce the Size of a City", MCP Dev Summit Toronto, 6 October 2026. A request to allow an MCP server passes through these in order. Walk one interactively at https://mcp.michaelrishiforrester.com/#gates.',
  "",
];
for (const g of GATES) {
  lines.push(`## Gate ${g.n}: ${g.title}`, "", `Who answers: ${g.who}`, "", "Ask:", "");
  g.ask.forEach((a) => lines.push(`- ${a}`));
  lines.push("", "Verify:", "");
  g.verify.forEach((c) => lines.push(`- [ ] ${c}`));
  lines.push("", g.note, "", `What people build when this gate says no, with no explanation: ${g.alley}`, "", "Sources:", "");
  g.sources.forEach((s) => lines.push(`- [${s.label}](${s.url})`));
  lines.push("");
}
lines.push("## Behind all six", "", "Say no when you must, and explain why. The worst thing you can do is say no with no reason and no path.", "");
process.stdout.write(lines.join("\n"));
