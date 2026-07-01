import express from 'express';
import { SOURCES, SOURCE_TIERS } from '../config/sources.config.js';
import { store, SOURCE_DOCUMENTS } from '../db/store.js';
import { getAllHealth, getHealthSummary } from '../services/sourceHealth.service.js';

const router = express.Router();

function normalize(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function sourceHealth(sourceId, source, healthEntries) {
  const id = normalize(sourceId);
  const name = normalize(source.name);
  const match = Object.values(healthEntries).find((entry) => {
    const candidate = normalize(entry.source);
    return candidate === id || candidate.startsWith(id) || name.includes(candidate);
  });

  return (
    match || {
      source: source.name,
      status: 'pending',
      success_count: 0,
      failure_count: 0,
      avg_response_time: 0,
      last_success: null,
      last_failure: null,
      latest_error: null,
    }
  );
}

function serializeSource(id, source, healthEntries) {
  const documents = store
    .getAll(SOURCE_DOCUMENTS)
    .filter((document) => {
      const sourceName = normalize(document.source_name);
      return sourceName.includes(normalize(id)) || normalize(source.name).includes(sourceName);
    });

  return {
    id,
    ...source,
    tier_description: SOURCE_TIERS[source.tier],
    document_count: documents.length,
    health: sourceHealth(id, source, healthEntries),
  };
}

router.get('/health', (req, res) => {
  const observed = getAllHealth();
  const sources = Object.entries(SOURCES).map(([id, source]) => ({
    id,
    ...sourceHealth(id, source, observed),
  }));
  const counts = sources.reduce(
    (result, source) => {
      result[source.status] = (result[source.status] || 0) + 1;
      return result;
    },
    { healthy: 0, degraded: 0, failed: 0, pending: 0 }
  );

  res.json({
    success: true,
    summary: {
      total_sources: sources.length,
      ...counts,
      observed: getHealthSummary(),
      last_check: new Date().toISOString(),
    },
    data: sources,
  });
});

router.get('/search', (req, res) => {
  const query = normalize(req.query.q);
  if (!query) return res.status(400).json({ error: 'Query q is required' });

  const observed = getAllHealth();
  const sources = Object.entries(SOURCES)
    .filter(([id, source]) =>
      [id, source.name, source.category, source.jurisdiction].some((value) =>
        normalize(value).includes(query)
      )
    )
    .map(([id, source]) => serializeSource(id, source, observed));

  res.json({ success: true, count: sources.length, data: sources });
});

router.get('/:id', (req, res) => {
  const source = SOURCES[req.params.id];
  if (!source) return res.status(404).json({ error: 'Source not found' });
  res.json({
    success: true,
    data: serializeSource(req.params.id, source, getAllHealth()),
  });
});

router.get('/', (req, res) => {
  const { tier, category, jurisdiction, enabled } = req.query;
  const observed = getAllHealth();
  let sources = Object.entries(SOURCES);

  if (tier) sources = sources.filter(([, source]) => source.tier === tier);
  if (category) sources = sources.filter(([, source]) => source.category === category);
  if (jurisdiction) {
    sources = sources.filter(([, source]) => source.jurisdiction === jurisdiction);
  }
  if (enabled !== undefined) {
    sources = sources.filter(([, source]) => source.enabled === (enabled === 'true'));
  }

  const data = sources.map(([id, source]) => serializeSource(id, source, observed));
  res.json({ success: true, count: data.length, data });
});

export default router;
