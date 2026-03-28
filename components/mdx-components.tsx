import Image from "next/image"
import Link from "next/link"
import type { ComponentPropsWithoutRef, ReactElement } from "react"
import { MermaidDiagram } from "./mermaid-diagram"

type AnchorProps = ComponentPropsWithoutRef<"a">

export const mdxComponents = {
  h2: ({ children }: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="text-base font-semibold text-foreground font-outfit mt-8 mb-2">{children}</h2>
  ),
  h3: ({ children }: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="text-sm font-semibold text-foreground mt-6 mb-1">{children}</h3>
  ),
  p: ({ children }: ComponentPropsWithoutRef<"p">) => <p className="leading-relaxed">{children}</p>,
  a: ({ href, children, ...props }: AnchorProps) => {
    const isExternal = href?.startsWith("http")
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-foreground transition-colors"
          {...props}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href ?? "#"} className="font-bold text-foreground transition-colors">
        {children}
      </Link>
    )
  },
  ul: ({ children }: ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc list-outside ml-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }: ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal list-outside ml-4 space-y-1">{children}</ol>
  ),
  blockquote: ({ children }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="border-l-2 border-muted-foreground/30 pl-4 italic text-muted-foreground my-4">
      {children}
    </blockquote>
  ),
  code: ({ children, className }: ComponentPropsWithoutRef<"code">) => {
    if (className) {
      return <code className={className}>{children}</code>
    }
    return (
      <code className="font-mono text-foreground/90 bg-muted/30 px-1 rounded text-[0.8em]">
        {children}
      </code>
    )
  },
  pre: ({ children }: ComponentPropsWithoutRef<"pre">) => {
    const child = children as ReactElement<{ className?: string; children?: string }>
    const className = child?.props?.className ?? ""
    if (className.includes("language-mermaid")) {
      return <MermaidDiagram chart={child.props.children ?? ""} />
    }
    return (
      <pre className="overflow-x-auto p-4 bg-muted/20 rounded text-xs leading-relaxed my-4 border border-muted-foreground/10">
        {children}
      </pre>
    )
  },
  hr: () => <hr className="border-muted-foreground/20 my-8" />,
  strong: ({ children }: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),

  img: ({ src, alt, width, height }: ComponentPropsWithoutRef<"img">) => (
    <Image
      src={String(src ?? "")}
      alt={alt ?? ""}
      width={Number(width) || 800}
      height={Number(height) || 600}
      className="max-w-full h-auto rounded my-6"
    />
  ),
}
