import fs from "fs"
import path from "path"
import matter from "gray-matter"

const WRITINGS_DIR = path.join(process.cwd(), "contents", "writings")

export interface WritingMeta {
  slug: string
  title: string
  date: string
  dateSort: string
  tags: string[]
  description?: string
  kind?: "writing" | "research note"
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
  const kind = input.kind === "writing" || input.kind === "research note" ? input.kind : undefined
  return { slug, title, date, dateSort, tags, description, kind }
}

export function getAllWritingsMeta(): WritingMeta[] {
  if (!fs.existsSync(WRITINGS_DIR)) return []
  const files = fs.readdirSync(WRITINGS_DIR).filter(f => f.endsWith(".mdx"))
  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(WRITINGS_DIR, filename), "utf8")
      const { data } = matter(raw)
      return parseWritingMeta(slug, data)
    })
    .sort((a, b) => b.dateSort.localeCompare(a.dateSort))
}

export function getWritingContent(slug: string): {
  meta: WritingMeta
  content: string
} {
  const filePath = path.join(WRITINGS_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return { meta: parseWritingMeta(slug, data), content }
}
