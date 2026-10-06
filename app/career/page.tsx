import type { Metadata } from "next";
import { Briefcase, GraduationCap } from "lucide-react";
import { geistMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const EXPERIENCE = [
  {
    role: "Senior Software Analyst",
    company: "Instituto de Pesquisas Eldorado",
    period: "Jun 2022 — Present",
    location: "Campinas, SP, Brazil",
    description:
      "Embedded full-time with Motorola Mobility, troubleshooting mobile network and modem issues on Motorola smartphones running Qualcomm and MediaTek platforms.",
    highlights: [
      "Analyzed 2,000+ complex network, modem, and Baseband Processor (BP) issues across 10+ Motorola devices, supporting North America and rest-of-world markets.",
      "Diagnosed issues across the full protocol stack and multiple technology domains using Qualcomm (QCAT, QXDM) and MediaTek (NLT, ELT) log analysis tools to resolve interoperability problems and meet carrier requirements.",
      "Built Python tooling and Gemini CLI-based skills to automate recurring log analysis and verification workflows, removing manual bottlenecks for the engineering team.",
    ],
  },
  {
    role: "Systems Specialist II",
    company: "Instituto Nacional de Telecomunicações — Inatel",
    period: "Oct 2021 — Jun 2022",
    location: "Santa Rita do Sapucaí, MG, Brazil",
    description:
      "Delivered mobile network training and 5G consulting at Inatel.",
    highlights: [
      "Delivered training on 5G protocols, signaling analysis, network planning and deployment, troubleshooting and optimization, and core/network virtualization (SDN, NFV) to engineers at Brazilian carriers (Vivo, TIM, Claro) and other companies, on behalf of Inatel, Huawei, and Ericsson.",
      "Acted as a 5G consultant, supporting new projects and addressing customer requirements.",
    ],
  },
  {
    role: "Systems Specialist I",
    company: "Instituto Nacional de Telecomunicações — Inatel",
    period: "Jul 2018 — Oct 2021",
    location: "Santa Rita do Sapucaí, MG, Brazil",
    description:
      "Specialist in mobile communications for the Inatel/Ericsson project.",
    highlights: [
      "Performed consistency checks and activation of new GSM/UMTS/LTE sites for TIM and Vivo, including RAN sharing configuration.",
      "Monitored network statistics and KPIs, and performed alarm detection and logical parameter tuning/optimization for LTE sites.",
      "Built process automation tools in Excel/VBA and Python to support daily site activation and monitoring workflows.",
    ],
  },
] as const;

const EDUCATION = [
  {
    degree: "MBA, Data Science and Analytics",
    institution: "USP/Esalq",
    period: "2025 — 2026",
  },
  {
    degree: "Telecommunications Engineering",
    institution: "Instituto Nacional de Telecomunicações — Inatel",
    period: "2013 — 2017",
  },
] as const;

// JSON-LD: Semantic SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  headline: "Career — João Victor",
  description: "Professional experience and education timeline of João Victor.",
  url: "https://mjoaovictor.dev/career",
  mainEntity: {
    "@id": "https://mjoaovictor.dev/#person",
  },
};

export const metadata: Metadata = {
  title: "Career",
  description: "Professional experience and education timeline of João Victor.",
  alternates: {
    canonical: "/career",
  },
  openGraph: {
    title: "Career | mjoaovictor",
    description: "Professional experience and education timeline of João Victor.",
    url: "/career",
    type: "profile",
  },
};

function TimelineList({
  items,
  icon: Icon,
}: {
  items: readonly {
    role?: string;
    degree?: string;
    company?: string;
    institution?: string;
    period: string;
    location?: string;
    description?: string | null;
    highlights?: readonly string[];
  }[];
  icon: typeof Briefcase;
}) {
  return (
    <ul className="pl-6 space-y-8 border-l border-neutral-200 dark:border-neutral-800">
      {items.map((item) => (
        <li key={`${item.role ?? item.degree}-${item.period}`} className="relative space-y-1">
          <span className="-left-8 absolute top-0.5 flex size-4 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900">
            <Icon className="size-4 text-neutral-500 dark:text-neutral-400" />
          </span>

          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
              {item.role ?? item.degree}
            </h3>
            <span className="font-mono text-sm text-neutral-400">
              {item.period}
            </span>
          </div>

          <p className="text-neutral-600 dark:text-neutral-400">
            {item.company ?? item.institution}
            {item.location ? ` · ${item.location}` : ""}
          </p>

          {item.description ? (
            <p className="mb-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
              {item.description}
            </p>
          ) : null}

          {item.highlights ? (
            <ul className="pl-5 space-y-1 leading-relaxed list-disc text-neutral-600 marker:text-neutral-400 dark:text-neutral-400 dark:marker:text-neutral-600">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <section className={cn(geistMono.variable, "space-y-8")}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-2xl font-semibold tracking-tighter">
        Career
      </h1>

      <div className="space-y-4">
        <h2 className="text-sm font-medium">Experience</h2>
        <TimelineList items={EXPERIENCE} icon={Briefcase} />
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-medium">Education</h2>
        <TimelineList items={EDUCATION} icon={GraduationCap} />
      </div>
    </section>
  );
}
