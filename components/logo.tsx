"use client"

import Link from "next/link"
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react"

type SpaceLogoLinkProps = Omit<ComponentProps<typeof Link>, "children" | "className" | "href"> & {
  children: ReactNode
  className?: string
}

export function SpaceLogoLink({ children, className, onClick, ...props }: SpaceLogoLinkProps) {
  const [isLaunching, setIsLaunching] = useState(false)
  const [launchCount, setLaunchCount] = useState(0)
  const audioContext = useRef<AudioContext | null>(null)
  const launchTimeout = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (launchTimeout.current !== null) window.clearTimeout(launchTimeout.current)
      void audioContext.current?.close()
    }
  }, [])

  function playSpaceSound() {
    const AudioContextConstructor =
      window.AudioContext ??
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextConstructor) return

    const context = audioContext.current ?? new AudioContextConstructor()
    audioContext.current = context

    const scheduleSound = () => {
      const now = context.currentTime
      const output = context.createGain()
      output.gain.setValueAtTime(0.0001, now)
      output.gain.exponentialRampToValueAtTime(0.2, now + 0.015)
      output.gain.exponentialRampToValueAtTime(0.0001, now + 0.48)
      output.connect(context.destination)

      const chirp = context.createOscillator()
      chirp.type = "square"
      chirp.frequency.setValueAtTime(160, now)
      chirp.frequency.exponentialRampToValueAtTime(960, now + 0.13)
      chirp.frequency.exponentialRampToValueAtTime(240, now + 0.38)
      chirp.connect(output)
      chirp.start(now)
      chirp.stop(now + 0.48)

      const shimmer = context.createOscillator()
      const shimmerGain = context.createGain()
      shimmer.type = "triangle"
      shimmer.frequency.setValueAtTime(1320, now)
      shimmer.frequency.exponentialRampToValueAtTime(460, now + 0.4)
      shimmerGain.gain.setValueAtTime(0.0001, now)
      shimmerGain.gain.exponentialRampToValueAtTime(0.06, now + 0.02)
      shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4)
      shimmer.connect(shimmerGain).connect(output)
      shimmer.start(now)
      shimmer.stop(now + 0.4)
    }

    if (context.state === "suspended") {
      void context
        .resume()
        .then(scheduleSound)
        .catch(() => {})
    } else {
      scheduleSound()
    }
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    playSpaceSound()
    setIsLaunching(true)
    setLaunchCount(count => count + 1)

    if (launchTimeout.current !== null) window.clearTimeout(launchTimeout.current)
    launchTimeout.current = window.setTimeout(() => {
      setIsLaunching(false)
      launchTimeout.current = null
    }, 1100)

    onClick?.(event)
  }

  return (
    <>
      <Link
        href="/"
        {...props}
        className={`logo-space-hop ${className ?? ""} ${isLaunching ? "is-launching" : ""}`}
        onClick={handleClick}
      >
        {children}
      </Link>
      {isLaunching && (
        <div key={launchCount} className="space-crawl-overlay" aria-hidden="true">
          <div className="space-crawl-stars" />
          <h1 className="space-crawl-title">0xjei</h1>
        </div>
      )}
    </>
  )
}

export function Logo() {
  return (
    <SpaceLogoLink
      className="fixed z-50 text-xs font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
      style={{
        top: "max(16px, env(safe-area-inset-top, 16px))",
        left: "max(16px, env(safe-area-inset-left, 16px))",
      }}
      aria-label="Home"
    >
      <span className="font-mono">← </span>
      <span className="font-ioskeley">0xjei</span>
    </SpaceLogoLink>
  )
}
