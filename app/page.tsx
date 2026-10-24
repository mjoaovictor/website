import type { Metadata } from "next"
import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { tools } from "@/lib/tools"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

const LATEST_POST_COUNT = 3

const rowLinkClass = "text-lg font-medium tracking-tight underline-offset-6 after:absolute after:inset-0 hover:underline"

function Section({
  title,
  href,
  linkLabel,
  children,
}: {
  title: string
  href: string
  linkLabel: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-4 border-t py-8 sm:grid-cols-[8rem_1fr]">
      <h2 className="font-mono text-sm text-muted-foreground sm:pt-1.5">
        {title}
      </h2>
      <div>
        {children}
        <Link
          href={href}
          className="inline-block mt-6 text-sm underline text-muted-foreground underline-offset-4 decoration-border hover:text-foreground hover:decoration-foreground"
        >
          {linkLabel}
        </Link>
      </div>
    </section>
  )
}

export default async function Page() {
  const posts = (await getAllPosts()).slice(0, LATEST_POST_COUNT)

  return (
    <div className="py-8 sm:py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Hi, I&apos;m João. I&nbsp;automate and explain Telecom Engineering.
      </h1>
      <p className="mt-6 mb-16 text-lg max-w-prose text-muted-foreground">
        This site is my playground for tools, automation, and whatever I&apos;m learning next.
      </p>

      <Section title="Tools" href="/tools" linkLabel="All Tools">
        <ul className="flex flex-col gap-8">
          {tools.map(({ href, title, description }) => (
            <li key={href} className="relative">
              <Link href={href} className={rowLinkClass}>
                {title}
              </Link>
              <p className="mt-1 max-w-prose text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {posts.length > 0 && (
        <Section title="Blog" href="/blog" linkLabel="All Posts">
          <ul className="flex flex-col gap-8">
            {posts.map(({ slug, title, description, date }) => (
              <li key={slug} className="relative">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <Link href={`/blog/${slug}`} className={rowLinkClass}>
                    {title}
                  </Link>
                  <time
                    dateTime={date.toISOString()}
                    className="font-mono text-sm shrink-0 text-muted-foreground"
                  >
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </time>
                </div>
                <p className="mt-1 max-w-prose text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  )
}
