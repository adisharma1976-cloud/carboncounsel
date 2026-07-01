import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { after, before, test } from 'node:test';
import express from 'express';

let server;
let baseUrl;
let dataDir;
let store;
let collections;

before(async () => {
  dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'carboncounsel-test-'));
  process.env.CARBONCOUNSEL_DATA_DIR = dataDir;

  const storeModule = await import('../src/db/store.js');
  const { default: apiRoutes } = await import('../src/routes/api.routes.js');
  store = storeModule.store;
  collections = storeModule;
  storeModule.initializeStore();

  store.insert(collections.COMPANIES, {
    id: 'comp-test',
    company_name: 'Tata Steel',
    normalized_name: 'tata_steel',
    nse_symbol: 'TATASTEEL',
    bse_code: '500470',
    sector: 'Iron & Steel',
    ccts_sector: 'Iron & Steel',
    cbam_sector: 'Iron and Steel',
    listed_status: 'Listed',
    risk_level: 'High',
    ccts_covered: true,
    cbam_exposed: true,
  });
  store.insert(collections.SOURCE_DOCUMENTS, {
    id: 'doc-test',
    source_name: 'NSE BRSR',
    source_type: 'company_disclosure',
    source_tier: 'B',
    source_url: 'https://example.com/tata-steel-brsr.pdf',
    title: 'Tata Steel BRSR 2025',
    document_type: 'sustainability_report',
    publication_date: '2025-06-01',
    scraped_at: '2026-07-01T00:00:00.000Z',
    jurisdiction: 'India',
    company_tags: ['TATASTEEL', 'Tata Steel'],
    summary: 'Tata Steel reports its operational emissions and transition programme.',
    checksum_hash: 'test-checksum',
    confidence_score: 90,
    provenance: 'company_disclosed',
    data_status: 'verified',
  });

  const app = express();
  app.use(express.json());
  app.use('/api', apiRoutes);
  server = app.listen(0);
  if (!server.listening) {
    await new Promise((resolve) => server.once('listening', resolve));
  }
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  server.closeAllConnections();
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test('source explorer exposes configured sources and document counts', async () => {
  const response = await fetch(`${baseUrl}/api/sources/nse_brsr`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.data.id, 'nse_brsr');
  assert.equal(body.data.tier, 'B');
  assert.equal(body.data.document_count, 1);
});

test('chat returns structured citations when Tier A-C evidence exists', async () => {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Tell me about Tata Steel exposure' }),
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.insufficientEvidence, false);
  assert.equal(body.intent, 'company_exposure');
  assert.equal(body.evidences[0].source_tier, 'B');
  assert.equal(body.evidences[0].source_url, 'https://example.com/tata-steel-brsr.pdf');
  assert.ok(body.answer.includes('Tata Steel'));
});

test('chat refuses unsupported claims instead of fabricating', async () => {
  const response = await fetch(`${baseUrl}/api/ai/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'What is the lunar carbon tariff?' }),
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.insufficientEvidence, true);
  assert.deepEqual(body.evidences, []);
  assert.match(body.answer, /do not have sufficient/i);
});

test('store rejects invalid confidence values', () => {
  assert.throws(
    () =>
      store.insert(collections.SOURCE_DOCUMENTS, {
        id: 'invalid-confidence',
        confidence_score: 101,
      }),
    /Invalid source_documents record/
  );
});

test('source documents require the citation and provenance envelope', () => {
  assert.throws(
    () =>
      store.insert(collections.SOURCE_DOCUMENTS, {
        id: 'missing-provenance',
        confidence_score: 90,
      }),
    /source_name: Required/
  );
});
