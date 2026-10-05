// ABOUTME: The connector timeline from the keynote: seven plugs, 1981 to 2014, and the six reasons to wrap an MCP server.
// ABOUTME: Dates as stated on the deck's cable and sources slides; the sketches are the talk's own hand-drawn ones.

export interface Plug {
  name: string;
  year: number;
  image: string;
  note: string;
}

export const PLUGS: Plug[] = [
  { name: "Parallel", year: 1981, image: "/art/cables/parallel.webp", note: "IBM PC" },
  { name: "Serial", year: 1984, image: "/art/cables/serial.webp", note: "PC/AT, DE-9" },
  { name: "PS/2", year: 1987, image: "/art/cables/ps2.webp", note: "IBM PS/2" },
  { name: "USB-A", year: 1996, image: "/art/cables/usb-a.webp", note: "USB 1.0, 15 January 1996" },
  { name: "Mini-USB", year: 2000, image: "/art/cables/mini-usb.webp", note: "USB 2.0 era" },
  { name: "Micro-USB", year: 2007, image: "/art/cables/micro-usb.webp", note: "2007" },
  { name: "USB-C", year: 2014, image: "/art/cables/usb-c.webp", note: "USB Type-C 1.0, 11 August 2014" },
];

export const USB_YEARS = { from: 1996, to: 2014, span: 18 };

/** The six signposts from the deck's "Things we thought were unusual" slide, in its order, each with what the wrapper does. */
export const WRAP_REASONS: { signpost: string; detail: string }[] = [
  { signpost: "The server does not meet our security standards", detail: "It carries no authorization, so the wrapper validates the token and decides, per tool, whether this caller may use it." },
  { signpost: "Credentials must not cross from client to server", detail: "The server needs a credential the client must never hold, so the wrapper holds it." },
  { signpost: "A hundred tools offered; nine presented", detail: "The wrapper filters the list so the model sees what it needs." },
  { signpost: "Reads and writes split into separate servers", detail: "A tool that does both is wrapped twice: one wrapper exposes only the reads, one only the writes. Two risk levels, two approvals." },
  { signpost: "The wrong transport", detail: "The server speaks stdio and the clients speak HTTP, or the other way round, so the wrapper bridges it." },
  { signpost: "Every call logged, rate limited and traced", detail: "The wrapper is the one place every call passes, so it is where the audit trail starts." },
];

export const WRAP_TOOLS = [
  { name: "FastMCP 4", what: "create_proxy()", url: "https://gofastmcp.com/servers/proxy" },
  { name: "Stacklok ToolHive", what: "MCPRemoteProxy: OIDC, Cedar, token exchange, audit", url: "https://docs.stacklok.com/toolhive/reference/crds/mcpremoteproxy" },
  { name: "Agent Router", what: "formerly Envoy AI Gateway: aggregation, OAuth, tool filtering", url: "https://theagentrouter.ai/docs/0.4/capabilities/mcp/" },
  { name: "TBXark mcp-proxy", what: "one endpoint, many upstreams", url: "https://github.com/TBXark/mcp-proxy" },
  { name: "mcpwrapped", what: "tool filtering only", url: "https://github.com/VitoLin/mcpwrapped" },
];

export const WRAP_TEST = "Is the credential that reaches the upstream different from the one the client sent?";

export const WRAP_SOURCES = [
  { label: "MCP 2026-07-28, authorization security considerations", url: "https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations" },
  { label: "Zhou et al., arXiv 2605.22333", url: "https://arxiv.org/abs/2605.22333" },
  { label: "USB-IF", url: "https://www.usb.org/documents" },
];
