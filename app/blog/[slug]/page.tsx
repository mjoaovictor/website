import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { JsonLd } from "@/components/json-ld"
import { SharePost } from "@/components/share-post"
import { getAllSlugs, getPost } from "@/lib/blog"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"
import "katex/dist/katex.min.css"

type Props = { params: Promise<{ slug: string }> }

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const { meta, Content } = post
  const url = `${siteConfig.url}/blog/${slug}`

  return (
    <article className="py-8">
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: meta.title,
              description: meta.description,
              datePublished: meta.date.toISOString(),
              dateModified: meta.date.toISOString(),
              url,
              mainEntityOfPage: url,
              author: { "@id": siteConfig.personId },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteConfig.url
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: `${siteConfig.url}/blog`
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: meta.title,
                  item: url
                },
              ],
            },
          ],
        }}
      />
      <Link
        href="/blog"
        className="text-sm text-muted-foreground underline-offset-6 hover:text-foreground hover:underline"
      >
        &larr; Blog
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance">
        {meta.title}
      </h1>
      <p className="mt-3 max-w-prose text-muted-foreground">
        {meta.description}
      </p>
      <time
        dateTime={meta.date.toISOString()}
        className="block mt-3 font-mono text-sm text-muted-foreground"
      >
        {meta.date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          timeZone: "UTC",
        })}
      </time>

      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none border-t pt-8 *:first:mt-0">
        <Content />
      </div>
      <SharePost title={meta.title} url={url} className="mt-8" />
    </article>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {}
  }

  return pageMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${slug}`,
    openGraph: {
      type: "article",
      publishedTime: post.meta.date.toISOString(),
      images: [`/blog/${slug}/opengraph-image`],
    },
  })
}

export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }))
}

export const dynamicParams = false
