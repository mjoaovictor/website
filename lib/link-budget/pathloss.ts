// 3GPP TR 38.901 §7.4.1 defines c as 3.0×10^8 m/s for the breakpoint formula.
const SPEED_OF_LIGHT = 3.0e8;  // m/s

export type PropagationScenario =
	| "UMa-LOS"
	| "UMa-NLOS"
	| "UMi-LOS"
	| "UMi-NLOS"
	| "RMa-LOS"
	| "RMa-NLOS"
	| "InH-LOS"
	| "InH-NLOS"
	| "FSPL";

const RMA_AVG_BUILDING_HEIGHT = 5;  // h, 3GPP default
const RMA_STREET_WIDTH = 20;  // W, 3GPP default

type Bounds = { min: number; max: number };

// 3GPP TR 38.901 (V19.2.0) Table 7.4.1-1 limits per scenario.
// FSPL has no entry — it's an idealized no-obstruction reference, not a calibrated deployment model, so it's intentionally left unclamped.
const SCENARIO_LIMITS: Record<Exclude<PropagationScenario, "FSPL">, {
	distanceMetric: "d2D" | "d3D";
	distance: Bounds;
	freqGHz: Bounds;
	hUT?: Bounds;
	hBS?: Bounds;
}> = {
	"UMa-LOS": { distanceMetric: "d2D", distance: { min: 10, max: 5000 }, freqGHz: { min: 0.5, max: 100 }, hUT: { min: 1.5, max: 22.5 }, hBS: { min: 25, max: 25 } },
	"UMa-NLOS": { distanceMetric: "d2D", distance: { min: 10, max: 5000 }, freqGHz: { min: 0.5, max: 100 }, hUT: { min: 1.5, max: 22.5 }, hBS: { min: 25, max: 25 } },
	"UMi-LOS": { distanceMetric: "d2D", distance: { min: 10, max: 5000 }, freqGHz: { min: 0.5, max: 100 }, hUT: { min: 1.5, max: 22.5 }, hBS: { min: 10, max: 10 } },
	"UMi-NLOS": { distanceMetric: "d2D", distance: { min: 10, max: 5000 }, freqGHz: { min: 0.5, max: 100 }, hUT: { min: 1.5, max: 22.5 }, hBS: { min: 10, max: 10 } },
	"RMa-LOS": { distanceMetric: "d2D", distance: { min: 10, max: 10000 }, freqGHz: { min: 0.5, max: 30 }, hUT: { min: 1, max: 10 }, hBS: { min: 10, max: 150 } },
	"RMa-NLOS": { distanceMetric: "d2D", distance: { min: 10, max: 5000 }, freqGHz: { min: 0.5, max: 30 }, hUT: { min: 1, max: 10 }, hBS: { min: 10, max: 150 } },
	"InH-LOS": { distanceMetric: "d3D", distance: { min: 1, max: 150 }, freqGHz: { min: 0.5, max: 100 } },
	"InH-NLOS": { distanceMetric: "d3D", distance: { min: 1, max: 150 }, freqGHz: { min: 0.5, max: 100 } },
};

function inRange(value: number, range?: Bounds): boolean {
	return range === undefined || (value >= range.min && value <= range.max);
}

/**
 * Whether frequency and antenna heights are inside the scenario's TR 38.901 applicability range.
 * FSPL is an idealized reference with no such range.
 */
export function isApplicable(
	scenario: PropagationScenario,
	freqMHz: number,
	hBS: number,
	hUT: number,
): boolean {
	if (scenario === "FSPL") {
		return true;
	}

	const limits = SCENARIO_LIMITS[scenario];
	return (
		inRange(freqMHz / 1000, limits.freqGHz) &&
		inRange(hUT, limits.hUT) &&
		inRange(hBS, limits.hBS)
	);
}

function d3DFromD2D(
	d2D: number,
	hBS: number,
	hUT: number
): number {
	return Math.sqrt(d2D ** 2 + (hBS - hUT) ** 2);
}

