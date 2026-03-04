import { PlanetSeparator } from "@/components/planet-separator"
import Link from "next/link"
import { getRecentItems, recentItemKey } from "@/lib/recent"

export default function Home() {
  const recent = getRecentItems(8)

  return (
    <div className="space-y-14 stagger">
      {/* Intro */}
      <section className="space-y-5">
        <div className="font-mono text-sm leading-loose">
          <p className="text-foreground">applied cryptography engineer</p>
          <p className="text-muted-foreground">cypherpunk · d/acc · open source</p>
        </div>
        <p className="text-sm font-mono text-muted-foreground italic leading-relaxed">
          &ldquo;Navigating the dark matter of programmable cryptography&rdquo;
        </p>
        <p className="text-sm font-mono leading-relaxed text-foreground/70">
          My work lies at the intersection between applied cryptography research and development. I
          design and build privacy-preserving infrastructure, protocols and libraries for
          collaborative confidential computation on Ethereum.
        </p>
      </section>

      <PlanetSeparator />

      {/* Recent */}
      <section className="space-y-5">
        <ul>
          {recent.map(item => (
            <li key={recentItemKey(item)}>
              {item.type === "writing" ? (
                <Link
                  href={`/writings/${item.slug}`}
                  className="flex items-baseline py-1.5 group gap-2"
                >
                  <span className="font-mono text-xs text-muted-foreground shrink-0">
                    [{item.kind ?? "writing"}]
                  </span>
                  <span className="flex-1 overflow-hidden sm:whitespace-nowrap min-w-0">
                    <span className="font-mono text-sm font-bold text-foreground transition-colors uppercase tracking-wide">
                      {item.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden sm:inline font-mono text-sm text-muted-foreground/30"
                    >
                      {".".repeat(100)}
                    </span>
                  </span>
                </Link>
              ) : item.type === "log" ? (
                <Link
                  href={`/logbook/${item.slug}`}
                  className="flex items-baseline py-1.5 group gap-2"
                >
                  <span className="font-mono text-xs text-muted-foreground shrink-0">[log]</span>
                  <span className="flex-1 overflow-hidden sm:whitespace-nowrap min-w-0">
                    <span className="font-mono text-sm font-bold text-foreground transition-colors uppercase tracking-wide">
                      {item.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden sm:inline font-mono text-sm text-muted-foreground/30"
                    >
                      {".".repeat(100)}
                    </span>
                  </span>
                </Link>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline py-1.5 group gap-2"
                >
                  <span className="font-mono text-xs text-muted-foreground shrink-0">[talk]</span>
                  <span className="flex-1 overflow-hidden sm:whitespace-nowrap min-w-0">
                    <span className="font-mono text-sm font-bold text-foreground transition-colors uppercase tracking-wide">
                      {item.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden sm:inline font-mono text-sm text-muted-foreground/30"
                    >
                      {".".repeat(100)}
                    </span>
                  </span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
