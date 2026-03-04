import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Experience",
  description: "Experience, hackathons, and education.",
}

const experience: {
  role: string
  company: string
  companyHref: string
  type?: string
  years: string
  projects: {
    title: string
    role?: string
    years?: string
    description: ReactNode
    tags: string[]
    github?: string
  }[]
}[] = [
  {
    role: "Senior Applied Cryptography Engineer",
    company: "Gnosis Guild",
    companyHref: "https://www.gnosisguild.org/",
    type: "Contract",
    years: "2025 – Present",
    projects: [
      {
        title: "Enclave",
        description: (
          <p>
            I worked alongside cryptography researchers to solve the confidential coordination
            trilemma (collaboration, confidentiality, and verifiability). I assisted in the
            development of the{" "}
            <a
              href="https://github.com/gnosisguild/fhe.rs/tree/main/crates/fhe/src/trbfv"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-colors"
            >
              Threshold BFV module
            </a>
            , parameter-search algorithms, auxiliary data structures, libraries, and primitive types
            (Rust). I contributed to the development of the set of{" "}
            <a
              href="https://github.com/gnosisguild/enclave/tree/main/circuits"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-colors"
            >
              ZK circuits
            </a>{" "}
            (Noir) for verifiable DKG, encryption, decryption, and aggregation (folding and
            wrappers). I helped coordinate and execute the integration of crates and circuits inside
            the Enclave.
          </p>
        ),
        tags: ["Threshold FHE", "DKG", "ZKP", "Noir", "Rust"],
        github: "https://github.com/gnosisguild/enclave",
      },
    ],
  },
  {
    role: "Open Source Contributor",
    company: "Web3Privacy Now",
    companyHref: "https://web3privacy.info",
    type: "",
    years: "Mar 2025 - Aug 2025",
    projects: [
      {
        title: "Privacy Idea Generator",
        description: (
          <p>
            I contributed to the design and development of the Privacy Idea Generator, which
            includes a generator button that suggests ideas from past events or LLM-generated
            content, as well as advanced filtering, organizations, and featured ideas. This makes it
            possible to share ideas (or filtered ideas) with a direct link.
          </p>
        ),
        tags: ["Open Source"],
        github: "https://github.com/web3privacy/privacy-idea-generator",
      },
      {
        title: "Research Repository",
        description: (
          <p>
            I curated the processes behind the research repository and automated most of the tasks
            using CI actions.
          </p>
        ),
        tags: ["Open Source"],
        github: "https://github.com/web3privacy/research",
      },
    ],
  },
  {
    role: "Applied Cryptography Engineer",
    company: "PSE (Ethereum Foundation)",
    companyHref: "https://pse.dev/",
    type: "Grantee (3mo.) + Contract",
    years: "2022 – 2025",
    projects: [
      {
        title: "Excubiae",
        role: "Technical Lead & Software Engineer",
        years: "2024 – 2025",
        description: (
          <p>
            I led the design (see{" "}
            <a
              href="https://github.com/privacy-ethereum/excubiae/blob/main/documentation/03_design.md"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-colors"
            >
              design document
            </a>{" "}
            &{" "}
            <a
              href="https://github.com/privacy-ethereum/zkspecs/tree/main/specs/4"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-colors"
            >
              specs
            </a>
            ) and development of a flexible and customizable on-chain framework to create, reuse,
            and customize gatekeepers. The goal was to separate the definition of policy (what rules
            to enforce) from the validation of those rules, enabling flexible and reusable access
            control patterns on EVM-compatible chains. The features included a minimal proxy pattern
            that was gas-efficient and an experimental multi-stage validation system (pre, main,
            post).
          </p>
        ),
        tags: ["TypeScript", "Solidity", "EVM", "Access Control", "Proxy", "Smart Contracts"],
        github: "https://github.com/privacy-ethereum/excubiae",
      },
      {
        title: "Semaphore",
        role: "Core Contributor",
        years: "2024",
        description: (
          <p>
            I challenged the design and development of the V4 of the protocol by providing feedback
            and suggestions. I helped write and review the{" "}
            <a
              href="https://docs.semaphore.pse.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-colors"
            >
              Semaphore protocol documentation
            </a>{" "}
            and specification. This led to the coordination of the{" "}
            <a
              href="https://ceremony.pse.dev/projects/Semaphore%20V4%20Ceremony"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-colors"
            >
              V4 trusted setup ceremony
            </a>{" "}
            that reached +350 unique contributors.
          </p>
        ),
        tags: ["TypeScript", "ZK", "Groth16", "Trusted Setup", "Documentation"],
        github: "https://github.com/semaphore-protocol/semaphore",
      },
      {
        title: "MACI",
        role: "Applied Cryptography Engineer",
        years: "2024",
        description: (
          <p>
            I contributed to the refactoring of the MACI ZK circuits and smart contracts. The goal
            for ZK circuits was to improve the performance, scalability and readability of the
            protocol by introducing the{" "}
            <a
              href="https://docs.circom.io/circom-language/anonymous-components-and-tuples/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-colors"
            >
              Circom2 Anonymous Components
            </a>{" "}
            feature.
          </p>
        ),
        tags: ["Circom", "ZK", "Solidity"],
        github: "https://github.com/privacy-ethereum/maci",
      },
      {
        title: "p0tion",
        role: "Technical Lead & Software Engineer",
        years: "2022 – 2024",
        description: (
          <p>
            I led the design and development of the infrastructure for coordinating and automating
            Groth16 zkSNARK trusted setup ceremonies at scale. This solves the problem of swiftly
            implementing a trusted setup ceremony for multiple, heavy (+1M constraints in size)
            circuits (or variants), automating the contributor waiting queue and verification. This
            open-source infrastructure is used by{" "}
            <a
              href="https://ceremony.pse.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-colors"
            >
              multiple projects
            </a>{" "}
            in the Ethereum (MACI, Semaphore) ecosystem to safely deploy their circuits in
            production (see{" "}
            <a
              href="https://mirror.xyz/privacy-scaling-explorations.eth/TuLZRdgCQsydC8JJgCNH4F7GzifRBQ6fr31DHGLFVWM"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-colors"
            >
              V1.0 release announcement
            </a>
            ).
          </p>
        ),
        tags: ["TypeScript", "ZK", "Groth16", "Trusted Setup", "Cloud"],
        github: "https://github.com/privacy-ethereum/p0tion",
      },
    ],
  },
  {
    role: "Blockchain Researcher",
    company: "LINKS Foundation",
    companyHref: "https://linksfoundation.com/",
    type: "Employed",
    years: "Jul 2020 - Dec 2021",
    projects: [
      {
        title: "EU-funded & OTB Projects",
        description: (
          <p>
            I worked on several EU-funded projects and applied blockchain research efforts in open
            and decentralized data marketplaces, autonomous agents, and DAOs/DACs. I contributed to{" "}
            <a
              href="https://mediaverse-project.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-colors"
            >
              MediaVerse
            </a>{" "}
            and developed full-stack decentralized applications on Ethereum and EOSIO (check{" "}
            <a
              href="https://www.overtheblock.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-colors"
            >
              OverTheBlock
            </a>
            ).
          </p>
        ),
        tags: ["Solidity", "Ethereum", "EOSIO", "Full-Stack", "EU Research", "DAOs"],
      },
    ],
  },
  {
    role: "Chief Technology Officer",
    company: "Aspera Anonymous Dispute Resolution",
    companyHref: "https://www.f6s.com/company/aspera-anonymous-dispute-resolution#about",
    years: "Sep 2021 – Nov 2021",
    projects: [
      {
        title: "Aspera",
        description: (
          <p>
            I oversaw the technology and development of Aspera, a blockchain-based platform for
            anonymous dispute resolution via smart contracts using an interactive mediation process
            combining chatbot, ML systems, and ZKPs. Unfortunately, the project was discontinued
            after a few months.
          </p>
        ),
        github: "https://www.f6s.com/company/aspera-anonymous-dispute-resolution#about",
        tags: ["Solidity", "Ethereum", "ZKP", "Smart Contracts"],
      },
    ],
  },
  {
    role: "Junior Software Developer",
    company: "Net Service S.p.A.",
    companyHref: "https://www.netservice.eu",
    type: "Employed",
    years: "Apr 2020 – Jul 2020",
    projects: [
      {
        title: "Blockchain dApps",
        description: (
          <p>
            My first experience in a consultancy role, working on blockchain applications and
            solutions for European enterprise customers based on Ethereum, and revamped internal
            smart contract solutions.
          </p>
        ),
        tags: ["Solidity", "Ethereum", "Smart Contracts", "Enterprise"],
      },
    ],
  },
  {
    role: "Post Graduate Research Assistant",
    company: "University of Cagliari (Agile Group)",
    companyHref: "https://www.agile-group.org/en/",
    type: "Fellowship",
    years: "Feb 2019 – Mar 2020",
    projects: [
      {
        title: "CafCha",
        description: (
          <p>
            I worked in the AGILE Group blockchain team on the design and implementation of
            Ethereum-based decentralized applications, mainly focusing on backend and smart contract
            logic. I built an evolution of my Master&apos;s thesis prototype (
            <a
              href="https://github.com/0xjei/SawChain"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground transition-colors"
            >
              SawChain
            </a>
            ) porting from Hyperledger Sawtooth to Ethereum, rebranding it to CafCha. This was my
            first deep exposure to open-source blockchain communities (outside Bitcoin experiments)
            and the shift to my deep interest on Ethereum.
          </p>
        ),
        tags: ["Solidity", "Ethereum", "Hyperledger Sawtooth", "Smart Contracts"],
        github: "https://www.agile-group.org/en/progetti/cafcha/",
      },
    ],
  },
]

