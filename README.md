# mcp.michaelrishiforrester.com

The site behind the QR code in "Governing MCP for a Workforce the Size of a
City", the keynote at MCP Dev Summit Toronto on 6 October 2026. A city at
night that you walk into; six approval gates you can walk an MCP server
through; the talk, the slides, the sources, and the person.

The collateral (slides, script, research, source ledger) lives in
[peopleforrester/mcp-for-a-city](https://github.com/peopleforrester/mcp-for-a-city).
This repo is the site only.

## The pages

| Route | What |
|---|---|
| `/` | The descent from orbit to one desk, the gate walk, and a card for every page |
| `/gates/` | MCP approval gates: the six-gate checklist, printable; `/#gates` walks a real server through them |
| `/architecture/` | The architecture diagram, and the same architecture as a living map with "say no" and the attack replay |
| `/the-attack/` | CVE-2026-47250 in five scenes |
| `/usb/` | Eighteen years of USB: the connector history and why MCP is not at USB-C yet |
| `/wrapping/` | Wrapping MCP servers in MCP servers: six reasons, the tools, the one test |
| `/scale/` | A workforce the size of a city: the ship ladder with sources |
| `/presentation/` | Every shown slide with the words spoken over it; the PDF and the script; `/presentation/video/` holds the recording |
| `/film/` | The narrated shadow-play film |
| `/resources/` | The research and the source ledger rendered as pages, plus the repos |

Each route is its own Vite entry (`routes.ts`) mounted into one shell, so every
page is real HTML with its own title. The slides and notes in
`content/presentation/` are pulled from the deck; the documents in
`content/collateral/` are copied from the collateral repo by
`scripts/sync-collateral.ts`, allowlist only. Every canvas is lazy, renders only
while in view, and has a DOM equivalent.

## Stack

Vite, React 19, TypeScript, Tailwind 4, React Three Fiber on three.js, GSAP and
Lenis for scroll, Vitest and Playwright for tests. Static build, served by
Caddy on Railway.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit tests, jsdom
npm run build && npm run test:e2e   # Playwright against the preview
```

## License

Apache 2.0. The art is generated for the talk; the ship outlines depict
trademarked designs and are fan art, not merchandise.
