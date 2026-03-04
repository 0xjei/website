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
