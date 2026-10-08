export type NRBand = {
  band: string;
  duplexMode: "FDD" | "TDD" | "SDL" | "SUL";
  ul: [number, number] | null;  // null if N/A
  dl: [number, number] | null;  // null if N/A
};


export const BANDS_FR2: NRBand[] = [
  { band: "n257", duplexMode: "TDD", ul: [26500, 29500], dl: [26500, 29500] },
  { band: "n258", duplexMode: "TDD", ul: [24250, 27500], dl: [24250, 27500] },
  { band: "n259", duplexMode: "TDD", ul: [39500, 43500], dl: [39500, 43500] },
  { band: "n260", duplexMode: "TDD", ul: [37000, 40000], dl: [37000, 40000] },
  { band: "n261", duplexMode: "TDD", ul: [27500, 28350], dl: [27500, 28350] },
  { band: "n262", duplexMode: "TDD", ul: [47200, 48200], dl: [47200, 48200] },
  { band: "n263", duplexMode: "TDD", ul: [57000, 71000], dl: [57000, 71000] },
];
