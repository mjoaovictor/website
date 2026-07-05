import type { Metadata } from "next";
import Link from "next/link";
import { LinkBudgetCalculator } from "@/app/components/link-budget-calculator";

const UPDATES = [
  {
    date: "2026-07-05",
    description: "Initial Release.",
  },
] as const;

// JSON-LD for SEO authority (E-E-A-T)
const jsonLd = {
	"@context": "https://schema.org",
	"@type": "SoftwareApplication",
	name: "5G Link Budget Calculator",
	applicationCategory: "UtilitiesApplication",
	operatingSystem: "Any",
	browserRequirements: "Requires JavaScript",
	author: {
		"@type": "Person",
		name: "João Victor Menino E Silva",
	},
	offers: {
		"@type": "Offer",
		price: "0",
		priceCurrency: "USD",
	},
	description: "Calculate 5G NR Link Budget and maximum cell range based on 3GPP TR 38.901.",
	url: "https://mjoaovictor.dev/tools/link-budget-calculator",
};

const ogImage = `/og?title=${encodeURIComponent("5G Link Budget Calculator")}`;

export const metadata: Metadata = {
	title: "5G Link Budget Calculator",
	description: "Calculate 5G NR Link Budget and maximum cell range based on 3GPP TR 38.901.",
	alternates: {
		canonical: "/tools/link-budget-calculator",
	},
	keywords: [
		"5g nr",
		"link budget calculator",
		"maximum allowable path loss",
		"3gpp tr 38.901",
		"cell range estimation",
		"telecommunications",
	],
	openGraph: {
		title: "5G Link Budget Calculator",
		description: "Calculate 5G NR Link Budget and maximum cell range based on 3GPP TR 38.901.",
		url: "https://mjoaovictor.dev/tools/link-budget-calculator",
		type: "website",
		images: [{ url: ogImage }],
	},
	twitter: {
		card: "summary_large_image",
		title: "5G Link Budget Calculator",
		description: "Calculate 5G NR Link Budget and maximum cell range based on 3GPP TR 38.901.",
		images: [ogImage],
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
				<h1 className="font-semibold text-2xl tracking-tighter">
					5G Link Budget Calculator
				</h1>
				<p className="text-neutral-500 dark:text-neutral-400">
					Calculate 5G NR Link Budget and maximum cell range based on 3GPP TR 38.901.
				</p>
			</div>
			<LinkBudgetCalculator />

			<div className="mt-4 text-sm">
				<Link
					href="/blog/5g-link-budget"
					className="text-neutral-600 underline decoration-1 decoration-neutral-300 underline-offset-4 hover:text-neutral-900 hover:decoration-neutral-600 dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-neutral-100 dark:hover:decoration-neutral-400"
				>
					How does the calculation work?
				</Link>
			</div>

			<div className="mt-12 space-y-2 border-neutral-100 border-t pt-6 dark:border-neutral-800">
			<h2 className="font-medium text-sm">Updates</h2>
			<ul className="space-y-2 text-neutral-500 text-sm dark:text-neutral-400">
			{UPDATES.map((update) => (
				<li key={update.date} className="flex items-start gap-3">
				<span className="mt-0.5 w-24 shrink-0 font-mono text-neutral-400">
					{update.date}
				</span>
				<span>{update.description}</span>
				</li>
			))}
			</ul>
		</div>
		</section>
	);
}
