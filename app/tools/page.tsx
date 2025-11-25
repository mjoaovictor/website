import Link from "next/link";
import type { Metadata } from "next";

const TOOLS = [
  {
    label: "5G NR-ARFCN Calculator",
    href: "/tools/5g-nr-arfcn-calculator",
    description: "Convert between NR-ARFCN and Frequency (MHz) based on 3GPP TS 38.104.",
  },
] as const;

// JSON-LD for SEO authority (E-E-A-T)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: TOOLS.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.label,
    description: tool.description,
    url: `https://mjoaovictor.dev${tool.href}`,
  })),
};

export const metadata: Metadata = {
  title: "Tools",
  description: "Useful tools for telecommunications and software development.",
  alternates: {
    canonical: "https://mjoaovictor.dev/tools"
  },
  openGraph: {
    title: "Tools | mjoaovictor",
    description: "Useful tools for telecommunications and software development.",
    url: "https://mjoaovictor.dev/tools",
    type: "website",
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
        <h1 className="text-2xl font-semibold tracking-tighter">
          Tools
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Explore utilities for telecommunications and software development.
        </p>
      </div>

      <ul className="list-disc space-y-3 pl-5 text-neutral-600 dark:text-neutral-400">
        {TOOLS.map((tool) => (
          <li key={tool.href} className="marker:text-neutral-400">
            <Link
              className="underline decoration-neutral-300 decoration-1 underline-offset-4 hover:text-neutral-900 hover:decoration-neutral-600 dark:decoration-neutral-700 dark:hover:text-neutral-100 dark:hover:decoration-neutral-400"
              href={tool.href}
            >
              {tool.label}
            </Link>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {tool.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
