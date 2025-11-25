import { notFound } from "next/navigation";
import { formatDate, getPosts } from "@/lib/blog";
import { CustomMDX } from "@/app/components/mdx";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPosts().find((post) => post.slug === slug);

  if (!post) {
    return {};
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const ogImage = image
    ? `https://mjoaovictor.dev${image}`
    : `https://mjoaovictor.dev/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://mjoaovictor.dev/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://mjoaovictor.dev/blog/${post.slug}`,
      images: [{ url: ogImage }],
      authors: ["João Victor Menino E Silva"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.publishedAt,
    description: post.metadata.summary,
    image: post.metadata.image
      ? `https://mjoaovictor.dev${post.metadata.image}`
      : `https://mjoaovictor.dev/og?title=${encodeURIComponent(post.metadata.title)}`,
    url: `https://mjoaovictor.dev/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mjoaovictor.dev/blog/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: "João Victor Menino E Silva",
      url: "https://mjoaovictor.dev",
    },
    publisher: {
      "@type": "Organization",
      name: "mjoaovictor",
      logo: {
        "@type": "ImageObject",
        url: "https://mjoaovictor.dev/opengraph-image",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mjoaovictor.dev",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://mjoaovictor.dev/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.metadata.title,
        item: `https://mjoaovictor.dev/blog/${post.slug}`,
      },
    ],
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tighter">
          {post.metadata.title}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
