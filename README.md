# mcp.michaelrishiforrester.com

The site behind the QR code in "Governing MCP for a Workforce the Size of a
City", the keynote at MCP Dev Summit Toronto on 6 October 2026. A city at
night that you walk into; six approval gates you can walk an MCP server
through; the talk, the slides, the sources, and the person.

The collateral (slides, script, research, source ledger) lives in
[peopleforrester/mcp-for-a-city](https://github.com/peopleforrester/mcp-for-a-city).
This repo is the site only.

## What is on the page

- **The descent**: on a wide screen the hero is a scroll-driven descent from orbit to one desk, with the ship ladder as a HUD. Phones and `prefers-reduced-motion` get the poster.
- **The six gates**: walk an MCP server through the approval gates; a fail lights the side alley; the result card exports Markdown, prints to PDF, and carries a share link (`?g=PPFUUU`).
- **The city, done properly**: the architecture as four districts with roads and traffic. "Say no" shows the bypass alleys; "Replay the attack" walks CVE-2026-47250 across the map. An SVG of the same data serves everywhere else.
- **Remember these?**: seven connectors, eighteen years, USB-C closing around USB-A, and why we wrapped MCP servers in MCP servers.
- The talk, the resources, the person. The footer has a sound switch, and the Konami code does something.

Every canvas is lazy, renders only while in view, and has a DOM equivalent.

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
