import { SectionHeading } from "@/components/section-heading"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description: "Who I am, What I do, and, Why I do it.",
}

export default function About() {
  return (
    <div className="space-y-10 stagger">
      <p className="text-sm font-mono text-muted-foreground italic">
        Who I am, What I do, and, Why I do it.
      </p>

      <section className="space-y-4">
        <SectionHeading>Who</SectionHeading>
        <p className="text-sm font-mono leading-relaxed text-foreground/70">
          I am 0xjei (Giacomo), a senior, independent applied cryptography software engineer based
          in South{" "}
          <a
            href="https://en.wikipedia.org/wiki/Sardinia"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-foreground transition-colors"
          >
            Sardinia
          </a>
          , Italy.
          <br />
          <br />
          My focus is on designing systems that let untrusted parties (humans and agents alike)
          compute and coordinate together in a privacy-preserving way.
        </p>
      </section>

      <section className="space-y-4">
        <SectionHeading>What I Do</SectionHeading>
        <p className="text-sm font-mono leading-relaxed text-foreground/70">
          I design and implement systems that use programmable cryptography (ZKP, MPC, FHE) and
          blockchain to build privacy-preserving infrastructure and protocols. My work sits at the
          intersection between cryptography research and production engineering — I take primitives
          from papers and turn them into systems that developers can actually use.
          <br />
          <br />
          For over five years, I have worked with some of the best teams in the ecosystem across
          many different projects (see{" "}
          <Link href="/experience" className="font-bold text-foreground transition-colors">
            Experience
          </Link>{" "}
          for more).
        </p>
      </section>

      <section className="space-y-4">
        <SectionHeading>Why</SectionHeading>
        <p className="text-sm font-mono leading-relaxed text-foreground/70">
          I strongly believe in privacy as a foundation for freedom, trustlessness as a design
          constraint, and protocols that empower rather than extract (see{" "}
          <Link href="/collaborate" className="font-bold text-foreground transition-colors">
            Collaborate
          </Link>{" "}
          for more on my work methodology).
          <br />
          <br />
          As systems become more centralized and surveillance-capable, we need infrastructure that
          shifts power back to individuals and communities. <br />
          Programmable cryptography is how we enable groups to work together in a privacy-preserving
          way, while blockchain is how we enable them to coordinate and collaborate without a
          central authority.
        </p>
      </section>
    </div>
  )
}
