import type { PropagationScenario } from "./pathloss";

export function eirpDbm(
	txPowerDbm: number,
	cableLossDb: number,
	antennaGainDbi: number,
): number {
	return txPowerDbm - cableLossDb + antennaGainDbi;
}

export function thermalNoiseDbm(bandwidthHz: number): number {
	// -174 dBm/Hz: conventional thermal noise floor at T₀=290K
	return -174 + 10 * Math.log10(bandwidthHz);
}

export function receiverSensitivityDbm(
	noiseFigureDb: number,
	thermalNoiseDbm: number,
	sinrDb: number,
): number {
	return noiseFigureDb + thermalNoiseDbm + sinrDb;
}

export function maximumAllowablePathLossDb(params: {
	eirpDbm: number;
	rxAntennaGainDbi: number;
	rxCableLossDb: number;
	rxSensitivityDbm: number;
	additionalMarginDb: number;
}): number {
	return params.eirpDbm + params.rxAntennaGainDbi - params.rxCableLossDb - params.rxSensitivityDbm - params.additionalMarginDb;
}

export function formatDistance(meters: number): string {
	return meters < 1000
		? `${Math.round(meters)} m`
		: `${(meters / 1000).toFixed(2)} km`;
}

export type PropagationFamily = "UMa" | "UMi" | "RMa" | "InH" | "FSPL";

export const PROPAGATION_SCENARIOS: {
	id: PropagationScenario;
	family: PropagationFamily;
	label: string;
	condition: "LOS" | "NLOS";
}[] = [
	{
		id: "UMa-LOS",
		family: "UMa",
		label: "Urban Macro (UMa)",
		condition: "LOS",
	},
	{
		id: "UMa-NLOS",
		family: "UMa",
		label: "Urban Macro (UMa)",
		condition: "NLOS",
	},
	{
		id: "UMi-LOS",
		family: "UMi",
		label: "Urban Micro (UMi)",
		condition: "LOS",
	},
	{
		id: "UMi-NLOS",
		family: "UMi",
		label: "Urban Micro (UMi)",
		condition: "NLOS",
	},
	{
		id: "RMa-LOS",
		family: "RMa",
		label: "Rural Macro (RMa)",
		condition: "LOS",
	},
	{
		id: "RMa-NLOS",
		family: "RMa",
		label: "Rural Macro (RMa)",
		condition: "NLOS",
	},
	{
		id: "InH-LOS",
		family: "InH",
		label: "Indoor Hotspot (InH)",
		condition: "LOS",
	},
	{
		id: "InH-NLOS",
		family: "InH",
		label: "Indoor Hotspot (InH)",
		condition: "NLOS",
	},
	{
		id: "FSPL",
		family: "FSPL",
		label: "Free Space (FSPL)",
		condition: "LOS"
	},
];
