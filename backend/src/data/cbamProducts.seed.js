/**
 * CarbonCounsel — CBAM Products Seed Data
 */
export const cbamProducts = [
  { id: "cbam-001", product_name: "Iron and Steel", cn_code: "72, 73", hs_code: "72, 73", cbam_sector: "Iron and Steel", covered_status: true, direct_emissions_required: true, indirect_emissions_required: false, default_values_available: true },
  { id: "cbam-002", product_name: "Aluminium", cn_code: "76", hs_code: "76", cbam_sector: "Aluminium", covered_status: true, direct_emissions_required: true, indirect_emissions_required: true, default_values_available: true },
  { id: "cbam-003", product_name: "Cement", cn_code: "2523", hs_code: "2523", cbam_sector: "Cement", covered_status: true, direct_emissions_required: true, indirect_emissions_required: false, default_values_available: true },
  { id: "cbam-004", product_name: "Fertilisers", cn_code: "2808, 2814, 2834, 3102, 3105", hs_code: "2808, 2814, 2834, 3102, 3105", cbam_sector: "Fertilisers", covered_status: true, direct_emissions_required: true, indirect_emissions_required: false, default_values_available: true },
  { id: "cbam-005", product_name: "Hydrogen", cn_code: "2804 10 00", hs_code: "2804", cbam_sector: "Hydrogen", covered_status: true, direct_emissions_required: true, indirect_emissions_required: true, default_values_available: true },
  { id: "cbam-006", product_name: "Electricity", cn_code: "2716 00 00", hs_code: "2716", cbam_sector: "Electricity", covered_status: true, direct_emissions_required: true, indirect_emissions_required: false, default_values_available: true },
];

export const cbamExposure = [
  { product: "Iron & Steel Products", sector: "Iron & Steel", india_eu_exports_usd_mn: 4200, india_eu_exports_mt: 5.8, embedded_carbon_tco2_per_t: 2.1, estimated_cbam_liability_usd_mn: 850, top_exporters: ["Tata Steel", "JSW Steel", "SAIL", "Jindal Steel and Power", "AM/NS India"] },
  { product: "Aluminium Products", sector: "Aluminium", india_eu_exports_usd_mn: 1800, india_eu_exports_mt: 0.9, embedded_carbon_tco2_per_t: 8.5, estimated_cbam_liability_usd_mn: 520, top_exporters: ["Hindalco", "Vedanta", "NALCO"] },
  { product: "Cement / Clinker", sector: "Cement", india_eu_exports_usd_mn: 120, india_eu_exports_mt: 0.35, embedded_carbon_tco2_per_t: 0.65, estimated_cbam_liability_usd_mn: 15, top_exporters: ["UltraTech Cement", "ACC", "Ambuja Cements"] },
  { product: "Fertilisers", sector: "Fertiliser", india_eu_exports_usd_mn: 280, india_eu_exports_mt: 0.42, embedded_carbon_tco2_per_t: 1.8, estimated_cbam_liability_usd_mn: 52, top_exporters: ["Coromandel International", "Deepak Fertilisers"] },
  { product: "Hydrogen", sector: "Hydrogen", india_eu_exports_usd_mn: 5, india_eu_exports_mt: null, embedded_carbon_tco2_per_t: null, estimated_cbam_liability_usd_mn: null, top_exporters: [] },
];
