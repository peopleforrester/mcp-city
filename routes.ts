/// <reference types="node" />
// ABOUTME: Every page of the site, read by the Vite config for its entries and by the tests.
// ABOUTME: "" is the home page; the collateral documents add one route each from content/collateral/manifest.json.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const manifest = JSON.parse(readFileSync(resolve(process.cwd(), "content/collateral/manifest.json"), "utf8")) as { documents: { slug: string }[] };

export const PAGES: string[] = ["", "404", "gates", "wrapping", "usb", "spec", "scale", "the-attack", "architecture", "film", "presentation", "presentation/video", "resources", "resources/art", "resources/changes", "search", "contact", ...manifest.documents.map((d) => `resources/${d.slug}`)];
