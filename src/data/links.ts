// ABOUTME: Every outbound link on the page: the talk, the collateral, the person.
// ABOUTME: Edit here, never in the components.

export const TALK = {
  title: "Governing MCP for a Workforce the Size of a City",
  event: "MCP Dev Summit Toronto 2026",
  eventUrl: "https://events.linuxfoundation.org/mcp-dev-summit-toronto/program/schedule/?id=1287425",
  when: "Tuesday, October 6, 2026, 9:59 EDT",
  where: "Ballroom East/Center, The Conference Centre at the University of Toronto",
  /** The talk's conclusion, from its closing slides. */
  thesis: "The most effective lever for governing MCP at this scale is a relationship with the users who consume your MCP servers. Talk to your users.",
  repo: "https://github.com/peopleforrester/mcp-for-a-city",
  slidesPdf: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/01-keynote-slides/governing-mcp-toronto-2026.pdf",
  script: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/02-spoken-script/keynote-spoken.md",
  gatesDoc: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/04-approval-gates-checklist/approval-gates.md",
  ledger: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/06-research-and-source-ledger/source-ledger.md",
  siteSource: "https://github.com/peopleforrester/mcp-city",
  film: "https://github.com/peopleforrester/mcp-city-film/releases/tag/v0.5",
  filmRepo: "https://github.com/peopleforrester/mcp-city-film",
  /** The served 720p file's length, measured with ffprobe on 2026-10-06: 386.17 seconds (v0.5). */
  filmRuntime: "6 min 26 s",
  /** The Linux Foundation's recording, as a YouTube video id, once it is posted; the video page embeds it as soon as this is set. */
  recordingYouTubeId: "a8p-Pz1k5l0" as string | null,
  /** Shown under the official recording; the stream covers the whole keynote block, so it says where this talk falls. */
  recordingNote: "The Agentic AI Foundation's livestream of the Tuesday keynotes. This talk is scheduled at 9:59 EDT, about 44 minutes into the stream." as string | null,
  /** Michael's own recording from the room, as a file under public/ or a YouTube id; shown beside the official one. */
  phoneRecording: null as null | { kind: "file"; src: string; poster?: string } | { kind: "youtube"; id: string },
};

export const RESOURCES = [
  { label: "The approval gates as a checklist", url: TALK.gatesDoc, note: "The six gates, every verify step, every source." },
  { label: "What an enterprise MCP approval process evaluates", url: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/06-research-and-source-ledger/approval-process-criteria.md", note: "The research behind the gates." },
  { label: "Wrapping an MCP server inside an MCP server", url: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/06-research-and-source-ledger/wrapping-mcp-servers.md", note: "Why people wrap, how, and the one test." },
  { label: "The claim-by-claim source ledger", url: TALK.ledger, note: "Every figure in the talk, with its source and the date it was read." },
  { label: "The architecture diagram", url: "https://github.com/peopleforrester/mcp-for-a-city/blob/main/05-architecture-diagrams/architecture.png", note: "Mermaid source beside it." },
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

/** Self-hosted Umami in the mrf-website Railway project: cookieless, no personal data, counts only on the live domain. */
export const ANALYTICS = {
  script: "https://umami-production-34fd.up.railway.app/script.js",
  websiteId: "f6184170-5d26-40df-9438-ec0ccdf26c01",
  domain: "mcp.michaelrishiforrester.com",
};
