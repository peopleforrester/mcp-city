// ABOUTME: One card per page of the site, under the descent on the home page.
// ABOUTME: Names match the nav; the order is the order of the talk.

const CARDS = [
  { href: "/gates/", title: "MCP approval gates", text: "Six gates before an MCP server comes online. Walk a real server through them and take the checklist with you." },
  { href: "/architecture/", title: "The architecture", text: "The diagram, and the same architecture as a living map: say no and watch where the traffic goes." },
  { href: "/the-attack/", title: "The attack", text: "One line in a log file ends with the attacker holding a token for a cluster they could not reach." },
  { href: "/usb/", title: "Eighteen years of USB", text: "MCP is the USB of AI tooling. It took USB eighteen years to get to one plug." },
  { href: "/wrapping/", title: "Wrapping MCP servers in MCP servers", text: "We thought it was unusual. Everybody does it. Six reasons, the tools, and the one test." },
  { href: "/scale/", title: "A workforce the size of a city", text: "The ship ladder that gives the headcount a shape, each crew with its source." },
  { href: "/presentation/", title: "The presentation", text: "Every slide with the words spoken over it, the PDF, and the recording when it posts." },
  { href: "/film/", title: "The film", text: "The whole story as a narrated shadow play, about five minutes." },
  { href: "/resources/", title: "Resources", text: "The research, the claim-by-claim source ledger, and the repos." },
];

export function PageCards() {
  return (
    <section className="measure-wide py-16 border-t border-[color:var(--color-rule)]" aria-labelledby="pages-h">
      <h2 id="pages-h" className="text-3xl font-semibold tracking-tight sm:text-4xl">What is here</h2>
      <p className="mt-3 max-w-2xl text-[color:var(--color-ink-muted)]">The talk asks one question: what was the most effective lever for MCP adoption? The answer is a relationship with the users who consume your MCP servers. Everything below is the detail behind it.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <li key={c.href} className="rounded-lg bg-[color:var(--color-tile)] p-5">
            <a href={c.href} className="text-xl font-semibold underline underline-offset-4">{c.title}</a>
            <p className="mt-2 text-[color:var(--color-ink-muted)]">{c.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
