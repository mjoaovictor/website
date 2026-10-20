import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { LinkBudgetCalculator } from "@/components/link-budget-calculator";
import { pageMetadata } from "@/lib/seo";

const UPDATES = [
  {
    date: "2026-07-05",
    description: "Initial Release.",
  },
] as const;

const TITLE = "5G Link Budget Calculator";
const DESCRIPTION = "Calculate 5G NR Link Budget and maximum cell range based on 3GPP TR 38.901.";

const PATH = "/tools/link-budget-calculator";
const url = `${siteConfig.url}${PATH}`;

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function Page() {
  return (
    <section>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "WebApplication",
              name: TITLE,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript",
              author: { "@id": siteConfig.personId },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description: DESCRIPTION,
              url,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteConfig.url
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Tools",
                  item: `${siteConfig.url}/tools`
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: TITLE,
                  item: url
                },
              ],
            },
          ],
        }}
      />
      <div className="mb-8 space-y-2">
        <h1 className="font-semibold text-2xl tracking-tighter">
          {TITLE}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          {DESCRIPTION}
        </p>
      </div>
      <LinkBudgetCalculator />

      <div className="mt-4 flex flex-col gap-2 text-sm">
        <Link
          href="/blog/5g-link-budget"
          className="text-neutral-600 underline decoration-1 decoration-neutral-300 underline-offset-4 hover:text-neutral-900 hover:decoration-neutral-600 dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-neutral-100 dark:hover:decoration-neutral-400"
        >
          How does the calculation work?
        </Link>
        <Link
          href="/tools/5g-nr-arfcn-calculator"
          className="text-neutral-600 underline decoration-1 decoration-neutral-300 underline-offset-4 hover:text-neutral-900 hover:decoration-neutral-600 dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-neutral-100 dark:hover:decoration-neutral-400"
        >
          Find a valid center frequency with the NR-ARFCN Calculator →
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
