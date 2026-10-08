import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { NrArfcnCalculator } from "@/components/nr-arfcn-calculator";
import { geistMono } from "@/lib/fonts";

const UPDATES = [
  {
    date: "2025-11-23",
    description: "Update to 3GPP TS 38.104 V19.2.0 (2025-09).",
  },
] as const;

// JSON-LD: Semantic SEO
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "5G NR-ARFCN Calculator",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    author: {
      "@type": "Person",
      name: siteConfig.author.fullName
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "Convert between NR-ARFCN and Frequency (MHz) based on 3GPP TS 38.104.",
    url: `${siteConfig.url}/tools/5g-nr-arfcn-calculator`,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: siteConfig.url,
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "Tools",
					item: `${siteConfig.url}/tools`,
				},
      {
        "@type": "ListItem",
        position: 3,
        name: "5G NR-ARFCN Calculator",
        item: `${siteConfig.url}/tools/5g-nr-arfcn-calculator`,
      },
    ],
  },
];

const ogImage = `/og?title=${encodeURIComponent("5G NR-ARFCN Calculator")}`;

export const metadata: Metadata = {
  title: "5G NR-ARFCN Calculator",
  description: "Convert between NR-ARFCN and Frequency (MHz) based on 3GPP TS 38.104.",
  alternates: {
    canonical: "/tools/5g-nr-arfcn-calculator",
  },
  keywords: [
    "5g nr",
    "nr-arfcn calculator",
    "frequency converter",
    "3gpp ts 38.104",
    "global frequency raster",
    "telecommunications",
  ],
  openGraph: {
    title: "5G NR-ARFCN Calculator",
    description: "Convert between NR-ARFCN and Frequency (MHz) based on 3GPP TS 38.104.",
    url: `${siteConfig.url}/tools/5g-nr-arfcn-calculator`,
    type: "website",
    images: [{ url: ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "5G NR-ARFCN Calculator",
    description: "Convert between NR-ARFCN and Frequency (MHz) based on 3GPP TS 38.104.",
    images: [ogImage],
  },
};

export default function Page() {
  return (
    <section className={geistMono.variable}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tighter">
          5G NR-ARFCN Calculator
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Convert between NR-ARFCN and Frequency (MHz) based on 3GPP TS 38.104.
        </p>
      </div>
      <NrArfcnCalculator />

      <div className="flex flex-col gap-2 mt-4 text-sm">
        <Link
          href="/blog/frequency-raster"
          className="underline text-neutral-600 decoration-1 decoration-neutral-300 underline-offset-4 hover:text-neutral-900 hover:decoration-neutral-600 dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-neutral-100 dark:hover:decoration-neutral-400"
        >
          How does the calculation work?
        </Link>
        <Link
          href="/tools/link-budget-calculator"
          className="underline text-neutral-600 decoration-1 decoration-neutral-300 underline-offset-4 hover:text-neutral-900 hover:decoration-neutral-600 dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-neutral-100 dark:hover:decoration-neutral-400"
        >
          Estimate cell range for this frequency with the Link Budget Calculator →
        </Link>
      </div>

      <div className="pt-6 mt-12 space-y-2 border-t border-neutral-100 dark:border-neutral-800">
        <h2 className="text-sm font-medium">Updates</h2>
        <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
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
