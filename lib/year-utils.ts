export const MONTH_NUM: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
}

export function monthToSortable(month: string, year: string): string {
  const num = MONTH_NUM[month.toLowerCase()] ?? 0
  return `${year}-${String(num).padStart(2, "0")}`
}

export function groupByKey<T>(
  items: T[],
  getKey: (item: T) => string
): { byGroup: Record<string, T[]>; groups: string[] } {
  const byGroup: Record<string, T[]> = {}
  for (const item of items) {
    const key = getKey(item)
    if (!byGroup[key]) byGroup[key] = []
    byGroup[key].push(item)
  }
  const groups = Object.keys(byGroup).sort((a, b) => Number(b) - Number(a))
  return { byGroup, groups }
}
