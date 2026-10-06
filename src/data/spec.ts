// ABOUTME: Sourced timeline of Model Context Protocol specification revisions, 2024-11-05 through 2026-07-28.
// ABOUTME: Every entry cites the primary page it came from; all sources were read live on SPEC_READ_ON.

export interface SpecChange { text: string; source: string }
export interface SpecRevision { id: string; date: string; headline: string; changes: SpecChange[]; removed: SpecChange[] }

const SITE = "https://modelcontextprotocol.io";
const REPO = "https://github.com/modelcontextprotocol/modelcontextprotocol";

const CL_2025_03 = `${SITE}/specification/2025-03-26/changelog`;
const CL_2025_06 = `${SITE}/specification/2025-06-18/changelog`;
const CL_2025_11 = `${SITE}/specification/2025-11-25/changelog`;
const CL_2026_07 = `${SITE}/specification/2026-07-28/changelog`;
const DEPRECATED = `${SITE}/specification/2026-07-28/deprecated`;
const LIFECYCLE = `${SITE}/community/feature-lifecycle`;
const VERSIONING = `${SITE}/docs/learn/versioning`;
const SDK_LIST = `${SITE}/docs/sdk`;
const SDK_TIER_PAGE = `${SITE}/community/sdk-tiers`;
const RELEASES = `${REPO}/releases`;
const GA_POST = "https://blog.modelcontextprotocol.io/posts/2026-07-28/";

