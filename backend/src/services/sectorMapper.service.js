/**
 * Maps raw industry descriptions or product codes to strict CCTS and CBAM sectors.
 */
export function mapToCctsSector(industry, productDesc) {
  const normalized = (industry + " " + productDesc).toLowerCase();
  
  if (normalized.includes("cement") || normalized.includes("clinker")) return "Cement";
  if (normalized.includes("steel") || normalized.includes("iron")) return "Iron & Steel";
  if (normalized.includes("aluminium") || normalized.includes("aluminum")) return "Aluminium";
  if (normalized.includes("fertiliser") || normalized.includes("urea") || normalized.includes("ammonia")) return "Fertiliser";
  if (normalized.includes("refinery") || normalized.includes("petroleum") || normalized.includes("oil")) return "Petroleum Refinery";
  if (normalized.includes("petrochemical") || normalized.includes("polymer")) return "Petrochemicals";
  if (normalized.includes("textile") || normalized.includes("yarn") || normalized.includes("fabric") || normalized.includes("apparel")) return "Textiles";
  if (normalized.includes("paper") || normalized.includes("pulp") || normalized.includes("board")) return "Paper & Pulp";
  if (normalized.includes("power") || normalized.includes("electricity") || normalized.includes("thermal")) return "Power";
  if (normalized.includes("chlor-alkali") || normalized.includes("caustic soda")) return "Chlor-Alkali";
  
  return null;
}

export function mapToCbamSector(industry, productDesc, hsCodes = []) {
  const cctsMapped = mapToCctsSector(industry, productDesc);
  const cbamExposedSectors = ["Cement", "Iron & Steel", "Aluminium", "Fertiliser", "Hydrogen", "Electricity"];
  
  if (cctsMapped && cbamExposedSectors.includes(cctsMapped)) {
    return cctsMapped === "Iron & Steel" ? "Iron and Steel" : cctsMapped;
  }
  
  // Try matching HS codes if provided
  const cbamHSCodes = {
    "Cement": ["2523"],
    "Fertilisers": ["2808", "2814", "2834", "3102", "3105"],
    "Iron and Steel": ["72", "73"],
    "Aluminium": ["76"],
    "Hydrogen": ["2804"],
    "Electricity": ["2716"]
  };
  
  for (const [sector, codes] of Object.entries(cbamHSCodes)) {
    if (hsCodes.some(code => codes.some(c => code.startsWith(c)))) {
      return sector;
    }
  }
  
  return null;
}

export function isCctsObligatedPhaseI(sector) {
  const phase1Sectors = ["Cement", "Iron & Steel", "Aluminium", "Fertiliser", "Petroleum Refinery"];
  return phase1Sectors.includes(sector);
}
