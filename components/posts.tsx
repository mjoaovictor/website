import Link from "next/link";
import { getPosts } from "@/lib/blog";

export function BlogPosts() {
	const posts = getPosts().sort((a, b) =>
		b.metadata.publishedAt.localeCompare(a.metadata.publishedAt),
	);

	return (
		<ul className="list-disc space-y-3 pl-5">
			{posts.map((post) => (
					<li key={post.slug} className="marker:text-neutral-400">
						<Link
							href={`/blog/${post.slug}`}
							className="text-neutral-600 hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:text-neutral-400 dark:hover:text-neutral-100"
						>
							{post.metadata.title}
						</Link>
					</li>
				))}
		</ul>
	);
}
