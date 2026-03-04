"use client"

import { useEffect, useState } from "react"

function nearestInteractive(el: Element | null): boolean {
  let cur = el
  for (let i = 0; cur && i < 6; i++, cur = cur.parentElement) {
    const tag = cur.tagName?.toLowerCase()
    if (tag === "a" || tag === "button") return true
    if (cur.getAttribute?.("role") === "button") return true
  }
  return false
}

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -300, y: -300 })
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
      const el = document.elementFromPoint(e.clientX, e.clientY)
      setHovering(nearestInteractive(el))
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
    }
  }, [])

  if (!visible) return null

  return (
    <span
      aria-hidden="true"
      className={hovering ? "cursor-blink" : undefined}
      style={{
        position: "fixed",
        // center the + glyph on the hot-point
        left: pos.x - 11,
        top: pos.y - 16,
        pointerEvents: "none",
        zIndex: 9999,
        fontFamily: "var(--font-anonymous-pro), 'Courier New', monospace",
        fontSize: "28px",
        lineHeight: 1,
        fontWeight: "bold",
        color: "var(--foreground)",
        userSelect: "none",
        whiteSpace: "pre",
      }}
    >
      +
    </span>
  )
}
