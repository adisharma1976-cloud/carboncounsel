export function normalizeCompanyName(name) {
  if (!name) return "";
  
  // Convert to lowercase for matching
  let normalized = name.toLowerCase();
  
  // Remove common corporate suffixes
  const suffixes = [
    " ltd", " limited", " pvt", " private", 
    " inc", " incorporated", " corp", " corporation",
    " co", " company", " plc", " llp"
  ];
  
  for (const suffix of suffixes) {
    if (normalized.endsWith(suffix) || normalized.endsWith(suffix + ".")) {
      normalized = normalized.replace(new RegExp(suffix + "\\.?$", "i"), "");
    }
  }
  
  // Common acronyms and aliases
  const aliases = {
    "sail": "steel authority of india",
    "ioc": "indian oil corporation",
    "iocl": "indian oil corporation",
    "hpcl": "hindustan petroleum",
    "bpcl": "bharat petroleum",
    "ongc": "oil and natural gas corporation",
    "ntpc": "national thermal power corporation",
    "nhpc": "national hydroelectric power corporation",
    "nalco": "national aluminium company",
    "rcf": "rashtriya chemicals and fertilizers",
    "nfl": "national fertilizers",
    "gsfc": "gujarat state fertilizers and chemicals",
    "tnpl": "tamil nadu newsprint and papers",
    "gacl": "gujarat alkalies and chemicals",
    "mrpl": "mangalore refinery and petrochemicals",
    "cpcl": "chennai petroleum corporation",
    "amns": "am/ns india",
    "arcelormittal nippon steel": "am/ns india",
    "acc": "acc", // avoid matching full name if known by acronym
    "tisco": "tata steel"
  };

  if (aliases[normalized]) {
    normalized = aliases[normalized];
  }

  return normalized.trim();
}

export function matchCompany(name, companiesList) {
  const normalizedQuery = normalizeCompanyName(name);
  
  // 1. Exact match on normalized name
  const exactMatch = companiesList.find(c => 
    normalizeCompanyName(c.company_name) === normalizedQuery ||
    (c.normalized_name && c.normalized_name.replace(/_/g, " ") === normalizedQuery)
  );
  if (exactMatch) return exactMatch;
  
  // 2. Symbol match
  const symbolMatch = companiesList.find(c => 
    c.nse_symbol && c.nse_symbol.toLowerCase() === name.toLowerCase() ||
    c.bse_code && c.bse_code === name
  );
  if (symbolMatch) return symbolMatch;

  // 3. Substring match
  const substringMatch = companiesList.find(c => {
    const cNorm = normalizeCompanyName(c.company_name);
    return cNorm.includes(normalizedQuery) || normalizedQuery.includes(cNorm);
  });
  
  return substringMatch || null;
}
