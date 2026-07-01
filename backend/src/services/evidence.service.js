import { store } from '../db/store.js';
import { daysSince } from '../utils/dateParser.js';

const SEARCH_COLLECTIONS = [
  'source_documents',
  'regulatory_timeline',
  'companies',
  'emissions_data',
  'carbon_projects',
  'price_timeseries',
  'alerts',
];

const TEXT_FIELDS = ['title', 'summary', 'raw_text', 'clean_text', 'keywords', 'sector_tags', 'company_tags'];

const TIER_ORDER = { A: 0, B: 1, C: 2, D: 3, E: 4 };

function tokenize(query) {
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3);
}

function fieldText(doc, field) {
  const val = doc[field];
  if (!val) return '';
  if (Array.isArray(val)) return val.join(' ').toLowerCase();
  return String(val).toLowerCase();
}

function matchesQuery(doc, tokens) {
  const blob = TEXT_FIELDS.map((f) => fieldText(doc, f)).join(' ');
  return tokens.some((t) => blob.includes(t));
}

function evidenceDate(evidence) {
  return (
    evidence.publication_date ||
    evidence.effective_date ||
    evidence.date ||
    evidence.published_date ||
    evidence.created_at ||
    evidence.scraped_at ||
    null
  );
}

function matchesFilters(doc, filters) {
  if (!filters) return true;
  const { sectors, companies, jurisdictions, dateFrom, dateTo, minConfidence, tiers } = filters;

  if (sectors?.length) {
    const tags = [].concat(doc.sector_tags || [], doc.sector ? [doc.sector] : []).map((s) => s.toLowerCase());
    if (!sectors.some((s) => tags.includes(s.toLowerCase()))) return false;
  }

  if (companies?.length) {
    const tags = [].concat(doc.company_tags || [], doc.company ? [doc.company] : []).map((c) => c.toLowerCase());
    if (!companies.some((c) => tags.includes(c.toLowerCase()))) return false;
  }

  if (jurisdictions?.length) {
    const j = (doc.jurisdiction || '').toLowerCase();
    if (!jurisdictions.some((jf) => j.includes(jf.toLowerCase()))) return false;
  }

  if (dateFrom || dateTo) {
    const docDate = evidenceDate(doc);
    if (!docDate) return false;
    const dt = new Date(docDate).getTime();
    if (dateFrom && dt < new Date(dateFrom).getTime()) return false;
    if (dateTo && dt > new Date(dateTo).getTime()) return false;
  }

  if (minConfidence != null) {
    const cs = doc.confidence_score ?? 0;
    if (cs < minConfidence) return false;
  }

  if (tiers?.length) {
    if (!tiers.includes(doc.source_tier)) return false;
  }

  return true;
}

export function searchEvidence(query, filters) {
  const tokens = tokenize(query);
  if (!tokens.length) return [];

  const results = [];
  for (const collection of SEARCH_COLLECTIONS) {
    const docs = store.getAll(collection);
    for (const doc of docs) {
      if (matchesQuery(doc, tokens) && matchesFilters(doc, filters)) {
        results.push({ ...doc, _collection: collection });
      }
    }
  }
  return results;
}

function keywordRelevance(doc, tokens) {
  const blob = TEXT_FIELDS.map((f) => fieldText(doc, f)).join(' ');
  return tokens.reduce((count, t) => count + (blob.includes(t) ? 1 : 0), 0);
}

export function rankEvidence(evidenceItems, intent) {
  const tokens = intent ? tokenize(intent) : [];

  return [...evidenceItems].sort((a, b) => {
    const tierDiff = (TIER_ORDER[a.source_tier] ?? 5) - (TIER_ORDER[b.source_tier] ?? 5);
    if (tierDiff !== 0) return tierDiff;

    const recA = daysSince(evidenceDate(a)) ?? Infinity;
    const recB = daysSince(evidenceDate(b)) ?? Infinity;
    if (recA !== recB) return recA - recB;

    const relA = keywordRelevance(a, tokens);
    const relB = keywordRelevance(b, tokens);
    if (relA !== relB) return relB - relA;

    return (b.confidence_score ?? 0) - (a.confidence_score ?? 0);
  });
}

export function formatEvidenceResponse(evidence) {
  return {
    text: evidence.summary || evidence.clean_text || evidence.raw_text || evidence.title || '',
    source: evidence.source_name || evidence.source || evidence._collection || '',
    source_url: evidence.source_url || evidence.url || null,
    date: evidenceDate(evidence),
    confidence_score: evidence.confidence_score ?? null,
    source_tier: evidence.source_tier || null,
    provenance: evidence.provenance || evidence._collection || null,
    excerpt: evidence.excerpt || (evidence.clean_text || '').slice(0, 300) || null,
  };
}

export function checkSufficiency(evidenceItems) {
  if (!evidenceItems || !evidenceItems.length) {
    return { sufficient: false, reason: 'No evidence items found.' };
  }

  const decisionGradeEvidence = evidenceItems.filter((item) =>
    ['A', 'B', 'C'].includes(item.source_tier)
  );
  if (!decisionGradeEvidence.length) {
    return {
      sufficient: false,
      reason: 'No Tier A, B, or C evidence was found for this query.',
    };
  }

  return {
    sufficient: true,
    reason: 'At least one Tier A, B, or C evidence item was found.',
    decisionGradeCount: decisionGradeEvidence.length,
  };
}
