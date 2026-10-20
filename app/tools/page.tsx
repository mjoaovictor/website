import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = pageMetadata({
	title: "Tools",
	description: "Useful tools for telecommunications and software development.",
	path: "/tools",
});

export default function Page() {
	return (
		<section className="space-y-8">
			<JsonLd
				data={{
					"@type": "ItemList",
					itemListElement: TOOLS.map((tool, index) => ({
						"@type": "ListItem",
						position: index + 1,
						name: tool.label,
						description: tool.description,
						url: `${siteConfig.url}${tool.href}`,
					})),
				}}
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
