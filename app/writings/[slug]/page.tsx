import "katex/dist/katex.min.css"
import Link from "next/link"
import { getAllWritingsMeta, getWritingContent } from "@/lib/mdx"
import { proseHorizontalRuleClass } from "@/lib/prose-classes"
import { tagLabels } from "@/lib/tags"
import { ArticleShare } from "@/components/article-share"
import { mdxComponents } from "@/components/mdx-components"
import { WritingToc } from "@/components/writing-toc"
import { extractWritingToc, splitLeadingBlockquote } from "@/lib/writing-toc"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeSlug from "rehype-slug"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { siteUrl } from "@/lib/site"

export function generateStaticParams() {
  const writings = getAllWritingsMeta()
  return writings.map(w => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  try {
    const { meta } = getWritingContent(slug)
    return {
      title: meta.title,
      description: meta.description,
      openGraph: {
        title: meta.title,
        description: meta.description,
        type: "article",
        authors: ["0xjei"],
        url: `${siteUrl}/writings/${slug}`,
      },
      alternates: {
        canonical: `${siteUrl}/writings/${slug}`,
      },
    }
  } catch {
    return {}
  }
}

export default async function Writing({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const postUrl = `${siteUrl}/writings/${slug}`

  let meta: ReturnType<typeof getWritingContent>["meta"]
  let content: string
  try {
    const result = getWritingContent(slug)
    meta = result.meta
    content = result.content
  } catch {
    notFound()
  }

  const allWritings = getAllWritingsMeta()
  const currentIndex = allWritings.findIndex(w => w.slug === slug)
  const prevWriting = currentIndex > 0 ? allWritings[currentIndex - 1] : null
  const nextWriting = currentIndex < allWritings.length - 1 ? allWritings[currentIndex + 1] : null

  const tocEntries = meta.kind !== "logbook" ? extractWritingToc(content) : []

  const { lead: ackLead, body: mainBody } =
    meta.kind === "logbook" ? { lead: "", body: content } : splitLeadingBlockquote(content)

  const mdxRemoteProps = {
    options: {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeSlug, rehypeKatex],
      },
    },
    components: mdxComponents,
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    author: { "@type": "Person", name: "0xjei" },
    url: postUrl,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article id="writing-top" className="space-y-8 stagger scroll-mt-24">
        <nav aria-label="Breadcrumb">
          <Link
            href="/writings"
            className="text-xs font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
          >
            back
          </Link>
        </nav>

        <header className="space-y-2">
          <h1 className="text-2xl font-semibold leading-snug text-foreground">{meta.title}</h1>
          {meta.tags.length > 0 && (
            <p className="text-xs font-mono text-muted-foreground">
              {meta.tags.map((tag, i) => (
                <span key={tag}>
                  {i > 0 && " · "}
                  <Link
                    href={`/writings/tag/${tag}`}
                    className="text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
                  >
                    {tagLabels[tag] || tag}
                  </Link>
                </span>
              ))}
            </p>
          )}
          <p className="text-xs font-mono text-muted-foreground">
            <Link
              href={`/writings?year=${meta.date.split(" ")[1]}`}
              className="text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
            >
              {meta.date.split(" ")[1]}
            </Link>
            {" · "}
            {Math.max(1, Math.round(content.split(/\s+/).length / 200))} min read
          </p>
          <div className="pt-2">
            <ArticleShare postUrl={postUrl} title={meta.title} />
          </div>
        </header>

        <div className="prose-mono space-y-4 text-sm font-mono leading-relaxed text-foreground">
          {ackLead.trim() !== "" && (
            <>
              <MDXRemote source={ackLead} {...mdxRemoteProps} />
              <hr className={proseHorizontalRuleClass} />
            </>
          )}
          {tocEntries.length > 0 && <WritingToc entries={tocEntries} />}
          {mainBody.trim() !== "" && <MDXRemote source={mainBody} {...mdxRemoteProps} />}
        </div>

        <nav className="grid grid-cols-3 items-center gap-4 pt-2" aria-label="Post navigation">
          <div className="min-h-[1.25rem] justify-self-start">
            {prevWriting ? (
              <Link
                href={`/writings/${prevWriting.slug}`}
                className="text-xs font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
              >
                prev
              </Link>
            ) : null}
          </div>
          <a
            href="#writing-top"
            className="justify-self-center text-center text-xs font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
          >
            top
          </a>
          <div className="min-h-[1.25rem] justify-self-end">
            {nextWriting ? (
              <Link
                href={`/writings/${nextWriting.slug}`}
                className="text-xs font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
              >
                next
              </Link>
            ) : null}
          </div>
        </nav>
      </article>
    </>
  )
}
