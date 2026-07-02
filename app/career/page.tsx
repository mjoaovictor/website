import type { Metadata } from "next";
import { Briefcase, GraduationCap } from "lucide-react";

const EXPERIENCE = [
  {
    role: "Senior Software Analyst",
    company: "Instituto de Pesquisas Eldorado",
    period: "Jun 2022 — Present",
    location: "Campinas, SP, Brazil",
    description:
      "Solving problems related to mobile communications technologies by analyzing network logs (3G, 4G, and 5G) with Qualcomm (QCAT, QXDM) and MediaTek (ELT) tools, and executing Feature Code Validation (FCV) to meet global carrier requirements. Building Python tooling to automate recurring analysis workflows.",
  },
  {
    role: "Systems Specialist II",
    company: "Instituto Nacional de Telecomunicações — Inatel",
    period: "Oct 2021 — Jun 2022",
    location: "Santa Rita do Sapucaí, MG, Brazil",
    description:
      "Mobile communications training instructor, developing and delivering 5G courses covering protocols, signaling analysis, network planning and deployment, troubleshooting and optimization, and core/network virtualization (SDN and NFV). Acted as a 5G consultant on new projects.",
  },
  {
    role: "Systems Specialist I",
    company: "Instituto Nacional de Telecomunicações — Inatel",
    period: "Jul 2018 — Oct 2021",
    location: "Santa Rita do Sapucaí, MG, Brazil",
    description:
      "Specialist in the Inatel/Ericsson project, responsible for consistency checks and activation of new GSM/UMTS/LTE sites, RAN sharing configuration, KPI monitoring, alarm detection, and LTE logical parameter optimization. Automated processes with Excel/VBA and Python.",
  },
] as const;

const EDUCATION = [
  {
    degree: "MBA, Data Science, AI and Analytics",
    institution: "USP/Esalq",
    period: "2025 — 2026",
  },
  {
    degree: "Eng., Telecommunications Engineering",
    institution: "Inatel",
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
  }[];
  icon: typeof Briefcase;
}) {
  return (
    <ul className="space-y-8 border-neutral-200 border-l pl-6 dark:border-neutral-800">
      {items.map((item) => (
        <li key={`${item.role ?? item.degree}-${item.period}`} className="relative space-y-1">
          <span className="-left-8 absolute top-0.5 flex size-4 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900">
            <Icon className="size-3 text-neutral-500 dark:text-neutral-400" />
          </span>

          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
              {item.role ?? item.degree}
            </h3>
            <span className="font-mono text-neutral-400 text-sm">
              {item.period}
            </span>
          </div>

          <p className="text-neutral-600 dark:text-neutral-400">
            {item.company ?? item.institution}
            {item.location ? ` · ${item.location}` : ""}
          </p>

          {item.description ? (
            <p className="text-neutral-600 leading-relaxed dark:text-neutral-400">
              {item.description}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <section className="space-y-8">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: true
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="font-semibold text-2xl tracking-tighter">
        Carrer
      </h1>

      <div className="space-y-4">
        <h2 className="font-medium text-sm">Experience</h2>
        <TimelineList items={EXPERIENCE} icon={Briefcase} />
      </div>

      <div className="space-y-4">
        <h2 className="font-medium text-sm">Education</h2>
        <TimelineList items={EDUCATION} icon={GraduationCap} />
      </div>
    </section>
  );
}