export const SPEC_REVISIONS: SpecRevision[] = [
  {
    id: "2024-11-05",
    date: "2024-11-25",
    headline: "The launch revision: a stateful JSON-RPC protocol with stdio and HTTP+SSE transports and no authorization framework.",
    changes: [
      {
        text: "Anthropic open-sourced the Model Context Protocol on 25 November 2024. The revision it shipped is identified as 2024-11-05.",
        source: "https://www.anthropic.com/news/model-context-protocol",
      },
      {
        text: "The base protocol is JSON-RPC 2.0 over stateful connections, with capability negotiation between client and server.",
        source: `${SITE}/specification/2024-11-05`,
      },
      {
        text: "Servers offer three features (resources, prompts, tools); clients may offer sampling, described as \"server-initiated agentic behaviors and recursive LLM interactions.\"",
        source: `${SITE}/specification/2024-11-05`,
      },
      {
        text: "Two standard transports: stdio, and HTTP with Server-Sent Events, which needs a separate SSE endpoint and POST endpoint.",
        source: `${SITE}/specification/2024-11-05/basic/transports`,
      },
      {
        text: "Clients can expose filesystem roots to servers through roots/list and notifications/roots/list_changed.",
        source: `${SITE}/specification/2024-11-05/client/roots`,
      },
      {
        text: "An optional ping request lets either side check that the connection is still alive.",
        source: `${SITE}/specification/2024-11-05/basic/utilities/ping`,
      },
    ],
    removed: [],
  },
  {
    id: "2025-03-26",
    date: "2025-03-26",
    headline: "Authorization arrives, and Streamable HTTP replaces HTTP+SSE.",
    changes: [
      {
        text: "Added an authorization framework based on OAuth 2.1. The previous revision had none.",
        source: CL_2025_03,
      },
      {
        text: "Replaced the HTTP+SSE transport with the Streamable HTTP transport.",
        source: CL_2025_03,
      },
      {
        text: "Added support for JSON-RPC batching.",
        source: CL_2025_03,
      },
      {
        text: "Added tool annotations that describe tool behavior, such as whether a tool is read-only or destructive.",
        source: CL_2025_03,
      },
      {
        text: "Added audio content alongside text and images, and a completions capability for argument autocompletion.",
        source: CL_2025_03,
      },
    ],
    removed: [
      {
        text: "HTTP+SSE stopped being the remote transport. The deprecated features registry lists it as deprecated since 2025-03-26, and it is still not removed.",
        source: DEPRECATED,
      },
    ],
  },
  {
    id: "2025-06-18",
    date: "2025-06-18",
    headline: "Structured tool output, elicitation, and MCP servers as OAuth resource servers. Batching goes away three months after it arrived.",
    changes: [
      {
        text: "Added structured tool output.",
        source: CL_2025_06,
      },
      {
        text: "Classified MCP servers as OAuth resource servers, with protected resource metadata used to discover the authorization server.",
        source: CL_2025_06,
      },
      {
        text: "Required MCP clients to implement Resource Indicators (RFC 8707) so a malicious server cannot obtain access tokens meant for another.",
        source: CL_2025_06,
      },
      {
        text: "Added elicitation, so a server can ask the user for more information during an interaction.",
        source: CL_2025_06,
      },
      {
        text: "Added resource links in tool call results.",
        source: CL_2025_06,
      },
      {
        text: "Required the negotiated protocol version in an MCP-Protocol-Version header on subsequent HTTP requests.",
        source: CL_2025_06,
      },
    ],
    removed: [
      {
        text: "Removed JSON-RPC batching, which 2025-03-26 had added.",
        source: CL_2025_06,
      },
    ],
  },
  {
    id: "2025-11-25",
    date: "2025-11-25",
    headline: "The first-anniversary release: Client ID Metadata Documents, URL mode elicitation, experimental tasks, and formal governance.",
    changes: [
      {
        text: "Added OAuth Client ID Metadata Documents as a recommended client registration mechanism (SEP-991).",
        source: CL_2025_11,
      },
      {
        text: "Added OpenID Connect Discovery 1.0 support for authorization server discovery, and incremental scope consent through WWW-Authenticate (SEP-835).",
        source: CL_2025_11,
      },
      {
        text: "Added URL mode elicitation (SEP-1036).",
        source: CL_2025_11,
      },
      {
        text: "Added experimental tasks for tracking durable requests with polling and deferred result retrieval (SEP-1686).",
        source: CL_2025_11,
      },
      {
        text: "Added tool calling to sampling through tools and toolChoice parameters, and icons as metadata for tools, resources, resource templates, and prompts.",
        source: CL_2025_11,
      },
      {
        text: "Formalized MCP governance (SEP-932) and established the SDK tiering system (SEP-1730).",
        source: CL_2025_11,
      },
    ],
    removed: [
      {
        text: "The sampling includeContext values \"thisServer\" and \"allServers\" became soft-deprecated in this revision.",
        source: CL_2026_07,
      },
    ],
  },
  {
    id: "2026-07-28",
    date: "2026-07-28",
    headline: "MCP becomes a stateless request/response protocol: no handshake, no sessions, and a formal deprecation policy.",
    changes: [
      {
        text: "Removed the initialize/notifications/initialized handshake. Every request carries its protocol version and client capabilities in _meta, and a new server/discover RPC, which servers must implement, advertises versions, capabilities, and identity (SEP-2575).",
        source: CL_2026_07,
      },
      {
        text: "Removed protocol-level sessions and the Mcp-Session-Id header from Streamable HTTP. Servers that need cross-call state pass explicit server-minted handles as ordinary tool arguments (SEP-2567).",
        source: CL_2026_07,
      },
      {
        text: "Introduced Multi Round-Trip Requests: instead of sending roots/list, sampling/createMessage, or elicitation/create to the client, a server returns an input_required result and the client retries the original request with the answers. Every result now carries a required resultType field (SEP-2322).",
        source: CL_2026_07,
      },
      {
        text: "Required Mcp-Method and Mcp-Name headers on Streamable HTTP POST requests, so gateways can route on headers (SEP-2243).",
        source: CL_2026_07,
      },
      {
        text: "Required ttlMs and cacheScope on list and read results so clients can cache them (SEP-2549), and replaced the HTTP GET endpoint and resources/subscribe with a single subscriptions/listen stream.",
        source: CL_2026_07,
      },
      {
        text: "Moved tasks out of the core protocol into the io.modelcontextprotocol/tasks extension, and required clients to validate an RFC 9207 iss parameter, when present, before redeeming an authorization code (SEP-2663, SEP-2468).",
        source: CL_2026_07,
      },
    ],
    removed: [
      {
        text: "Removed ping, logging/setLevel, and notifications/roots/list_changed. Log level is now set per request in _meta.",
        source: CL_2026_07,
      },
      {
        text: "Removed SSE stream resumability and redelivery (Last-Event-ID and SSE event IDs). A broken stream loses the in-flight request, and the client must re-issue it with a new request ID.",
        source: CL_2026_07,
      },
      {
        text: "Removed notifications/elicitation/complete and the elicitationId field of URL mode elicitation, both introduced in 2025-11-25.",
        source: CL_2026_07,
      },
      {
        text: "Deprecated Roots, Sampling, and Logging (SEP-2577), and Dynamic Client Registration in favor of Client ID Metadata Documents. All four still work during the deprecation window.",
        source: CL_2026_07,
      },
      {
        text: "Reclassified the HTTP+SSE transport and the includeContext values \"thisServer\" and \"allServers\" as Deprecated under the new lifecycle policy (SEP-2596).",
        source: CL_2026_07,
      },
    ],
  },
];

