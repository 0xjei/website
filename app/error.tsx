"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="space-y-6 stagger">
      <p className="text-xs font-mono text-muted-foreground">500</p>
      <h1 className="text-2xl font-semibold text-foreground font-outfit">Something went wrong</h1>
      <p className="text-sm font-mono text-foreground/70 leading-relaxed">
        An unexpected error occurred. Please try again or go back home.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="text-xs font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
        >
          [try again]
        </button>
        <Link
          href="/"
          className="text-xs font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
        >
          [home]
        </Link>
      </div>
    </div>
  )
}
