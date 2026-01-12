import { ArrowUpRight } from "lucide-react";

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

export default function Page() {
  return (
    <section className="space-y-8">
      <h1 className="font-semibold text-2xl tracking-tighter">
        João Victor
      </h1>

      <div className="space-y-4 text-neutral-600 leading-relaxed dark:text-neutral-400">
        <p>
          I’m a Telecommunications Engineer and Senior Software Analyst at the Eldorado
          Research Institute. Former 5G instructor at INATEL.
        </p>

        <p>
          Focused on 4G/5G, automation, and applied software engineering.
        </p>
      </div>

      <ul className="flex gap-4">
        {LINKS.map((link) => (
          <li key={link.label}>
            <a
              className="group flex items-center gap-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
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
