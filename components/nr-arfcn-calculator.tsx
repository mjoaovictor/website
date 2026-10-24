"use client"

import { useId, useState } from "react"
import { CircleCheck, CircleDashed } from "lucide-react"
import {
  arfcnToFrequency,
  findBands,
  frequencyToArfcn,
  getGlobalRasterParams,
  MAX_ARFCN,
  MAX_FREQUENCY_MHZ,
  MIN_ARFCN,
  MIN_FREQUENCY_MHZ,
} from "nr-arfcn"
import { cn } from "cn"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Field = "arfcn" | "frequency"

type Carrier = {
  arfcn: number
  frequencyMhz: number
  // False when a typed frequency fell between raster points and was snapped to the nearest one
  exact: boolean
}

type CalculatorState = {
  field: Field
  text: string
  error: string | null
  carrier: Carrier | null
}

// Bands whose applicable NR-ARFCN are further restricted per channel bandwidth (Table 5.4.2.3-1, notes 1–3)
const BANDS_WITH_BANDWIDTH_NOTES = new Set(["n46", "n96", "n102"])

const integer = new Intl.NumberFormat("en-US")

const ARFCN_RANGE = `${integer.format(MIN_ARFCN)} to ${integer.format(MAX_ARFCN)}`
const FREQUENCY_RANGE = `${integer.format(MIN_FREQUENCY_MHZ)} to ${integer.format(MAX_FREQUENCY_MHZ)} MHz`

// The finest raster is 5 kHz, so three decimals are exact; keep at least two so values read as MHz
function formatMhz(mhz: number) {
  return mhz.toFixed(3).replace(/0$/, "")
}

function parse(field: Field, text: string): Pick<CalculatorState, "error" | "carrier"> {
  // Thousands separators are accepted for NR-ARFCN only; in a frequency a comma could be a decimal mark
  const value = text.trim().replace(field === "arfcn" ? /[\s,_]/g : /\s/g, "")
  if (value === "") {
    return { error: null, carrier: null }
  }

  try {
    if (field === "arfcn") {
      if (!/^\d+$/.test(value)) {
        throw new RangeError()
      }
      const arfcn = Number(value)
      return {
        error: null,
        carrier: {
          arfcn,
          frequencyMhz: arfcnToFrequency(arfcn),
          exact: true
        }
      }
    }

    if (!/^\d+(\.\d+)?$/.test(value)) {
      throw new RangeError()
    }

    const { arfcn, exact } = frequencyToArfcn(Number(value))
    return {
      error: null,
      carrier: {
        arfcn,
        frequencyMhz: arfcnToFrequency(arfcn),
        exact
      }
    }
  } catch (error) {
    if (!(error instanceof RangeError)) {
      throw error
    }
    return {
      error: field === "arfcn"
        ? `Invalid NR-ARFCN. Use ${ARFCN_RANGE}`
        : `Invalid Frequency. Use ${FREQUENCY_RANGE}`,
      carrier: null,
    }
  }
}

