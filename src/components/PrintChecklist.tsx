// ABOUTME: The six gates laid out for paper: hidden on screen, the only thing on the page when printed or saved as PDF.
// ABOUTME: Same data as the walk, with the walked verdicts marked.

import { createPortal } from "react-dom";
import { GATES } from "../data/gates";
import { summary, type Walk } from "../lib/walk";

export function PrintChecklist({ walk }: { walk: Walk }) {
  const { passed, failed, admitted } = summary(walk);
  // Rendered beside the app root, not inside it, so the print stylesheet can hide the app and show only this.
  const host = document.getElementById("print-root") ?? document.body;
  return createPortal(
    <section id="print-checklist" aria-hidden="true">
      <h1>MCP server approval: six gates before yes</h1>
      <p>From "Governing MCP for a Workforce the Size of a City", MCP Dev Summit Toronto, 6 October 2026. mcp.michaelrishiforrester.com</p>
      {GATES.map((g, i) => (
        <article key={g.n} style={{ breakInside: "avoid", marginTop: "1.2em" }}>
          <h2>
            Gate {g.n}: {g.title} {walk[i] === "pass" ? "(PASS)" : walk[i] === "fail" ? "(FAIL)" : ""}
          </h2>
          <p>Who answers: {g.who}</p>
          <p><strong>Ask</strong></p>
          <ul>{g.ask.map((a) => <li key={a}>{a}</li>)}</ul>
          <p><strong>Verify</strong></p>
          <ul>{g.verify.map((c) => <li key={c}>[{walk[i] === "pass" ? "x" : " "}] {c}</li>)}</ul>
          <p>{g.note}</p>
          <p>Sources: {g.sources.map((s) => `${s.label}: ${s.url}`).join("; ")}</p>
        </article>
      ))}
      <h2>Result</h2>
      <p>{admitted ? "Admitted: every gate passed." : `${passed} passed, ${failed} failed, ${GATES.length - passed - failed} open.`}</p>
      <p>Say no when you must, and explain why. The worst thing you can do is say no with no reason and no path.</p>
    </section>,
    host,
  );
}
