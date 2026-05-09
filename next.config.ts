import type { NextConfig } from "next"

const isDev = process.env.NODE_ENV === "development"

const nextConfig: NextConfig = {
  // Enable React strict mode for highlighting potential problems
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/logbook",
        destination: "/writings?tags=logbook",
        permanent: true,
      },
      {
        source: "/logbook/:slug",
        destination: "/writings/:slug",
        permanent: true,
      },
      {
        source: "/writings/tag/zkp",
        destination: "/writings?tags=cryptography",
        permanent: true,
      },
      {
        source: "/writings/tag/mpc",
        destination: "/writings?tags=cryptography",
        permanent: true,
      },
      {
        source: "/writings/tag/fhe",
        destination: "/writings?tags=cryptography",
        permanent: true,
      },
      {
        source: "/writings/tag/infrastructure",
        destination: "/writings?tags=engineering",
        permanent: true,
      },
      {
        source: "/writings/tag/library",
        destination: "/writings",
        permanent: true,
      },
      {
        source: "/writings/tag/llm",
        destination: "/writings?tags=ai",
        permanent: true,
      },
      {
        source: "/writings/tag/software",
        destination: "/writings?tags=engineering",
        permanent: true,
      },
    ]
  },

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "Permissions-Policy",
            value: [
              "geolocation=()",
              "microphone=()",
              "camera=()",
              "interest-cohort=()",
              "browsing-topics=()",
            ].join(", "),
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: https://img.youtube.com",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ]
  },
}

export default nextConfig
