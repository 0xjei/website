import Link from "next/link"

export default function NotFound() {
  return (
    <div className="space-y-6 stagger">
      <h1 className="text-2xl font-semibold text-foreground">404 - NOT FOUND :-(</h1>
      <p className="text-sm font-mono text-muted-foreground leading-relaxed">
        This page doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-xs font-mono text-muted-foreground hover:text-foreground hover:font-bold transition-colors"
      >
        back to home
      </Link>
    </div>
  )
}