const education: {
  degree: string
  field: string
  institution: string
  years: string
  grade: string
}[] = [
  {
    degree: "Master's degree",
    field: "Applied Math & Computer Science",
    institution: "University of Cagliari",
    years: "2016 – 2019",
    grade: "110 cum laude / 110",
  },
  {
    degree: "Bachelor's degree",
    field: "Computer Science",
    institution: "University of Cagliari",
    years: "2013 – 2016",
    grade: "110 / 110",
  },
]

const hackathons: {
  role: "Judge" | "Mentor" | "Participant"
  event: string
  eventHref?: string
  year: string
  project?: { name: string; href: string }
}[] = [
  {
    role: "Judge",
    event: "W3PN HACK I",
    eventHref: "https://hackathon.web3privacy.info/",
    year: "2025",
  },
  {
    role: "Judge",
    event: "ETH ROME III",
    eventHref: "https://ethrome.org/",
    year: "2025",
  },
  {
    role: "Mentor",
    event: "ETHDam",
    eventHref: "https://ethdam.com/",
    year: "2024",
  },
  {
    role: "Mentor",
    event: "ETHGlobal Circuit Breaker",
    eventHref: "https://ethglobal.com/events/circuitbreaker",
    year: "2024",
  },
  {
    role: "Participant",
    event: "ZK Krakow",
    eventHref: "https://zkhack.dev/zkhack-krakow-hackathon/",
    year: "2024",
    project: { name: "n0tte", href: "https://devfolio.co/projects/ntte-c5ff" },
  },
  {
    role: "Mentor",
    event: "ETH ROME I",
    eventHref: "https://ethrome.org/",
    year: "2023",
  },
]

