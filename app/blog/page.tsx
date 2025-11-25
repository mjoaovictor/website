import { BlogPosts } from "../components/posts";
import type { Metadata } from "next";

// JSON-LD for SEO authority (E-E-A-T)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  headline: "Blog by mjoaovictor",
  description: "Articles exploring telecommunications, software development, and more.",
  url: "https://mjoaovictor.dev/blog",
  author: {
    "@type": "Person",
    name: "João Victor Menino E Silva",
  },
};

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on telecommunications and software development.",
  alternates: {
    canonical: "https://mjoaovictor.dev/blog",
  },
  openGraph: {
    title: "Blog | mjoaovictor",
    description: "Read my thoughts on telecommunications and software development.",
    url: "https://mjoaovictor.dev/blog",
    type: "website",
  },
};

export default function Page() {
  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tighter">
          Blog
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Read my thoughts on telecommunications and software development.
        </p>
      </div>

      <BlogPosts />
    </section>
  );
}
