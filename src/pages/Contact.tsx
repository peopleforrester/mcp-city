// ABOUTME: Contact and more: Michael's book, his courses, his most active socials, and the two emails, personal first.
// ABOUTME: Details taken from michaelrishiforrester.com and the talk's closing slide, read 2026-10-06.

import { PageIntro } from "./Page";

const BOOK = {
  title: "Agentic DevOps with Claude Code",
  detail: "Packt, 25 September 2026",
  links: [
    { label: "At Packt", url: "https://www.packtpub.com/en-us/product/agentic-devops-with-claude-code-9781808344183" },
    { label: "At Amazon", url: "https://www.amazon.com/Agentic-DevOps-Claude-observability-self-service/dp/1808344197" },
  ],
};

const COURSES = [
  { label: "AWS Cloud Practitioner - A Prep Course: Learn AWS Cloud Fundamentals and Prepare for the AWS Cloud Practitioner Exam, with Sanjeev Thiyagarajan", where: "Packt video course", url: "https://www.packtpub.com/en-br/product/aws-cloud-practitioner-a-prep-course-9781806380510" },
  { label: "AWS Cloud Practitioner, with Sanjeev Thiyagarajan", where: "KodeKloud", url: "https://kodekloud.com/courses/aws-cloud-practitioner" },
  { label: "Talks, workshops and courseware", where: "michaelrishiforrester.com", url: "https://michaelrishiforrester.com/speaking/" },
];

const SOCIALS = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/michaelrishiforrester/" },
  { label: "Bluesky", url: "https://bsky.app/profile/peopleforrester.bsky.social" },
  { label: "GitHub", url: "https://github.com/peopleforrester" },
  { label: "Sessionize", url: "https://sessionize.com/peopleforrester/" },
];

export function ContactPage() {
  return (
    <>
      <PageIntro title="Contact" lede="Email is the shortest path to a real answer." />
      <section className="measure-wide pb-16 grid gap-6 md:grid-cols-2" aria-label="Ways to reach Michael">
        <div className="rounded-lg bg-[color:var(--color-tile)] p-6">
          <h2 className="text-2xl font-semibold">Email</h2>
          <p className="mt-3"><a href="mailto:michaelrishiforrester@gmail.com" className="text-lg font-semibold underline underline-offset-4">michaelrishiforrester@gmail.com</a></p>
          <p className="text-sm text-[color:var(--color-ink-muted)]">The best way to reach me.</p>
          <p className="mt-4"><a href="mailto:michael.r.forrester@accenture.com" className="font-semibold underline underline-offset-4">michael.r.forrester@accenture.com</a></p>
          <p className="text-sm text-[color:var(--color-ink-muted)]">For anything that needs my attention at Accenture in an official capacity.</p>
        </div>
        <div className="rounded-lg bg-[color:var(--color-tile)] p-6">
          <h2 className="text-2xl font-semibold">The book</h2>
          <p className="mt-3 text-lg font-semibold">{BOOK.title}</p>
          <p className="text-sm text-[color:var(--color-ink-muted)]">{BOOK.detail}</p>
          <p className="mt-2">{BOOK.links.map((l, i) => <span key={l.url}>{i > 0 && " · "}<a href={l.url} className="underline underline-offset-4">{l.label}</a></span>)}</p>
        </div>
        <div className="rounded-lg bg-[color:var(--color-tile)] p-6">
          <h2 className="text-2xl font-semibold">Courses</h2>
          <ul className="mt-3 space-y-2">
            {COURSES.map((c) => (
              <li key={c.url}><a href={c.url} className="font-semibold underline underline-offset-4">{c.label}</a> <span className="text-sm text-[color:var(--color-ink-muted)]">{c.where}</span></li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-[color:var(--color-ink-muted)]">More than a million engineers trained across AWS, Coursera, O'Reilly and YouTube.</p>
        </div>
        <div className="rounded-lg bg-[color:var(--color-tile)] p-6">
          <h2 className="text-2xl font-semibold">Elsewhere</h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {SOCIALS.map((s) => <li key={s.url}><a href={s.url} className="font-semibold underline underline-offset-4">{s.label}</a></li>)}
          </ul>
          <p className="mt-3 text-sm"><a href="https://michaelrishiforrester.com/" className="underline underline-offset-4">michaelrishiforrester.com</a></p>
        </div>
      </section>
    </>
  );
}
