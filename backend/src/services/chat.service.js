import { store, AI_QUERY_LOGS, COMPANIES } from '../db/store.js';
import {
  searchEvidence,
  rankEvidence,
  formatEvidenceResponse,
  checkSufficiency,
} from './evidence.service.js';
import { matchCompany } from './companyNormalizer.service.js';

const INTENTS = [
  ['company_exposure', ['company', 'exposure', 'tata', 'reliance', 'steel', 'cement']],
  ['ccts_compliance', ['ccts', 'obligated', 'compliance', 'gei', 'ccc']],
  ['cbam_exposure', ['cbam', 'embedded emissions', 'eu export']],
  ['carbon_price', ['price', 'rec', 'escert', 'eua', 'market']],
  ['project_due_diligence', ['project', 'additionality', 'permanence', 'registry']],
  ['regulatory_update', ['regulation', 'notification', 'gazette', 'deadline']],
  ['sector_risk', ['sector', 'heatmap', 'industry']],
  ['source_lookup', ['source', 'evidence', 'citation']],
  ['general_carbon_intelligence', []],
];

export function classifyIntent(query) {
  const normalized = query.toLowerCase();
  return (
    INTENTS.find(([, keywords]) => keywords.some((keyword) => normalized.includes(keyword)))?.[0] ||
    'general_carbon_intelligence'
  );
}

function recommendedActions(intent, company) {
  const actions = [];
  if (company?.ccts_covered) {
    actions.push('Validate the entity baseline and current GEI against the applicable CCTS target.');
  }
  if (company?.cbam_exposed) {
    actions.push('Verify product-level embedded emissions and EU importer reporting readiness.');
  }
  if (intent === 'carbon_price') {
    actions.push('Confirm the latest exchange observation before making a trading decision.');
  }
  return actions;
}

function riskLevel(company) {
  return company?.risk_level?.toLowerCase() || 'unknown';
}

function saveQueryLog(result) {
  store.insert(AI_QUERY_LOGS, {
    id: result.id,
    user_query: result.query,
    intent_classification: result.intent,
    retrieved_evidence_ids: result._evidenceIds,
    answer: result.answer,
    confidence_score: result.confidence_score,
    insufficient_evidence_flag: result.insufficientEvidence,
    created_at: result.timestamp,
  });
}

export function answerQuery(query) {
  const intent = classifyIntent(query);
  const evidence = searchEvidence(query);
  const sufficiency = checkSufficiency(evidence);
  const ranked = rankEvidence(evidence, query);
  const evidences = ranked.slice(0, 5).map(formatEvidenceResponse);
  const company = matchCompany(query, store.getAll(COMPANIES));
  const timestamp = new Date().toISOString();
  const id = `query-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  if (!sufficiency.sufficient) {
    const answer = `I do not have sufficient Tier A, B, or C evidence to answer this query without speculation. ${sufficiency.reason}`;
    const result = {
      id,
      query,
      intent,
      answer,
      content: answer,
      analysis: null,
      risk_level: 'unknown',
      riskLevel: 'Unknown',
      key_findings: [],
      data_gaps: [sufficiency.reason],
      recommended_actions: [],
      actionItems: [],
      evidences: [],
      evidence: [],
      sources: [],
      relatedSectors: [],
      confidence_score: 0,
      insufficientEvidence: true,
      timestamp,
      _evidenceIds: [],
    };
    saveQueryLog(result);
    delete result._evidenceIds;
    return result;
  }

  const keyFindings = evidences
    .map((item) => item.text)
    .filter(Boolean)
    .slice(0, 3);
  const sources = [...new Set(evidences.map((item) => item.source).filter(Boolean))];
  const actions = recommendedActions(intent, company);
  const confidence =
    Math.round(
      evidences.reduce((sum, item) => sum + (item.confidence_score || 0), 0) /
        Math.max(evidences.length, 1)
    ) || 0;
  const companyContext = company
    ? `${company.company_name} is tracked in the ${company.sector} sector with ${company.risk_level || 'unknown'} modelled carbon risk.`
    : null;
  const answer = [companyContext, ...keyFindings].filter(Boolean).join(' ');

  const result = {
    id,
    query,
    intent,
    answer,
    content: answer,
    analysis: `Response grounded in ${sufficiency.decisionGradeCount} Tier A-C evidence item(s).`,
    risk_level: riskLevel(company),
    riskLevel: company?.risk_level || 'Unknown',
    key_findings: keyFindings,
    data_gaps: keyFindings.length ? [] : ['The matched evidence has no extracted summary text.'],
    recommended_actions: actions,
    actionItems: actions,
    evidences,
    evidence: evidences,
    sources,
    relatedSectors: company?.sector ? [company.sector] : [],
    confidence_score: confidence,
    insufficientEvidence: false,
    timestamp,
    _evidenceIds: ranked.slice(0, 5).map((item) => item.id).filter(Boolean),
  };
  saveQueryLog(result);
  delete result._evidenceIds;
  return result;
}
