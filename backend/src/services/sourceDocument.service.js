import { store, SOURCE_DOCUMENTS } from '../db/store.js';
import { computeChecksum } from '../utils/checksum.js';
import { computeConfidence } from '../utils/confidenceScorer.js';

function checksumContent(document) {
  return [
    document.source_url,
    document.title,
    document.publication_date,
    document.clean_text,
    document.raw_text,
    document.summary,
  ]
    .filter(Boolean)
    .join('\n');
}

export function ingestSourceDocument(document) {
  const now = new Date().toISOString();
  const checksum = document.checksum_hash || computeChecksum(checksumContent(document));
  const existing = store.findOne(
    SOURCE_DOCUMENTS,
    (item) =>
      item.source_url === document.source_url &&
      item.document_type === document.document_type
  );

  if (existing?.checksum_hash === checksum) {
    return { record: existing, created: false, changed: false };
  }

  const record = {
    ...document,
    scraped_at: document.scraped_at || now,
    updated_at: now,
    checksum_hash: checksum,
    confidence_score:
      document.confidence_score ??
      computeConfidence({
        source_tier: document.source_tier,
        recency_days: 0,
        human_verified: document.human_verified,
        data_status: document.data_status,
      }),
    version: existing ? (existing.version || 1) + 1 : 1,
  };

  if (existing) {
    record.previous_checksum_hash = existing.checksum_hash || null;
    return {
      record: store.update(SOURCE_DOCUMENTS, existing.id, record),
      created: false,
      changed: true,
    };
  }

  return {
    record: store.insert(SOURCE_DOCUMENTS, record),
    created: true,
    changed: true,
  };
}
