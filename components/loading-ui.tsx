"use client"

export function LoadingUI() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="relative" aria-hidden="true">
        <svg width={80} height={80} viewBox="0 0 80 80" className="text-foreground/90">
          <defs>
            <radialGradient id="planet-shade" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
              <stop offset="70%" stopColor="currentColor" stopOpacity="0.7" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
            </radialGradient>
          </defs>
          {/* Planet body */}
          <circle cx="40" cy="40" r="24" fill="url(#planet-shade)" />
          {/* Moon orbiting */}
          <g className="loader-orbit">
            <circle r="4" fill="currentColor" opacity="0.9" cx="40" cy="16" />
          </g>
        </svg>
      </div>
    </div>
  )
}
