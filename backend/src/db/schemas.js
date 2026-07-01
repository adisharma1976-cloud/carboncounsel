import { z } from 'zod';

export const SourceTier = z.enum(['A', 'B', 'C', 'D', 'E']);

export const Provenance = z.enum([
  'official',
  'company_disclosed',
  'registry',
  'exchange',
  'media',
  'inferred',
  'estimated',
  'user_uploaded',
]);

export const DataStatus = z.enum([
  'verified',
  'unverified',
  'estimated',
  'inferred',
  'stale',
  'needs_review',
]);

export const ImpactLevel = z.enum(['low', 'medium', 'high', 'critical']);

export const RiskLevel = z.enum(['low', 'medium', 'high', 'unknown']);
const ConfidenceScore = z.number().min(0).max(100);
const NullableString = z.string().nullable();

export const SourceDocumentSchema = z
  .object({
    id: z.string(),
    source_name: z.string(),
    source_type: z.string(),
    source_tier: SourceTier,
    source_url: z.string().url(),
    title: z.string(),
    document_type: z.string(),
    publication_date: z.string(),
    effective_date: z.string(),
    scraped_at: z.string(),
    updated_at: z.string(),
    jurisdiction: z.string(),
    ministry_or_body: z.string(),
    sector_tags: z.array(z.string()),
    company_tags: z.array(z.string()),
    project_tags: z.array(z.string()),
    keywords: z.array(z.string()),
    raw_text: z.string(),
    clean_text: z.string(),
    summary: z.string(),
    pdf_url: z.string().url(),
    local_file_path: z.string(),
    checksum_hash: z.string(),
    confidence_score: ConfidenceScore,
    provenance: Provenance,
    human_verified: z.boolean(),
    data_status: DataStatus,
  })
  .partial()
  .required({
    id: true,
    source_name: true,
    source_tier: true,
    source_url: true,
    scraped_at: true,
    confidence_score: true,
    provenance: true,
    data_status: true,
  });

export const RegulatoryTimelineSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    source_name: z.string(),
    source_url: z.string().url().nullable(),
    publication_date: z.string(),
    effective_date: z.string(),
    jurisdiction: z.string(),
    affected_sectors: z.array(z.string()),
    affected_companies: z.array(z.string()),
    affected_products: z.array(z.string()),
    regulation_type: z.string(),
    summary: z.string(),
    impact_level: ImpactLevel,
    action_required: z.string(),
    deadline: z.string(),
    evidence_ids: z.array(z.string()),
    confidence_score: ConfidenceScore,
  })
  .partial();

export const CctsSectorSchema = z
  .object({
    id: z.string(),
    sector_name: z.string(),
    sub_sector: NullableString,
    coverage_status: z.string(),
    phase: z.string(),
    obligated_entity_count: z.number().int().nullable(),
    baseline_year: z.number().int().nullable(),
    target_year: z.number().int().nullable(),
    gei_baseline: z.union([z.number(), z.string()]).nullable(),
    gei_target: z.union([z.number(), z.string()]).nullable(),
    compliance_period: NullableString,
    source_document_ids: z.array(z.string()),
    latest_update: z.string(),
    risk_level: RiskLevel,
    data_confidence: ConfidenceScore,
  })
  .partial();

export const CctsObligatedEntitySchema = z
  .object({
    id: z.string(),
    company_id: z.string(),
    entity_name: z.string(),
    facility_id: z.string(),
    sector: z.string(),
    sub_sector: z.string(),
    state: z.string(),
    district: z.string(),
    coverage_status: z.string(),
    phase: z.string(),
    baseline_gei: z.number(),
    target_gei: z.number(),
    current_gei: z.number(),
    gap_to_target: z.number(),
    estimated_surplus_or_shortfall: z.number(),
    estimated_ccc_requirement: z.number(),
    compliance_deadline: z.string(),
    source_document_ids: z.array(z.string()),
    confidence_score: ConfidenceScore,
    data_status: DataStatus,
  })
  .partial();

