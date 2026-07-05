"use client";

import { type ChangeEvent, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	eirpDbm,
	formatDistance,
	maximumAllowablePathLossDb,
	PROPAGATION_SCENARIOS,
	receiverSensitivityDbm,
	thermalNoiseDbm,
} from "@/lib/linkbudget/budget";
import {
	isApplicable,
	type MaxRangeResult,
	solveMaxRange2D,
} from "@/lib/linkbudget/pathloss";
import { cn } from "@/lib/utils";
import { AnimatedBackground } from "@/components/animated_background";
import { LinkBudgetChart } from "./link-budget-chart";

type Direction = "downlink" | "uplink";

type StationFields = {
	txPowerDbm: string;
	cableLossDb: string;
	antennaGainDbi: string;
	antennaHeightM: string;
	noiseFigureDb: string;
	sinrDb: string;
};

const BS_DEFAULTS: StationFields = {
	txPowerDbm: "49",
	cableLossDb: "2",
	antennaGainDbi: "17",
	antennaHeightM: "25",
	noiseFigureDb: "5",
	sinrDb: "0",
};

const UT_DEFAULTS: StationFields = {
	txPowerDbm: "23",
	cableLossDb: "0",
	antennaGainDbi: "0",
	antennaHeightM: "1.5",
	noiseFigureDb: "7",
	sinrDb: "-6",
};

const conditionStyles: Record<string, string> = {
	LOS: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/20",
	NLOS: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/20",
};

function parsePositive(
	raw: string,
	label: string,
): { value: number; error: string | null } {
	const value = Number(raw);
	if (raw.trim() === "" || Number.isNaN(value)) {
		return { value: NaN, error: `${label} must be a valid number.` };
	}
	if (value <= 0) {
		return { value: NaN, error: `${label} must be greater than 0.` };
	}
	return { value, error: null };
}

function parseNumber(
	raw: string,
	label: string,
): { value: number; error: string | null } {
	const value = Number(raw);
	if (raw.trim() === "" || Number.isNaN(value)) {
		return { value: NaN, error: `${label} must be a valid number.` };
	}
	return { value, error: null };
}

function rangeMeters(result: MaxRangeResult): number | null {
	switch (result.kind) {
		case "solved":
			return result.d2DMeters;
		case "beyond-validity":
			return result.limitMeters;
		case "unreachable":
			return null;
	}
}

function formatRange(result: MaxRangeResult): string {
	switch (result.kind) {
		case "solved":
			return formatDistance(result.d2DMeters);
		case "beyond-validity":
			return `> ${formatDistance(result.limitMeters)}`;
		case "unreachable":
			return "—";
	}
}

