import { proseHorizontalRuleClass } from "@/lib/prose-classes"
import type { WritingTocEntry } from "@/lib/writing-toc"
import Link from "next/link"

/** Same classes as `<a>` in `mdx-components.tsx` for inner-article links. */
const linkClass =
  "text-foreground underline underline-offset-[3px] decoration-1 decoration-foreground/60 hover:decoration-foreground hover:font-bold transition-colors"

export function WritingToc({ entries }: { entries: WritingTocEntry[] }) {
  if (entries.length === 0) return null

  return (
    <>
      <nav
        aria-label="Table of contents"
        className="font-mono text-sm leading-relaxed text-foreground"
      >
        <ul className="list-none space-y-1.5 m-0 p-0">
          {entries.map(entry => (
            <li
              key={entry.id}
              className={entry.depth === 2 ? "" : entry.depth === 3 ? "pl-4" : "pl-8"}
            >
              <Link href={`#${entry.id}`} className={linkClass}>
                {entry.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <hr className={proseHorizontalRuleClass} />
    </>
  )
}
