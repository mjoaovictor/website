import type { Metadata } from "next";
import { LinkBudgetCalculator } from "@/app/components/link-budget-calculator";

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
};

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
	},
};

export default function Page() {
	return (
		<section>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: true
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
		</section>
	);
}