function StationConfigCard({
	title,
	role,
	fields,
	onChange,
	thermalNoiseDbm,
	sensitivityDbm,
}: {
	title: string;
	role: "transmitter" | "receiver";
	fields: StationFields;
	onChange: (fields: StationFields) => void;
	thermalNoiseDbm: number | null;
	sensitivityDbm: number | null;
}) {
	const update = (key: keyof StationFields) => (e: ChangeEvent<HTMLInputElement>) => onChange({ ...fields, [key]: e.target.value });

	return (
		<Card>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between border-b pb-2">
					<h3 className="font-medium">
            {title}
          </h3>
					<Badge variant="outline">
						{role === "transmitter" ? "Tx" : "Rx"}
					</Badge>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-1.5">
            {/* tx power input */}
						<Label className="text-xs">Tx Power (dBm)</Label>
						<Input
							type="number"
							value={fields.txPowerDbm}
							onChange={update("txPowerDbm")}
						/>
					</div>
					<div className="space-y-1.5">
            {/* cable loss input */}
						<Label className="text-xs">Cable Loss (dB)</Label>
						<Input
							type="number"
							value={fields.cableLossDb}
							onChange={update("cableLossDb")}
						/>
					</div>
					<div className="space-y-1.5">
            {/* antenna gain input */}
						<Label className="text-xs">Antenna Gain (dBi)</Label>
						<Input
							type="number"
							value={fields.antennaGainDbi}
							onChange={update("antennaGainDbi")}
						/>
					</div>
					<div className="space-y-1.5">
            {/* antenna height input */}
						<Label className="text-xs">Antenna Height (m)</Label>
						<Input
							type="number"
							value={fields.antennaHeightM}
							onChange={update("antennaHeightM")}
						/>
					</div>
					<div className="space-y-1.5">
            {/* noise figure input */}
						<Label className="text-xs">Noise Figure (dB)</Label>
						<Input
							type="number"
							value={fields.noiseFigureDb}
							onChange={update("noiseFigureDb")}
						/>
					</div>
					<div className="space-y-1.5">
            {/* required SINR input */}
						<Label className="text-xs">Required SINR (dB)</Label>
						<Input
							type="number"
							value={fields.sinrDb}
							onChange={update("sinrDb")}
						/>
					</div>
				</div>

				{role === "receiver" && (
					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1.5">
              {/* thermal noise */}
							<Label className="text-xs">Thermal Noise (dBm)</Label>
							<div className="rounded-md border bg-neutral-50 px-3 py-1.5 font-mono text-sm dark:bg-neutral-900">
								{thermalNoiseDbm !== null ? thermalNoiseDbm.toFixed(2) : "—"}
							</div>
						</div>
						<div className="space-y-1.5">
              {/* rx sensitivity */}
							<Label className="text-xs">Rx Sensitivity (dBm)</Label>
							<div className="rounded-md border bg-neutral-50 px-3 py-1.5 font-mono text-sm dark:bg-neutral-900">
								{sensitivityDbm !== null ? sensitivityDbm.toFixed(2) : "—"}
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export function LinkBudgetCalculator() {
	const [direction, setDirection] = useState<Direction>("downlink");
	const [bs, setBs] = useState<StationFields>(BS_DEFAULTS);
	const [ut, setUt] = useState<StationFields>(UT_DEFAULTS);
	const [freqMHz, setFreqMHz] = useState("3500");
	const [bandwidthMHz, setBandwidthMHz] = useState("100");
	const [additionalMarginDb, setAdditionalMarginDb] = useState("3");

	const { error, maplDb, thermalNoise, sensitivityDbm, results, chartProps } = useMemo(() => {
			const parsedFreq = parsePositive(freqMHz, "Carrier Frequency");
			const parsedBandwidth = parsePositive(bandwidthMHz, "Channel Bandwidth");
			const parsedMargin = parseNumber(additionalMarginDb, "Additional Margin");

			const parsedBs = {
				txPowerDbm: parseNumber(bs.txPowerDbm, "BS Tx power"),
				cableLossDb: parseNumber(bs.cableLossDb, "BS Cable Loss"),
				antennaGainDbi: parseNumber(bs.antennaGainDbi, "BS Antenna Gain"),
				antennaHeightM: parsePositive(bs.antennaHeightM, "BS Antenna Height"),
				noiseFigureDb: parseNumber(bs.noiseFigureDb, "BS Noise Figure"),
				sinrDb: parseNumber(bs.sinrDb, "BS Required SINR"),
			};

			const parsedUt = {
				txPowerDbm: parseNumber(ut.txPowerDbm, "UT Tx power"),
				cableLossDb: parseNumber(ut.cableLossDb, "UT Cable Loss"),
				antennaGainDbi: parseNumber(ut.antennaGainDbi, "UT Antenna Gain"),
				antennaHeightM: parsePositive(ut.antennaHeightM, "UT Antenna Height"),
				noiseFigureDb: parseNumber(ut.noiseFigureDb, "UT Noise Figure"),
				sinrDb: parseNumber(ut.sinrDb, "UT Required SINR"),
			};

			const firstError =
				parsedFreq.error ??
				parsedBandwidth.error ??
				parsedMargin.error ??
				Object.values(parsedBs).find((f) => f.error)?.error ??
				Object.values(parsedUt).find((f) => f.error)?.error ??
				null;

			if (firstError) {
				return {
					error: firstError,
					maplDb: null,
					thermalNoise: null,
					sensitivityDbm: null,
					results: [],
					chartProps: null,
				};
			}

			const bsHeightM = parsedBs.antennaHeightM.value;
			const utHeightM = parsedUt.antennaHeightM.value;
			const freq = parsedFreq.value;
			const bandwidthHz = parsedBandwidth.value * 1e6;

			const tx = direction === "downlink" ? parsedBs : parsedUt;
			const rx = direction === "downlink" ? parsedUt : parsedBs;

			const eirp = eirpDbm(
				tx.txPowerDbm.value,
				tx.cableLossDb.value,
				tx.antennaGainDbi.value,
			);

			const noise = thermalNoiseDbm(bandwidthHz);

			const sensitivity = receiverSensitivityDbm(
				rx.noiseFigureDb.value,
				noise,
				rx.sinrDb.value,
			);

			const mapl = maximumAllowablePathLossDb({
				eirpDbm: eirp,
				rxAntennaGainDbi: rx.antennaGainDbi.value,
				rxCableLossDb: rx.cableLossDb.value,
				rxSensitivityDbm: sensitivity,
				additionalMarginDb: parsedMargin.value,
			});

			const rows = PROPAGATION_SCENARIOS.map((scenario) => ({
				scenario,
				result: solveMaxRange2D(scenario.id, mapl, freq, bsHeightM, utHeightM),
				applicable: isApplicable(scenario.id, freq, bsHeightM, utHeightM),
			})).sort((a, b) => (rangeMeters(b.result) ?? -1) - (rangeMeters(a.result) ?? -1));

			// Chart x-axis extent: FSPL is unclamped by any validity range and would
			// stretch the log axis far past every calibrated curve, so exclude it.
			const terrestrialMaxM = Math.max(
				0,
				...rows
					.filter((row) => row.scenario.family !== "FSPL")
					.map((row) => rangeMeters(row.result) ?? 0),
			);

			return {
				error: null,
				maplDb: mapl,
				thermalNoise: noise,
				sensitivityDbm: sensitivity,
				results: rows,
				chartProps: {
					freqMHz: freq,
					bsHeightM,
					utHeightM,
					maplDb: mapl,
					maxRangeM: terrestrialMaxM > 0 ? terrestrialMaxM : null,
				},
			};
		}, [direction, bs, ut, freqMHz, bandwidthMHz, additionalMarginDb]);

	return (
		<Card>
			<CardContent className="space-y-6">
				<div className="inline-flex items-center rounded-lg border border-neutral-200 p-0.5 dark:border-neutral-800">
					<AnimatedBackground
						defaultValue={direction}
						onValueChange={(id) => id && setDirection(id as Direction)}
						className="rounded-md bg-neutral-900 dark:bg-neutral-100"
						transition={{ type: "spring", bounce: 0, duration: 0.2 }}
					>
						{(["downlink", "uplink"] as const).map((d) => (
							<button
								key={d}
								data-id={d}
								type="button"
								className="px-3 py-1.5 font-medium text-neutral-600 text-sm capitalize data-[checked=true]:text-neutral-50 dark:text-neutral-400 dark:data-[checked=true]:text-neutral-900"
							>
								{d}
							</button>
						))}
					</AnimatedBackground>
				</div>

				<div className="grid gap-3 sm:grid-cols-3">
					<div className="space-y-3">
            {/* carrier frequency input */}
						<Label className="text-xs">Carrier Frequency (MHz)</Label>
						<Input
							type="number"
              min="0"
              placeholder="e.g. 3300"
							value={freqMHz}
							onChange={(e) => setFreqMHz(e.target.value)}
						/>
					</div>
					<div className="space-y-3">
            {/* channel bandwidth input */}
						<Label className="text-xs">Channel Bandwidth (MHz)</Label>
						<Input
							type="number"
							min="0"
							placeholder="e.g. 100"
							value={bandwidthMHz}
							onChange={(e) => setBandwidthMHz(e.target.value)}
						/>
					</div>
					<div className="space-y-3">
            {/* additional margin input */}
						<Label className="text-xs">Additional Margin (dB)</Label>
						<Input
							type="number"
							min="0"
							placeholder="e.g. 3"
							value={additionalMarginDb}
							onChange={(e) => setAdditionalMarginDb(e.target.value)}
						/>
						<p className="text-neutral-500 text-xs tracking-wider dark:text-neutral-400">
							Body loss, shadow fading, interference margin, etc.
						</p>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<StationConfigCard
						title="Base Station"
						role={direction === "downlink" ? "transmitter" : "receiver"}
						fields={bs}
						onChange={setBs}
						thermalNoiseDbm={direction === "uplink" ? thermalNoise : null}
						sensitivityDbm={direction === "uplink" ? sensitivityDbm : null}
					/>
					<StationConfigCard
						title="User Terminal"
						role={direction === "downlink" ? "receiver" : "transmitter"}
						fields={ut}
						onChange={setUt}
						thermalNoiseDbm={direction === "downlink" ? thermalNoise : null}
						sensitivityDbm={direction === "downlink" ? sensitivityDbm : null}
					/>
				</div>

				{error && (
					<p className="text-red-600 text-sm dark:text-red-400" role="alert">
						{error}
					</p>
				)}

				{maplDb !== null && chartProps && (
					<>
						<div className="flex items-center justify-between border-b pb-2">
							<h3 className="font-medium">Estimated Cell Range</h3>
							<span className="text-neutral-500 text-xs tracking-wider dark:text-neutral-400">
								Maximum Allowable Path Loss: {maplDb.toFixed(1)} dB
							</span>
						</div>

						<LinkBudgetChart {...chartProps} />

						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Scenario</TableHead>
									<TableHead>Condition</TableHead>
									<TableHead>Max Range</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{results.map(({ scenario, result, applicable }) => (
									<TableRow key={scenario.id}>
										<TableCell className="font-medium">
											{scenario.label}
										</TableCell>
										<TableCell>
											<Badge
												variant="outline"
												className={cn(
													"shadow-none",
													conditionStyles[scenario.condition],
												)}
											>
												{scenario.condition}
											</Badge>
										</TableCell>
										<TableCell className="font-mono text-sm">
											{formatRange(result)}
											{!applicable && (
												<span
													className="ml-1 text-amber-600 dark:text-amber-400"
													title="Inputs outside the TR 38.901 applicability range for this scenario."
												>
													*
												</span>
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>

						{results.some((row) => !row.applicable) && (
							<p className="text-neutral-500 text-xs dark:text-neutral-400">
								* Frequency or antenna heights are outside the 3GPP TR 38.901
								applicability range for this scenario. The result is an
								extrapolation, not a calibrated prediction.
							</p>
						)}
					</>
				)}
			</CardContent>
		</Card>
	);
}
