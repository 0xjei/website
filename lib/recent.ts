import { getAllWritingsMeta } from "./mdx"
import { presentations } from "./media"
import { getAllLogMeta } from "./logbook"

const MONTHS: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
}

function logDateSort(month: string, year: string): string {
  return `${year}-${MONTHS[month.toLowerCase()] ?? "00"}`
}

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
    dateSort: logDateSort(l.month, l.year),
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
