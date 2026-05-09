import type { WritingMeta } from "./mdx"

/** Listed tag ids include synthetic `writing` (everything that is not a logbook entry). */
export function writingMatchesListedTag(meta: WritingMeta, tagId: string): boolean {
  if (tagId === "writing") return (meta.kind ?? "writing") !== "logbook"
  return meta.tags.includes(tagId)
}

export const tagLabels: Record<string, string> = {
  writing: "Writing",
  logbook: "Logbook",
  cryptography: "Cryptography",
  blockchain: "Blockchain",
  ai: "AI",
  engineering: "Engineering",
  research: "Research",
  design: "Design",
  security: "Security",
}
