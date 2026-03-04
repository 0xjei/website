"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { tagLabels } from "@/lib/tags"

type Props = { selectedTags: string[] }

export function TagFilter({ selectedTags }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const allTagIds = Object.keys(tagLabels)

  function toggleTag(tag: string) {
    const next = new Set(selectedTags)
    if (next.has(tag)) next.delete(tag)
    else next.add(tag)
    const params = new URLSearchParams(searchParams.toString())
    if (next.size > 0) params.set("tags", [...next].sort().join(","))
    else params.delete("tags")
    const q = params.toString()
    router.push(pathname + (q ? `?${q}` : ""))
  }

  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Filter by tag">
      {allTagIds.map(tag => {
        const selected = selectedTags.includes(tag)
        return (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`text-xs font-mono transition-colors ${
              selected
                ? "text-foreground font-bold underline underline-offset-2"
                : "text-muted-foreground hover:text-foreground hover:font-bold"
            }`}
          >
            {tagLabels[tag] ?? tag}
          </button>
        )
      })}
    </div>
  )
}
