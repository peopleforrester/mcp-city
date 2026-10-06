// ABOUTME: The site's navigation: two direct links and three groups, shared by the header on every page.
// ABOUTME: Plain names only; a group's links appear in a dropdown on wide screens and a list in the phone menu.

export interface NavLink { href: string; label: string }
export interface NavGroup { label: string; links: NavLink[] }
export type NavItem = NavLink | NavGroup;

export const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/gates/", label: "MCP acceptance process" },
  { href: "/architecture/", label: "The architecture" },
  {
    label: "The presentation",
    links: [
      { href: "/presentation/", label: "Slides and speaker notes" },
      { href: "/presentation/video/", label: "A video of the presentation" },
      { href: "/film/", label: "The film" },
    ],
  },
  {
    label: "Topics",
    links: [
      { href: "/the-attack/", label: "The attack" },
      { href: "/wrapping/", label: "Wrapping MCP servers in MCP servers" },
      { href: "/scale/", label: "A workforce the size of a city" },
      { href: "/spec/", label: "How the MCP spec evolves" },
    ],
  },
  {
    label: "Resources",
    links: [
      { href: "/resources/", label: "All resources" },
      { href: "/resources/#research-h", label: "The research" },
      { href: "/resources/#articles-h", label: "The articles" },
      { href: "/resources/art/", label: "The art" },
      { href: "/resources/changes/", label: "What changed" },
    ],
  },
  { href: "/search/", label: "Search" },
];

export const isGroup = (item: NavItem): item is NavGroup => "links" in item;