export default function Experience() {
  return (
    <div className="space-y-10 stagger">
      <p className="text-sm font-mono text-muted-foreground italic">
        Experience, hackathons, and education. All open-source code is on{" "}
        <a
          href="https://github.com/0xjei"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-foreground transition-colors"
        >
          GitHub
        </a>
        .
      </p>

      <section className="space-y-8">
        <h2 className="text-lg font-semibold text-foreground font-outfit">Experience</h2>
        <ul className="space-y-10">
          {experience.map((entry, i) => (
            <li key={i} className="space-y-4">
              {/* Role */}
              <h3 className="text-base font-semibold text-foreground font-outfit">{entry.role}</h3>
              {/* Company + years */}
              <div className="flex items-baseline justify-between gap-4 -mt-2">
                <p className="text-xs font-mono text-muted-foreground">
                  <a
                    href={entry.companyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-foreground transition-colors"
                  >
                    {entry.company}
                  </a>
                  {entry.type && (
                    <>
                      <span className="hidden sm:inline"> · </span>
                      <span className="block sm:inline">{entry.type}</span>
                    </>
                  )}
                </p>
                <time className="text-xs font-mono text-muted-foreground/50 shrink-0">
                  {entry.years}
                </time>
              </div>

              {/* Projects */}
              <ul className="space-y-6 border-l border-border pl-4">
                {entry.projects.map((project, j) => (
                  <li key={j} className="space-y-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-mono text-sm font-semibold text-foreground">
                        {project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors"
                            aria-label={`${project.title} on GitHub`}
                          >
                            {project.title}
                          </a>
                        ) : (
                          project.title
                        )}
                      </p>
                      {project.years && (
                        <time className="text-xs font-mono text-muted-foreground/50 shrink-0">
                          {project.years}
                        </time>
                      )}
                    </div>
                    {project.role && (
                      <p className="text-xs font-mono text-muted-foreground">{project.role}</p>
                    )}
                    <div className="text-sm font-mono leading-relaxed text-foreground/70 text-justify">
                      {project.description}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground font-outfit">Hackathons</h2>
        <ul className="space-y-2">
          {hackathons.map((h, i) => (
            <li key={i} className="flex items-baseline gap-3 font-mono text-sm">
              <span className="text-xs text-muted-foreground/50 shrink-0">[{h.role}]</span>
              <span className="text-muted-foreground">
                {h.eventHref ? (
                  <a
                    href={h.eventHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    {h.event}
                  </a>
                ) : (
                  h.event
                )}
                {h.project && (
                  <>
                    {" ("}
                    <a
                      href={h.project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      {h.project.name}
                    </a>
                    {")"}
                  </>
                )}
              </span>
              <span className="text-muted-foreground/50">{h.year}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground font-outfit">Education</h2>
        <ul className="space-y-4">
          {education.map((e, i) => (
            <li key={i} className="space-y-0.5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-mono text-sm text-muted-foreground">
                  {e.degree} — {e.field}
                </p>
                <time className="text-xs font-mono text-muted-foreground/50 shrink-0">
                  {e.years}
                </time>
              </div>
              <p className="font-mono text-xs text-muted-foreground/50">
                {e.institution} · {e.grade}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
