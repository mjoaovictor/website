export type NRBand = {
  band: string;
  frequencyRaster: number;
  ul: [number, number, number] | null;  // null if N/A
  dl: [number, number, number] | null;  // null if N/A
};


export const NRARFCNS_FR2: NRBand[] = [
  { band: "n257", frequencyRaster: 60, ul: [2054166, 1, 2104165], dl: [2054166, 1, 2104165] },
  { band: "n257", frequencyRaster: 120, ul: [2054167, 2, 2104165], dl: [2054167, 2, 2104165] },
  { band: "n258", frequencyRaster: 60, ul: [2016667, 1, 2070832], dl: [2016667, 1, 2070832] },
  { band: "n258", frequencyRaster: 120, ul: [2016667, 2, 2070831], dl: [2016667, 2, 2070831] },
  { band: "n259", frequencyRaster: 60, ul: [2270833, 1, 2337499], dl: [2270833, 1, 2337499] },
  { band: "n259", frequencyRaster: 120, ul: [2270833, 2, 2337499], dl: [2270833, 2, 2337499] },
  { band: "n260", frequencyRaster: 60, ul: [2229166, 1, 2279165], dl: [2229166, 1, 2279165] },
  { band: "n260", frequencyRaster: 120, ul: [2229167, 2, 2279165], dl: [2229167, 2, 2279165] },
  { band: "n261", frequencyRaster: 60, ul: [2070833, 1, 2084999], dl: [2070833, 1, 2084999] },
  { band: "n261", frequencyRaster: 120, ul: [2070833, 2, 2084999], dl: [2070833, 2, 2084999] },
  { band: "n262", frequencyRaster: 60, ul: [2399166, 1, 2415832], dl: [2399166, 1, 2415832] },
  { band: "n262", frequencyRaster: 120, ul: [2399167, 2, 2415831], dl: [2399167, 2, 2415831] },
];
