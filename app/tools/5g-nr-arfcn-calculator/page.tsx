import { NrArfcnCalculator } from "@/app/components/nr-arfcn-calculator";
import Link from "next/link";

const UPDATES = [
  {
    date: "2025-11-23",
    description: "Update to 3GPP TS 38.104 V19.2.0 (2025-09).",
  },
] as const;

export default function Page() {
  return (
    <section>
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tighter">
          5G NR-ARFCN Calculator
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Convert between NR-ARFCN and Frequency (MHz) based on 3GPP TS 38.104.
        </p>
      </div>
      <NrArfcnCalculator />

      <div className="mt-4 text-sm">
        <Link
          href="/blog/frequency-raster"
          className="text-neutral-600 underline decoration-neutral-300 decoration-1 underline-offset-4 hover:text-neutral-900 hover:decoration-neutral-600 dark:text-neutral-400 dark:decoration-neutral-700 dark:hover:text-neutral-100 dark:hover:decoration-neutral-400"
        >
          How does the calculation work?
        </Link>
      </div>

      <div className="mt-12 space-y-2 border-t border-neutral-100 pt-6 dark:border-neutral-800">
        <h2 className="text-sm font-medium">
          Updates
        </h2>
        <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
          {UPDATES.map((update) => (
            <li key={update.date} className="flex items-start gap-3">
              <span className="mt-0.5 w-24 shrink-0 font-mono text-neutral-400">
                {update.date}
              </span>
              <span>{update.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
