import { getAllWritingsMeta } from "@/lib/mdx"
import { siteUrl } from "@/lib/site"

export const dynamic = "force-static"

export async function GET() {
  const writings = getAllWritingsMeta()

  const items = writings
    .map(w => {
      const url = `${siteUrl}/writings/${w.slug}`
      const pubDate = new Date(`${w.dateSort}-01`).toUTCString()
      return `
    <item>
      <title><![CDATA[${w.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${w.description ? `<description><![CDATA[${w.description}]]></description>` : ""}
    </item>`
    })
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>0xjei | Writings</title>
    <link>${siteUrl}/writings</link>
    <description>Essays and notes on applied cryptography, zero-knowledge proofs, privacy-preserving protocols, and programmable cryptography.</description>
    <language>en</language>
    <copyright>© Giacomo Corrias. CC-BY-SA 4.0</copyright>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
