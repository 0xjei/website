import type { WritingMeta } from "./mdx"

function writingKind(meta: WritingMeta): NonNullable<WritingMeta["kind"]> {
  return meta.kind ?? "writing"
}

/** Listed tag ids include synthetic kinds: `writing`, `notes`, and `logbook`. */
export function writingMatchesListedTag(meta: WritingMeta, tagId: string): boolean {
  const kind = writingKind(meta)
  if (tagId === "writing") return kind === "writing"
  if (tagId === "notes") return kind === "notes"
  if (tagId === "logbook") return kind === "logbook"
  return meta.tags.includes(tagId)
}

export const tagLabels: Record<string, string> = {
  writing: "Writing",
  notes: "Notes",
  logbook: "Logbook",
  cryptography: "Cryptography",
  blockchain: "Blockchain",
  ai: "AI",
  engineering: "Engineering",
  research: "Research",
  design: "Design",
  security: "Security",
}
