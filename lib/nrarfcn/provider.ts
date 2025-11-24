// lib/nrarfcn/provider.ts
import { BANDS_FR1, type NRBand as BandDef } from "./tables/bands_fr1";
import { BANDS_FR2 } from "./tables/bands_fr2";
import { NRARFCNS_FR1, type NRBand as BandRaster } from "./tables/nrarfcns_fr1";
import { NRARFCNS_FR2 } from "./tables/nrarfcns_fr2";

// unified Types (aliasing to avoid name collision)
export type NrBandDefinition = BandDef;
export type NrBandRaster = BandRaster;

// combined datasets
export const ALL_BAND_DEFINITIONS: NrBandDefinition[] = [...BANDS_FR1, ...BANDS_FR2];
export const ALL_BAND_RASTERS: NrBandRaster[] = [...NRARFCNS_FR1, ...NRARFCNS_FR2];
