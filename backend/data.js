/**
 * CarbonCounsel — Structured Data Layer
 * Comprehensive datasets for India's carbon market intelligence
 */

// ══════════════════════════════════════════════════════════════════════════════
// 1. COMPANY DATABASE — Indian companies with carbon exposure
// ══════════════════════════════════════════════════════════════════════════════
export const companies = [
  // CEMENT
  { id: "comp-001", name: "UltraTech Cement", sector: "Cement", bseCode: "532538", nseSymbol: "ULTRACEMCO", revenue: 63280, revenueUnit: "₹ Cr", employees: 22000, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 695, geiTarget: 720, geiUnit: "kg CO₂e/tonne", scope1: 45.2, scope2: 8.1, scope1Unit: "MT CO₂e", reConsumption: 22, reTarget: 34, cbamExposed: true, cbamProducts: ["Clinker", "Portland Cement"], esrRating: "AA", disclosureLevel: "High", lastReported: "2026-03-31", exposureScore: 8.4, riskLevel: "High" },
  { id: "comp-002", name: "Ambuja Cements (Adani)", sector: "Cement", bseCode: "500425", nseSymbol: "AMBUJACEM", revenue: 33200, revenueUnit: "₹ Cr", employees: 10500, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 710, geiTarget: 720, geiUnit: "kg CO₂e/tonne", scope1: 28.6, scope2: 5.2, scope1Unit: "MT CO₂e", reConsumption: 18, reTarget: 30, cbamExposed: true, cbamProducts: ["Clinker", "Grey Cement"], esrRating: "A", disclosureLevel: "Medium", lastReported: "2026-03-31", exposureScore: 7.8, riskLevel: "High" },
  { id: "comp-003", name: "Shree Cement", sector: "Cement", bseCode: "500387", nseSymbol: "SHREECEM", revenue: 19800, revenueUnit: "₹ Cr", employees: 6500, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 680, geiTarget: 720, geiUnit: "kg CO₂e/tonne", scope1: 18.4, scope2: 3.1, scope1Unit: "MT CO₂e", reConsumption: 54, reTarget: 50, cbamExposed: true, cbamProducts: ["Cement"], esrRating: "AA", disclosureLevel: "High", lastReported: "2026-03-31", exposureScore: 6.5, riskLevel: "Medium" },
  { id: "comp-004", name: "ACC Ltd", sector: "Cement", bseCode: "500410", nseSymbol: "ACC", revenue: 20150, revenueUnit: "₹ Cr", employees: 7200, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 735, geiTarget: 720, geiUnit: "kg CO₂e/tonne", scope1: 20.1, scope2: 4.6, scope1Unit: "MT CO₂e", reConsumption: 15, reTarget: 28, cbamExposed: true, cbamProducts: ["Portland Cement"], esrRating: "BBB", disclosureLevel: "Medium", lastReported: "2026-03-31", exposureScore: 8.9, riskLevel: "High" },
  { id: "comp-005", name: "Dalmia Bharat", sector: "Cement", bseCode: "542216", nseSymbol: "DALBHARAT", revenue: 14300, revenueUnit: "₹ Cr", employees: 4100, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 670, geiTarget: 720, geiUnit: "kg CO₂e/tonne", scope1: 13.8, scope2: 2.5, scope1Unit: "MT CO₂e", reConsumption: 42, reTarget: 60, cbamExposed: false, cbamProducts: [], esrRating: "AA", disclosureLevel: "High", lastReported: "2026-03-31", exposureScore: 5.8, riskLevel: "Medium" },

  // IRON & STEEL
  { id: "comp-006", name: "Tata Steel", sector: "Iron & Steel", bseCode: "500470", nseSymbol: "TATASTEEL", revenue: 227000, revenueUnit: "₹ Cr", employees: 77000, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 2.6, geiTarget: 2.5, geiUnit: "GJ/tonne", scope1: 82.3, scope2: 18.7, scope1Unit: "MT CO₂e", reConsumption: 12, reTarget: 25, cbamExposed: true, cbamProducts: ["Hot Rolled Coils", "Flat Products"], esrRating: "A", disclosureLevel: "High", lastReported: "2026-03-31", exposureScore: 8.7, riskLevel: "High" },
  { id: "comp-007", name: "JSW Steel", sector: "Iron & Steel", bseCode: "500228", nseSymbol: "JSWSTEEL", revenue: 179000, revenueUnit: "₹ Cr", employees: 18000, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 2.4, geiTarget: 2.5, geiUnit: "GJ/tonne", scope1: 65.1, scope2: 14.2, scope1Unit: "MT CO₂e", reConsumption: 28, reTarget: 35, cbamExposed: true, cbamProducts: ["HR Coils", "CR Coils", "Galvanized"], esrRating: "AA", disclosureLevel: "High", lastReported: "2026-03-31", exposureScore: 7.2, riskLevel: "High" },
  { id: "comp-008", name: "SAIL (Steel Authority of India)", sector: "Iron & Steel", bseCode: "500113", nseSymbol: "SAIL", revenue: 105000, revenueUnit: "₹ Cr", employees: 60000, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 2.9, geiTarget: 2.5, geiUnit: "GJ/tonne", scope1: 95.4, scope2: 22.1, scope1Unit: "MT CO₂e", reConsumption: 6, reTarget: 20, cbamExposed: true, cbamProducts: ["Rails", "Structural Steel"], esrRating: "BB", disclosureLevel: "Low", lastReported: "2025-12-31", exposureScore: 9.5, riskLevel: "High" },
  { id: "comp-009", name: "Jindal Steel & Power", sector: "Iron & Steel", bseCode: "532286", nseSymbol: "JINDALSTEL", revenue: 53000, revenueUnit: "₹ Cr", employees: 22000, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 2.55, geiTarget: 2.5, geiUnit: "GJ/tonne", scope1: 38.6, scope2: 8.8, scope1Unit: "MT CO₂e", reConsumption: 18, reTarget: 30, cbamExposed: true, cbamProducts: ["DRI", "Steel Plates"], esrRating: "A", disclosureLevel: "Medium", lastReported: "2026-03-31", exposureScore: 8.1, riskLevel: "High" },

  // ALUMINIUM
  { id: "comp-010", name: "Hindalco Industries", sector: "Aluminium", bseCode: "500440", nseSymbol: "HINDALCO", revenue: 222000, revenueUnit: "₹ Cr", employees: 72000, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 14.2, geiTarget: 14.8, geiUnit: "GJ/tonne", scope1: 15.8, scope2: 28.4, scope1Unit: "MT CO₂e", reConsumption: 9, reTarget: 20, cbamExposed: true, cbamProducts: ["Aluminium Ingots", "Flat Rolled"], esrRating: "A", disclosureLevel: "High", lastReported: "2026-03-31", exposureScore: 7.6, riskLevel: "High" },
  { id: "comp-011", name: "Vedanta Aluminium", sector: "Aluminium", bseCode: "500295", nseSymbol: "VEDL", revenue: 146000, revenueUnit: "₹ Cr", employees: 30000, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 15.5, geiTarget: 14.8, geiUnit: "GJ/tonne", scope1: 21.3, scope2: 35.7, scope1Unit: "MT CO₂e", reConsumption: 5, reTarget: 15, cbamExposed: true, cbamProducts: ["Primary Aluminium"], esrRating: "BBB", disclosureLevel: "Medium", lastReported: "2026-03-31", exposureScore: 9.2, riskLevel: "High" },
  { id: "comp-012", name: "NALCO", sector: "Aluminium", bseCode: "532234", nseSymbol: "NATIONALUM", revenue: 14200, revenueUnit: "₹ Cr", employees: 7500, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 16.1, geiTarget: 14.8, geiUnit: "GJ/tonne", scope1: 8.9, scope2: 14.2, scope1Unit: "MT CO₂e", reConsumption: 3, reTarget: 10, cbamExposed: false, cbamProducts: [], esrRating: "BB", disclosureLevel: "Low", lastReported: "2025-09-30", exposureScore: 9.1, riskLevel: "High" },

  // FERTILISER
  { id: "comp-013", name: "Chambal Fertilisers", sector: "Fertiliser", bseCode: "500085", nseSymbol: "CHAMBLFERT", revenue: 18900, revenueUnit: "₹ Cr", employees: 2200, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 7.8, geiTarget: 8.2, geiUnit: "GJ/tonne", scope1: 4.2, scope2: 0.8, scope1Unit: "MT CO₂e", reConsumption: 12, reTarget: 20, cbamExposed: false, cbamProducts: [], esrRating: "A", disclosureLevel: "Medium", lastReported: "2026-03-31", exposureScore: 5.4, riskLevel: "Medium" },
  { id: "comp-014", name: "Coromandel International", sector: "Fertiliser", bseCode: "506395", nseSymbol: "COROMANDEL", revenue: 22500, revenueUnit: "₹ Cr", employees: 5800, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 8.5, geiTarget: 8.2, geiUnit: "GJ/tonne", scope1: 3.1, scope2: 1.2, scope1Unit: "MT CO₂e", reConsumption: 8, reTarget: 18, cbamExposed: true, cbamProducts: ["DAP", "NPK"], esrRating: "BBB", disclosureLevel: "Medium", lastReported: "2026-03-31", exposureScore: 6.8, riskLevel: "Medium" },

  // PETROLEUM REFINERY
  { id: "comp-015", name: "Reliance Industries (Refining)", sector: "Petroleum Refinery", bseCode: "500325", nseSymbol: "RELIANCE", revenue: 975000, revenueUnit: "₹ Cr", employees: 236000, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 58.2, geiTarget: 62.5, geiUnit: "kg CO₂e/tonne", scope1: 55.8, scope2: 12.3, scope1Unit: "MT CO₂e", reConsumption: 15, reTarget: 30, cbamExposed: false, cbamProducts: [], esrRating: "AA", disclosureLevel: "High", lastReported: "2026-03-31", exposureScore: 6.2, riskLevel: "Medium" },
  { id: "comp-016", name: "Indian Oil Corporation", sector: "Petroleum Refinery", bseCode: "530965", nseSymbol: "IOC", revenue: 865000, revenueUnit: "₹ Cr", employees: 31000, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 64.8, geiTarget: 62.5, geiUnit: "kg CO₂e/tonne", scope1: 42.1, scope2: 9.7, scope1Unit: "MT CO₂e", reConsumption: 8, reTarget: 20, cbamExposed: false, cbamProducts: [], esrRating: "A", disclosureLevel: "Medium", lastReported: "2026-03-31", exposureScore: 7.9, riskLevel: "High" },
  { id: "comp-017", name: "BPCL", sector: "Petroleum Refinery", bseCode: "500547", nseSymbol: "BPCL", revenue: 545000, revenueUnit: "₹ Cr", employees: 12000, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 61.5, geiTarget: 62.5, geiUnit: "kg CO₂e/tonne", scope1: 18.5, scope2: 4.3, scope1Unit: "MT CO₂e", reConsumption: 10, reTarget: 22, cbamExposed: false, cbamProducts: [], esrRating: "A", disclosureLevel: "Medium", lastReported: "2026-03-31", exposureScore: 6.0, riskLevel: "Medium" },
  { id: "comp-018", name: "HPCL", sector: "Petroleum Refinery", bseCode: "500104", nseSymbol: "HINDPETRO", revenue: 467000, revenueUnit: "₹ Cr", employees: 10000, cctsCovered: true, cctsPhase: "Phase I", geiPerformance: 63.1, geiTarget: 62.5, geiUnit: "kg CO₂e/tonne", scope1: 15.2, scope2: 3.8, scope1Unit: "MT CO₂e", reConsumption: 7, reTarget: 18, cbamExposed: false, cbamProducts: [], esrRating: "BBB", disclosureLevel: "Medium", lastReported: "2026-03-31", exposureScore: 7.1, riskLevel: "Medium" },

  // PETROCHEMICALS
  { id: "comp-019", name: "GAIL India", sector: "Petrochemicals", bseCode: "532155", nseSymbol: "GAIL", revenue: 138000, revenueUnit: "₹ Cr", employees: 4200, cctsCovered: true, cctsPhase: "Phase II", geiPerformance: 9.8, geiTarget: 10.1, geiUnit: "GJ/tonne", scope1: 12.8, scope2: 3.1, scope1Unit: "MT CO₂e", reConsumption: 14, reTarget: 25, cbamExposed: false, cbamProducts: [], esrRating: "A", disclosureLevel: "High", lastReported: "2026-03-31", exposureScore: 5.5, riskLevel: "Medium" },

  // TEXTILES (not yet covered but CBAM risk)
  { id: "comp-020", name: "Arvind Ltd", sector: "Textiles", bseCode: "500101", nseSymbol: "ARVIND", revenue: 8200, revenueUnit: "₹ Cr", employees: 28000, cctsCovered: false, cctsPhase: null, geiPerformance: 3.2, geiTarget: null, geiUnit: "GJ/tonne", scope1: 0.42, scope2: 0.28, scope1Unit: "MT CO₂e", reConsumption: 25, reTarget: 40, cbamExposed: true, cbamProducts: ["Denim", "Woven Fabrics"], esrRating: "A", disclosureLevel: "High", lastReported: "2026-03-31", exposureScore: 4.8, riskLevel: "Medium" },
  { id: "comp-021", name: "Welspun India", sector: "Textiles", bseCode: "514162", nseSymbol: "WELSPUNIND", revenue: 9500, revenueUnit: "₹ Cr", employees: 25000, cctsCovered: false, cctsPhase: null, geiPerformance: 3.5, geiTarget: null, geiUnit: "GJ/tonne", scope1: 0.35, scope2: 0.22, scope1Unit: "MT CO₂e", reConsumption: 38, reTarget: 50, cbamExposed: true, cbamProducts: ["Terry Towels", "Bed Linen"], esrRating: "AA", disclosureLevel: "High", lastReported: "2026-03-31", exposureScore: 3.9, riskLevel: "Low" },
  { id: "comp-022", name: "Raymond Ltd", sector: "Textiles", bseCode: "500330", nseSymbol: "RAYMOND", revenue: 9100, revenueUnit: "₹ Cr", employees: 15000, cctsCovered: false, cctsPhase: null, geiPerformance: 3.8, geiTarget: null, geiUnit: "GJ/tonne", scope1: 0.18, scope2: 0.14, scope1Unit: "MT CO₂e", reConsumption: 15, reTarget: 30, cbamExposed: true, cbamProducts: ["Suiting Fabrics"], esrRating: "BBB", disclosureLevel: "Medium", lastReported: "2026-03-31", exposureScore: 5.2, riskLevel: "Medium" },

  // POWER
  { id: "comp-023", name: "NTPC Ltd", sector: "Power", bseCode: "532555", nseSymbol: "NTPC", revenue: 178000, revenueUnit: "₹ Cr", employees: 17000, cctsCovered: false, cctsPhase: "Phase II (expected)", geiPerformance: null, geiTarget: null, geiUnit: null, scope1: 285.0, scope2: 2.1, scope1Unit: "MT CO₂e", reConsumption: 5, reTarget: 30, cbamExposed: false, cbamProducts: [], esrRating: "BB", disclosureLevel: "High", lastReported: "2026-03-31", exposureScore: 9.8, riskLevel: "High" },
  { id: "comp-024", name: "Adani Green Energy", sector: "Renewable Energy", bseCode: "ASM", nseSymbol: "ADANIGREEN", revenue: 12800, revenueUnit: "₹ Cr", employees: 3500, cctsCovered: false, cctsPhase: null, geiPerformance: null, geiTarget: null, geiUnit: null, scope1: 0.05, scope2: 0.02, scope1Unit: "MT CO₂e", reConsumption: 100, reTarget: 100, cbamExposed: false, cbamProducts: [], esrRating: "AAA", disclosureLevel: "High", lastReported: "2026-03-31", exposureScore: 1.2, riskLevel: "Low" },
];

