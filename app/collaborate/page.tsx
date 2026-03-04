import { SectionHeading } from "@/components/section-heading"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Collaborate",
  description: "Open to R&D collaborations on programmable cryptography and Ethereum.",
}

const lookingFor = [
  "Research and engineering on collaborative confidential computation using programmable cryptography.",
  "Infrastructure, libraries and tooling for privacy-preserving systems.",
  "Grants for experimental prototypes on new forms of privacy-preserving coordination.",
  "Technical advisory for teams building in the privacy, cryptography and blockchain space.",
  "Non-dystopian startups to advise or invest in.",
]

const notLookingFor = [
  "Generic decentralized applications on top of blockchain.",
  "Short-term gigs or full-time roles that do not share my values or technical interests.",
]

export default function Collaborate() {
  return (
    <div className="space-y-8 stagger">
      <p className="text-sm font-mono text-muted-foreground italic">
        Open to R&D collaborations on programmable cryptography and Ethereum.
      </p>

      <section className="space-y-3">
        <SectionHeading>Currently Exploring</SectionHeading>
        <p className="text-sm font-mono leading-relaxed text-foreground/70">
          I&apos;m interested in collaborating on projects that explore how programmable
          cryptography can create new ways to protect privacy when coordinating with others.
          Specifically, systems where untrusted parties, humans and agents alike, can compute and
          collaborate together without revealing their secrets.{" "}
        </p>
      </section>

      <section className="space-y-3">
        <SectionHeading>How I Work</SectionHeading>
        <p className="text-sm font-mono leading-relaxed text-foreground/70">
          My approach is to explore things carefully. I start by doing my own research to understand
          the problem, the assumptions, the tradeoffs, and the cryptographic / technical
          constraints. Then, I design and test some prototypes to explore the assumptions and
          tradeoffs before committing to the final design and technological stack for the
          implementation. I work in a focused, slow-thinking way to prioritize quality over
          quantity. I&apos;m more focused on long-term sustainability than short-term gains.
        </p>
      </section>

      <section className="space-y-3">
        <SectionHeading>Looking For</SectionHeading>
        <ul className="space-y-2">
          {lookingFor.map((item, i) => (
            <li key={i} className="text-sm font-mono text-foreground/70 flex gap-2">
              <span className="text-muted-foreground shrink-0">·</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <SectionHeading>Not a Fit</SectionHeading>
        <ul className="space-y-2">
          {notLookingFor.map((item, i) => (
            <li key={i} className="text-sm font-mono text-foreground/70 flex gap-2">
              <span className="text-muted-foreground shrink-0">·</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <p className="text-sm font-mono leading-relaxed text-foreground/70">
          If anything resonates with you, feel free to{" "}
          <Link
            href="/contacts"
            className="text-sm font-mono font-bold text-foreground transition-colors"
          >
            reach out
          </Link>
          . You can also find my open-source code on{" "}
          <a
            href="https://github.com/0xjei"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono font-bold text-foreground transition-colors"
          >
            GitHub
          </a>
          .{" "}
        </p>
      </section>
    </div>
  )
}