export const CompanySchema = z
  .object({
    id: z.string(),
    company_name: z.string(),
    normalized_name: z.string(),
    nse_symbol: NullableString,
    bse_code: NullableString,
    cin: z.string(),
    parent_group: z.string(),
    website: z.string().url(),
    sector: z.string(),
    sub_sector: z.string(),
    ccts_sector: NullableString,
    cbam_sector: NullableString,
    headquarters: z.string(),
    listed_status: z.string(),
    market_cap_category: NullableString,
    source_document_ids: z.array(z.string()),
    confidence_score: ConfidenceScore,
    last_updated: z.string(),
  })
  .partial();

export const FacilitySchema = z
  .object({
    id: z.string(),
    company_id: z.string(),
    facility_name: z.string(),
    plant_name: z.string(),
    state: z.string(),
    district: z.string(),
    product: z.string(),
    annual_capacity: z.number(),
    capacity_unit: z.string(),
    energy_intensive_status: z.boolean(),
    ccts_obligated_entity_status: z.boolean(),
    pat_designated_consumer_status: z.boolean(),
    source_document_ids: z.array(z.string()),
    confidence_score: ConfidenceScore,
  })
  .partial();

export const EmissionsDataSchema = z
  .object({
    id: z.string(),
    company_id: z.string(),
    facility_id: z.string(),
    financial_year: z.string(),
    scope_1_emissions_tco2e: z.number(),
    scope_2_emissions_tco2e: z.number(),
    scope_3_emissions_tco2e: z.number(),
    total_energy_consumption: z.number(),
    renewable_energy_consumption: z.number(),
    non_renewable_energy_consumption: z.number(),
    emissions_intensity: z.number(),
    energy_intensity: z.number(),
    output_quantity: z.number(),
    output_unit: z.string(),
    source_type: z.string(),
    source_document_id: z.string(),
    page_number: z.number().int(),
    extraction_method: z.string(),
    confidence_score: ConfidenceScore,
    human_verified: z.boolean(),
  })
  .partial();

export const CompanyExposureScoreSchema = z
  .object({
    id: z.string(),
    company_id: z.string(),
    ccts_exposure_score: z.number(),
    cbam_exposure_score: z.number(),
    renewable_energy_compliance_score: z.number(),
    disclosure_quality_score: z.number(),
    carbon_credit_activity_score: z.number(),
    overall_carbon_risk_score: z.number(),
    risk_level: RiskLevel,
    top_risk_drivers: z.array(z.string()),
    missing_data_points: z.array(z.string()),
    recommended_actions: z.array(z.string()),
    generated_at: z.string(),
    evidence_ids: z.array(z.string()),
  })
  .partial();

export const CbamProductSchema = z
  .object({
    id: z.string(),
    product_name: z.string(),
    cn_code: z.string(),
    hs_code: z.string(),
    cbam_sector: z.string(),
    covered_status: z.boolean(),
    direct_emissions_required: z.boolean(),
    indirect_emissions_required: z.boolean(),
    default_values_available: z.boolean(),
    source_document_ids: z.array(z.string()),
  })
  .partial();

export const CbamExposureSchema = z
  .object({
    id: z.string(),
    company_id: z.string(),
    product_category: z.string(),
    hs_code: z.string(),
    eu_export_volume: z.number(),
    eu_export_value: z.number(),
    embedded_emissions: z.number(),
    direct_emissions: z.number(),
    indirect_emissions: z.number(),
    carbon_price_paid_domestically: z.number(),
    estimated_cbam_liability: z.number(),
    assumptions: z.string(),
    source_document_ids: z.array(z.string()),
    confidence_score: ConfidenceScore,
    data_status: DataStatus,
  })
  .partial();

export const PriceTimeseriesSchema = z
  .object({
    id: z.string(),
    market: z.string(),
    instrument: z.enum([
      'REC',
      'ESCert',
      'EU_ETS_EUA',
      'VCM_Index',
      'CCTS_CCC',
      'IREC',
      'carbon_credit',
    ]),
    jurisdiction: z.string(),
    date: z.string(),
    price: z.number(),
    currency: z.string(),
    unit: z.string(),
    volume: z.number().nullable(),
    buy_bid: z.number(),
    sell_bid: z.number(),
    cleared_price: z.number(),
    cleared_volume: z.number(),
    source_name: z.string(),
    source_url: z.string().url(),
    confidence_score: ConfidenceScore,
  })
  .partial();

