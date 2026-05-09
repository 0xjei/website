"use client"

import Link from "next/link"

export function Logo() {
  return (
    <Link
      href="/"
      className="fixed z-50 text-xs font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
      style={{
        top: "max(16px, env(safe-area-inset-top, 16px))",
        left: "max(16px, env(safe-area-inset-left, 16px))",
      }}
      aria-label="Home"
    >
      <span className="font-mono">← </span>
      <span className="font-anonymous">0xjei</span>
    </Link>
  )
}
