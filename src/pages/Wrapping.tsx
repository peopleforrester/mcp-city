// ABOUTME: Wrapping MCP servers in MCP servers: the six reasons, the one test, the tools, and the sources; the deck's wrapping QR lands here.
// ABOUTME: Wording carried over from the original standalone page; the full research note is rendered under Resources.

import { PageIntro } from "./Page";

const SPEC = "https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations";
const ZHOU = "https://arxiv.org/abs/2605.22333";
const ANTHROPIC = "https://claude.com/docs/connectors/building/review-criteria";

const REASONS: [string, string][] = [
  ["The server does not meet our security standards.", "It carries no authorization, so the wrapper validates the token and decides, per tool, whether this caller may use it. Of 7,973 live remote servers measured in 2026, 40.55 percent expose tools with no authentication at all."],
  ["Credentials must not cross from client to server.", "The server needs a credential the client must never hold, so the wrapper holds it."],
  ["A hundred tools offered; nine presented.", "The wrapper filters the list so the model sees what it needs."],
  ["Reads and writes split into separate servers.", "A tool that does both is rejected by Anthropic's connector review. When a server shipped one, we wrapped that server twice: one wrapper exposes only the reads, one only the writes. Two risk levels, two approvals."],
  ["The wrong transport.", "The server speaks stdio and the clients speak HTTP, or the other way round, so the wrapper bridges it."],
  ["Every call logged, rate limited and traced.", ""],
];

const TOOLS: [string, string, string][] = [
  ["FastMCP 4", "https://gofastmcp.com/servers/proxy", "create_proxy(), one call"],
  ["Stacklok ToolHive", "https://docs.stacklok.com/toolhive/reference/crds/mcpremoteproxy", "MCPRemoteProxy with OIDC, Cedar policies, token exchange, audit, tool filtering"],
  ["Agent Router", "https://theagentrouter.ai/docs/0.4/capabilities/mcp/", "formerly Envoy AI Gateway, now an Agentic AI Foundation project: aggregation, OAuth, upstream key injection, tool filtering"],
  ["TBXark mcp-proxy", "https://github.com/TBXark/mcp-proxy", "one endpoint, many upstreams"],
  ["mcpwrapped", "https://github.com/VitoLin/mcpwrapped", "tool filtering only"],
];

export function WrappingPage() {
  return (
    <>
      <PageIntro
        title="We wrapped MCP servers in MCP servers. So did you."
        lede="A wrapper is an MCP server with no tools of its own: when the client asks for the tool list or calls a tool, it forwards the request to the real server behind it, relays the answer back, and does something useful on the way through."
      />
      <section className="measure-wide pb-10" aria-labelledby="why-h">
        <h2 id="why-h" className="text-2xl font-semibold">Why</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {REASONS.map(([head, body], i) => (
            <li key={head} className="rounded-lg bg-[color:var(--color-tile)] p-4">
              <span className="font-mono text-sm text-[color:var(--color-glow)]">{i + 1}</span>
              <p className="mt-1 font-semibold">{head}</p>
              {body && <p className="mt-1 text-[color:var(--color-ink-muted)]">{body}</p>}
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl rounded-md border-l-4 border-[color:var(--color-accent)] bg-[color:var(--color-tile)] p-4 text-lg">
          The one test of whether a wrapper is built right: is the credential that reaches the upstream different from the one the client sent? The specification is explicit: the MCP server MUST NOT pass through the token it received from the MCP client.
        </p>
      </section>
      <section className="measure-wide pb-10" aria-labelledby="tools-h">
        <h2 id="tools-h" className="text-2xl font-semibold">Tools that do it</h2>
        <ul className="mt-4 space-y-2 max-w-3xl">
          {TOOLS.map(([name, url, what]) => (
            <li key={name}><a href={url} className="font-semibold underline underline-offset-4">{name}</a>: <span className="text-[color:var(--color-ink-muted)]">{what}</span></li>
          ))}
        </ul>
      </section>
      <section className="measure-wide pb-16" aria-labelledby="sources-h">
        <h2 id="sources-h" className="text-2xl font-semibold">Sources</h2>
        <ul className="mt-4 space-y-2 max-w-3xl">
          <li><a href={SPEC} className="underline underline-offset-4">MCP specification 2026-07-28, authorization security considerations</a></li>
          <li><a href={ZHOU} className="underline underline-offset-4">Zhou et al., arXiv 2605.22333</a>: 7,973 live remote MCP servers, 40.55 percent without authentication</li>
          <li><a href={ANTHROPIC} className="underline underline-offset-4">Anthropic, connector review criteria</a>: a tool mixing read and write is rejected</li>
          <li><a href="/resources/wrapping-mcp-servers/" className="underline underline-offset-4">The full research note</a>, rendered on this site</li>
        </ul>
      </section>
    </>
  );
}
