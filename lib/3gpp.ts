import {
  ALL_BAND_DEFINITIONS,
  ALL_BAND_RASTERS,
  type NrBandDefinition,
} from "@/lib/nrarfcn/provider";

export type BandMatch = {
  bandName: string; // e.g., "n78"
  duplexMode: "FDD" | "TDD" | "SDL" | "SUL";
  matchedLink: "UL" | "DL" | "UL/DL";
  frequencyRaster: number;
  rasterStep: number;
  isRasterValid: boolean;
};

export function arfcnToFrequency(nRef: number): number | null {
  // range 1: 0 - 3000 MHz
  if (nRef >= 0 && nRef < 600000) {
    return (nRef * 5) / 1000;
  }
  // range 2: 3000 - 24250 MHz
  if (nRef >= 600000 && nRef < 2016667) {
    return 3000 + (nRef - 600000) * 0.015; // 15kHz step
  }
  // range 3: 24250 - 100000+ MHz
  if (nRef >= 2016667 && nRef <= 3279165) {
    return 24250 + (nRef - 2016667) * 0.06; // 60kHz step
  }
  return null;
}

export function frequencyToArfcn(freqMHz: number): number | null {
  // range 1: 0 - 3000 MHz
  if (freqMHz >= 0 && freqMHz < 3000) {
    return Math.round((freqMHz * 1000) / 5);
  }
  // range 2: 3000 - 24250 MHz
  if (freqMHz >= 3000 && freqMHz < 24250) {
    return Math.round((freqMHz - 3000) / 0.015 + 600000);
  }
  // range 3: 24250 - 100000+ MHz
  if (freqMHz >= 24250 && freqMHz <= 100000) {
    return Math.round((freqMHz - 24250) / 0.06 + 2016667);
  }
  return null;
}

/**
 * Validates if a specific ARFCN fits the raster grid for a band.
 */
function validateRaster(
  bandId: string,
  arfcn: number,
  scope: "UL" | "DL",
): "valid" | "invalid" | "unknown" {
  const rasterDef = ALL_BAND_RASTERS.find((r) => r.band === bandId);
  if (!rasterDef) return "unknown";

  const checkGrid = (grid: [number, number, number] | null) => {
    if (!grid) return false;
    const [start, step, end] = grid;
    if (arfcn < start || arfcn > end) return false;
    // raster step is usually an integer in ARFCN domain, so modulo is safe
    return (arfcn - start) % step === 0;
  };

  // for TDD, DL and UL use the same raster grid usually
  if (scope === "DL") {
    return checkGrid(rasterDef.dl) ? "valid" : "invalid";
  }
  if (scope === "UL") {
    return checkGrid(rasterDef.ul) ? "valid" : "invalid";
  }
  return "invalid";
}

export function getBandsForFrequency(
  freqMHz: number,
  currentArfcn?: number,
): BandMatch[] {
  const matches: BandMatch[] = [];

  const validBands = ALL_BAND_DEFINITIONS.filter((def) => {
    const inDL = def.dl && freqMHz >= def.dl[0] && freqMHz <= def.dl[1];
    const inUL = def.ul && freqMHz >= def.ul[0] && freqMHz <= def.ul[1];
    return inDL || inUL;
  });

  for (const def of validBands) {
    const isTDD = def.duplexMode === "TDD";
    const isULMatch = def.ul && freqMHz >= def.ul[0] && freqMHz <= def.ul[1];
    const isDLMatch = def.dl && freqMHz >= def.dl[0] && freqMHz <= def.dl[1];

    let link: BandMatch["matchedLink"] = "DL";

    if (isTDD) {
      link = "UL/DL";
    } else if (isULMatch && !isDLMatch) {
      link = "UL";
    }

    // find ALL raster configs for this band
    const rasters = ALL_BAND_RASTERS.filter((r) => r.band === def.band);

    for (const r of rasters) {
      // use the appropriate grid based on link direction
      const grid = link === "UL" ? r.ul : r.dl;

      if (!grid) continue;

      const [start, step, end] = grid;
      let isValid = false;

      // 3. specific ARFCN validation
      if (currentArfcn !== undefined) {
        if (currentArfcn >= start && currentArfcn <= end) {
          isValid = (currentArfcn - start) % step === 0;
        }
      }

      matches.push({
        bandName: def.band,
        duplexMode: def.duplexMode,
        matchedLink: link,
        frequencyRaster: r.frequencyRaster,
        rasterStep: step,
        isRasterValid: isValid,
      });
    }
  }

  // sort numerically (n1, n2, ... n78)
  return matches.sort((a, b) => {
    if (currentArfcn !== undefined) {
      if (a.isRasterValid && !b.isRasterValid) return -1;
      if (!a.isRasterValid && b.isRasterValid) return 1;
    }
    const numA = parseInt(a.bandName.replace(/\D/g, "")) || 0;
    const numB = parseInt(b.bandName.replace(/\D/g, "")) || 0;

    // secondary sort: prefer smaller raster step (15kHz before 30kHz)
    if (numA === numB) return a.frequencyRaster - b.frequencyRaster;
    return numA - numB;
  });
}
