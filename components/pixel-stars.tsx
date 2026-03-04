"use client"

import { useEffect, useState } from "react"

// + for bright stars, · for dim ones — matches the retro pixel aesthetic
const SHAPES = ["+", "+", "·", "·", "·", "·"] // weighted toward small dots
const SIZES = [8, 8, 9, 10, 10, 11] // weighted toward small

type Shape = {
  id: number
  x: number
  y: number
  char: string
  size: number
  delay: number
}

function makeShapes(count: number): Shape[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: Math.random() * 100,
    y: Math.random() * 100,
    char: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    size: SIZES[Math.floor(Math.random() * SIZES.length)],
    delay: Math.random() * 7,
  }))
}

export function PixelStars({ contained = false }: { contained?: boolean }) {
  const [shapes, setShapes] = useState<Shape[]>([])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShapes(makeShapes(60))
  }, [])

  const cls = contained
    ? "absolute inset-0 overflow-hidden pointer-events-none"
    : "fixed inset-0 overflow-hidden pointer-events-none z-0"

  return (
    <div className={cls} aria-hidden="true">
      {shapes.map(s => (
        <span
          key={s.id}
          className="absolute font-mono select-none text-foreground star-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  )
}
