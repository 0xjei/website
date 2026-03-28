"use client"

import { useEffect, useRef } from "react"

const STAR_COUNT = 38
const PIXEL_SIZES = [1, 1, 2, 2, 2, 3] // weighted toward small

type Star = {
  x: number
  y: number
  size: number
  baseOpacity: number
  twinkleSpeed: number
  twinkleOffset: number
}

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: PIXEL_SIZES[Math.floor(Math.random() * PIXEL_SIZES.length)],
    baseOpacity: 0.05 + Math.random() * 0.05,
    twinkleSpeed: 0.2 + Math.random() * 0.5,
    twinkleOffset: Math.random() * Math.PI * 2,
  }))
}

export function PixelStars({ contained = false }: { contained?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    starsRef.current = makeStars(STAR_COUNT)

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const w = contained ? canvas!.parentElement!.clientWidth : window.innerWidth
      const h = contained ? canvas!.parentElement!.clientHeight : window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    function getForegroundColor() {
      return getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim()
    }

    function draw(time: number) {
      const w = parseInt(canvas!.style.width)
      const h = parseInt(canvas!.style.height)
      ctx!.clearRect(0, 0, w, h)

      const color = getForegroundColor()
      const t = time / 1000

      for (const star of starsRef.current) {
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset)
        const opacity = star.baseOpacity + twinkle * 0.15

        ctx!.fillStyle = color
        ctx!.globalAlpha = Math.max(0.03, Math.min(0.5, opacity))

        const px = star.x * w
        const py = star.y * h

        // Draw as small square pixels (scattered pattern like the reference)
        ctx!.fillRect(Math.round(px), Math.round(py), star.size, star.size)
      }

      ctx!.globalAlpha = 1
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [contained])

  const cls = contained
    ? "absolute inset-0 overflow-hidden pointer-events-none"
    : "fixed inset-0 overflow-hidden pointer-events-none z-0"

  return <canvas ref={canvasRef} className={cls} aria-hidden="true" />
}
