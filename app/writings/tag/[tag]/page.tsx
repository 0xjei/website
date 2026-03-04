import Link from "next/link"
import { getAllWritingsMeta } from "@/lib/mdx"
import { tagLabels } from "@/lib/tags"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export function generateStaticParams() {
  const tags = Array.from(new Set(getAllWritingsMeta().flatMap(w => w.tags)))
  return tags.map(tag => ({ tag }))
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
    description: `Essays tagged ${label}.`,
  }
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const label = tagLabels[tag]
  if (!label) notFound()

  const filtered = getAllWritingsMeta().filter(w => w.tags.includes(tag))

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
        <h1
          className="text-2xl font-semibold text-foreground"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {label}
        </h1>
        <p className="text-xs font-mono text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "essay" : "essays"}
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
