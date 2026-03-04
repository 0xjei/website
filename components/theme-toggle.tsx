"use client"

import { useTheme } from "./theme-provider"
import { useLayoutEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed z-50 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
      style={{
        top: "max(16px, env(safe-area-inset-top, 16px))",
        right: "max(16px, env(safe-area-inset-right, 16px))",
      }}
      aria-label="Toggle theme"
    >
      {!mounted ? "◑" : theme === "light" ? "◑" : "◐"}
    </button>
  )
}
