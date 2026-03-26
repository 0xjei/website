"use client"

import { useEffect, useRef } from "react"

const PIXEL_SIZE = 3
const SPHERE_RADIUS = 80
const CANVAS_SIZE = SPHERE_RADIUS * 2 + PIXEL_SIZE * 6 // padding

export function PlanetSeparator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const phaseRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = CANVAS_SIZE * dpr
    canvas.height = CANVAS_SIZE * dpr
    canvas.style.width = `${CANVAS_SIZE}px`
    canvas.style.height = `${CANVAS_SIZE}px`
    ctx.scale(dpr, dpr)

    const cx = CANVAS_SIZE / 2
    const cy = CANVAS_SIZE / 2

    function getForegroundColor() {
      const style = getComputedStyle(document.documentElement)
      return style.getPropertyValue("--foreground").trim()
    }

    function draw() {
      ctx!.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

      const color = getForegroundColor()
      ctx!.fillStyle = color

      const phase = phaseRef.current

      // Grid spacing for halftone dots
      const step = PIXEL_SIZE * 2.5

      // Build a snapped grid so the circle is symmetric
      const halfSteps = Math.floor(SPHERE_RADIUS / step)

      for (let ix = -halfSteps; ix <= halfSteps; ix++) {
        for (let iy = -halfSteps; iy <= halfSteps; iy++) {
          const gx = ix * step
          const gy = iy * step

          // Check if grid cell center is inside the sphere
          const dist = Math.sqrt(gx * gx + gy * gy)
          if (dist > SPHERE_RADIUS + step * 0.3) continue

          // Map 2D position to 3D sphere surface
          const nx = gx / SPHERE_RADIUS
          const ny = gy / SPHERE_RADIUS
          const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

          // Rotate around Y axis for the "fill" effect
          const rotatedX = nx * Math.cos(phase) + nz * Math.sin(phase)
          const rotatedZ = -nx * Math.sin(phase) + nz * Math.cos(phase)

          // Lighting: directional light from upper-left-front
          const lightX = -0.4
          const lightY = -0.3
          const lightZ = 0.86
          const intensity = Math.max(0, rotatedX * lightX + ny * lightY + rotatedZ * lightZ)

          // Halftone: dot size based on light intensity
          // Darker areas = larger dots, lighter areas = smaller/no dots
          const darkness = 1 - intensity
          const maxDotSize = step * 0.45
          const dotSize = darkness * maxDotSize

          if (dotSize < PIXEL_SIZE * 0.3) continue

          // Draw as small squares (pixel aesthetic)
          const px = cx + gx - dotSize / 2
          const py = cy + gy - dotSize / 2
          ctx!.fillRect(Math.round(px), Math.round(py), Math.round(dotSize), Math.round(dotSize))
        }
      }

      // Slowly rotate
      phaseRef.current += 0.006
      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <div
      className="w-full py-8 select-none overflow-x-hidden flex flex-col items-center"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="opacity-40"
        style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
      />
    </div>
  )
}
