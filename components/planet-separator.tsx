"use client"

import { useEffect, useState } from "react"

const PHASES: { name: string; art: string[] }[] = [
  {
    name: "NEW MOON",
    art: [
      "       _...._     ",
      "     .::::::::.   ",
      "    ::::::::::::  ",
      "    ::::::::::::  ",
      "    `::::::::::'  ",
      "      `'::::''    ",
    ],
  },
  {
    name: "WAXING CRESCENT",
    art: [
      "       _...._     ",
      "     .:::::. '.   ",
      "    ::::::::.  :  ",
      "    :::::::::  :  ",
      "    `:::::::' .'  ",
      "      `':::'-'    ",
    ],
  },
  {
    name: "FIRST QUARTER",
    art: [
      "       _...._     ",
      "     .:::::  '.   ",
      "    :::::::    :  ",
      "    :::::::    :  ",
      "    `::::::   .'  ",
      "      `':::.-'    ",
    ],
  },
  {
    name: "WAXING GIBBOUS",
    art: [
      "       _...._     ",
      "     .:::'   '.   ",
      "    ::::       :  ",
      "    ::::       :  ",
      "    `:::.     .'  ",
      "      `'::..-'    ",
    ],
  },
  {
    name: "FULL MOON",
    art: [
      "       _...._     ",
      "     .'      `.   ",
      "    :          :  ",
      "    :          :  ",
      "    `.        .'  ",
      "      `-....-'    ",
    ],
  },
  {
    name: "WANING GIBBOUS",
    art: [
      "       _...._     ",
      "     .'   `:::.   ",
      "    :       ::::  ",
      "    :       ::::  ",
      "    `.     .:::'  ",
      "      `-..::''    ",
    ],
  },
  {
    name: "LAST QUARTER",
    art: [
      "       _...._     ",
      "     .'  :::::.   ",
      "    :    :::::::  ",
      "    :    :::::::  ",
      "    `.   ::::::'  ",
      "      `-.:::''    ",
    ],
  },
  {
    name: "WANING CRESCENT",
    art: [
      "       _...._     ",
      "     .' .:::::.   ",
      "    :  :::::::::  ",
      "    :  :::::::::  ",
      "    `. ':::::::'  ",
      "      `-.:::''    ",
    ],
  },
]

const HOLD_FRAMES = 12 // frames to hold each phase before transitioning
const INTERVAL_MS = 120

export function PlanetSeparator() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  const totalFrames = PHASES.length * HOLD_FRAMES
  const frame = tick % totalFrames
  const phaseIndex = Math.floor(frame / HOLD_FRAMES)
  const phase = PHASES[phaseIndex]

  return (
    <div
      className="w-full py-8 select-none overflow-x-hidden flex flex-col items-center"
      aria-hidden="true"
    >
      <pre className="m-0 font-mono text-lg text-foreground/40" style={{ lineHeight: "1.1" }}>
        {phase.art.join("\n")}
      </pre>
    </div>
  )
}