export const CarbonProjectSchema = z
  .object({
    id: z.string(),
    registry: z.string(),
    registry_project_id: z.string(),
    project_name: z.string(),
    country: z.string(),
    state_region: z.string(),
    project_type: z.string(),
    methodology: z.string(),
    status: z.string(),
    developer: z.string(),
    validation_body: z.string(),
    verification_body: z.string(),
    crediting_period_start: z.string(),
    crediting_period_end: z.string(),
    issued_credits: z.number(),
    retired_credits: z.number(),
    available_credits: z.number(),
    vintage_years: z.array(z.union([z.number().int(), z.string()])),
    host_country_authorization_status: z.string(),
    article6_relevance: z.union([z.string(), z.boolean()]),
    source_url: z.string().url(),
    source_document_ids: z.array(z.string()),
    confidence_score: ConfidenceScore,
    last_updated: z.string(),
  })
  .partial();

export const ProjectDocumentSchema = z
  .object({
    id: z.string(),
    project_id: z.string(),
    document_type: z.enum([
      'PDD',
      'monitoring_report',
      'verification_report',
      'validation_report',
      'methodology',
      'registry_extract',
      'annual_report',
      'sustainability_report',
    ]),
    title: z.string(),
    document_url: z.string().url(),
    publication_date: z.string(),
    local_file_path: z.string(),
    raw_text: z.string(),
    clean_text: z.string(),
    page_count: z.number().int(),
    checksum_hash: z.string(),
    extracted_sections: z.record(z.string(), z.string()),
    source_confidence: ConfidenceScore,
    human_verified: z.boolean(),
  })
  .partial();

export const ProjectDueDiligenceScoreSchema = z
  .object({
    id: z.string(),
    project_id: z.string(),
    additionality_score: z.number(),
    permanence_score: z.number(),
    leakage_risk_score: z.number(),
    double_counting_risk_score: z.number(),
    verification_quality_score: z.number(),
    methodology_integrity_score: z.number(),
    co_benefits_score: z.number(),
    buyer_readiness_score: z.number(),
    overall_rating: z.union([z.number(), z.string()]),
    red_flags: z.array(z.string()),
    missing_documents: z.array(z.string()),
    recommended_questions: z.array(z.string()),
    evidence_ids: z.array(z.string()),
    generated_at: z.string(),
  })
  .partial();

export const AlertSchema = z
  .object({
    id: z.string(),
    alert_title: z.string(),
    source_name: z.string(),
    source_url: z.string().url(),
    alert_type: z.string(),
    affected_sectors: z.array(z.string()),
    affected_companies: z.array(z.string()),
    affected_projects: z.array(z.string()),
    affected_products: z.array(z.string()),
    impact_level: ImpactLevel,
    urgency: z.string(),
    summary: z.string(),
    action_required: z.string(),
    deadline: NullableString,
    evidence_ids: z.array(z.string()),
    created_at: z.string(),
    read_status: z.boolean(),
  })
  .partial();

export const AiQueryLogSchema = z
  .object({
    id: z.string(),
    user_query: z.string(),
    intent_classification: z.string(),
    retrieved_evidence_ids: z.array(z.string()),
    answer: z.string(),
    confidence_score: ConfidenceScore,
    insufficient_evidence_flag: z.boolean(),
    created_at: z.string(),
  })
  .partial();

export const SCHEMA_MAP = {
  source_documents: SourceDocumentSchema,
  regulatory_timeline: RegulatoryTimelineSchema,
  ccts_sectors: CctsSectorSchema,
  ccts_obligated_entities: CctsObligatedEntitySchema,
  companies: CompanySchema,
  facilities: FacilitySchema,
  emissions_data: EmissionsDataSchema,
  company_exposure_scores: CompanyExposureScoreSchema,
  cbam_products: CbamProductSchema,
  cbam_exposure: CbamExposureSchema,
  price_timeseries: PriceTimeseriesSchema,
  carbon_projects: CarbonProjectSchema,
  project_documents: ProjectDocumentSchema,
  project_due_diligence_scores: ProjectDueDiligenceScoreSchema,
  alerts: AlertSchema,
  ai_query_logs: AiQueryLogSchema,
};
