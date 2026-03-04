My personal space on the web - you can find everything related to my professional sphere in here.

## Stack

- **[Next.js](https://nextjs.org)** (App Router) — file-based routing, RSC, static generation
- **[React](https://react.dev/)** - js library for the frontend
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first styling with CSS-native config
- **[MDX](https://mdxjs.com)** via `next-mdx-remote` — content authored in Markdown with math support (KaTeX)
- **[Bun](https://bun.sh)** — package manager and runtime
- **[Shadcn](https://ui.shadcn.com)** - components
- **[Vercel](https://vercel.com)** - deployment

## Privacy

- I do not retain any data, analytics, tracking, databases, CMS - nothing.
- The share buttons open external websites when you click them. These are user-initiated actions and we do not track when or if you share content!
- All content lives in `contents/` as `.mdx` files.
- Fonts are self-hosted at build time via `next/font/google` - no requests are made to external font services.
- A set of HTTP security headers locks down the surface area for most attacks. Notably, the Permissions‑Policy disables client‑side APIs that could expose user data (geolocation, microphone, camera, interest‑cohort, browsing‑topics). Additional hardening includes CSP, X‑Frame‑Options, Referrer‑Policy, and related headers. For technical readers, you can inspect the local [next.config](./next.config.ts) file.

## Dev

```bash
bun install
bun run build
bun dev
bun lint --fix
bun format --fix
```

## License

- The website’s source code is released under the [MIT License](./LICENSE.md).
- All website’s writings / logbooks are released under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
