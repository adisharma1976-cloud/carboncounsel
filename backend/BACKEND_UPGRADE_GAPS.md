# CarbonCounsel Backend Upgrade Gap Ledger

Assessment date: 2026-07-02

This ledger compares the attached "Decision-Grade Upgrade" brief with the current
repository. "Partial" means code exists but does not yet meet the source-backed
acceptance criteria.

## Executive Status

| Area | Status | Current reality | Next completion gate |
| --- | --- | --- | --- |
| Phase 1: foundation | Partial, foundation hardened | 16 JSON collections, schemas, evidence ranking, source health, checksums, and modular routes exist. Writes now validate, seed data persists, source documents deduplicate/version, and source APIs are live. | Split the remaining monolithic API router, persist scrape errors/health, and ingest every scraper result as a source document. |
| Phase 2: companies | Partial, mostly seeded/demo | 55 companies are seeded. Normalizer, sector mapper, emissions extractor, and three disclosure adapters exist. The adapters currently return a small mocked filing set and do not download or parse PDFs/XBRL. | Source-backed BRSR discovery and extraction for at least 10 companies, with page-level evidence. |
| Phase 3: prices | Partial, demo data | Price storage and APIs exist. Legacy rows are migrated to named instruments. IEX/PXIL adapters still use mocked observations; EEX is broad HTML scraping. | Parse real exchange observations, store checksums/status, and distinguish observed data from estimates. |
| Phase 4: regulation | Early partial | BEE and MoEFCC adapters exist. Timeline and alerts are seeded. | Add e-Gazette, PIB, CERC, ICM, and REC Registry adapters plus alert classification and CCTS detail APIs. |
| Phase 5: projects | Early partial | Four projects and two diligence scores are seeded; Verra and Gold Standard adapters exist. | Add document ingestion/extraction, risk scoring, five project evidence packs, and diligence endpoints. |
| Phase 6: CBAM | Early partial | Six products, five company exposure rows, and an EU CBAM adapter exist. | Add DGFT, HS/CN mapping, CBAM APIs, evidence links, and explicit estimate labels. |
| Phase 7: reports/dashboard | Mostly missing | Structured citation-first chat now exists with nine intent classes and refusal behavior. Two chart-oriented dashboard endpoints exist. | Add report generation and the six specified dashboard endpoints; replace deterministic evidence summaries with an LLM provider only after retrieval is reliable. |

## Cross-Cutting Gaps

### Data integrity

- Completed in this pass: confidence is consistently `0-100`; invalid writes now
  fail; JSON writes are atomic; existing collections are not wiped at boot.
- Completed in this pass: disclosure ingestion computes SHA-256 checksums, skips
  unchanged records, and increments versions when content changes.
- Remaining: `scrape_errors` and durable source-health collections are not in the
  original 16-collection schema and health resets on process restart.
- Remaining: most existing seed rows are modelled data but lack a consistent
  `provenance` and `data_status` field.
- Remaining: scraper execution is sequential and timeout-safe, but only five
  adapters currently persist normalized observations or documents.

### Source coverage

- Source registry: 31 configured sources.
- Executed adapters: 17.
- Missing executable adapters from the brief: e-Gazette, PIB, CERC, ICM/Grid
  Controller, REC Registry, DGFT, CDM, Global Carbon Council, Plan Vivo,
  ART TREES, ICVCM, VCMI, SBTi, and GHG Protocol.
- Several existing adapters use mock arrays or broad selectors. A configured
  source is not yet equivalent to a working source-backed scraper.

### Evidence behavior

- Completed in this pass: `/api/chat` and `/api/ai/query` return source, URL,
  publication date, tier, confidence, provenance, and excerpt; unsupported
  queries refuse instead of fabricating.
- Remaining: company exposure, memo, feed, alerts, price, project, and dashboard
  responses do not all expose the same evidence envelope.
- Remaining: retrieval is lexical, not embedding-based, and has no document
  chunk/page model.
- Remaining: no external LLM is configured. Current answers are deterministic
  summaries of matched evidence, which is safer than the previous placeholder
  but is not full RAG synthesis.

## Required API Gap Matrix

| Required endpoint | Status |
| --- | --- |
| `GET /api/company/:id/exposure` | Exists; missing complete evidence/scoring joins |
| `GET /api/company/search` | Exists |
| `GET /api/company/:id/memo` | Exists; deterministic and weakly evidenced |
| `GET /api/prices` | Exists |
| `GET /api/prices/compare` | Exists |
| `GET /api/dashboard/price-series` | Exists; mixed currencies are not normalized |
| `GET /api/ccts/timeline` | Missing |
| `GET /api/ccts/entities` | Missing |
| `GET /api/ccts/sector/:sectorName` | Missing |
| `GET /api/alerts` with filters | Exists; filters are missing |
| `GET /api/projects/:id/diligence` | Missing |
| `GET /api/dashboard/project-diligence-summary` | Missing |
| `GET /api/cbam/products` | Missing |
| `GET /api/cbam/company/:id` | Missing |
| `GET /api/cbam/timeline` | Missing |
| `GET /api/dashboard/sector-risk-heatmap` | Missing |
| `GET /api/dashboard/overview` | Missing |
| `GET /api/dashboard/company-scorecards` | Missing |
| `GET /api/dashboard/regulatory-timeline` | Missing |
| `GET /api/sources` | Completed in this pass |
| `GET /api/sources/:id` | Completed in this pass |
| `GET /api/sources/search` | Completed in this pass |
| `GET /api/sources/health` | Completed in this pass; health is process-local |

## Frontend Contract Gaps

- The frontend expects `/api/intelligence/updates`,
  `/api/intelligence/company`, `/api/projects`, and `/api/projects/:id`; these
  are currently missing from the modular backend.
- `/api/ccts/sectors` returns `{ success, count, data }`, while the typed client
  expects `{ sectors, total }`.
- The regulatory dashboard expects `feed`, while `/api/feed` returns `data`.
- Chat compatibility is now fixed: both `message` and `query` inputs work, and
  `answer`/`content` plus `evidence`/`evidences` are returned.

## Recommended Build Order

1. Finish route modularization and add a common response/evidence envelope.
2. Make BRSR discovery and PDF extraction real for 10 companies.
3. Make IEX/PXIL observations real and explicitly mark every seeded price as
   estimated.
4. Add official Indian regulatory adapters and CCTS entity/timeline APIs.
5. Add project document ingestion and diligence scoring.
6. Complete CBAM mapping and exposure APIs.
7. Build reports/dashboard aggregations and then add an LLM synthesis provider.
