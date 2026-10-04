// ABOUTME: The six approval gates, word for word from the keynote's gate slides, with the source for each.
// ABOUTME: One source of truth: the site renders it, the tests check it, and the exported checklist is built from it.

export interface Source {
  label: string;
  url: string;
}

export interface Gate {
  n: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  who: string;
  ask: string[];
  verify: string[];
  note: string;
  /** What people build themselves when this gate says no. The talk's thesis, rendered. */
  alley: string;
  sources: Source[];
}

const SPEC_SECURITY = {
  label: "MCP specification 2026-07-28, authorization security considerations",
  url: "https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations",
};
const ANTHROPIC_REVIEW = {
  label: "Anthropic, connector review criteria",
  url: "https://claude.com/docs/connectors/building/review-criteria",
};
const SSOJET = {
  label: "SSOJet, 12 questions a CISO will ask about your MCP server",
  url: "https://ssojet.com/blog/ciso-mcp-server-security-questions",
};
const MINTMCP = {
  label: "MintMCP, MCP server security and vetting",
  url: "https://www.mintmcp.com/blog/mcp-server-security-vetting",
};

export const GATES: Gate[] = [
  {
    n: 1,
    title: "Do we have a relationship with the vendor?",
    who: "Procurement and security",
    ask: [
      "Is this the vendor's own server, or a community fork?",
      "Do we have a contract, and a support path?",
      "Who maintains it, and how fast do they fix security issues?",
    ],
    verify: [
      "Registry namespace matches the vendor's domain",
      "The server calls the vendor's own first-party API",
      "Contract and security contact on file",
    ],
    note: "Anthropic requires first-party API ownership and a named company contact for every directory listing. MintMCP tiers servers Gold, Silver and Bronze by vendor standing.",
    alley: "A fork of the vendor's server from a personal account, installed from a laptop, because the official one was never listed.",
    sources: [ANTHROPIC_REVIEW, MINTMCP],
  },
  {
    n: 2,
    title: "Is there a real business need?",
    who: "The business owner",
    ask: [
      "What job does this do, and who asked for it?",
      "Is it core to the business, or a convenience?",
      "What will people build themselves if we say no?",
      "What data does it reach?",
    ],
    verify: [
      "A named business owner",
      "A written use case",
      "A data classification for everything it touches",
    ],
    note: "No MCP source weighs business need. This is ordinary third-party risk intake, and it is the gate that stops \"everyone wants every server, now\".",
    alley: "A no with no explanation. The user has an agent that writes code, so the agent writes the integration instead, against whatever interface is still open.",
    sources: [
      { label: "Cerbos, MCP server vetting checklist for enterprises", url: "https://www.cerbos.dev/blog/mcp-server-vetting-checklist" },
    ],
  },
  {
    n: 3,
    title: "Is it well built, and wrapped where we needed?",
    who: "The platform team",
    ask: [
      "One risk level per tool: read and write are separate tools",
      "Every tool annotated: title, read-only or destructive",
      "Descriptions describe; they never instruct",
      "If wrapped, the wrapper exchanges tokens and never forwards the user's",
    ],
    verify: [
      "Run every tool in MCP Inspector with valid input",
      "Diff every tool description on every new version",
      "Confirm the upstream token is not the client's",
    ],
    note: "Anthropic rejects any single tool that accepts both safe and unsafe HTTP methods. The specification says the server MUST NOT pass through the token it received from the client.",
    alley: "The mail client's own automation interface, driven by a script the agent wrote, with the user's full session and no tool boundary at all.",
    sources: [
      ANTHROPIC_REVIEW,
      SPEC_SECURITY,
      { label: "MCP Inspector", url: "https://github.com/modelcontextprotocol/inspector" },
      { label: "FastMCP, proxy servers", url: "https://gofastmcp.com/servers/proxy" },
    ],
  },
  {
    n: 4,
    title: "Does it speak the current spec?",
    who: "The platform team",
    ask: [
      "Implements the 2026-07-28 revision",
      "Answers server/discover",
      "Sends Mcp-Method and Mcp-Name headers",
      "Says what it still does with the deprecated features",
    ],
    verify: [
      "Call server/discover and read the revision back",
      "Watch the headers on a real call",
      "Testable without the vendor's cooperation",
    ],
    note: "The first question on SSOJet's CISO list is which revision the server implements, and three of the next four are testable from outside.",
    alley: "An old-revision server behind a hand-written shim that keeps a session alive, and nobody knows which era the gateway is talking to.",
    sources: [
      { label: "MCP specification 2026-07-28, changelog", url: "https://modelcontextprotocol.io/specification/2026-07-28/changelog" },
      SSOJET,
    ],
  },
  {
    n: 5,
    title: "Does it meet our security standards?",
    who: "The platform team",
    ask: [
      "OAuth 2.0, not static keys, not open access",
      "Tokens bound to this server as the audience",
      "No token passthrough to upstreams",
      "Scopes we can restrict",
      "A revocation path and a token lifetime",
    ],
    verify: [
      "Probe authorization server discovery",
      "Present a foreign-audience token; expect rejection",
      "Base rate: 40.55 percent of live servers measured had no authentication at all",
    ],
    note: "Anthropic requires OAuth 2.0 for authenticated services. SSOJet's questions two to eight cover discovery, audience and passthrough. Zhou et al. measured 7,973 live remote servers.",
    alley: "The approved browser launched with remote debugging on, so the agent drives the web app as the user, under the user's cookies, with nothing to revoke.",
    sources: [
      { label: "Anthropic, submit a connector to the directory", url: "https://claude.com/docs/connectors/building/submission" },
      SSOJET,
      SPEC_SECURITY,
      { label: "Zhou et al., arXiv 2605.22333", url: "https://arxiv.org/abs/2605.22333" },
    ],
  },
  {
    n: 6,
    title: "Is the vendor certified? SOC 2, ISO 27001",
    who: "Procurement and security",
    ask: [
      "SOC 2 Type II report, not a badge on a website",
      "ISO 27001 certificate, current",
      "Where data is processed, how long it is kept, how it is encrypted",
      "An incident response path for a compromised MCP session",
    ],
    verify: [
      "The audit report on file, dated",
      "Data-handling answers in writing",
      "A named incident contact",
    ],
    note: "MintMCP: verify \"SOC 2 Type II audited status, not marketing claims\". SSOJet's last question is the incident response path.",
    alley: "A free tier signed up with a personal email, holding company data, with no contract and nobody to call when it leaks.",
    sources: [MINTMCP, SSOJET],
  },
];

/** The zone colors from the deck, used as fills and borders. */
export const GATE_COLORS = ["#ff3c64", "#ffc800", "#00c8bc", "#009eff", "#bc37de", "#ed561b"];
/** The same hues lifted until they clear 4.5:1 on the tile, used wherever the color carries text. */
export const GATE_TEXT = ["#ff8fa8", "#ffc800", "#00c8bc", "#4fb8ff", "#d98cf0", "#ff8a5c"];
export const TILE = "#343746";
