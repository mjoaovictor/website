import { getPosts } from "@/lib/blog";
import Link from "next/link";

export function BlogPosts() {
  const allPosts = getPosts();

  return (
    <ul className="list-disc space-y-3 pl-5 text-neutral-600 dark:text-neutral-400">
      {allPosts
        .sort((a, b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt))
        .map((post) => (
          <li key={post.slug} className="marker:text-neutral-400">
            <Link
              className="underline decoration-neutral-300 decoration-1 underline-offset-4 hover:text-neutral-900 hover:decoration-neutral-600 dark:decoration-neutral-700 dark:hover:text-neutral-100 dark:hover:decoration-neutral-400"
              href={`/blog/${post.slug}`}
            >
              {post.metadata.title}
            </Link>
          </li>
        ))}
    </ul>
  );
}
