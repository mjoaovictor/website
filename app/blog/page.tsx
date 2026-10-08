import type { Metadata } from "next";
import { BlogPosts } from "@/components/posts";
import { siteConfig } from "@/lib/site-config";

const DESCRIPTION = "Texts exploring telecommunications, software development, and more.";

// JSON-LD: Semantic SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  headline: "Blog by mjoaovictor",
  description: DESCRIPTION,
  url: `${siteConfig.url}/blog`,
  author: {
    "@type": "Person",
    name: siteConfig.author.fullName,
  },
};

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | mjoaovictor",
    description: DESCRIPTION,
    url: "/blog",
    type: "website",
  },
};

export default function Page() {
  return (
    <section className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="font-semibold text-2xl tracking-tighter">
        Blog
      </h1>

      <BlogPosts />
    </section>
  );
}
