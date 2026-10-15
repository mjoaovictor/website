import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { formatDate, getPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";
import { TOOLS } from "@/lib/tools";

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

// JSON-LD: Semantic SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "João Victor",
  url: siteConfig.url,
  publisher: {
    "@id": siteConfig.personId,
  },
};

export default function Page() {
  const posts = getPosts()
    .sort((a, b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt))
    .slice(0, LATEST_POSTS_COUNT);

  return (
    <div className="space-y-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="space-y-4">
        <h1 className="text-balance font-semibold text-3xl leading-[1.2] tracking-[-0.04em] sm:text-4xl">
          Hey, I’m João! I&nbsp;<span className="marker-sweep">automate</span> and{" "}
          <span className="marker-sweep [animation-delay:450ms]">explain</span>{" "}
          Telecom Engineering.
        </h1>
        <p className="max-w-prose text-pretty leading-relaxed text-neutral-600 dark:text-neutral-400">
          Senior Software Analyst at the Eldorado Research Institute and former
          5G instructor at Inatel. Focused on 4G/5G, automation, and applied
          software engineering.
        </p>
      </section>

      <section aria-labelledby="tools-heading" className="space-y-4">
        <h2 id="tools-heading" className="font-medium text-sm">
          Tools
        </h2>
        <ul className="space-y-4">
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href} className={LINK_STYLE}>
                {tool.label}
              </Link>
              <p className="mt-1 text-neutral-600 text-sm dark:text-neutral-400">
                {tool.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="posts-heading" className="space-y-4">
        <h2 id="posts-heading" className="font-medium text-sm">
          Latest posts
        </h2>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className={LINK_STYLE}>
                {post.metadata.title}
              </Link>
              <p className="mt-1 text-neutral-600 text-sm dark:text-neutral-400">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <ul className="flex gap-4 text-neutral-600 text-sm dark:text-neutral-400">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a
              className="group inline-flex items-center gap-1 hover:text-neutral-900 dark:hover:text-neutral-100"
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
