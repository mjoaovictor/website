import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { formatDate, getPosts } from "@/lib/blog";

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

	const ogImage = image ? image : `/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		alternates: {
			canonical: `/blog/${post.slug}`,
		},
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `/blog/${post.slug}`,
			images: [{ url: ogImage }],
			authors: ["João Victor"],
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

	const baseUrl = "https://mjoaovictor.dev";
	const postUrl = `${baseUrl}/blog/${post.slug}`;

	const jsonLd = [
		{
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: post.metadata.title,
			datePublished: post.metadata.publishedAt,
			dateModified: post.metadata.publishedAt,
			description: post.metadata.summary,
			image: post.metadata.image
				? `${baseUrl}${post.metadata.image}`
				: `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
			url: postUrl,
			mainEntityOfPage: {
				"@type": "WebPage",
				"@id": postUrl,
			},
			author: {
				"@type": "Person",
				name: "João Victor Menino E Silva",
				url: baseUrl,
			},
		},
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: baseUrl,
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "Blog",
					item: `${baseUrl}/blog`,
				},
				{
					"@type": "ListItem",
					position: 3,
					name: post.metadata.title,
					item: postUrl,
				},
			],
		},
	];

	return (
		<section className="space-y-8">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: true
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<div className="space-y-1">
				<h1 className="font-semibold text-2xl tracking-tighter">
					{post.metadata.title}
				</h1>
				<p className="text-neutral-600 text-sm dark:text-neutral-400">
					{formatDate(post.metadata.publishedAt)}
				</p>
			</div>
			<article className="prose prose-neutral dark:prose-invert">
				<CustomMDX source={post.content} />
			</article>
		</section>
	);
}
