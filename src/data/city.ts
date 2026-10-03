// ABOUTME: The enterprise architecture as a city: four districts, the buildings in each, the roads between them, and the attack replay.
// ABOUTME: Same nodes and edges as the keynote's architecture diagram; the 3D map and the flat map both render this.

export type DistrictId = "device" | "tool" | "model" | "control";
export type EdgeKind = "tool" | "model" | "control" | "audit" | "bypass";

export interface District {
  id: DistrictId;
  name: string;
  color: string;
  /** Ground plate in map units: center x, center z, width, depth. */
  plate: [number, number, number, number];
}

export interface CityNode {
  id: string;
  name: string;
  district: DistrictId | "audit" | "bypass";
  x: number;
  z: number;
  height: number;
  what: string;
}

export interface CityEdge {
  from: string;
  to: string;
  label: string;
  kind: EdgeKind;
}

export const DISTRICTS: District[] = [
  { id: "device", name: "Managed device", color: "#ff3c64", plate: [-30, 0, 24, 36] },
  { id: "tool", name: "Tool traffic", color: "#ed561b", plate: [16, -12, 60, 22] },
  { id: "model", name: "Model traffic", color: "#bc37de", plate: [4, 14, 28, 14] },
  { id: "control", name: "Control plane", color: "#0b8a5c", plate: [38, 12, 22, 28] },
];

export const NODES: CityNode[] = [
  { id: "U", name: "End user", district: "device", x: -24, z: 14, height: 3, what: "The person. Everything starts with a question they ask an agent." },
  { id: "A", name: "AI application / agent", district: "device", x: -26, z: -2, height: 6, what: "The MCP client. It asks the model for a plan and calls tools through the proxy." },
  { id: "CP", name: "Client policy", district: "device", x: -40, z: 4, height: 3, what: "Which MCP servers the client may load: the allow list, fed from the registry." },
  { id: "OSP", name: "OS and app policy", district: "device", x: -40, z: -12, height: 3, what: "Device policy that closes the side doors: Outlook's automation guard set to deny, the browser's remote debugging off." },
  { id: "P", name: "MCP proxy", district: "tool", x: -8, z: -12, height: 5, what: "How does the request reach the server? Routing, transport bridging, the first hop off the device." },
  { id: "G", name: "MCP gateway", district: "tool", x: 4, z: -12, height: 9, what: "Should this caller be allowed? Identity, authorization, policy and rate limits, enforced once instead of per server." },
  { id: "API", name: "Service boundary", district: "tool", x: 16, z: -12, height: 5, what: "Can traffic reach this backend? The network edge in front of the server." },
  { id: "SRV", name: "MCP server", district: "tool", x: 28, z: -12, height: 6, what: "Wrapped where needed, holding an exchanged token, never the user's." },
  { id: "T", name: "Tool / enterprise data", district: "tool", x: 40, z: -12, height: 7, what: "The thing the tool call actually touches." },
  { id: "V", name: "Third-party hosted MCP", district: "tool", x: 16, z: -20, height: 5, what: "A vendor's server off the gateway; its own agent acts under the user's own grant, which your gateway never issued." },
  { id: "AG", name: "AI gateway", district: "model", x: -4, z: 14, height: 7, what: "Which model, which provider? Quotas and guardrails on the inference path." },
  { id: "LLM", name: "LLM providers", district: "model", x: 12, z: 14, height: 6, what: "The models behind the AI gateway." },
  { id: "R", name: "MCP registry", district: "control", x: 32, z: 2, height: 8, what: "What exists and who owns it. Source of the allow list and the gateway's routing table." },
  { id: "MR", name: "Model registry", district: "control", x: 30, z: 14, height: 6, what: "Which models are approved, fed to the AI gateway." },
  { id: "IDP", name: "Identity provider", district: "control", x: 44, z: 2, height: 6, what: "OIDC, OAuth, ID-JAG. SSO for the agent, token validation for the gateway." },
  { id: "WI", name: "Workload identity", district: "control", x: 46, z: 10, height: 5, what: "Which agent is calling, so the gateway knows the workload and not just the user." },
  { id: "GIT", name: "GitOps + admission control", district: "control", x: 38, z: 22, height: 5, what: "No unsanctioned server lands. Servers are deployed from the control plane, not by hand." },
  { id: "OBS", name: "Audit and traces", district: "audit", x: 10, z: 30, height: 4, what: "Every call logged and joined by traceparent. Dark along any path that bypasses the gateway." },
  { id: "OUT", name: "Outlook", district: "bypass", x: -14, z: 24, height: 3, what: "Reached by a script the agent wrote against the mail client's own automation interface, when the gate said no." },
  { id: "TM", name: "Teams", district: "bypass", x: -4, z: 30, height: 3, what: "Reached through the approved browser launched in remote-debugging mode, when the gate said no." },
];

