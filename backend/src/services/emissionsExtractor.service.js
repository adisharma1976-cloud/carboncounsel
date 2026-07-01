/**
 * Extracts structured emissions data from unstructured text (e.g. from BRSR/Annual Reports).
 * This simulates the NLP extraction pipeline that parses standard BRSR formats.
 */
export function extractEmissionsFromText(text, companyContext = {}) {
  // Mock logic to simulate parsing a document.
  // In a real system, this would use regex or a lightweight NER model to extract specific KPIs.
  
  const results = {
    scope_1_emissions_tco2e: null,
    scope_2_emissions_tco2e: null,
    scope_3_emissions_tco2e: null,
    total_energy_consumption: null,
    renewable_energy_consumption: null,
    emissions_intensity: null,
    energy_intensity: null,
    financial_year: extractFinancialYear(text),
    confidence_score: 0
  };

  const s1Match = text.match(/scope 1(?: emissions)?[^\d]*([\d,]+(?:\.\d+)?)\s*(tco2e|metric tonnes of co2 equivalent|mtco2e)/i);
  if (s1Match) {
    results.scope_1_emissions_tco2e = parseFloat(s1Match[1].replace(/,/g, ''));
    results.confidence_score += 25;
  }

  const s2Match = text.match(/scope 2(?: emissions)?[^\d]*([\d,]+(?:\.\d+)?)\s*(tco2e|metric tonnes of co2 equivalent|mtco2e)/i);
  if (s2Match) {
    results.scope_2_emissions_tco2e = parseFloat(s2Match[1].replace(/,/g, ''));
    results.confidence_score += 25;
  }

  const reMatch = text.match(/renewable energy(?: share| consumption| percentage)?[^\d]*([\d,]+(?:\.\d+)?)\s*(%|percent)/i);
  if (reMatch) {
    results.renewable_energy_consumption = parseFloat(reMatch[1]);
    results.confidence_score += 15;
  }
  
  const intensityMatch = text.match(/(?:emissions|ghg) intensity[^\d]*([\d,]+(?:\.\d+)?)\s*(tco2e\/million|tco2e\/mt|kgco2e\/t)/i);
  if (intensityMatch) {
    results.emissions_intensity = parseFloat(intensityMatch[1].replace(/,/g, ''));
    results.confidence_score += 15;
  }

  // Fallback to company context if extraction fails (simulating seeded data acting as ground truth)
  if (!results.scope_1_emissions_tco2e && companyContext.scope_1) {
    // scale seeded data from MT to tCO2e to match schema
    results.scope_1_emissions_tco2e = companyContext.scope_1 * 1000000; 
  }
  if (!results.scope_2_emissions_tco2e && companyContext.scope_2) {
    results.scope_2_emissions_tco2e = companyContext.scope_2 * 1000000;
  }
  if (!results.renewable_energy_consumption && companyContext.re_consumption) {
    results.renewable_energy_consumption = companyContext.re_consumption;
  }

  return results;
}

function extractFinancialYear(text) {
  const fyMatch = text.match(/(?:FY|Financial Year)\s*(20\d{2}-?\d{2})/i);
  return fyMatch ? fyMatch[1] : "2023-24"; // default to latest full cycle
}
