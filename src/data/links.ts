// ABOUTME: Every outbound link on the page: the talk, the collateral, the person.
// ABOUTME: Edit here, never in the components.

export const TALK = {
  title: "Governing MCP for a Workforce the Size of a City",
  event: "MCP Dev Summit Toronto 2026",
  eventUrl: "https://events.linuxfoundation.org/mcp-dev-summit-toronto/program/schedule/?id=1287425",
  when: "Tuesday 6 October 2026, 09:59 EDT",
  where: "Ballroom East/Center, The Conference Centre at the University of Toronto",
  thesis: "If you do not give them MCP servers, they build their own.",
  repo: "https://github.com/peopleforrester/mcp-for-a-city",
  slidesPdf: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/slides/governing-mcp-toronto-2026.pdf",
  script: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/script/keynote-spoken.md",
  gatesDoc: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/gates/approval-gates.md",
  ledger: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/research/source-ledger.md",
  siteSource: "https://github.com/peopleforrester/mcp-city",
};

export const RESOURCES = [
  { label: "The approval gates as a checklist", url: TALK.gatesDoc, note: "The six gates, every verify step, every source." },
  { label: "What an enterprise MCP approval process evaluates", url: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/research/approval-process-criteria.md", note: "The research behind the gates." },
  { label: "Wrapping an MCP server inside an MCP server", url: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/research/wrapping-mcp-servers.md", note: "Why people wrap, how, and the one test." },
  { label: "The claim-by-claim source ledger", url: TALK.ledger, note: "Every figure in the talk, with its source and the date it was read." },
  { label: "The architecture diagram", url: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/diagrams/architecture.png", note: "Mermaid source beside it." },
  { label: "mcp_best_practices", url: "https://github.com/peopleforrester/mcp_best_practices", note: "A security-first MCP portfolio tracking the 2026-07-28 revision." },
  { label: "mcp-k8s-observability-argocd-server", url: "https://github.com/peopleforrester/mcp-k8s-observability-argocd-server", note: "An MCP server for Kubernetes observability through Argo CD." },
  { label: "MCP_Server_Claude_Doc_monitor", url: "https://github.com/peopleforrester/MCP_Server_Claude_Doc_monitor", note: "An MCP server that watches documentation for change." },
];

export const PERSON = {
  name: "Michael Rishi Forrester",
  bio: "Michael builds and governs AI tooling for a very large workforce, teaches platform engineering, and writes about agentic systems. He spoke at MCP Dev Summit Toronto on what happens when governance meets people who route around a no.",
  links: [
    { label: "michaelrishiforrester.com", url: "https://michaelrishiforrester.com/" },
    { label: "Speaking", url: "https://michaelrishiforrester.com/speaking/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/michaelrishiforrester/" },
    { label: "GitHub", url: "https://github.com/peopleforrester" },
    { label: "Email", url: "mailto:michaelrishiforrester@gmail.com" },
    { label: "Contact and newsletter", url: "https://michaelrishiforrester.com/contact/" },
  ],
};
