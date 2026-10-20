import type { Metadata } from "next"
import { Download } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"
import { JsonLd } from "@/components/json-ld"
import { pageMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = pageMetadata({
  title: "Career",
  description: "Where I've been and what I built.",
  path: "/career",
  openGraph: { type: "profile" },
})

type Entry = {
  title: string
  organization: string
  location?: string
  start: string
  // null means the entry is ongoing
  end: string | null
  summary?: string
  highlights?: string[]
}

const experience: Entry[] = [
  {
    title: "Senior Software Analyst",
    organization: "Instituto de Pesquisas Eldorado",
    location: "Campinas, SP, Brazil",
    start: "2022-06",
    end: null,
    summary: "Embedded full-time with Motorola Mobility, troubleshooting mobile network and modem issues on Motorola smartphones running Qualcomm and MediaTek platforms.",
    highlights: [
      "Analyzed 2,000+ complex network, modem, and Baseband Processor (BP) issues across 10+ Motorola devices, supporting North America and rest-of-world markets.",
      "Diagnosed issues across the full protocol stack and multiple technology domains using Qualcomm (QCAT, QXDM) and MediaTek (NLT, ELT) log analysis tools to resolve interoperability problems and meet carrier requirements.",
      "Built Python tooling and Gemini CLI-based skills to automate recurring log analysis and verification workflows, removing manual bottlenecks for the engineering team.",
    ],
  },
  {
    title: "Systems Specialist II",
    organization: "Instituto Nacional de Telecomunicações — Inatel",
    location: "Santa Rita do Sapucaí, MG, Brazil",
    start: "2021-10",
    end: "2022-06",
    summary: "Delivered mobile network training and 5G consulting at Inatel.",
    highlights: [
      "Delivered training on 5G protocols, signaling analysis, network planning and deployment, troubleshooting and optimization, and core/network virtualization (SDN, NFV) to engineers at Brazilian carriers (Vivo, TIM, Claro) and other companies, on behalf of Inatel, Huawei, and Ericsson.",
      "Acted as a 5G consultant, supporting new projects and addressing customer requirements.",
    ],
  },
  {
    title: "Systems Specialist I",
    organization: "Instituto Nacional de Telecomunicações — Inatel",
    location: "Santa Rita do Sapucaí, MG, Brazil",
    start: "2018-07",
    end: "2021-10",
    summary: "Specialist in mobile communications for the Inatel/Ericsson project.",
    highlights: [
      "Performed consistency checks and activation of new GSM/UMTS/LTE sites for TIM and Vivo, including RAN sharing configuration.",
      "Monitored network statistics and KPIs, and performed alarm detection and logical parameter tuning/optimization for LTE sites.",
      "Built process automation tools in Excel/VBA and Python to support daily site activation and monitoring workflows.",
    ],
  },
]

const education: Entry[] = [
  {
    title: "MBA, Data Science and Analytics",
    organization: "USP/Esalq",
    start: "2025",
    end: "2026",
  },
  {
    title: "Telecommunications Engineering",
    organization: "Instituto Nacional de Telecomunicações — Inatel",
    start: "2013",
    end: "2017",
  },
]

// Education entries only carry a year, so a four-digit value is shown as is.
function formatDate(value: string) {
  if (value.length === 4) {
    return value
  }
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <ol className="relative">
      <span aria-hidden className="absolute inset-y-2 left-1.5 w-px bg-border sm:left-49.5" />
      {entries.map(({ title, organization, location, start, end, summary, highlights }) => (
        <li
          key={`${title}-${start}`}
          className="relative grid pb-10 pl-6 last:pb-0 sm:grid-cols-[12rem_1fr] sm:pl-0"
        >
          <span
            aria-hidden
            className="absolute left-0 z-10 border rounded-full top-2 size-3 border-muted-foreground bg-background sm:left-48"
          />
          <p className="font-mono text-sm tabular-nums text-muted-foreground sm:sticky sm:top-20 sm:self-start sm:pt-1 sm:pr-4">
            <time dateTime={start}>
              {formatDate(start)}
            </time>
            {" — "}
            {end === null ? "Present" : (
              <time dateTime={end}>
                {formatDate(end)}
              </time>
            )}
          </p>
          <div className="mt-1 sm:mt-0 sm:pl-8">
            <h3 className="text-lg font-medium tracking-tight">
              {title}
            </h3>
            <p className="mt-1 max-w-prose text-muted-foreground">
              {organization}
              {location && ` · ${location}`}
            </p>
            {(summary || highlights) && (
              <div className="mt-3 prose prose-neutral dark:prose-invert *:first:mt-0 *:last:mb-0">
                {summary && <p>{summary}</p>}
                {highlights && (
                  <ul>
                    {highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function Page() {
  const current = experience.find((entry) => entry.end === null)

  return (
    <div className="py-8">
      {/* Same @id as the layout's Person, so search engines merge these fields into it */}
      <JsonLd
        data={{
          "@type": "ProfilePage",
          url: `${siteConfig.url}/career`,
          mainEntity: {
            "@id": siteConfig.personId,
            jobTitle: current?.title,
            worksFor: current && {
              "@type": "Organization",
              name: current.organization
            },
            alumniOf: education.map((entry) => ({
              "@type": "EducationalOrganization",
              name: entry.organization,
            })),
          },
        }}
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Career
          </h1>
          <p className="mt-2 text-muted-foreground">
            Where I&apos;ve been and what I built.
          </p>
        </div>
        <a
          href="/resume.pdf"
          download="resume.pdf"
          className={cn(buttonVariants({ variant: "outline" }), "sm:shrink-0")}
        >
          <Download aria-hidden />
          Download Resume (PDF)
        </a>
      </div>

      <section className="pt-8 mt-8 border-t">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">
          Experience
        </h2>
        <Timeline entries={experience} />
      </section>

      <section className="pt-8 mt-8 border-t">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">
          Education
        </h2>
        <Timeline entries={education} />
      </section>
    </div>
  )
}