export const DEPRECATION_POLICY: { text: string; source: string }[] = [
  {
    text: "A revision identifier is a YYYY-MM-DD date marking the last time backwards incompatible changes were made. Backwards compatible updates do not change it.",
    source: VERSIONING,
  },
  {
    text: "Revisions are Draft, Current, or Final. The current protocol version is 2026-07-28.",
    source: VERSIONING,
  },
  {
    text: "2026-07-28 adopted a feature lifecycle (SEP-2596) with three states: Active, Deprecated, and Removed. New implementations should not adopt a Deprecated feature, and existing implementations should migrate before its earliest removal.",
    source: LIFECYCLE,
  },
  {
    text: "A deprecated feature stays in the specification for at least twelve months, measured from the release of the revision that first marks it Deprecated. Its earliest removal is the first revision released as Current after that window elapses.",
    source: LIFECYCLE,
  },
  {
    text: "The window can be shortened only for an active security risk with no in-place mitigation, and must still leave at least ninety days before earliest removal.",
    source: LIFECYCLE,
  },
  {
    text: "Roots, Sampling, Logging, and Dynamic Client Registration, all deprecated in 2026-07-28, have an earliest removal of the first revision released on or after 2027-07-28.",
    source: DEPRECATED,
  },
  {
    text: "Earliest removal marks when a feature becomes eligible for removal. The actual removal is a Core Maintainer decision during release preparation and may come later.",
    source: DEPRECATED,
  },
  {
    text: "The HTTP+SSE transport, deprecated since 2025-03-26, has an earliest removal of three months after SEP-2596 reaches Final. The includeContext values \"thisServer\" and \"allServers\" follow Sampling.",
    source: DEPRECATED,
  },
  {
    text: "SEP-2596 is marked Final.",
    source: `${REPO}/blob/main/seps/2596-spec-feature-lifecycle-and-deprecation.md`,
  },
  {
    text: "No features have been removed under the policy yet.",
    source: DEPRECATED,
  },
  {
    text: "Removal from the specification does not oblige an SDK to drop the feature; each SDK's own revision-support policy governs that.",
    source: LIFECYCLE,
  },
  {
    text: "Tier 1 SDKs must mark deprecated API surface with the language's native mechanism in their next release, and should emit a runtime warning when a deprecated feature is used.",
    source: LIFECYCLE,
  },
];

export const SDK_TIERS: { text: string; source: string }[] = [
  {
    text: "The SDK tiering system was established in the 2025-11-25 revision (SEP-1730).",
    source: CL_2025_11,
  },
  {
    text: "Conformance tests became available on 23 January 2026, and official SDK tiering was published on 23 February 2026.",
    source: SDK_TIER_PAGE,
  },
  {
    text: "Tier 1 SDKs must pass 100% of applicable conformance tests and support new protocol features before a new spec version is released. Tier 2 requires 80% and new features within six months. Tier 3 has no minimum.",
    source: SDK_TIER_PAGE,
  },
  {
    text: "On release day for 2026-07-28, the four Tier 1 SDKs (TypeScript, Python, Go, C#) supported it, and the Rust SDK supported it in beta.",
    source: GA_POST,
  },
  {
    text: "The SDK listing now shows six Tier 1 SDKs (TypeScript, Python, C#, Go, Rust, Ruby), Java at Tier 2, and Swift, PHP, and Kotlin at Tier 3.",
    source: SDK_LIST,
  },
  {
    text: "Rust was promoted to Tier 1 in the listing on 21 August 2026, and Ruby on 28 September 2026.",
    source: `${REPO}/commits/main/docs/docs/2026-07-28/sdk.mdx`,
  },
];

export const SPEC_RELEASES_SOURCE = RELEASES;

export const SPEC_READ_ON = "2026-10-06";