function d2DFromD3D(
	d3D: number,
	hBS: number,
	hUT: number
): number | null {
	const d2DSquared = d3D ** 2 - (hBS - hUT) ** 2;
	return d2DSquared >= 0 ? Math.sqrt(d2DSquared) : null;
}

// Breakpoint distance d'BP for UMa/UMi LOS (Table 7.4.1-1, note 1).
function breakpointUMaUMi(
	freqHz: number,
	hBS: number,
	hUT: number
): number {
	const hE = 1;  //3GPP default
	return (4 * (hBS - hE) * (hUT - hE) * freqHz) / SPEED_OF_LIGHT;
}

// Breakpoint distance dBP for RMa LOS (Table 7.4.1-1, note 5).
function breakpointRMa(
	freqHz: number,
	hBS: number,
	hUT: number
): number {
	return (2 * Math.PI * hBS * hUT * freqHz) / SPEED_OF_LIGHT;
}

// RMa-LOS PL1 (first segment)
function rmaLos1Db(d3D: number, freqGHz: number): number {
	const h = RMA_AVG_BUILDING_HEIGHT;
	return (
		20 * Math.log10((40 * Math.PI * d3D * freqGHz) / 3) +
		Math.min(0.03 * h ** 1.72, 10) * Math.log10(d3D) -
		Math.min(0.044 * h ** 1.72, 14.77) +
		0.002 * Math.log10(h) * d3D
	);
}

/**
 * Whether a given 2D distance is inside the scenario's 3GPP-validated range.
 */
export function isWithinValidity(
	scenario: PropagationScenario,
	d2DMeters: number,
	hBS: number,
	hUT: number,
): boolean {
	if (scenario === "FSPL") {
		return true;
	}

	const { distanceMetric, distance } = SCENARIO_LIMITS[scenario];
	const value = distanceMetric === "d2D" ? d2DMeters : d3DFromD2D(d2DMeters, hBS, hUT);
	return inRange(value, distance);
}

/**
 * Calculate path loss (dB) at a given 2D distance.
 */
export function pathLossDb(
	scenario: PropagationScenario,
	d2DMeters: number,
	freqMHz: number,
	hBS: number,
	hUT: number,
): number {
	const freqGHz = freqMHz / 1000;
	const freqHz = freqMHz * 1e6;
	const d3D = d3DFromD2D(d2DMeters, hBS, hUT);

	switch (scenario) {
		case "FSPL":
			return 20 * Math.log10(d3D) + 20 * Math.log10(freqMHz) - 27.55;
		case "UMa-LOS": {
			const dBP = breakpointUMaUMi(freqHz, hBS, hUT);
			if (d2DMeters <= dBP) {
				return (
					28 +
					22 * Math.log10(d3D) +
					20 * Math.log10(freqGHz)
				);
			}
			return (
				28 +
				40 * Math.log10(d3D) +
				20 * Math.log10(freqGHz) -
				9 * Math.log10(dBP ** 2 + (hBS - hUT) ** 2)
			);
		}
		case "UMa-NLOS":
			return Math.max(
				pathLossDb("UMa-LOS", d2DMeters, freqMHz, hBS, hUT),
				(
					13.54 +
					39.08 * Math.log10(d3D) +
					20 * Math.log10(freqGHz) -
					0.6 * (hUT - 1.5)
				)
			);
		case "UMi-LOS": {
			const dBP = breakpointUMaUMi(freqHz, hBS, hUT);
			if (d2DMeters <= dBP) {
				return (
					32.4 +
					21 * Math.log10(d3D) +
					20 * Math.log10(freqGHz)
				);
			}
			return (
				32.4 +
				40 * Math.log10(d3D) +
				20 * Math.log10(freqGHz) -
				9.5 * Math.log10(dBP ** 2 + (hBS - hUT) ** 2)
			);
		}
		case "UMi-NLOS":
			return Math.max(
				pathLossDb("UMi-LOS", d2DMeters, freqMHz, hBS, hUT),
				(
					35.3 * Math.log10(d3D) +
					22.4 +
					21.3 * Math.log10(freqGHz) -
					0.3 * (hUT - 1.5)
				),
			);
		case "RMa-LOS": {
			const dBP = breakpointRMa(freqHz, hBS, hUT);

			if (d2DMeters <= dBP) {
				return rmaLos1Db(d3D, freqGHz);
			}

			const d3DAtBP = d3DFromD2D(dBP, hBS, hUT);
			return rmaLos1Db(d3DAtBP, freqGHz) + 40 * Math.log10(d3D / d3DAtBP);
		}
		case "RMa-NLOS": {
			const h = RMA_AVG_BUILDING_HEIGHT;
			const w = RMA_STREET_WIDTH;
			return Math.max(
				pathLossDb("RMa-LOS", d2DMeters, freqMHz, hBS, hUT),
				(
					161.04 -
					7.1 * Math.log10(w) +
					7.5 * Math.log10(h) -
					(24.37 - 3.7 * (h / hBS) ** 2) * Math.log10(hBS) +
					(43.42 - 3.1 * Math.log10(hBS)) * (Math.log10(d3D) - 3) +
					20 * Math.log10(freqGHz) -
					(3.2 * Math.log10(11.75 * hUT) ** 2 - 4.97)
				),
			);
		}
		case "InH-LOS":
			return 32.4 + 17.3 * Math.log10(d3D) + 20 * Math.log10(freqGHz);
		case "InH-NLOS":
			return Math.max(
				pathLossDb("InH-LOS", d2DMeters, freqMHz, hBS, hUT),
				(
					38.3 * Math.log10(d3D) +
					17.3 +
					24.9 * Math.log10(freqGHz)
				),
			);
	}
}

