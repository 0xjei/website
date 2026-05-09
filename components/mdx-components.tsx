import { proseHorizontalRuleClass } from "@/lib/prose-classes"
import Image from "next/image"
import Link from "next/link"
import type { ComponentPropsWithoutRef, ReactElement } from "react"
import { MermaidDiagram } from "./mermaid-diagram"

type AnchorProps = ComponentPropsWithoutRef<"a">

export const mdxComponents = {
  h2: ({ children, id, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      id={id}
      className="scroll-mt-20 text-xl font-bold leading-tight text-foreground mt-10 mb-3"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      id={id}
      className="scroll-mt-20 text-lg font-bold leading-tight text-foreground mt-7 mb-2"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, id, ...props }: ComponentPropsWithoutRef<"h4">) => (
    <h4
      id={id}
      className="scroll-mt-20 text-base font-bold leading-tight text-foreground mt-5 mb-1"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children }: ComponentPropsWithoutRef<"p">) => <p className="leading-relaxed">{children}</p>,
  a: ({ href, children, ...props }: AnchorProps) => {
    const linkClass =
      "text-foreground underline underline-offset-[3px] decoration-1 decoration-foreground/60 hover:decoration-foreground hover:font-bold transition-colors"
    const isExternal = href?.startsWith("http")
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass} {...props}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href ?? "#"} className={linkClass}>
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
    <blockquote className="my-6 space-y-3 border-l-2 border-muted-foreground/35 pl-5 font-mono text-sm leading-relaxed text-foreground [&_p]:m-0 [&_p+p]:mt-3">
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
      <pre className="overflow-x-auto p-4 bg-muted/20 rounded text-sm leading-relaxed my-4 border border-muted-foreground/10">
        {children}
      </pre>
    )
  },
  hr: () => <hr className={proseHorizontalRuleClass} />,
  strong: ({ children }: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-bold text-foreground">{children}</strong>
  ),

  img: ({ src, alt, width, height, className }: ComponentPropsWithoutRef<"img">) => {
    const imageSrc = String(src ?? "")
    const isRemote = /^https?:\/\//.test(imageSrc)
    const imageClassName = `max-w-full h-auto rounded my-6 ${className ?? ""}`.trim()

    if (isRemote) {
      return (
        <img
          src={imageSrc}
          alt={alt ?? ""}
          width={width}
          height={height}
          className={imageClassName}
          loading="lazy"
          decoding="async"
        />
      )
    }

    return (
      <Image
        src={imageSrc}
        alt={alt ?? ""}
        width={Number(width) || 800}
        height={Number(height) || 600}
        className={imageClassName}
      />
    )
  },
}
