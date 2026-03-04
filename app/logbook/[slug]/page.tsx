import Link from "next/link"
import { getAllLogMeta, getLogContent } from "@/lib/logbook"
import { mdxComponents } from "@/components/mdx-components"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export function generateStaticParams() {
  return getAllLogMeta().map(e => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const { meta } = getLogContent(slug)
    return {
      title: `Logbook — ${meta.month} ${meta.year}`,
      description: `What I was thinking about in ${meta.month} ${meta.year}.`,
    }
  } catch {
    return {}
  }
}

export default async function LogEntry({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let meta: ReturnType<typeof getLogContent>["meta"]
  let content: string
  try {
    const result = getLogContent(slug)
    meta = result.meta
    content = result.content
  } catch {
    notFound()
  }

  const all = getAllLogMeta()
  const idx = all.findIndex(e => e.slug === slug)
  const prev = idx > 0 ? all[idx - 1] : null
  const next = idx < all.length - 1 ? all[idx + 1] : null

  return (
    <article className="space-y-8 stagger">
      <nav aria-label="Breadcrumb">
        <Link
          href="/logbook"
          className="text-xs font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
        >
          back
        </Link>
      </nav>

      <header className="space-y-1">
        <h1 className="text-2xl font-semibold leading-snug text-foreground font-outfit">
          {meta.month}
        </h1>
        <p className="text-xs font-mono text-muted-foreground">
          <Link
            href={`/logbook?year=${meta.year}`}
            className="text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
          >
            {meta.year}
          </Link>
        </p>
      </header>

      <div className="space-y-4 text-sm font-mono leading-relaxed text-foreground/80 text-justify">
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      {(prev || next) && (
        <nav className="flex items-center justify-between gap-4 pt-2" aria-label="Entry navigation">
          {prev ? (
            <Link
              href={`/logbook/${prev.slug}`}
              className="text-xs font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
            >
              prev
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/logbook/${next.slug}`}
              className="text-xs font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
            >
              next
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  )
}
