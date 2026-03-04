import { presentations } from "@/lib/media"
import { YearLink } from "@/components/year-link"
import { groupByKey } from "@/lib/year-utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Media",
  description: "Recordings of my talks and presentations.",
}

function buildHref(year: string, toggleYear: string) {
  const p = new URLSearchParams()
  if (year !== toggleYear) p.set("year", toggleYear)
  const q = p.toString()
  return `/media${q ? `?${q}` : ""}`
}

export default async function Media({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>
}) {
  const params = await searchParams
  const selectedYear = params?.year ?? ""

  const filtered = selectedYear ? presentations.filter(p => p.date === selectedYear) : presentations

  const { byGroup: byYear, groups: years } = groupByKey(filtered, p => p.date)

  return (
    <div className="space-y-8 stagger">
      <p className="text-sm font-mono text-muted-foreground italic">
        Recordings of my talks and presentations.
      </p>

      {years.length === 0 ? (
        <p className="text-sm font-mono text-muted-foreground">
          No presentations listed yet. Check back later.
        </p>
      ) : (
        years.map(year => (
          <section key={year} className="space-y-6">
            <YearLink
              href={buildHref(selectedYear, year)}
              year={year}
              isSelected={selectedYear === year}
            />

            <ul className="space-y-10" aria-label={`Presentations from ${year}`}>
              {byYear[year].map((p, i) => (
                <li key={i} className="space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    {p.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-foreground font-outfit transition-colors"
                      >
                        {p.title}
                      </a>
                    ) : (
                      <h3 className="text-base font-semibold text-foreground font-outfit">
                        {p.title}
                      </h3>
                    )}
                    {p.event && (
                      <span className="text-xs font-mono text-muted-foreground shrink-0">
                        {p.event}
                      </span>
                    )}
                  </div>
                  {p.description && (
                    <p className="text-xs font-mono leading-relaxed text-foreground/70">
                      {p.description}
                    </p>
                  )}
                  {p.youtubeId && p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-video w-full max-w-xl overflow-hidden group"
                      aria-label={`Watch "${p.title}" on YouTube`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.youtube.com/vi/${p.youtubeId}/maxresdefault.jpg`}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/55 transition-colors">
                        <span className="text-white text-xs font-mono">[▶ watch on youtube]</span>
                      </div>
                    </a>
                  )}
                  {p.embedUrl && (
                    <div className="aspect-video w-full max-w-xl overflow-hidden">
                      <iframe
                        src={p.embedUrl}
                        title={p.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  )
}