// ══════════════════════════════════════════════════════════════════════════════
// 2. CARBON CREDIT PRICE DATA (Historical & Current)
// ══════════════════════════════════════════════════════════════════════════════
export const carbonPrices = {
  recEscert: {
    name: "India REC & ESCert (IEX/PXIL)",
    currency: "INR",
    unit: "per certificate",
    current: 450,
    history: [
      { date: "2025-01", price: 380 }, { date: "2025-02", price: 395 }, { date: "2025-03", price: 410 },
      { date: "2025-04", price: 420 }, { date: "2025-05", price: 415 }, { date: "2025-06", price: 430 },
      { date: "2025-07", price: 440 }, { date: "2025-08", price: 450 }, { date: "2025-09", price: 460 },
      { date: "2025-10", price: 455 }, { date: "2025-11", price: 465 }, { date: "2025-12", price: 480 },
      { date: "2026-01", price: 490 }, { date: "2026-02", price: 475 }, { date: "2026-03", price: 460 },
      { date: "2026-04", price: 455 }, { date: "2026-05", price: 445 }, { date: "2026-06", price: 450 },
    ],
  },
  euETS: {
    name: "EU ETS (European Union Emission Trading System)",
    currency: "EUR",
    unit: "per tonne CO₂",
    current: 68.5,
    history: [
      { date: "2025-01", price: 62 }, { date: "2025-02", price: 58 }, { date: "2025-03", price: 55 },
      { date: "2025-04", price: 59 }, { date: "2025-05", price: 63 }, { date: "2025-06", price: 67 },
      { date: "2025-07", price: 71 }, { date: "2025-08", price: 74 }, { date: "2025-09", price: 70 },
      { date: "2025-10", price: 68 }, { date: "2025-11", price: 65 }, { date: "2025-12", price: 64 },
      { date: "2026-01", price: 66 }, { date: "2026-02", price: 68 }, { date: "2026-03", price: 70 },
      { date: "2026-04", price: 72 }, { date: "2026-05", price: 69 }, { date: "2026-06", price: 68.5 },
    ],
  },
  vcm: {
    name: "Voluntary Carbon Market (Global Average)",
    currency: "USD",
    unit: "per tonne CO₂e",
    current: 8.20,
    history: [
      { date: "2025-01", price: 5.80 }, { date: "2025-02", price: 5.50 }, { date: "2025-03", price: 5.20 },
      { date: "2025-04", price: 5.60 }, { date: "2025-05", price: 6.10 }, { date: "2025-06", price: 6.50 },
      { date: "2025-07", price: 6.80 }, { date: "2025-08", price: 7.10 }, { date: "2025-09", price: 7.40 },
      { date: "2025-10", price: 7.60 }, { date: "2025-11", price: 7.80 }, { date: "2025-12", price: 7.90 },
      { date: "2026-01", price: 7.50 }, { date: "2026-02", price: 7.70 }, { date: "2026-03", price: 7.90 },
      { date: "2026-04", price: 8.00 }, { date: "2026-05", price: 8.10 }, { date: "2026-06", price: 8.20 },
    ],
  },
  cbamShadow: {
    name: "CBAM Shadow Price (India Export Exposure)",
    currency: "EUR",
    unit: "per tonne CO₂ embedded",
    current: 68.5,
    history: [
      { date: "2025-01", price: 62 }, { date: "2025-06", price: 67 }, { date: "2025-12", price: 64 }, { date: "2026-06", price: 68.5 },
    ],
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// 3. SECTOR EMISSIONS DATA (India - Annual)
// ══════════════════════════════════════════════════════════════════════════════
export const sectorEmissions = [
  { sector: "Power", emissions: 1180, unit: "MT CO₂e", share: 40.2, trend: "stable", year: 2025 },
  { sector: "Iron & Steel", emissions: 320, unit: "MT CO₂e", share: 10.9, trend: "rising", year: 2025 },
  { sector: "Cement", emissions: 270, unit: "MT CO₂e", share: 9.2, trend: "rising", year: 2025 },
  { sector: "Petroleum Refinery", emissions: 180, unit: "MT CO₂e", share: 6.1, trend: "stable", year: 2025 },
  { sector: "Aluminium", emissions: 120, unit: "MT CO₂e", share: 4.1, trend: "rising", year: 2025 },
  { sector: "Fertiliser", emissions: 85, unit: "MT CO₂e", share: 2.9, trend: "declining", year: 2025 },
  { sector: "Petrochemicals", emissions: 72, unit: "MT CO₂e", share: 2.5, trend: "rising", year: 2025 },
  { sector: "Textiles", emissions: 45, unit: "MT CO₂e", share: 1.5, trend: "stable", year: 2025 },
  { sector: "Paper & Pulp", emissions: 28, unit: "MT CO₂e", share: 1.0, trend: "declining", year: 2025 },
  { sector: "Transport", emissions: 340, unit: "MT CO₂e", share: 11.6, trend: "rising", year: 2025 },
  { sector: "Agriculture", emissions: 195, unit: "MT CO₂e", share: 6.6, trend: "stable", year: 2025 },
  { sector: "Buildings", emissions: 105, unit: "MT CO₂e", share: 3.6, trend: "rising", year: 2025 },
];

// ══════════════════════════════════════════════════════════════════════════════
// 4. REGULATORY TIMELINE (Key milestones in India's carbon market)
// ══════════════════════════════════════════════════════════════════════════════
export const regulatoryTimeline = [
  { date: "2022-08-03", event: "Energy Conservation (Amendment) Bill 2022 passed by Parliament", type: "Legislation", impact: "High", details: "Enables carbon credit trading in India through amendment to Energy Conservation Act 2001" },
  { date: "2023-06-28", event: "CCTS Notification — Carbon Credit Trading Scheme published", type: "Notification", impact: "High", details: "MoEFCC notifies the Carbon Credit Trading Scheme under Energy Conservation Act" },
  { date: "2023-07-01", event: "BEE designated as Administrator of CCTS", type: "Administrative", impact: "High", details: "Bureau of Energy Efficiency designated to administer CCTS operations" },
  { date: "2023-10-01", event: "EU CBAM Transitional Phase begins", type: "International", impact: "High", details: "EU Carbon Border Adjustment Mechanism transitional reporting phase starts" },
  { date: "2024-01-15", event: "India Carbon Market Rules — Draft published", type: "Regulation", impact: "High", details: "Draft rules for Indian Carbon Market published for stakeholder consultation" },
  { date: "2024-04-01", event: "BEE begins sectoral GEI baseline assessment", type: "Administrative", impact: "Medium", details: "BEE starts collecting baseline GEI data from covered sectors" },
  { date: "2024-06-22", event: "Green Credit Programme Rules notified", type: "Notification", impact: "Medium", details: "MoEFCC notifies Green Credit Programme for environmental activities" },
  { date: "2024-09-01", event: "CCTS Phase I — Compliance cycle notification", type: "Notification", impact: "High", details: "First compliance cycle parameters and timelines notified by BEE" },
  { date: "2024-12-01", event: "SEBI framework for ESG disclosure enhanced", type: "Regulation", impact: "Medium", details: "SEBI mandates enhanced Business Responsibility and Sustainability Reporting (BRSR)" },
  { date: "2025-03-31", event: "First CCTS compliance period ends", type: "Deadline", impact: "High", details: "End of first compliance period under CCTS Phase I" },
  { date: "2025-06-30", event: "CCTS — First reconciliation and certificate issuance", type: "Milestone", impact: "High", details: "BEE reconciles performance vs targets, issues first ESCerts/CCCs" },
  { date: "2025-10-01", event: "India Carbon Market trading platform goes live (beta)", type: "Milestone", impact: "High", details: "CCTS trading platform operated by designated exchange begins beta" },
  { date: "2026-01-01", event: "EU CBAM — Full enforcement begins", type: "International", impact: "High", details: "EU CBAM moves from transitional to definitive regime; financial obligations start" },
  { date: "2026-03-31", event: "CCTS Phase I — Second compliance period ends", type: "Deadline", impact: "High", details: "Second annual compliance period under CCTS Phase I closes" },
  { date: "2026-06-28", event: "BEE revises cement sector GEI baseline", type: "Update", impact: "Medium", details: "3.2% downward revision increases compliance burden" },
  { date: "2026-09-30", event: "CCTS Phase II sectors — Expected notification", type: "Expected", impact: "Medium", details: "Petrochemicals and additional sectors expected to be formally covered" },
  { date: "2027-01-01", event: "Article 6.2 bilateral agreements (expected)", type: "Expected", impact: "Medium", details: "India expected to finalize bilateral ITMO agreements with Switzerland, UAE, Japan" },
];

// ══════════════════════════════════════════════════════════════════════════════
// 5. CARBON PROJECT PIPELINE (Expanded)
// ══════════════════════════════════════════════════════════════════════════════
export const projectPipeline = [
  { id: "proj-001", name: "Rajasthan Solar + Storage Project", type: "Renewable Energy", subType: "Solar PV + BESS", registry: "Gold Standard", status: "Verified", vintage: "2024-2025", creditsIssued: 45200, creditsPending: 12000, methodology: "GS-RE-001", state: "Rajasthan", capacity: "250 MW", additionality: "Strong", permanenceRisk: "Low", leakageRisk: "Negligible", doubleCounting: "No Flag", buyerReadiness: 87, lastAudit: "2026-03-15", developer: "ReNew Power" },
  { id: "proj-002", name: "Gujarat Industrial Energy Efficiency Program", type: "Energy Efficiency", subType: "Industrial EE", registry: "VCS (Verra)", status: "Under Verification", vintage: "2023-2024", creditsIssued: 0, creditsPending: 28400, methodology: "VM0038", state: "Gujarat", capacity: "N/A", additionality: "Moderate", permanenceRisk: "Low", leakageRisk: "Low", doubleCounting: "Review Required", buyerReadiness: 54, lastAudit: "2026-01-20", developer: "EESL" },
  { id: "proj-003", name: "Madhya Pradesh Avoided Deforestation (REDD+)", type: "Forestry & Land Use", subType: "REDD+", registry: "VCS (Verra)", status: "Active", vintage: "2022-2025", creditsIssued: 89700, creditsPending: 5000, methodology: "VM0015", state: "Madhya Pradesh", capacity: "45,000 ha", additionality: "Strong", permanenceRisk: "Medium", leakageRisk: "Medium", doubleCounting: "Monitoring", buyerReadiness: 71, lastAudit: "2025-11-30", developer: "WildForests India" },
  { id: "proj-004", name: "Tamil Nadu Wind Farm Cluster", type: "Renewable Energy", subType: "Wind", registry: "Gold Standard", status: "Active", vintage: "2023-2026", creditsIssued: 32100, creditsPending: 8500, methodology: "GS-RE-001", state: "Tamil Nadu", capacity: "180 MW", additionality: "Strong", permanenceRisk: "Low", leakageRisk: "Negligible", doubleCounting: "No Flag", buyerReadiness: 82, lastAudit: "2026-02-28", developer: "Suzlon Energy" },
  { id: "proj-005", name: "Bihar Clean Cookstove Distribution", type: "Household Energy", subType: "Improved Cookstoves", registry: "Gold Standard", status: "Active", vintage: "2024-2027", creditsIssued: 18500, creditsPending: 42000, methodology: "GS-TPDDTEC", state: "Bihar", capacity: "200,000 households", additionality: "Strong", permanenceRisk: "Low", leakageRisk: "Low", doubleCounting: "No Flag", buyerReadiness: 75, lastAudit: "2026-01-15", developer: "Envirofit India" },
  { id: "proj-006", name: "Maharashtra Landfill Gas Capture", type: "Waste Management", subType: "Landfill Gas", registry: "VCS (Verra)", status: "Registered", vintage: "2025-2030", creditsIssued: 0, creditsPending: 15200, methodology: "AMS-III.G", state: "Maharashtra", capacity: "12 MW", additionality: "Moderate", permanenceRisk: "Low", leakageRisk: "Low", doubleCounting: "No Flag", buyerReadiness: 48, lastAudit: null, developer: "IL&FS Environmental" },
  { id: "proj-007", name: "Karnataka Biogas from Agricultural Waste", type: "Biogas", subType: "Agricultural Waste", registry: "Gold Standard", status: "Under Validation", vintage: "2026-2030", creditsIssued: 0, creditsPending: 8800, methodology: "GS-BE-001", state: "Karnataka", capacity: "5,000 digesters", additionality: "Strong", permanenceRisk: "Low", leakageRisk: "Negligible", doubleCounting: "No Flag", buyerReadiness: 35, lastAudit: null, developer: "SELCO Foundation" },
  { id: "proj-008", name: "Odisha Mangrove Restoration", type: "Blue Carbon", subType: "Mangrove Restoration", registry: "VCS (Verra)", status: "Under Validation", vintage: "2026-2046", creditsIssued: 0, creditsPending: 125000, methodology: "VM0033", state: "Odisha", capacity: "2,500 ha", additionality: "Strong", permanenceRisk: "Medium", leakageRisk: "Low", doubleCounting: "No Flag", buyerReadiness: 42, lastAudit: null, developer: "Wetlands International" },
];

// ══════════════════════════════════════════════════════════════════════════════
// 6. CBAM EXPOSURE MAP (India → EU Export Data)
// ══════════════════════════════════════════════════════════════════════════════
export const cbamExposure = [
  { product: "Iron and Steel", cnCode: "72", exportValue: 5820, unit: "$ million", euShare: 15.2, embeddedCarbon: 2.1, embeddedUnit: "tCO₂/tonne", cbamLiability: 143.7, cbamUnit: "€ per tonne", annualExposure: 835, annualUnit: "$ million" },
  { product: "Aluminium", cnCode: "76", exportValue: 3240, unit: "$ million", euShare: 12.8, embeddedCarbon: 8.4, embeddedUnit: "tCO₂/tonne", cbamLiability: 575.4, cbamUnit: "€ per tonne", annualExposure: 414, annualUnit: "$ million" },
  { product: "Cement / Clinker", cnCode: "2523", exportValue: 890, unit: "$ million", euShare: 8.5, embeddedCarbon: 0.72, embeddedUnit: "tCO₂/tonne", cbamLiability: 49.3, cbamUnit: "€ per tonne", annualExposure: 75, annualUnit: "$ million" },
  { product: "Fertilisers (Nitrogen)", cnCode: "3102", exportValue: 2150, unit: "$ million", euShare: 6.2, embeddedCarbon: 1.6, embeddedUnit: "tCO₂/tonne", cbamLiability: 109.6, cbamUnit: "€ per tonne", annualExposure: 133, annualUnit: "$ million" },
  { product: "Hydrogen", cnCode: "2804", exportValue: 120, unit: "$ million", euShare: 3.1, embeddedCarbon: 9.3, embeddedUnit: "tCO₂/tonne", cbamLiability: 637.1, cbamUnit: "€ per tonne", annualExposure: 3.7, annualUnit: "$ million" },
  { product: "Electricity", cnCode: "2716", exportValue: 45, unit: "$ million", euShare: 0, embeddedCarbon: 0.82, embeddedUnit: "tCO₂/MWh", cbamLiability: 56.2, cbamUnit: "€ per MWh", annualExposure: 0, annualUnit: "$ million" },
];
