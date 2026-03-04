import Link from "next/link"
import { getAllLogMeta } from "@/lib/logbook"
import { YearLink } from "@/components/year-link"
import { groupByKey } from "@/lib/year-utils"
import { CopyrightNotice } from "@/components/copyright-notice"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Logbook",
  description:
    "A logbook in which I record my ongoing studies, experiments, reflections, and investigations on a monthly basis.",
}

function buildHref(selectedYear: string, toggleYear: string) {
  if (selectedYear === toggleYear) return "/logbook"
  return `/logbook?year=${toggleYear}`
}

export default async function Logbook({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>
}) {
  const params = await searchParams
  const selectedYear = params?.year ?? ""

  const entries = getAllLogMeta()
  const filtered = selectedYear ? entries.filter(e => e.year === selectedYear) : entries
  const { byGroup: byYear, groups: years } = groupByKey(filtered, e => e.year)

  return (
    <div className="space-y-8 stagger">
      <p className="text-sm font-mono text-muted-foreground italic">
        A logbook in which I record my ongoing studies, experiments, reflections, and investigations
        on a monthly basis.
      </p>
      <CopyrightNotice />

      {years.map(year => {
        const yearEntries = byYear[year]
        return (
          <section key={year} className="space-y-3">
            <YearLink
              href={buildHref(selectedYear, year)}
              year={year}
              isSelected={selectedYear === year}
            />
            <ul>
              {yearEntries.map(entry => (
                <li key={entry.slug}>
                  <Link
                    href={`/logbook/${entry.slug}`}
                    className="flex items-baseline justify-between py-1.5 group gap-4"
                  >
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span className="font-mono text-xs text-muted-foreground shrink-0 transition-colors">
                        [{entry.month.toLowerCase()}]
                      </span>
                      {entry.title && (
                        <span className="font-mono text-sm font-bold text-foreground transition-colors truncate">
                          {entry.title}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
