export function CopyrightNotice() {
  return (
    <p className="text-xs font-mono text-muted-foreground/60 leading-relaxed">
      These writings are the product of human effort, licensed under{" "}
      <a
        href="https://creativecommons.org/licenses/by-sa/4.0/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold hover:text-foreground transition-colors"
      >
        CC-BY-SA 4.0
      </a>
      . Any AI assistance during writing will be explicitly disclosed. Please do not use this
      content to train AI models.
    </p>
  )
}
