import { Suspense } from "react"
import Link from "next/link"
import { getAllWritingsMeta } from "@/lib/mdx"
import { writingMatchesListedTag } from "@/lib/tags"
import { writingRowDotLeader } from "@/lib/writing-list"
import { TagFilter } from "@/components/tag-filter"
import { YearLink } from "@/components/year-link"
import { groupByKey } from "@/lib/year-utils"
import { CopyrightNotice } from "@/components/copyright-notice"
import type { Metadata } from "next"

function buildHref(tags: string[], year: string, toggleYear: string, kind: string) {
  const p = new URLSearchParams()
  if (tags.length > 0) p.set("tags", tags.join(","))
  if (year !== toggleYear) p.set("year", toggleYear)
  if (kind) p.set("kind", kind)
  const q = p.toString()
  return `/writings${q ? `?${q}` : ""}`
}

function buildKindHref(tags: string[], year: string, selectedKind: string, toggleKind: string) {
  const p = new URLSearchParams()
  if (tags.length > 0) p.set("tags", tags.join(","))
  if (year) p.set("year", year)
  if (selectedKind !== toggleKind) p.set("kind", toggleKind)
  const q = p.toString()
  return `/writings${q ? `?${q}` : ""}`
}

export const metadata: Metadata = {
  title: "Writings",
  description:
    "Essays, research notes, and monthly logbook entries on cryptography, society and technology — filter by tag (e.g. Logbook) or kind.",
}

export default async function Writings({
  searchParams,
}: {
  searchParams: Promise<{ tags?: string; year?: string; kind?: string }>
}) {
  const params = await searchParams
  const selectedTags = params?.tags ? params.tags.split(",").filter(Boolean) : []
  const selectedYear = params?.year ?? ""
  const selectedKind = params?.kind ?? ""

  const writings = getAllWritingsMeta()
  const yearFiltered = selectedYear
    ? writings.filter(w => w.date.split(" ")[1] === selectedYear)
    : writings
  const tagFiltered =
    selectedTags.length === 0
      ? yearFiltered
      : yearFiltered.filter(w => selectedTags.every(t => writingMatchesListedTag(w, t)))
  const filtered = selectedKind
    ? tagFiltered.filter(w => (w.kind ?? "writing") === selectedKind)
    : tagFiltered
  const { byGroup: byYear, groups: years } = groupByKey(filtered, w => w.date.split(" ")[1] ?? "")

  return (
    <div className="space-y-8 stagger">
      <p className="text-sm font-mono text-muted-foreground italic leading-relaxed">
        Essays, research notes, and monthly reflections — shortcut:{" "}
        <Link href="/writings?tags=writing" className="underline underline-offset-2">
          Writing
        </Link>
        {" · "}
        <Link href="/writings?tags=logbook" className="underline underline-offset-2">
          Logbook
        </Link>
        .
      </p>
      <CopyrightNotice />

      {writings.length > 0 && (
        <Suspense fallback={<div className="h-8" />}>
          <TagFilter selectedTags={selectedTags} />
        </Suspense>
      )}

      {years.length === 0 ? (
        writings.length === 0 ? (
          <p className="text-sm font-mono font-bold italic text-foreground leading-relaxed">
            There is nothing here yet, but you will soon find research notes, essays, and technical
            deep dives on programmable cryptography & blockchain, AI & agents.{" "}
          </p>
        ) : (
          <p className="text-sm font-mono text-muted-foreground">
            No writings match the selected filters.
          </p>
        )
      ) : (
        years.map(year => {
          const yearWritings = byYear[year]
          return (
            <section key={year} className="space-y-3">
              <YearLink
                href={buildHref(selectedTags, selectedYear, year, selectedKind)}
                year={year}
                isSelected={selectedYear === year}
              />
              <ul aria-label={`Writings from ${year}`}>
                {yearWritings.map(writing => (
                  <li key={writing.slug}>
                    <div className="flex items-baseline py-1.5 gap-2">
                      <Link
                        href={buildKindHref(
                          selectedTags,
                          selectedYear,
                          selectedKind,
                          writing.kind ?? "writing"
                        )}
                        className={
                          selectedKind === (writing.kind ?? "writing")
                            ? "font-mono text-xs text-foreground font-bold shrink-0 transition-colors underline underline-offset-2"
                            : "font-mono text-xs text-muted-foreground hover:text-foreground hover:font-bold shrink-0 transition-colors"
                        }
                      >
                        [{writing.kind ?? "writing"}]
                      </Link>
                      <Link
                        href={`/writings/${writing.slug}`}
                        className="group flex flex-1 min-w-0 items-baseline"
                      >
                        <span className="flex-1 overflow-hidden sm:whitespace-nowrap min-w-0">
                          <span className="font-mono text-sm font-bold text-foreground transition-colors">
                            {writing.title}
                          </span>
                          <span
                            aria-hidden="true"
                            className="hidden sm:inline font-mono text-sm text-muted-foreground/30"
                          >
                            {writingRowDotLeader}
                          </span>
                        </span>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )
        })
      )}
    </div>
  )
}
