import { getAllWritingsMeta } from "./mdx"
import { presentations } from "./media"
import { getAllLogMeta } from "./logbook"
import { monthToSortable } from "./year-utils"

export type RecentItem =
  | {
      type: "writing"
      title: string
      dateSort: string
      date: string
      slug: string
      kind?: string
    }
  | {
      type: "video"
      title: string
      dateSort: string
      date: string
      href: string
    }
  | {
      type: "log"
      title: string
      dateSort: string
      date: string
      slug: string
    }

export function getRecentItems(limit = 8): RecentItem[] {
  const writings: RecentItem[] = getAllWritingsMeta().map(w => ({
    type: "writing",
    title: w.title,
    dateSort: w.dateSort,
    date: w.date,
    slug: w.slug,
    kind: w.kind,
  }))
  const videos: RecentItem[] = presentations.map(w => ({
    type: "video",
    title: w.title,
    dateSort: w.dateSort,
    date: w.date,
    href: w.link ?? w.embedUrl ?? "#",
  }))
  const logs: RecentItem[] = getAllLogMeta().map(l => ({
    type: "log",
    title: l.title ?? `${l.month} ${l.year}`,
    dateSort: monthToSortable(l.month, l.year),
    date: `${l.month} ${l.year}`,
    slug: l.slug,
  }))
  const merged = [...writings, ...videos, ...logs].sort((a, b) =>
    b.dateSort > a.dateSort ? 1 : b.dateSort < a.dateSort ? -1 : 0
  )
  return merged.slice(0, limit)
}

export function recentItemKey(item: RecentItem): string {
  if (item.type === "writing") return item.slug
  return `${item.title}-${item.dateSort}`
}
