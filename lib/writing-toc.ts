import Slugger from "github-slugger"
import { toString } from "mdast-util-to-string"
import remarkMath from "remark-math"
import remarkParse from "remark-parse"
import { unified } from "unified"
import { visit } from "unist-util-visit"

export type WritingTocEntry = {
  depth: 2 | 3 | 4
  text: string
  id: string
}

/** Walk markdown (not full MDX JSX) for ##–#### headings; slugs match `rehype-slug` / GitHub-style ids. */
export function extractWritingToc(markdownBody: string): WritingTocEntry[] {
  const tree = unified().use(remarkParse).use(remarkMath).parse(markdownBody)
  const slugger = new Slugger()
  const entries: WritingTocEntry[] = []

  visit(tree, "heading", node => {
    if (node.depth < 2 || node.depth > 4) return
    const text = toString(node).trim()
    if (!text) return
    entries.push({
      depth: node.depth as 2 | 3 | 4,
      text,
      id: slugger.slug(text),
    })
  })

  return entries
}

/** Peels optional opening markdown blockquotes (e.g. acknowledgements); body is the remainder. */
export function splitLeadingBlockquote(markdownBody: string): {
  lead: string
  body: string
} {
  const raw = markdownBody.replace(/^\uFEFF/, "")
  const trimmedStart = raw.replace(/^\n+/, "")
  const lines = trimmedStart.split("\n")
  let i = 0
  while (i < lines.length && lines[i].trim() === "") i++
  if (i >= lines.length) return { lead: "", body: markdownBody }

  if (!/^\s*>/.test(lines[i])) return { lead: "", body: markdownBody }

  const leadLines: string[] = []
  while (i < lines.length) {
    const line = lines[i]
    if (/^\s*>/.test(line)) {
      leadLines.push(line)
      i++
      continue
    }
    if (line.trim() === "" && leadLines.length > 0) {
      let j = i + 1
      while (j < lines.length && lines[j].trim() === "") j++
      if (j < lines.length && /^\s*>/.test(lines[j])) {
        leadLines.push(line)
        i++
        continue
      }
      break
    }
    break
  }

  while (i < lines.length && lines[i].trim() === "") i++

  const lead = leadLines.join("\n").trimEnd()
  const body = (i < lines.length ? lines.slice(i).join("\n") : "").replace(/^\n+/, "")
  return { lead, body }
}
