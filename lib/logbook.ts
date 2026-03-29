import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MONTH_NUM } from "./year-utils"

const LOGS_DIR = path.join(process.cwd(), "contents", "logs")

export interface LogMeta {
  slug: string
  month: string
  year: string
  title?: string
}

export function getAllLogMeta(): LogMeta[] {
  const files = fs.readdirSync(LOGS_DIR).filter(f => f.endsWith(".mdx"))
  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(LOGS_DIR, filename), "utf8")
      const { data } = matter(raw)
      return { slug, ...data } as LogMeta
    })
    .sort((a, b) => {
      if (b.year !== a.year) return b.year.localeCompare(a.year)
      return (MONTH_NUM[b.month.toLowerCase()] ?? 0) - (MONTH_NUM[a.month.toLowerCase()] ?? 0)
    })
}

export function getLogContent(slug: string): {
  meta: LogMeta
  content: string
} {
  const filePath = path.join(LOGS_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return { meta: { slug, ...data } as LogMeta, content }
}
