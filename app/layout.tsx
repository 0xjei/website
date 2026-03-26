import type { Metadata, Viewport } from "next"
import { Anonymous_Pro, Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LoadingProvider } from "@/components/loading-context"
import { SiteLayout } from "@/components/site-layout"
import { siteUrl } from "@/lib/site"

const anonymousPro = Anonymous_Pro({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-anonymous-pro",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "0xjei",
    template: "0xjei | %s",
  },
  description: "Applied cryptography engineer | d/acc",
  keywords: [
    "cryptography",
    "zero-knowledge proofs",
    "multi-party computation",
    "confidential computation",
    "fully homomorphic encryption",
    "threshold cryptography",
    "Ethereum",
    "AI",
    "agents",
    "private agents",
    "privacy-preserving agents",
    "confidential agents",
    "solidity",
    "smart contracts",
    "noir",
    "rust",
    "javascript",
    "typescript",
    "privacy",
    "blockchain",
    "private AI",
    "privacy-preserving AI",
    "confidential AI",
    "private computing",
    "privacy-preserving computing",
    "confidential computing",
    "private data",
    "privacy-preserving data",
    "confidential data",
    "private machine learning",
    "privacy-preserving machine learning",
    "confidential machine learning",
    "smart contracts",
    "cypherpunk",
    "programmable cryptography",
    "ZKP",
    "MPC",
    "FHE",
  ],
  authors: [{ name: "Giacomo Corrias" }],
  creator: "Giacomo Corrias",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "0xjei",
    title: "0xjei",
    description: "Applied cryptography engineer | d/acc",
    images: ["/pfp.jpg"],
  },
  twitter: {
    card: "summary",
    title: "0xjei",
    description: "Applied cryptography engineer | d/acc",
    images: ["/pfp.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F5F0" },
    { media: "(prefers-color-scheme: dark)", color: "#101418" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){if(t==='dark')document.documentElement.classList.add('dark')}else{document.documentElement.classList.add('dark')}})()`,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
      </head>
      <body className={`${anonymousPro.variable} ${outfit.variable} antialiased`}>
        <ThemeProvider>
          <LoadingProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background"
            >
              Skip to main content
            </a>
            <SiteLayout>{children}</SiteLayout>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
