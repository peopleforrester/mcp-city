// ABOUTME: Header and footer in the shape of michaelrishiforrester.com, pointing back to it.
// ABOUTME: The city is a satellite of the main site, so the chrome says whose it is. The footer holds the sound switch.

import { useState } from "react";
import { isHumming, setHum } from "../lib/sound";

const NAV = [
  { href: "/gates/", label: "MCP approval gates" },
  { href: "/architecture/", label: "The architecture" },
  { href: "/the-attack/", label: "The attack" },
  { href: "/usb/", label: "Eighteen years of USB" },
  { href: "/wrapping/", label: "Wrapping" },
  { href: "/scale/", label: "A workforce the size of a city" },
  { href: "/presentation/", label: "The presentation" },
  { href: "/film/", label: "The film" },
  { href: "/resources/", label: "Resources" },
];

export function Header() {
  return (
    <header className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-page)]/80 backdrop-blur sticky top-0 z-20">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-white focus:text-black">
        Skip to content
      </a>
      <div className="measure-wide flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
        <a href="/" className="font-semibold tracking-tight">Michael Rishi Forrester</a>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="inline-block py-1 text-[color:var(--color-link-muted)] hover:text-[color:var(--color-link)]">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const [on, setOn] = useState(isHumming());
  return (
    <footer className="border-t border-[color:var(--color-rule)]">
      <div className="measure-wide flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-[color:var(--color-ink-muted)]">
        <span><a href="https://michaelrishiforrester.com/" className="hover:underline">Michael Rishi Forrester</a> · <a href="https://michaelrishiforrester.com/speaking/" className="hover:underline">Speaking</a> · <a href="https://michaelrishiforrester.com/contact/" className="hover:underline">Contact</a></span>
        <span className="flex items-center gap-4">
          <button type="button" onClick={() => setOn(setHum(!on))} aria-pressed={on} className="hover:underline">
            Sound: {on ? "on" : "off"}
          </button>
          <a href="https://github.com/peopleforrester/mcp-city" className="hover:underline">Site source</a>
          <img src="/art/spider.png" alt="" width="36" height="27" className="opacity-80" title="For Whitney. Up, up, down, down, left, right, left, right, B, A." />
        </span>
      </div>
    </footer>
  );
}
