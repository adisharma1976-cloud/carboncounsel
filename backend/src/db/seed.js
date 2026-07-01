import { store, initializeStore } from './store.js';
import * as COLLECTIONS from './store.js';
import { fileURLToPath } from 'node:url';

// Import Seed Data
import { companies } from '../data/companies.seed.js';
import { cbamProducts, cbamExposure } from '../data/cbamProducts.seed.js';
import { priceCurves } from '../data/prices.seed.js';
import { carbonProjects, projectDueDiligence } from '../data/projects.seed.js';
import { sectors, sectorEmissions } from '../data/sectors.seed.js';
import { regulatoryTimeline, alerts } from '../data/timeline.seed.js';

function seedCollection(collection, records) {
  if (!store.isEmpty(collection)) {
    console.log(`⏭️  Preserving ${collection} (${store.count(collection)} existing records)`);
    return;
  }
  records.forEach((record) => store.insert(collection, record));
}

function normalizePriceCurves() {
  const instrumentMap = {
    REC_Solar: 'REC',
    REC_NonSolar: 'REC',
    ESCert: 'ESCert',
    EU_ETS: 'EU_ETS_EUA',
    VCM_Nature: 'VCM_Index',
    VCM_Tech: 'VCM_Index',
  };

  return Object.entries(priceCurves).flatMap(([curve, points]) =>
    points.map((point) => ({
      ...point,
      instrument: instrumentMap[curve],
      jurisdiction: curve === 'EU_ETS' ? 'EU' : curve.startsWith('VCM_') ? 'Global' : 'India',
      currency: point.unit.startsWith('₹') ? 'INR' : point.unit.startsWith('€') ? 'EUR' : 'USD',
      source_name: point.market,
      source_url:
        point.market === 'IEX'
          ? 'https://www.iexindia.com'
          : point.market === 'EEX'
            ? 'https://www.eex.com'
            : 'https://carboncredits.com',
      confidence_score: point.type === 'cleared' ? 75 : 60,
      data_status: 'estimated',
    }))
  );
}

function migratePriceRecords() {
  const records = store.getAll(COLLECTIONS.PRICE_TIMESERIES);
  let migrated = 0;

  for (const record of records) {
    if (record.instrument) continue;
    const unit = record.unit || '';
    const instrument = unit.includes('ESCert')
      ? 'ESCert'
      : unit.includes('REC')
        ? 'REC'
        : unit.includes('EUA')
          ? 'EU_ETS_EUA'
          : 'VCM_Index';
    const jurisdiction =
      instrument === 'EU_ETS_EUA' ? 'EU' : instrument === 'VCM_Index' ? 'Global' : 'India';

    store.update(COLLECTIONS.PRICE_TIMESERIES, record.id, {
      instrument,
      jurisdiction,
      currency: unit.startsWith('₹') ? 'INR' : unit.startsWith('€') ? 'EUR' : 'USD',
      source_name: record.market,
      source_url:
        record.market === 'IEX'
          ? 'https://www.iexindia.com'
          : record.market === 'EEX'
            ? 'https://www.eex.com'
            : 'https://carboncredits.com',
      confidence_score: record.type === 'cleared' ? 75 : 60,
      provenance: record.type === 'cleared' ? 'exchange' : 'estimated',
      data_status: record.type === 'cleared' ? 'verified' : 'estimated',
    });
    migrated += 1;
  }

  if (migrated) console.log(`🔄 Migrated ${migrated} legacy price records`);
}

export function runSeed() {
  console.log('🌱 Initializing Database Store...');
  initializeStore();

  console.log('📥 Seeding Companies...');
  seedCollection(COLLECTIONS.COMPANIES, companies);

  console.log('📥 Seeding CBAM Data...');
  seedCollection(COLLECTIONS.CBAM_PRODUCTS, cbamProducts);
  seedCollection(COLLECTIONS.CBAM_EXPOSURE, cbamExposure);

  console.log('📥 Seeding Prices...');
  seedCollection(COLLECTIONS.PRICE_TIMESERIES, normalizePriceCurves());
  migratePriceRecords();

  console.log('📥 Seeding Projects...');
  seedCollection(COLLECTIONS.CARBON_PROJECTS, carbonProjects);
  seedCollection(COLLECTIONS.PROJECT_DUE_DILIGENCE_SCORES, projectDueDiligence);

  console.log('📥 Seeding Sectors...');
  seedCollection(COLLECTIONS.CCTS_SECTORS, sectors);

  console.log('📥 Seeding Timelines & Alerts...');
  seedCollection(COLLECTIONS.REGULATORY_TIMELINE, regulatoryTimeline);
  seedCollection(COLLECTIONS.ALERTS, alerts);

  console.log('✅ Seeding Complete!');
}

// Run if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runSeed();
}