export const EDGES: CityEdge[] = [
  { from: "U", to: "A", label: "asks", kind: "tool" },
  { from: "A", to: "P", label: "tools/call", kind: "tool" },
  { from: "P", to: "G", label: "route", kind: "tool" },
  { from: "G", to: "API", label: "authorized call", kind: "tool" },
  { from: "API", to: "SRV", label: "exchanged token", kind: "tool" },
  { from: "SRV", to: "T", label: "API call", kind: "tool" },
  { from: "G", to: "V", label: "one tools/call", kind: "tool" },
  { from: "A", to: "AG", label: "prompt", kind: "model" },
  { from: "AG", to: "LLM", label: "inference", kind: "model" },
  { from: "CP", to: "A", label: "allow list", kind: "control" },
  { from: "OSP", to: "A", label: "device policy", kind: "control" },
  { from: "R", to: "CP", label: "approved servers", kind: "control" },
  { from: "R", to: "G", label: "routing table", kind: "control" },
  { from: "MR", to: "AG", label: "approved models", kind: "control" },
  { from: "IDP", to: "A", label: "SSO, ID-JAG", kind: "control" },
  { from: "IDP", to: "G", label: "token validation", kind: "control" },
  { from: "WI", to: "G", label: "agent identity", kind: "control" },
  { from: "GIT", to: "SRV", label: "deploys servers", kind: "control" },
  { from: "G", to: "OBS", label: "audit log", kind: "audit" },
  { from: "AG", to: "OBS", label: "audit log", kind: "audit" },
  { from: "A", to: "OBS", label: "client trace", kind: "audit" },
  { from: "A", to: "OUT", label: "shell, COM automation", kind: "bypass" },
  { from: "A", to: "TM", label: "browser remote debugging", kind: "bypass" },
];

export const EDGE_COLORS: Record<EdgeKind, string> = {
  tool: "#ed561b",
  model: "#bc37de",
  control: "#0b8a5c",
  audit: "#8a8a8a",
  bypass: "#ff3c64",
};

export interface AttackStep {
  at: string;
  title: string;
  said: string;
}

/** CVE-2026-47250 in mcp-server-kubernetes, as told on the keynote's attack slides. The tracer moves to `at` on each step. */
export const ATTACK: AttackStep[] = [
  { at: "T", title: "An attacker plants one line in a log", said: "An attacker who can write to your application's logs plants that line. It is ordinary structured JSON sitting in a log file." },
  { at: "A", title: "An operator asks the agent to read the logs", said: "Later, an operator asks an agent to look at the logs. The agent reads the file, and it reads the planted instruction along with everything else." },
  { at: "SRV", title: "The agent runs kubectl against the attacker's server", said: "The agent does what the line says. It runs kubectl against a server the attacker controls, with TLS verification switched off. Those two flags are the whole attack." },
  { at: "T", title: "kubectl sends the operator's bearer token", said: "kubectl does exactly what it is told. It sends the operator's bearer token along as the authorization header. One planted line, and the agent hands over the token." },
  { at: "OBS", title: "The attacker replays the token. Every call was authorized.", said: "No model was jailbroken. No policy was violated. Every call in that chain was authorized. CVE-2026-47250, mcp-server-kubernetes, fixed in 3.7.0." },
];

export const ATTACK_SOURCES = [
  { label: "GHSA-6mx4-4h42-r8vh", url: "https://github.com/advisories/GHSA-6mx4-4h42-r8vh" },
  { label: "CVE-2026-47250", url: "https://nvd.nist.gov/vuln/detail/CVE-2026-47250" },
];

export const nodeById = (id: string): CityNode => {
  const n = NODES.find((x) => x.id === id);
  if (!n) throw new Error(`unknown node ${id}`);
  return n;
};
