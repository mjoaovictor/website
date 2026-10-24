import type { Metadata } from "next"
import Link from "next/link"
import { NrArfcnCalculator } from "@/components/nr-arfcn-calculator"
import { JsonLd } from "@/components/json-ld"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

const title = "NR-ARFCN Calculator"
const description = "Convert between NR-ARFCN and Frequency (MHz) based on 3GPP TS 38.104."
const path = "/tools/5g-nr-arfcn-calculator"
const url = `${siteConfig.url}${path}`

export const metadata: Metadata = pageMetadata({ title, description, path })

export default async function Page({ searchParams }: PageProps<"/tools/5g-nr-arfcn-calculator">) {
  const { arfcn } = await searchParams

  return (
    <div className="py-8">
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "WebApplication",
              name: title,
              description,
              url,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              author: { "@id": siteConfig.personId },
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
                  name: title,
                  item: url
                },
              ],
            },
          ],
        }}
      />
      <Link
        href="/tools"
        className="text-sm text-muted-foreground underline-offset-6 hover:text-foreground hover:underline"
      >
        &larr; Tools
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-2 max-w-prose text-muted-foreground">
        {description}
      </p>
      <NrArfcnCalculator initialArfcn={typeof arfcn === "string" ? arfcn : "620000"} />
      <div className="mt-4 flex flex-col gap-2 text-sm">
        <Link
          href="/blog/frequency-raster"
          className="text-muted-foreground underline underline-offset-4 decoration-border hover:text-foreground hover:decoration-foreground"
        >
          How does the calculation work?
        </Link>
      </div>
    </div>
  )
}
