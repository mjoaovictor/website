import type { Metadata } from "next";
import Link from "next/link";
import { NrArfcnCalculator } from "@/app/components/nr-arfcn-calculator";

const UPDATES = [
  {
    date: "2025-11-23",
    description: "Update to 3GPP TS 38.104 V19.2.0 (2025-09).",
  },
] as const;

// JSON-LD for SEO authority (E-E-A-T)
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "5G NR-ARFCN Calculator",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    author: {
      "@type": "Person",
      name: "João Victor Menino E Silva"
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "Convert between NR-ARFCN and Frequency (MHz) based on 3GPP TS 38.104.",
  };

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
    url: "https://mjoaovictor.dev/tools/5g-nr-arfcn-calculator",
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
          5G NR-ARFCN Calculator
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Convert between NR-ARFCN and Frequency (MHz) based on 3GPP TS 38.104.
        </p>
      </div>
      <NrArfcnCalculator />

      <div className="mt-4 text-sm">
        <Link
          href="/blog/frequency-raster"
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
