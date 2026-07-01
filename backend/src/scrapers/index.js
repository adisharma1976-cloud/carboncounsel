import { scrapeBEE } from "./bee.scraper.js";
import { scrapeMoEFCC } from "./moefcc.scraper.js";
import { scrapeUNFCCC } from "./unfccc.scraper.js";
import { scrapeCarbonCreditsNews } from "./carbonCredits.scraper.js";
import { scrapeGoldStandard } from "./goldStandard.scraper.js";
import { scrapeVerra } from "./verra.scraper.js";
import { scrapeWorldBank } from "./worldBank.scraper.js";
import { scrapeEUCBAM } from "./euCbam.scraper.js";
import { scrapeICAP } from "./icap.scraper.js";
import { scrapeCEEW } from "./ceew.scraper.js";
import { scrapeIETA } from './ieta.scraper.js';
import { scrapeEEX } from './eex.scraper.js';
import { scrapeNseBrsr } from './nseBrsr.scraper.js';
import { scrapeNseAnnualReports } from './nseAnnualReports.scraper.js';
import { scrapeBseFilings } from './bseFilings.scraper.js';
import { scrapeIex } from './iex.scraper.js';
import { scrapePxil } from './pxil.scraper.js';

export const scrapedData = {
  bee: { notifications: [], lastScraped: null, status: "pending" },
  moefcc: { notifications: [], lastScraped: null, status: "pending" },
  unfccc: { news: [], lastScraped: null, status: "pending" },
  carbonCredits: { articles: [], lastScraped: null, status: "pending" },
  cdm: { projects: [], lastScraped: null, status: "pending" },
  euCbam: { updates: [], lastScraped: null, status: "pending" },
  icap: { systems: [], lastScraped: null, status: "pending" },
  goldStandard: { projects: [], lastScraped: null, status: "pending" },
  verra: { projects: [], lastScraped: null, status: "pending" },
  worldBank: { carbonPricing: [], lastScraped: null, status: "pending" },
  ceew: { research: [], lastScraped: null, status: "pending" },
  ieta: { news: [], lastScraped: null, status: "pending" },
  eex: { prices: [], lastScraped: null, status: "pending" },
  nseBrsr: { reports: [], lastScraped: null, status: "pending" },
  nseAnnualReports: { reports: [], lastScraped: null, status: "pending" },
  bseFilings: { filings: [], lastScraped: null, status: "pending" },
  iex: { prices: [], lastScraped: null, status: "pending" },
  pxil: { prices: [], lastScraped: null, status: "pending" },
};

const scraperMap = [
  { key: "bee", fn: scrapeBEE },
  { key: "moefcc", fn: scrapeMoEFCC },
  { key: "unfccc", fn: scrapeUNFCCC },
  { key: "carbonCredits", fn: scrapeCarbonCreditsNews },
  { key: "goldStandard", fn: scrapeGoldStandard },
  { key: "verra", fn: scrapeVerra },
  { key: "worldBank", fn: scrapeWorldBank },
  { key: "euCbam", fn: scrapeEUCBAM },
  { key: "icap", fn: scrapeICAP },
  { key: "ceew", fn: scrapeCEEW },
  { key: "ieta", fn: scrapeIETA },
  { key: "eex", fn: scrapeEEX },
  { key: "nseBrsr", fn: scrapeNseBrsr },
  { key: "nseAnnualReports", fn: scrapeNseAnnualReports },
  { key: "bseFilings", fn: scrapeBseFilings },
  { key: "iex", fn: scrapeIex },
  { key: "pxil", fn: scrapePxil },
];

export async function runAllScrapers() {
  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("🌿 CarbonCounsel Data Collection Engine — Starting scrape");
  console.log("═══════════════════════════════════════════════════════════\n");

  for (const { key, fn } of scraperMap) {
    const result = await fn();
    Object.assign(scrapedData[key], result);
    await new Promise((r) => setTimeout(r, 1500));
  }

  const summary = Object.entries(scrapedData).map(([source, data]) => ({
    source,
    status: data.status,
    count:
      data.count ||
      (data.notifications || data.news || data.articles || data.projects || data.updates || data.systems || data.carbonPricing || data.research || data.prices || []).length,
    lastScraped: data.lastScraped,
  }));

  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("📊 Scrape Summary:");
  summary.forEach((s) => {
    const icon = s.status === "success" ? "✅" : s.status === "error" ? "❌" : "⏳";
    console.log(`   ${icon} ${s.source}: ${s.count} items (${s.status})`);
  });
  console.log("═══════════════════════════════════════════════════════════\n");

  return summary;
}

export {
  scrapeBEE,
  scrapeMoEFCC,
  scrapeUNFCCC,
  scrapeCarbonCreditsNews,
  scrapeGoldStandard,
  scrapeVerra,
  scrapeWorldBank,
  scrapeEUCBAM,
  scrapeICAP,
  scrapeCEEW,
  scrapeIETA,
  scrapeEEX,
  scrapeNseBrsr,
  scrapeNseAnnualReports,
  scrapeBseFilings,
  scrapeIex,
  scrapePxil
};
