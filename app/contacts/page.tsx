import { SectionHeading } from "@/components/section-heading"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacts",
  description: "Let's get in touch.",
}

export default function Contacts() {
  return (
    <div className="space-y-8 stagger">
      <p className="text-sm font-mono text-muted-foreground italic">Let&apos;s get in touch.</p>

      <section className="space-y-3">
        <SectionHeading>Reach Out</SectionHeading>
        <ul className="space-y-1.5">
          <li>
            <a
              href="mailto:hello@0xjei.dev"
              className="text-sm font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
            >
              hello@0xjei.dev <span className="opacity-50">(email)</span>
            </a>
          </li>
          <li className="text-sm font-mono text-muted-foreground">
            @iejx0.01 <span className="opacity-50">(signal)</span>
          </li>
          <li>
            <a
              href="https://t.me/iejx0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
            >
              @iejx0 <span className="opacity-50">(telegram)</span>
            </a>
          </li>
          <li className="text-sm font-mono text-muted-foreground">
            @0xjei{" "}
            <span className="opacity-50">
              (
              <a
                href="https://x.com/0xjei"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground hover:font-bold transition-colors"
              >
                X
              </a>
              ,{" "}
              <a
                href="https://mastodon.uno/@0xjei"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground hover:font-bold transition-colors"
              >
                Mastodon
              </a>
              ,{" "}
              <a
                href="https://bsky.app/profile/0xjei.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground hover:font-bold transition-colors"
              >
                Bluesky
              </a>
              ,{" "}
              <a
                href="https://github.com/0xjei"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground hover:font-bold transition-colors"
              >
                GitHub
              </a>
              )
            </span>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <SectionHeading>Etiquette</SectionHeading>
        <ul className="space-y-2">
          <li className="text-sm font-mono text-foreground/70 flex gap-2">
            <span className="text-muted-foreground shrink-0">·</span>
            Tell who you are, who you are working for, and what you are working on.
          </li>
          <li className="text-sm font-mono text-foreground/70 flex gap-2">
            <span className="text-muted-foreground shrink-0">·</span>
            Be specific about why you are reaching out to me in particular.
          </li>
          <li className="text-sm font-mono text-foreground/70 flex gap-2">
            <span className="text-muted-foreground shrink-0">·</span>I don&apos;t respond to cold
            recruiting, generic pitches, or AI-generated outreach.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <SectionHeading>Collaborations</SectionHeading>
        <p className="text-sm font-mono leading-relaxed text-foreground/70">
          If you are working on something in the programmable cryptography & blockchain, AI & agents
          space and, you think that our work or interests could intersect, I would love to hear from
          you!
          <br />
          <br />
          Please, check the{" "}
          <Link href="/collaborate" className="font-bold text-foreground transition-colors">
            Collaborate
          </Link>{" "}
          page before reaching out!
        </p>
      </section>
    </div>
  )
}
