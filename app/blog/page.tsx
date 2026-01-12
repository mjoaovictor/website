import type { Metadata } from "next";
import { BlogPosts } from "@/components/posts";

// JSON-LD: Semantic SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  headline: "Blog by mjoaovictor",
  description: "Texts exploring telecommunications, software development, and more.",
  url: "https://mjoaovictor.dev/blog",
  author: {
    "@type": "Person",
    name: "João Victor Menino E Silva",
  },
};

export const metadata: Metadata = {
  title: "Blog",
  description: "Texts exploring telecommunications, software development, and more.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | mjoaovictor",
    description: "Texts exploring telecommunications, software development, and more.",
    url: "/blog",
    type: "website",
  },
};

export default function Page() {
  return (
    <section className="space-y-8">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: true
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="font-semibold text-2xl tracking-tighter">
        Blog
      </h1>

      <BlogPosts />
    </section>
  );
}
