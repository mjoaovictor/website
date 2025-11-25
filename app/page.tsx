import type { Metadata } from "next";

const LINKS = [
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/mjoaovictor",
  },
  {
    label: "github",
    href: "https://github.com/mjoaovictor",
  },
] as const;

export const metadata: Metadata = {
  description: "Senior Software Analyst & Telecommunications Engineer specializing in 5G and Python automation.",
  alternates: {
    canonical: "/",
  },
};

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tighter">João Victor</h1>
      </div>

      <p className="leading-relaxed">
        I'm a Telecommunications Engineer and Senior Software Analyst currently
        working at Eldorado Research Institute. Previously, I was a 5G
        instructor at INATEL.
      </p>

      <ul className="flex gap-4 text-neutral-600 dark:text-neutral-300">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a
              className="flex items-center hover:text-neutral-900 dark:hover:text-white"
              rel="noopener noreferrer"
              target="_blank"
              href={link.href}
            >
              <ArrowUpRight className="h-3 w-3" />
              <span className="ml-2 h-7">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
