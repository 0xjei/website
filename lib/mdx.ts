import fs from "fs"
import path from "path"
import matter from "gray-matter"

const WRITINGS_DIR = path.join(process.cwd(), "contents", "writings")

/** MDX lives in `contents/writings/writing/` vs `logbook/` — frontmatter `kind` stays source of truth for filters. */
const WRITING_COLLECTION_SUBDIRS = ["writing", "logbook"] as const

export interface WritingMeta {
  slug: string
  title: string
  date: string
  dateSort: string
  tags: string[]
  description?: string
  kind?: "writing" | "notes" | "logbook"
}

function parseWritingMeta(slug: string, data: unknown): WritingMeta {
  const input = (data ?? {}) as Record<string, unknown>
  const title = typeof input.title === "string" && input.title.trim() ? input.title : slug
  const date = typeof input.date === "string" ? input.date : ""
  const dateSort = typeof input.dateSort === "string" ? input.dateSort : "0000-00"
  const tags = Array.isArray(input.tags)
    ? input.tags.filter((tag): tag is string => typeof tag === "string")
    : []
  const description = typeof input.description === "string" ? input.description : undefined
  const kind =
    input.kind === "writing" || input.kind === "notes" || input.kind === "logbook"
      ? input.kind
      : undefined
  return { slug, title, date, dateSort, tags, description, kind }
}

function listAllMdxPaths(): { slug: string; filePath: string }[] {
  if (!fs.existsSync(WRITINGS_DIR)) return []
  const results: { slug: string; filePath: string }[] = []
  for (const sub of WRITING_COLLECTION_SUBDIRS) {
    const dir = path.join(WRITINGS_DIR, sub)
    if (!fs.existsSync(dir)) continue
    for (const filename of fs.readdirSync(dir)) {
      if (!filename.endsWith(".mdx")) continue
      const slug = filename.replace(/\.mdx$/, "")
      results.push({ slug, filePath: path.join(dir, filename) })
    }
  }
  return results
}

export function getAllWritingsMeta(): WritingMeta[] {
  const paths = listAllMdxPaths()
  const seen = new Map<string, string>()
  for (const { slug, filePath } of paths) {
    const prev = seen.get(slug)
    if (prev) {
      throw new Error(`Duplicate writing slug "${slug}": ${prev} and ${filePath}`)
    }
    seen.set(slug, filePath)
  }
  return paths
    .map(({ slug, filePath }) => {
      const raw = fs.readFileSync(filePath, "utf8")
      const { data } = matter(raw)
      return parseWritingMeta(slug, data)
    })
    .sort((a, b) => b.dateSort.localeCompare(a.dateSort))
}

function resolveWritingFilePath(slug: string): string {
  for (const sub of WRITING_COLLECTION_SUBDIRS) {
    const filePath = path.join(WRITINGS_DIR, sub, `${slug}.mdx`)
    if (fs.existsSync(filePath)) return filePath
  }
  throw new Error(`Writing not found: ${slug}`)
}

export function getWritingContent(slug: string): {
  meta: WritingMeta
  content: string
} {
  const filePath = resolveWritingFilePath(slug)
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return { meta: parseWritingMeta(slug, data), content }
}