export type MaxRangeResult =
	| { kind: "solved"; d2DMeters: number }
	| { kind: "beyond-validity"; limitMeters: number }
	| { kind: "unreachable" };

/**
 * Calculate max 2D distance (m) at which path loss reaches the given budget (MAPL).
 */
export function solveMaxRange2D(
	scenario: PropagationScenario,
	maplDb: number,
	freqMHz: number,
	hBS: number,
	hUT: number,
): MaxRangeResult {
	if (scenario === "FSPL") {
		// No validity range to bound a search; invert Friis directly.
		const d3D = 10 ** ((maplDb + 27.55 - 20 * Math.log10(freqMHz)) / 20);
		const d2D = d2DFromD3D(d3D, hBS, hUT);
		if (d2D === null) {
			return { kind: "unreachable" };
		} else {
			return { kind: "solved", d2DMeters: d2D };
		}
	}

	// Express the validity range as 2D-distance bisection bounds. InH is bounded in 3D, so
	// convert; a null upper bound means the height gap alone exceeds the valid 3D distance.
	const { distanceMetric, distance } = SCENARIO_LIMITS[scenario];
	let lo: number;
	let hi: number;
	if (distanceMetric === "d2D") {
		lo = distance.min;
		hi = distance.max;
	} else {
		const hiD2D = d2DFromD3D(distance.max, hBS, hUT);

		if (hiD2D === null) {
			return { kind: "unreachable" };
		}

		hi = hiD2D;
		lo = d2DFromD3D(distance.min, hBS, hUT) ?? 0;
	}

	if (pathLossDb(scenario, hi, freqMHz, hBS, hUT) < maplDb) {
		return { kind: "beyond-validity", limitMeters: hi };
	}
	if (pathLossDb(scenario, lo, freqMHz, hBS, hUT) > maplDb) {
		return { kind: "unreachable" };
	}

	// Path loss grows with distance, so plain bisection converges; 60 iterations are precise enough.
	for (let i = 0; i < 60; i++) {
		const mid = (lo + hi) / 2;
		if (pathLossDb(scenario, mid, freqMHz, hBS, hUT) < maplDb) {
			lo = mid;
		} else {
			hi = mid;
		}
	}
	return { kind: "solved", d2DMeters: (lo + hi) / 2 };
}
