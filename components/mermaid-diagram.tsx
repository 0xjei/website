"use client"

import { useEffect, useId, useRef, useState } from "react"
import { useTheme } from "./theme-provider"

// Serialize all mermaid renders to avoid initialize() race conditions
let renderQueue = Promise.resolve()
function enqueueRender(fn: () => Promise<void>) {
  renderQueue = renderQueue.then(fn)
  return renderQueue
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, "")
  const containerRef = useRef<HTMLDivElement>(null)
  const svgWrapRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [rendered, setRendered] = useState(false)

  // Render mermaid SVG
  useEffect(() => {
    let cancelled = false

    function render() {
      enqueueRender(async () => {
        if (cancelled) return
        const mermaid = (await import("mermaid")).default
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === "dark" ? "dark" : "default",
          fontFamily: "var(--font-mono, monospace)",
        })
        // Use unique id per render to bypass mermaid's internal cache
        const renderId = `m${id}${Date.now()}`
        const { svg } = await mermaid.render(renderId, chart)
        if (!cancelled && svgWrapRef.current) {
          svgWrapRef.current.innerHTML = svg
          setRendered(true)
        }
      })
    }

    render()
    return () => {
      cancelled = true
    }
  }, [chart, id, theme])

  // Pan + zoom
  useEffect(() => {
    if (!rendered) return
    const container = containerRef.current
    const wrap = svgWrapRef.current
    if (!container || !wrap) return

    // Fit SVG to container on load
    const svg = wrap.querySelector("svg")
    const containerW = container.clientWidth
    const containerH = container.clientHeight
    let fitScale = 1
    if (svg) {
      const svgW = svg.scrollWidth || svg.clientWidth
      const svgH = svg.scrollHeight || svg.clientHeight
      fitScale = Math.min(containerW / svgW, containerH / svgH, 1)
    }

    let scale = fitScale
    let tx = 0
    let ty = 0
    let dragging = false
    let startX = 0
    let startY = 0

    function apply() {
      wrap!.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`
    }

    apply()

    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.05 : 0.05
      scale = Math.min(3, Math.max(fitScale * 0.5, scale + delta))
      apply()
    }

    function onPointerDown(e: PointerEvent) {
      e.preventDefault()
      dragging = true
      startX = e.clientX - tx
      startY = e.clientY - ty
      container!.setPointerCapture(e.pointerId)
      container!.style.cursor = "grabbing"
    }

    function onPointerMove(e: PointerEvent) {
      if (!dragging) return
      tx = e.clientX - startX
      ty = e.clientY - startY
      apply()
    }

    function onPointerUp() {
      dragging = false
      container!.style.cursor = "grab"
    }

    container.addEventListener("wheel", onWheel, { passive: false })
    container.addEventListener("pointerdown", onPointerDown)
    container.addEventListener("pointermove", onPointerMove)
    container.addEventListener("pointerup", onPointerUp)
    container.addEventListener("pointercancel", onPointerUp)

    return () => {
      container.removeEventListener("wheel", onWheel)
      container.removeEventListener("pointerdown", onPointerDown)
      container.removeEventListener("pointermove", onPointerMove)
      container.removeEventListener("pointerup", onPointerUp)
      container.removeEventListener("pointercancel", onPointerUp)
    }
  }, [rendered])

  function reset() {
    const wrap = svgWrapRef.current
    const container = containerRef.current
    if (!wrap || !container) return
    const svg = wrap.querySelector("svg")
    if (!svg) return
    const svgW = svg.scrollWidth || svg.clientWidth
    const svgH = svg.scrollHeight || svg.clientHeight
    const fitScale = Math.min(container.clientWidth / svgW, container.clientHeight / svgH, 1)
    wrap.style.transform = `translate(0px, 0px) scale(${fitScale})`
  }

  return (
    <div className="my-6 space-y-1">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded border border-muted-foreground/10 bg-muted/10 select-none"
        style={{ height: 420, cursor: "grab" }}
      >
        <div
          ref={svgWrapRef}
          style={{ transformOrigin: "top left", transition: "transform 0.05s ease-out" }}
        />
      </div>
      {rendered && (
        <button
          onClick={reset}
          className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          reset view
        </button>
      )}
    </div>
  )
}
