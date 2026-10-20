import type { Metadata } from "next"
import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "Notes on telecommunications, tools and whatever I'm learning.",
  path: "/blog",
})

export default async function Page() {
  const posts = await getAllPosts()
  // Map.groupBy keeps insertion order, so years stay newest-first (integer-keyed objects would sort ascending).
  const postsByYear = Map.groupBy(posts, ({ date }) => date.getUTCFullYear())

  return (
    <div className="py-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Blog
      </h1>
      <p className="mt-2 text-muted-foreground">
        Notes on telecommunications, tools and whatever I&apos;m learning.
      </p>

      {posts.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="mt-8">
          {[...postsByYear].map(([year, yearPosts]) => (
            <section
              key={year}
              className="grid gap-4 border-t py-8 sm:grid-cols-[8rem_1fr]"
            >
              <h2 className="font-mono text-3xl font-light tracking-tighter text-muted-foreground sm:sticky sm:top-20 sm:self-start">
                {year}
              </h2>
              <ul className="flex flex-col gap-8">
                {yearPosts.map(({ slug, title, description, date }) => (
                  <li key={slug} className="relative">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-lg font-medium tracking-tight underline-offset-6 after:absolute after:inset-0 hover:underline"
                      >
                        {title}
                      </Link>
                      <time
                        dateTime={date.toISOString()}
                        className="font-mono text-sm shrink-0 tabular-nums text-muted-foreground"
                      >
                        {date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
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
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
