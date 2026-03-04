import Link from "next/link"

type Props = {
  href: string
  year: string
  isSelected: boolean
}

export function YearLink({ href, year, isSelected }: Props) {
  return (
    <h2>
      <Link
        href={href}
        className={
          isSelected
            ? "text-sm font-mono font-bold text-foreground underline underline-offset-2 transition-colors"
            : "text-sm font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
        }
      >
        {year}
      </Link>
    </h2>
  )
}
