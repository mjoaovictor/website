"use client";

import React, { useMemo, useState } from "react";
import {
  arfcnToFrequency,
  frequencyToArfcn,
  getBandsForFrequency,
} from "@/lib/3gpp";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const linkStyles: Record<string, string> = {
  "UL": "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/20",
  "DL": "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-400 dark:border-blue-500/20",
  "UL/DL": "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/15 dark:text-purple-400 dark:border-purple-500/20",
};

export function NrArfcnCalculator() {
  const [inputMode, setInputMode] = useState<"arfcn" | "freq">("arfcn");
  const [rawValue, setRawValue] = useState("");

  const { arfcnStr, freqStr, matches } = useMemo(() => {
    const val = Number(rawValue);
    if (!rawValue || isNaN(val)) {
      return { arfcnStr: inputMode === "arfcn" ? rawValue : "", freqStr: inputMode === "freq" ? rawValue : "", matches: [] };
    }

    let arfcn: number | null = null;
    let freq: number | null = null;

    if (inputMode === "arfcn") {
      arfcn = val;
      freq = arfcnToFrequency(arfcn);
    } else {
      freq = val;
      arfcn = frequencyToArfcn(freq);
    }

    // get bands based on the calculated frequency and (optional) arfcn
    const foundMatches = freq !== null ? getBandsForFrequency(freq, arfcn ?? undefined) : [];

    return {
      arfcnStr: inputMode === "arfcn" ? rawValue : (arfcn?.toString() ?? ""),
      freqStr: inputMode === "freq" ? rawValue : (freq?.toFixed(2) ?? ""),
      matches: foundMatches
    };
  }, [inputMode, rawValue]);

  return (
    <Card>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* arfcn input */}
          <div className="space-y-3">
            <Label>NR-ARFCN</Label>
            <Input
              type="number"
              min="0"
              placeholder="e.g. 620000"
              value={arfcnStr}
              onChange={(e) => {
                setInputMode("arfcn");
                setRawValue(e.target.value);
              }}
            />
            <p className="text-xs tracking-wider text-neutral-500 dark:text-neutral-400">
              Valid Range: 0 to 3,279,165
            </p>
          </div>

          {/* freq input */}
          <div className="space-y-3">
            <Label>Frequency (MHz)</Label>
            <Input
              type="number"
              min="0"
              placeholder="e.g. 3300"
              value={freqStr}
              onChange={(e) => {
                setInputMode("freq");
                setRawValue(e.target.value);
              }}
            />
          </div>
        </div>

        {/* table section */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="font-medium">Bands</h3>
            <span className="text-xs tracking-wider text-neutral-500 dark:text-neutral-400">
              Found {matches.length} matching items.
            </span>
          </div>

          {matches.length > 0 ? (
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Band</TableHead>
                    <TableHead>Duplex Mode</TableHead>
                    <TableHead>ΔF Raster <span className="text-xs text-neutral-400">(kHz)</span></TableHead>
                    <TableHead>Step <span className="text-xs text-neutral-400">(Nref)</span></TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {matches.map((m, idx) => (
                    <TableRow key={`${m.bandName}-${m.matchedLink}-${idx}`}>
                      <TableCell className="font-bold">{m.bandName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{m.duplexMode}</span>
                          <Badge
                            variant="outline"
                            className={cn(
                              "whitespace-nowrap shadow-none",
                              linkStyles[m.matchedLink] || "bg-gray-100",
                            )}
                          >
                            {m.matchedLink}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{m.frequencyRaster}</TableCell>
                      <TableCell className="font-mono text-sm">{m.rasterStep}</TableCell>
                      <TableCell>
                        {m.isRasterValid ? (
                          <Badge className="border-emerald-200 bg-emerald-100 text-emerald-700 shadow-none hover:bg-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-400">
                            Valid Raster
                          </Badge>
                        ) : (
                          <span className="text-xs text-neutral-400">
                            Off-Raster
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex h-24 flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-transparent">
              <p className="text-sm text-neutral-500">
                {freqStr
                  ? "No matching bands found."
                  : "Enter value to see bands."}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