function Formula({ arfcn }: { arfcn: number }) {
  const { deltaFGlobalKhz, fRefOffsetMhz, nRefOffset, firstArfcn, lastArfcn } = getGlobalRasterParams(arfcn)
  const parameters = [
    ["ΔF", "Global", `${deltaFGlobalKhz} kHz`],
    ["F", "REF-Offs", `${fRefOffsetMhz} MHz`],
    ["N", "REF-Offs", String(nRefOffset)],
    ["N", "REF", `${firstArfcn} to ${lastArfcn}`],
  ] as const

  return (
    <details className="mt-8 group">
      <summary className="py-3 text-sm cursor-pointer select-none text-muted-foreground hover:text-foreground">
        <span className="group-open:hidden">Show</span>
        <span className="hidden group-open:inline">Hide</span> Formula
      </summary>
      <div className="grid grid-cols-[auto_1fr] gap-x-2 overflow-x-auto pt-3 font-mono text-sm leading-7 whitespace-nowrap">
        <span className="font-sans">F<sub>REF</sub></span>
        <span className="font-sans text-muted-foreground">= F<sub>REF-Offs</sub> + ΔF<sub>Global</sub> × (N<sub>REF</sub> − N<sub>REF-Offs</sub>)
        </span>
        <span className="col-start-2">
          <span className="text-muted-foreground">= </span>
          {fRefOffsetMhz} + {deltaFGlobalKhz / 1000} × ({arfcn} − {nRefOffset})
        </span>
        <span className="col-start-2 text-base font-semibold">
          <span className="font-normal text-muted-foreground">= </span>
          {formatMhz(arfcnToFrequency(arfcn))} MHz
        </span>
      </div>
      <dl className="flex flex-wrap pb-6 mt-4 text-xs gap-x-5 gap-y-1 text-muted-foreground">
        {parameters.map(([symbol, subscript, value]) => (
          <div key={`${symbol}${subscript}`} className="flex gap-1.5">
            <dt>{symbol}<sub>{subscript}</sub></dt>
            <dd className="font-mono text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </details>
  )
}

function Bands({ arfcn }: { arfcn: number | null }) {
  const matches = arfcn === null ? [] : findBands(arfcn)
  const hasBandwidthNotes = matches.some(({ band }) => BANDS_WITH_BANDWIDTH_NOTES.has(band))

  return (
    <section aria-labelledby="bands-heading" className="mt-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="bands-heading" className="text-xl font-semibold tracking-tight">
          Bands
        </h2>
        {arfcn !== null && (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {matches.length === 1 ? "1 match" : `${matches.length} matches`}
          </p>
        )}
      </div>

      {matches.length === 0 ? (
        <p className="py-6 mt-3 text-sm border-t text-muted-foreground">
          {arfcn === null
            ? "Enter an NR-ARFCN or a frequency to see the NR operating bands that include it."
            : `No NR operating band includes NR-ARFCN ${arfcn}.`}
        </p>
      ) : (
        <Table className="mt-3">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-0">Band</TableHead>
              <TableHead>Duplex Mode</TableHead>
              <TableHead>
                ΔF<sub>Raster</sub> <span className="font-normal text-muted-foreground">(kHz)</span>
              </TableHead>
              <TableHead>
                Step <span className="font-normal text-muted-foreground">(N<sub>REF</sub>)</span>
              </TableHead>
              <TableHead className="pr-0">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match) => (
              <TableRow
                key={`${match.band}-${match.rasterKhz ?? match.channelBandwidthMhz}-${match.step}-${match.direction}`}
                className="h-12"
              >
                <TableCell className="pl-0 font-mono font-bold">
                  {match.band}
                  {match.channelBandwidthMhz !== undefined && (
                    <span className="ml-2 font-sans text-xs font-normal text-muted-foreground">
                      {match.channelBandwidthMhz} MHz BW
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-2">
                    {match.duplexMode}
                    <Badge variant="secondary" className="font-mono">{match.direction}</Badge>
                  </span>
                </TableCell>
                <TableCell className="font-mono tabular-nums">
                  {match.rasterKhz ?? (
                    <span className="text-muted-foreground">
                      —<span className="sr-only">defined per channel bandwidth</span>
                    </span>
                  )}
                </TableCell>
                <TableCell className="font-mono tabular-nums">{match.step}</TableCell>
                <TableCell className="pr-0">
                  {match.onRaster ? (
                    <Badge className="bg-accent/12 text-foreground">
                      <CircleCheck aria-hidden className="text-accent" />
                      On Raster
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      <CircleDashed aria-hidden />
                      Off Raster
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {hasBandwidthNotes && (
        <p className="mt-4 text-xs text-muted-foreground">
          n46, n96 and n102 further restrict NR-ARFCN per channel bandwidth, which isn&apos;t checked here.
        </p>
      )}
    </section>
  )
}

export function NrArfcnCalculator({ initialArfcn }: { initialArfcn: string }) {
  const id = useId()
  const [state, setState] = useState<CalculatorState>(() => ({
    field: "arfcn",
    text: initialArfcn,
    ...parse("arfcn", initialArfcn),
  }))

  function handleChange(field: Field, text: string) {
    const parsed = parse(field, text)
    setState({ field, text, ...parsed })
    window.history.replaceState(null, "", parsed.carrier ? `?arfcn=${parsed.carrier.arfcn}` : "?")
  }

  const { field, text, error, carrier } = state
  const arfcnText = field === "arfcn" ? text : carrier ? String(carrier.arfcn) : ""
  const frequencyText = field === "frequency" ? text : carrier ? formatMhz(carrier.frequencyMhz) : ""
  const isSnapped = field === "frequency" && carrier !== null && !carrier.exact && !error

  const fields = [
    {
      field: "arfcn",
      label: "NR-ARFCN",
      value: arfcnText,
      inputMode: "numeric",
      hint: `Valid Range: ${ARFCN_RANGE}`,
    },
    {
      field: "frequency",
      label: "Frequency (MHz)",
      value: frequencyText,
      inputMode: "decimal",
      hint: isSnapped && carrier
        ? `Between Raster Points. Nearest: ${formatMhz(carrier.frequencyMhz)} MHz`
        : `Valid Range: ${FREQUENCY_RANGE}`,
    },
  ] as const

  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
        {fields.map((input, index) => {
          const hasError = error !== null && field === input.field
          const messageId = `${id}-${input.field}-message`

          return (
            <div
              key={input.field}
              className={cn("flex flex-col gap-2", index === 1 && "sm:col-start-3")}
            >
              <label htmlFor={`${id}-${input.field}`} className="text-sm font-medium">
                {input.label}
              </label>
              <Input
                id={`${id}-${input.field}`}
                value={input.value}
                onChange={(event) => handleChange(input.field, event.target.value)}
                inputMode={input.inputMode}
                autoComplete="off"
                spellCheck={false}
                aria-invalid={hasError || undefined}
                aria-describedby={messageId}
                className="px-3 font-mono h-11"
              />
              <p
                id={messageId}
                className={cn("text-xs", hasError ? "text-destructive" : "text-muted-foreground")}
              >
                {hasError ? error : input.hint}
              </p>
            </div>
          )
        })}
      </div>

      {carrier ? <Formula arfcn={carrier.arfcn} /> : null}
      <Bands arfcn={carrier?.arfcn ?? null} />
    </div>
  )
}
