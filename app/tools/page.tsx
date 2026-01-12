import type { Metadata } from "next";
import Link from "next/link";

const TOOLS = [
  {
    label: "5G NR-ARFCN Calculator",
    href: "/tools/5g-nr-arfcn-calculator",
    description: "Convert between NR-ARFCN and Frequency (MHz) based on 3GPP TS 38.104.",
  },
] as const;

// JSON-LD: Semantic SEO
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
    canonical: "/tools"
  },
  openGraph: {
    title: "Tools | mjoaovictor",
    description: "Useful tools for telecommunications and software development.",
    url: "/tools",
    type: "website",
  },
};

export default function Page() {
  return (
    <section className="space-y-8">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: true
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="font-semibold text-2xl tracking-tighter">
        Tools
      </h1>

      <ul className="list-disc space-y-3 pl-5">
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
