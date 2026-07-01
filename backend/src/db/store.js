import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SCHEMA_MAP } from './schemas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true' || !!process.env.VERCEL;
const COLLECTIONS_DIR = process.env.CARBONCOUNSEL_DATA_DIR
  ? path.resolve(process.env.CARBONCOUNSEL_DATA_DIR)
  : isVercel
    ? path.join('/tmp', 'collections')
    : path.join(__dirname, 'collections');

export const SOURCE_DOCUMENTS = 'source_documents';
export const REGULATORY_TIMELINE = 'regulatory_timeline';
export const CCTS_SECTORS = 'ccts_sectors';
export const CCTS_OBLIGATED_ENTITIES = 'ccts_obligated_entities';
export const COMPANIES = 'companies';
export const FACILITIES = 'facilities';
export const EMISSIONS_DATA = 'emissions_data';
export const COMPANY_EXPOSURE_SCORES = 'company_exposure_scores';
export const CBAM_PRODUCTS = 'cbam_products';
export const CBAM_EXPOSURE = 'cbam_exposure';
export const PRICE_TIMESERIES = 'price_timeseries';
export const CARBON_PROJECTS = 'carbon_projects';
export const PROJECT_DOCUMENTS = 'project_documents';
export const PROJECT_DUE_DILIGENCE_SCORES = 'project_due_diligence_scores';
export const ALERTS = 'alerts';
export const AI_QUERY_LOGS = 'ai_query_logs';

const ALL_COLLECTIONS = [
  SOURCE_DOCUMENTS,
  REGULATORY_TIMELINE,
  CCTS_SECTORS,
  CCTS_OBLIGATED_ENTITIES,
  COMPANIES,
  FACILITIES,
  EMISSIONS_DATA,
  COMPANY_EXPOSURE_SCORES,
  CBAM_PRODUCTS,
  CBAM_EXPOSURE,
  PRICE_TIMESERIES,
  CARBON_PROJECTS,
  PROJECT_DOCUMENTS,
  PROJECT_DUE_DILIGENCE_SCORES,
  ALERTS,
  AI_QUERY_LOGS,
];

function collectionPath(collection) {
  if (!ALL_COLLECTIONS.includes(collection)) {
    throw new Error(`Unknown collection: ${collection}`);
  }
  return path.join(COLLECTIONS_DIR, `${collection}.json`);
}

function generateId(collection) {
  return `${collection}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readCollection(collection) {
  const filePath = collectionPath(collection);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error(`Collection ${collection} must contain a JSON array`);
    }
    return parsed;
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw new Error(`Failed to read ${collection}: ${error.message}`);
  }
}

function writeCollection(collection, data) {
  const filePath = collectionPath(collection);
  const tempPath = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, filePath);
}

function validateDoc(collection, doc) {
  const schema = SCHEMA_MAP[collection];
  if (!schema) throw new Error(`No schema registered for collection: ${collection}`);
  const result = schema.safeParse(doc);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`Invalid ${collection} record: ${issues}`);
  }
}

class Store {
  getAll(collection) {
    return readCollection(collection);
  }

  getById(collection, id) {
    const docs = readCollection(collection);
    return docs.find((d) => d.id === id) ?? null;
  }

  insert(collection, doc) {
    const id = doc.id || generateId(collection);
    const record = { ...doc, id };
    validateDoc(collection, record);
    const docs = readCollection(collection);

    if (docs.some((existing) => existing.id === id)) {
      throw new Error(`Duplicate id "${id}" in ${collection}`);
    }

    if (
      collection === SOURCE_DOCUMENTS &&
      record.checksum_hash &&
      docs.some((existing) => existing.checksum_hash === record.checksum_hash)
    ) {
      return docs.find((existing) => existing.checksum_hash === record.checksum_hash);
    }

    docs.push(record);
    writeCollection(collection, docs);
    return record;
  }

  update(collection, id, updates) {
    const docs = readCollection(collection);
    const idx = docs.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    docs[idx] = { ...docs[idx], ...updates, id };
    validateDoc(collection, docs[idx]);
    writeCollection(collection, docs);
    return docs[idx];
  }

  delete(collection, id) {
    const docs = readCollection(collection);
    const idx = docs.findIndex((d) => d.id === id);
    if (idx === -1) return false;
    docs.splice(idx, 1);
    writeCollection(collection, docs);
    return true;
  }

  search(collection, query) {
    const docs = readCollection(collection);
    const lower = query.toLowerCase();
    return docs.filter((doc) =>
      Object.values(doc).some(
        (val) => typeof val === 'string' && val.toLowerCase().includes(lower)
      )
    );
  }

  count(collection) {
    return readCollection(collection).length;
  }

  isEmpty(collection) {
    return this.count(collection) === 0;
  }

  findOne(collection, predicate) {
    return readCollection(collection).find(predicate) ?? null;
  }

  upsert(collection, predicate, doc) {
    const existing = this.findOne(collection, predicate);
    if (existing) return this.update(collection, existing.id, doc);
    return this.insert(collection, doc);
  }
}

export function initializeStore() {
  if (!fs.existsSync(COLLECTIONS_DIR)) {
    fs.mkdirSync(COLLECTIONS_DIR, { recursive: true });
  }
  for (const collection of ALL_COLLECTIONS) {
    const filePath = collectionPath(collection);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf-8');
    }
  }
}

export const store = new Store();
