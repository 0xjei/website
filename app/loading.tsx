"use client"

import { useEffect } from "react"
import { useLoadingContext } from "@/components/loading-context"
import { LoadingUI } from "@/components/loading-ui"

export default function Loading() {
  const { setLoadingShownAt } = useLoadingContext()

  useEffect(() => {
    setLoadingShownAt(Date.now())
  }, [setLoadingShownAt])

  return <LoadingUI />
}
