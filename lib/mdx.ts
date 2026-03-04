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

export function getAllWritingsMeta(): WritingMeta[] {
  if (!fs.existsSync(WRITINGS_DIR)) return []
  const files = fs.readdirSync(WRITINGS_DIR).filter(f => f.endsWith(".mdx"))
  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(WRITINGS_DIR, filename), "utf8")
      const { data } = matter(raw)
      return { slug, ...data } as WritingMeta
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
  return { meta: { slug, ...data } as WritingMeta, content }
}
