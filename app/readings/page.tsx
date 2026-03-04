import { SectionHeading } from "@/components/section-heading"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Readings",
  description: "Books, papers, and essays that have shaped how I think and see the world.",
}

type MaterialItem = { title: string; author?: string; href?: string }

const sections: { title: string; items: MaterialItem[] }[] = [
  {
    title: "Cryptography & Math",
    items: [
      {
        title: "The Code Book",
        author: "Simon Singh",
        href: "https://simonsingh.net/books/the-code-book/",
      },
      {
        title: "Real-World Cryptography",
        author: "David Wong",
        href: "https://www.manning.com/books/real-world-cryptography",
      },
      {
        title: "A Programmer's Introduction to Mathematics",
        author: "Jeremy Kun",
        href: "https://pimbook.org/",
      },
    ],
  },
  {
    title: "Software Engineering",
    items: [
      {
        title: "Effective Rust",
        author: "David Drysdale",
        href: "https://www.lurklurk.org/effective-rust/",
      },
      {
        title: "The Pragmatic Programmer",
        author: "Hunt & Thomas",
        href: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/",
      },
      {
        title: "The Rust Programming Language",
        author: "Klabnik, Nichols & Krycho",
        href: "https://doc.rust-lang.org/book/",
      },
      {
        title: "Mastering Ethereum",
        author: "Antonopoulos, Wood et al.",
        href: "https://github.com/ethereumbook/ethereumbook",
      },
      {
        title: "Don't Make Me Think",
        author: "Steve Krug",
        href: "https://www.goodreads.com/book/show/18197267-don-t-make-me-think-revisited",
      },
    ],
  },
  {
    title: "Manifestos & Papers",
    items: [
      {
        title: "A Cypherpunk's Manifesto",
        author: "Eric Hughes",
        href: "https://www.activism.net/cypherpunk/manifesto.html",
      },
      {
        title: "The God Protocols",
        author: "Nick Szabo",
        href: "https://nakamotoinstitute.org/library/the-god-protocols/",
      },
      {
        title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
        author: "Satoshi Nakamoto",
        href: "https://bitcoin.org/bitcoin.pdf",
      },
      {
        title: "Ethereum Whitepaper",
        author: "Vitalik Buterin",
        href: "https://ethereum.org/whitepaper/",
      },
    ],
  },
  {
    title: "Misc",
    items: [
      {
        title: "Geopolitica dell'intelligenza artificiale",
        author: "Alessandro Aresu",
        href: "https://www.feltrinellieditore.it/opera/geopolitica-dellintelligenza-artificiale/",
      },
      {
        title: "The Creative Act",
        author: "Rick Rubin",
        href: "https://www.penguinrandomhouse.com/books/717356/the-creative-act-by-rick-rubin/",
      },
      {
        title: "21 Lessons for the 21st Century",
        author: "Yuval Noah Harari",
        href: "https://www.ynharari.com/book/21-lessons-book/",
      },
      {
        title: "Nexus",
        author: "Yuval Noah Harari",
        href: "https://www.ynharari.com/book/nexus/",
      },
      {
        title: "Farewell to Westphalia",
        author: "Ludlow & Hope",
        href: "https://logos.co/farewell-to-westphalia",
      },
      {
        title: "The Age of Surveillance Capitalism",
        author: "Shoshana Zuboff",
        href: "https://www.hachettebookgroup.com/titles/shoshana-zuboff/the-age-of-surveillance-capitalism/9781610395694/",
      },
      {
        title: "The Power of Habit",
        author: "Charles Duhigg",
        href: "https://en.wikipedia.org/wiki/The_Power_of_Habit",
      },
      {
        title: "Building a Second Brain",
        author: "Tiago Forte",
        href: "https://www.buildingasecondbrain.com/book",
      },
    ],
  },
  {
    title: "Science Fiction",
    items: [
      {
        title: "Foundation",
        author: "Isaac Asimov",
        href: "https://en.wikipedia.org/wiki/Foundation_(Asimov_novel)",
      },
      {
        title: "Ubik",
        author: "Philip K. Dick",
        href: "https://en.wikipedia.org/wiki/Ubik",
      },
      {
        title: "Do Androids Dream of Electric Sheep?",
        author: "Philip K. Dick",
        href: "https://en.wikipedia.org/wiki/Do_Androids_Dream_of_Electric_Sheep%3F",
      },
      {
        title: "The Man in the High Castle",
        author: "Philip K. Dick",
        href: "https://en.wikipedia.org/wiki/The_Man_in_the_High_Castle",
      },
      {
        title: "Cryptonomicon",
        author: "Neal Stephenson",
        href: "https://en.wikipedia.org/wiki/Cryptonomicon",
      },
      {
        title: "Brave New World",
        author: "Aldous Huxley",
        href: "https://en.wikipedia.org/wiki/Brave_New_World",
      },
      {
        title: "Nineteen Eighty-Four",
        author: "George Orwell",
        href: "https://en.wikipedia.org/wiki/Nineteen_Eighty-Four",
      },
    ],
  },
]

export default function Readings() {
  return (
    <div className="space-y-10 stagger">
      <p className="text-sm font-mono text-muted-foreground italic">
        Books, papers, and essays that have shaped how I think and see the world.
      </p>

      {sections.map(section => (
        <section key={section.title} className="space-y-4">
          <SectionHeading>{section.title}</SectionHeading>
          {section.items.length === 0 ? (
            <p className="text-sm font-mono text-muted-foreground">Coming soon.</p>
          ) : (
            <ul className="space-y-3">
              {section.items.map(item => (
                <li key={item.title} className="flex items-baseline gap-2">
                  {item.author && (
                    <span className="text-xs font-mono text-muted-foreground shrink-0">
                      [{item.author}]
                    </span>
                  )}
                  {item.href ? (
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono text-foreground/80 hover:text-foreground hover:font-bold transition-colors"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span className="text-sm font-mono text-foreground/80">{item.title}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}
