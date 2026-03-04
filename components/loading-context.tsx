"use client"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { LoadingUI } from "./loading-ui"

type LoadingContextValue = {
  loadingShownAt: number | null
  setLoadingShownAt: (t: number | null) => void
}

const LoadingContext = createContext<LoadingContextValue | null>(null)

export function useLoadingContext() {
  const ctx = useContext(LoadingContext)
  if (!ctx) return { loadingShownAt: null, setLoadingShownAt: () => {} }
  return ctx
}

const MIN_LOADING_MS = 1000

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loadingShownAt, setLoadingShownAtState] = useState<number | null>(null)
  const [delayOver, setDelayOver] = useState(true)

  const setLoadingShownAt = useCallback((t: number | null) => {
    setLoadingShownAtState(t)
    if (t !== null) setDelayOver(false)
  }, [])

  useEffect(() => {
    if (!loadingShownAt || delayOver) return
    const elapsed = Date.now() - loadingShownAt
    const remaining = Math.max(0, MIN_LOADING_MS - elapsed)
    const id = setTimeout(() => {
      setDelayOver(true)
      setLoadingShownAtState(null)
    }, remaining)
    return () => clearTimeout(id)
  }, [loadingShownAt, delayOver])

  const showDelay = loadingShownAt !== null && !delayOver

  return (
    <LoadingContext.Provider value={{ loadingShownAt, setLoadingShownAt }}>
      {children}
      {showDelay && (
        <div className="fixed inset-0 z-[9999] bg-background">
          <LoadingUI />
        </div>
      )}
    </LoadingContext.Provider>
  )
}
