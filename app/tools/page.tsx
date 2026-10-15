import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { TOOLS } from "@/lib/tools";

const DESCRIPTION = "Useful tools for telecommunications and software development.";

// JSON-LD: Semantic SEO
const jsonLd = {
	"@context": "https://schema.org",
	"@type": "ItemList",
	itemListElement: TOOLS.map((tool, index) => ({
		"@type": "ListItem",
		position: index + 1,
		name: tool.label,
		description: tool.description,
		url: `${siteConfig.url}${tool.href}`,
	})),
};

export const metadata: Metadata = {
	title: "Tools",
	description: DESCRIPTION,
	alternates: {
		canonical: "/tools",
	},
	openGraph: {
		title: "Tools | mjoaovictor",
		description: DESCRIPTION,
		url: "/tools",
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
				Tools
			</h1>

			<ul className="list-disc space-y-4 pl-5">
				{TOOLS.map((tool) => (
					<li key={tool.href} className="marker:text-neutral-400">
						<Link
							href={tool.href}
							className="text-neutral-600 hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:text-neutral-400 dark:hover:text-neutral-100"
						>
							{tool.label}
						</Link>
						<p className="mt-1 text-neutral-600 text-sm dark:text-neutral-400">
							{tool.description}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
