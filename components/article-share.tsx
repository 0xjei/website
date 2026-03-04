"use client"

import { Check, Share2 } from "lucide-react"
import { useState, useRef } from "react"

function XIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function BlueskyIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.018 1.3.6 3.867c-.275 1.7-.206 4.488.306 6.067 1.287 4.124 6.088 4.813 9.094 4.196-3.006.617-7.807 1.306-9.094 5.43-.512 1.579-.581 4.367-.306 6.067.418 2.566 1.966 2.922 4.602 1.012C7.954 24.747 10.913 20.808 12 18.694c1.087 2.114 4.046 6.053 6.798 7.995 2.636 1.91 4.184 1.554 4.602-1.012.275-1.7.206-4.488-.306-6.067-1.287-4.124-6.088-4.813-9.094-4.196 3.006-.617 7.807-1.306 9.094-5.43.512-1.579.581-4.367.306-6.067C23.018 1.3 21.47.944 18.798 2.805 16.046 4.747 13.087 8.686 12 10.8z" />
    </svg>
  )
}

function FarcasterIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm2 4v12h3v-5h5v-3h-5V9h7V6H6z" />
    </svg>
  )
}

function MastodonIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.327 8.566c0-4.339-2.843-5.61-2.843-5.61-1.433-.658-3.894-.935-6.451-.956h-.063c-2.557.021-5.016.298-6.449.956 0 0-2.843 1.272-2.843 5.61 0 .993-.019 2.181.012 3.441.103 4.243.778 8.425 4.701 9.463 1.809.479 3.362.579 4.612.51 2.268-.126 3.541-.809 3.541-.809l-.075-1.646s-1.621.511-3.441.449c-1.804-.062-3.707-.194-3.999-2.409a4.523 4.523 0 0 1-.04-.621s1.77.433 4.014.536c1.372.063 2.658-.08 3.965-.236 2.506-.299 4.688-1.843 4.962-3.254.434-2.223.398-5.424.398-5.424zm-3.353 5.59h-2.081V9.057c0-1.075-.452-1.62-1.357-1.62-1.001 0-1.501.648-1.501 1.933v2.794h-2.069V9.37c0-1.285-.5-1.933-1.501-1.933-.905 0-1.357.545-1.357 1.62v5.099H6.026V8.903c0-1.074.273-1.927.823-2.558.567-.631 1.313-.955 2.24-.955 1.07 0 1.88.411 2.415 1.234l.521.873.521-.873c.535-.823 1.345-1.234 2.414-1.234.927 0 1.673.324 2.241.955.549.631.822 1.484.822 2.558v5.253z" />
    </svg>
  )
}

interface Props {
  postUrl: string
  title: string
}

export function ArticleShare({ postUrl, title }: Props) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const copyLink = async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    try {
      if (navigator.share) {
        await navigator.share({ title, url: postUrl })
      } else {
        await navigator.clipboard.writeText(postUrl)
        setCopied(true)
        timeoutRef.current = setTimeout(() => setCopied(false), 2000)
      }
    } catch {}
  }

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`
  const bskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(title + "\n" + postUrl)}`
  const farcasterUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(title + "\n" + postUrl)}`
  const mastodonUrl = `https://mastodon.social/share?text=${encodeURIComponent(title + " " + postUrl)}`

  const linkCls =
    "opacity-40 hover:opacity-100 transition-opacity text-foreground flex items-center"

  return (
    <div className="flex items-center gap-3" aria-label="Share this post">
      <a
        href={xUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        title="Share on X"
        className={linkCls}
      >
        <XIcon />
      </a>
      <a
        href={bskyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Bluesky"
        title="Share on Bluesky"
        className={linkCls}
      >
        <BlueskyIcon />
      </a>
      <a
        href={farcasterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Farcaster"
        title="Share on Farcaster"
        className={linkCls}
      >
        <FarcasterIcon />
      </a>
      <a
        href={mastodonUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Mastodon"
        title="Share on Mastodon"
        className={linkCls}
      >
        <MastodonIcon />
      </a>
      <button
        onClick={copyLink}
        aria-label="Share or copy link"
        title="Share or copy link"
        className={linkCls}
      >
        {copied ? (
          <Check className="w-[11px] h-[11px]" />
        ) : (
          <Share2 className="w-[11px] h-[11px]" />
        )}
      </button>
    </div>
  )
}
