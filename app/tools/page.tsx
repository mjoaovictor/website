import Link from "next/link";

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
        Tools
      </h1>

      <ul className="list-disc space-y-3 pl-5 text-neutral-600 dark:text-neutral-400">
        {TOOLS.map((tool) => (
          <li key={tool.href} className="marker:text-neutral-400">
            <Link
              className="underline decoration-neutral-300 decoration-1 underline-offset-4 hover:text-neutral-900 hover:decoration-neutral-600 dark:decoration-neutral-700 dark:hover:text-neutral-100 dark:hover:decoration-neutral-400"
              href={tool.href}
            >
              {tool.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
