"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "./theme-provider"
import { PixelStars } from "./pixel-stars"
import { CustomCursor } from "./custom-cursor"
import { useLayoutEffect, useState, useEffect } from "react"

const nav = [
  { href: "/experience", label: "experience", matches: ["/experience"] },
  { href: "/writings", label: "writings", matches: ["/writings"] },
  { href: "/media", label: "talks", matches: ["/media"] },
  { href: "/logbook", label: "logbook", matches: ["/logbook"] },
  { href: "/collaborate", label: "collaborate", matches: ["/collaborate"] },
  { href: "/readings", label: "readings", matches: ["/readings"] },
  { href: "/about", label: "about", matches: ["/about"] },
  { href: "/contacts", label: "contacts", exact: true },
]

function ThemeButton() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-2xl leading-none flex items-center text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {!mounted ? "◑" : theme === "light" ? "◑" : "◐"}
    </button>
  )
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  function isActive(item: { href: string; matches?: string[]; exact?: boolean }) {
    if (item.exact) return pathname === item.href
    if (item.matches) return item.matches.some(m => pathname.startsWith(m))
    return pathname.startsWith(item.href)
  }

  const linkClass = (active: boolean) =>
    `text-sm font-mono transition-colors ${active ? "text-foreground font-bold underline underline-offset-2" : "text-muted-foreground hover:text-foreground hover:font-bold"}`

  return (
    <div className="min-h-screen lg:flex">
      <PixelStars />
      <CustomCursor />

      {/* Mobile header */}
      <header className="lg:hidden border-b border-border px-6 py-5 bg-background relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-base font-mono font-semibold text-foreground">
            0xjei
          </Link>
          <div className="flex items-center gap-4">
            <ThemeButton />
            <button
              onClick={() => setMenuOpen(true)}
              className="text-2xl font-mono text-foreground leading-none flex items-center"
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col px-6 py-5 lg:hidden">
          <div className="flex items-center justify-between border-b border-border pb-5">
            <Link
              href="/"
              className="text-base font-mono font-semibold text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              0xjei
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-xl font-mono text-foreground leading-none"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-6 mt-10" aria-label="Site navigation">
            {nav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-mono transition-colors ${
                  isActive(item)
                    ? "text-foreground font-bold underline underline-offset-2"
                    : "text-muted-foreground hover:text-foreground hover:font-bold"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pb-4" />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col shrink-0 border-r border-border px-8 py-10 sticky top-0 h-screen overflow-hidden bg-background relative z-10">
        {/* Name */}
        <Link href="/" className="text-sm font-mono font-semibold text-foreground mb-8 block">
          0xjei
        </Link>

        {/* Nav */}
        <nav className="flex flex-col gap-3 mb-10" aria-label="Main navigation">
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(isActive(item))}
              aria-current={isActive(item) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <div className="pt-4">
          <ThemeButton />
        </div>
      </aside>

      {/* Content area */}
      <main id="main-content" className="flex-1 relative px-6 py-10 lg:px-16 lg:py-12" role="main">
        <div className="relative z-10 max-w-xl">{children}</div>
      </main>
    </div>
  )
}
