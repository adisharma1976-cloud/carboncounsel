/**
 * CarbonCounsel — CCTS Sectors Seed Data
 */
export const sectors = [
  { id: "sect-001", sector_name: "Cement", sub_sector: null, coverage_status: "covered", phase: "Phase I", obligated_entity_count: 85, baseline_year: 2023, target_year: 2026, gei_baseline: "720 kg CO₂e/tonne", gei_target: "690 kg CO₂e/tonne", compliance_period: "2025-2026", risk_level: "high", data_confidence: 90 },
  { id: "sect-002", sector_name: "Iron & Steel", sub_sector: null, coverage_status: "covered", phase: "Phase I", obligated_entity_count: 120, baseline_year: 2023, target_year: 2026, gei_baseline: "2.5 GJ/tonne crude steel", gei_target: "2.35 GJ/tonne crude steel", compliance_period: "2025-2026", risk_level: "high", data_confidence: 88 },
  { id: "sect-003", sector_name: "Aluminium", sub_sector: null, coverage_status: "covered", phase: "Phase I", obligated_entity_count: 15, baseline_year: 2023, target_year: 2026, gei_baseline: "14.8 GJ/tonne", gei_target: "14.0 GJ/tonne", compliance_period: "2025-2026", risk_level: "high", data_confidence: 85 },
  { id: "sect-004", sector_name: "Fertiliser", sub_sector: null, coverage_status: "covered", phase: "Phase I", obligated_entity_count: 45, baseline_year: 2023, target_year: 2026, gei_baseline: "8.2 GJ/tonne", gei_target: "7.8 GJ/tonne", compliance_period: "2025-2026", risk_level: "medium", data_confidence: 82 },
  { id: "sect-005", sector_name: "Petroleum Refinery", sub_sector: null, coverage_status: "covered", phase: "Phase I", obligated_entity_count: 25, baseline_year: 2023, target_year: 2026, gei_baseline: "62.5 kg CO₂e/tonne", gei_target: "60.0 kg CO₂e/tonne", compliance_period: "2025-2026", risk_level: "medium", data_confidence: 85 },
  { id: "sect-006", sector_name: "Petrochemicals", sub_sector: null, coverage_status: "expected", phase: "Phase II", obligated_entity_count: null, baseline_year: null, target_year: null, gei_baseline: null, gei_target: null, compliance_period: null, risk_level: "medium", data_confidence: 55 },
  { id: "sect-007", sector_name: "Textiles", sub_sector: null, coverage_status: "expected", phase: "Phase II", obligated_entity_count: null, baseline_year: null, target_year: null, gei_baseline: null, gei_target: null, compliance_period: null, risk_level: "medium", data_confidence: 45 },
  { id: "sect-008", sector_name: "Paper & Pulp", sub_sector: null, coverage_status: "expected", phase: "Phase II", obligated_entity_count: null, baseline_year: null, target_year: null, gei_baseline: null, gei_target: null, compliance_period: null, risk_level: "medium", data_confidence: 40 },
  { id: "sect-009", sector_name: "Power", sub_sector: "Thermal", coverage_status: "expected", phase: "Phase II", obligated_entity_count: null, baseline_year: null, target_year: null, gei_baseline: null, gei_target: null, compliance_period: null, risk_level: "high", data_confidence: 50 },
];

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
