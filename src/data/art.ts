// ABOUTME: Every picture made for the talk, by set, with a caption and where it was used.
// ABOUTME: The files live under public/art; the originals are in the collateral repo under CC BY 4.0.

export interface Picture {
  src: string;
  caption: string;
}

export interface ArtSet {
  id: string;
  name: string;
  note: string;
  pictures: Picture[];
}

const scene = (file: string, caption: string): Picture => ({ src: `/art/scenes/${file}.webp`, caption });

export const ART: ArtSet[] = [
  {
    id: "scenes",
    name: "The shadow play",
    note: "Cut-paper silhouettes on a backlit screen, blue-toned to match the event. These are the pictures on the slides and in the film.",
    pictures: [
      scene("question-city", "How many people are using MCP in this workforce?"),
      scene("number", "The number"),
      scene("gate", "One gate every call goes through"),
      scene("acceptance", "The acceptance process"),
      scene("markers", "Markers on the road in"),
      scene("signposts", "Signposts"),
      scene("hacker", "You handed everyone a relentless hacker"),
      scene("whisper", "A whisper in the logs"),
      scene("listening", "Listening"),
      scene("identity", "Identity"),
      scene("nesting", "MCP servers wrapped in MCP servers"),
      scene("superpowers", "What if you gave your end users superpowers?"),
      scene("want", "I want to give the agent access to my email"),
      scene("human-problems", "These are human tools for human communication"),
      scene("no-alternatives", "So we said no"),
      scene("doors", "They found another door"),
      scene("summoned", "Summoned"),
      scene("teams", "Then they asked about Teams"),
      scene("twenty-years", "Twenty years of no"),
      scene("dam", "The dam"),
      scene("artifacts", "What you leave with"),
      scene("talk", "Talk to your users"),
      scene("spider", "The rainbow spider"),
    ],
  },
  {
    id: "attack",
    name: "The attack",
    note: "Five scenes for CVE-2026-47250, in the order the replay walks them.",
    pictures: [
      { src: "/art/attack/1-plant.jpg", caption: "An attacker plants one line in a log" },
      { src: "/art/attack/2-ask.jpg", caption: "An operator asks the agent to read the logs" },
      { src: "/art/attack/3-run.jpg", caption: "The agent runs kubectl against the attacker's server" },
      { src: "/art/attack/4-token.jpg", caption: "kubectl sends the operator's bearer token" },
      { src: "/art/attack/5-replay.jpg", caption: "The attacker now holds a token for a cluster they could not reach" },
    ],
  },
  {
    id: "cables",
    name: "The connectors",
    note: "Hand-drawn, 1981 to 2014.",
    pictures: ["parallel", "serial", "ps2", "usb-a", "mini-usb", "micro-usb", "usb-c"].map((c) => ({ src: `/art/cables/${c}.webp`, caption: c.replace("ps2", "PS/2").replace(/usb/i, "USB").replace("-a", "-A").replace("-c", "-C").replace("mini-", "Mini-").replace("micro-", "Micro-").replace(/^parallel$/, "Parallel").replace(/^serial$/, "Serial") })),
  },
  {
    id: "ships",
    name: "The ships",
    note: "Outlines for the scale ladder. The designs belong to their studios; these are fan art for a comparison, nothing more.",
    pictures: ["enterprise", "enterprise-d", "galactica", "infinity", "star-destroyer", "executor", "death-star"].map((s) => ({ src: `/art/ships/${s}.png`, caption: s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()).replace("Enterprise D", "Enterprise-D") })),
  },
];
