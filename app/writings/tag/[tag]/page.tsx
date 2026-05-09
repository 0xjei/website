import Link from "next/link"
import { getAllWritingsMeta } from "@/lib/mdx"
import { tagLabels, writingMatchesListedTag } from "@/lib/tags"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export function generateStaticParams() {
  const fromContent = getAllWritingsMeta().flatMap(w => w.tags)
  const listed = Object.keys(tagLabels)
  return Array.from(new Set([...listed, ...fromContent])).map(tag => ({ tag }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  const label = tagLabels[tag]
  if (!label) return {}
  return {
    title: label,
    description: `Writings tagged ${label}.`,
  }
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const label = tagLabels[tag]
  if (!label) notFound()

  const filtered = getAllWritingsMeta().filter(w => writingMatchesListedTag(w, tag))

  return (
    <div className="space-y-8 stagger">
      <nav aria-label="Breadcrumb">
        <Link
          href="/writings"
          className="text-xs font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
        >
          back
        </Link>
      </nav>

      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">{label}</h1>
        <p className="text-xs font-mono text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        </p>
      </header>

      <ul aria-label={`Writings tagged ${label}`}>
        {filtered.map(writing => (
          <li key={writing.slug}>
            <Link
              href={`/writings/${writing.slug}`}
              className="flex items-baseline justify-between gap-6 py-1 group"
            >
              <span className="text-sm font-mono font-bold text-foreground transition-colors">
                {writing.title}
              </span>
              <time className="text-xs font-mono text-muted-foreground shrink-0">
                {writing.date}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
