import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

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

const TOOLS = [
  {
    label: "5G NR-ARFCN Calculator",
    href: "/tools/5g-nr-arfcn-calculator",
  },
] as const;

export default function Page() {
  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold tracking-tighter">
        João Victor
      </h1>

      <div className="space-y-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
        <p>
          I’m a Telecommunications Engineer and Senior Software Analyst at the Eldorado
          Research Institute. Former 5G instructor at INATEL.
        </p>

        <p>
          Focused on 4G/5G, automation, and applied software engineering.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-medium">My Tools</h2>
        <ul>
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="inline-flex items-center gap-2 group text-neutral-600 hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {tool.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ul className="flex gap-4">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a
              className="flex items-center gap-2 group text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href={link.href}
            >
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="h-7">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
