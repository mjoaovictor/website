import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const LINKS = [
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/mjoaovictor",
  },
  {
    label: "github",
    href: "https://github.com/mjoaovictor",
  },
] as const;

const LATEST_POSTS_COUNT = 3;

const LINK_STYLE = "text-neutral-900 hover:underline hover:underline-offset-4 dark:text-neutral-100";

export default async function Page() {
  const posts = (await getAllPosts()).slice(0, LATEST_POSTS_COUNT);

  return (
    <div className="space-y-16">
      <section className="space-y-4">
        {/* text-balance: evens out line lengths so the headline does not end on a short line. */}
        <h1 className="text-balance font-semibold text-3xl leading-[1.2] sm:text-4xl">
          Hey, I’m João! I&nbsp;<span className="marker-sweep">automate</span> and{" "}
          <span className="marker-sweep">explain</span>{" "}
          Telecom Engineering.
        </h1>
        {/* max-w-prose: caps lines at 65ch for readability.
            text-pretty: avoids a lone word on the last line. */}
        <p className="leading-[1.8] max-w-prose text-pretty text-neutral-600 dark:text-neutral-400">
          I’m a Senior Software Analyst at the Eldorado Research Institute. This site is my playground for tools, automation, and whatever I'm learning next.
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="tools-heading" className="text-sm font-medium">
          Tools
        </h2>
        <ul className="space-y-4">
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href} className={LINK_STYLE}>
                {tool.label}
              </Link>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {tool.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="posts-heading" className="space-y-4">
        <h2 id="posts-heading" className="text-sm font-medium">
          Latest Posts
        </h2>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className={LINK_STYLE}>
                {post.title}
              </Link>
              <time
                dateTime={post.date.toISOString()}
                className="block mt-1 text-sm text-neutral-600 dark:text-neutral-400"
              >
                {post.date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </time>
            </li>
          ))}
        </ul>
      </section>

      <ul className="flex gap-4 text-sm text-neutral-600 dark:text-neutral-400">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a
              className="inline-flex items-center gap-1 group hover:text-neutral-900 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href={link.href}
            >
              {link.label}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
