/**
 * CarbonCounsel Data Scraper Engine
 * Scrapes real carbon market data from public government and regulatory sources
 */
import * as cheerio from "cheerio";

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

// ── Scraped data store ─────────────────────────────────────────────────────
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
};

async function safeFetch(url, opts = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, { headers: HEADERS, signal: controller.signal, ...opts });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (e) {
    clearTimeout(timeout);
    console.log(`  ⚠ Failed to fetch ${url}: ${e.message}`);
    return null;
  }
}

// ── 1. BEE (Bureau of Energy Efficiency) ────────────────────────────────────
export async function scrapeBEE() {
  console.log("🔍 Scraping BEE notifications...");
  try {
    const html = await safeFetch("https://beeindia.gov.in/en/recent-notifications");
    if (!html) throw new Error("No response");
    const $ = cheerio.load(html);
    const items = [];
    $(".views-row, .view-content .item-list li, table tbody tr, .node--type-notification").each((i, el) => {
      const title = $(el).find("a, .views-field-title, td:first-child").first().text().trim();
      const link = $(el).find("a").attr("href") || "";
      const date = $(el).find(".date-display-single, .views-field-created, td:nth-child(2)").first().text().trim();
      if (title && title.length > 10) {
        items.push({
          id: `bee-${i}`,
          title: title.slice(0, 300),
          link: link.startsWith("http") ? link : `https://beeindia.gov.in${link}`,
          date: date || new Date().toISOString().split("T")[0],
          source: "Bureau of Energy Efficiency (BEE)",
          category: "Energy Efficiency / CCTS",
        });
      }
    });
    scrapedData.bee = { notifications: items.slice(0, 25), lastScraped: new Date().toISOString(), status: "success", count: items.length };
    console.log(`  ✅ BEE: ${items.length} notifications`);
  } catch (e) {
    scrapedData.bee.status = "error";
    scrapedData.bee.error = e.message;
    scrapedData.bee.lastScraped = new Date().toISOString();
    console.log(`  ❌ BEE scrape failed: ${e.message}`);
  }
}

// ── 2. MoEFCC (Ministry of Environment) ─────────────────────────────────────
export async function scrapeMoEFCC() {
  console.log("🔍 Scraping MoEFCC...");
  try {
    const html = await safeFetch("https://moef.gov.in/en/recent-whats-new/");
    if (!html) throw new Error("No response");
    const $ = cheerio.load(html);
    const items = [];
    $("table tbody tr, .views-row, .list-group-item, article").each((i, el) => {
      const title = $(el).find("a, td:first-child").first().text().trim();
      const link = $(el).find("a").attr("href") || "";
      const date = $(el).find("td:nth-child(2), .date, time").first().text().trim();
      if (title && title.length > 10) {
        items.push({
          id: `moefcc-${i}`,
          title: title.slice(0, 300),
          link: link.startsWith("http") ? link : `https://moef.gov.in${link}`,
          date: date || new Date().toISOString().split("T")[0],
          source: "MoEFCC",
          category: "Climate Policy / Carbon Markets",
        });
      }
    });
    scrapedData.moefcc = { notifications: items.slice(0, 25), lastScraped: new Date().toISOString(), status: "success", count: items.length };
    console.log(`  ✅ MoEFCC: ${items.length} items`);
  } catch (e) {
    scrapedData.moefcc.status = "error";
    scrapedData.moefcc.error = e.message;
    scrapedData.moefcc.lastScraped = new Date().toISOString();
    console.log(`  ❌ MoEFCC scrape failed: ${e.message}`);
  }
}

// ── 3. UNFCCC News ──────────────────────────────────────────────────────────
export async function scrapeUNFCCC() {
  console.log("🔍 Scraping UNFCCC news...");
  try {
    const html = await safeFetch("https://unfccc.int/news");
    if (!html) throw new Error("No response");
    const $ = cheerio.load(html);
    const items = [];
    $(".card, .news-item, article, .views-row").each((i, el) => {
      const title = $(el).find("h2, h3, .card-title, a").first().text().trim();
      const link = $(el).find("a").attr("href") || "";
      const date = $(el).find("time, .date, .card-date").first().text().trim();
      const summary = $(el).find("p, .card-text, .summary").first().text().trim();
      if (title && title.length > 10) {
        items.push({
          id: `unfccc-${i}`,
          title: title.slice(0, 300),
          summary: summary.slice(0, 500),
          link: link.startsWith("http") ? link : `https://unfccc.int${link}`,
          date: date || new Date().toISOString().split("T")[0],
          source: "UNFCCC",
          category: "International Climate Policy",
        });
      }
    });
    scrapedData.unfccc = { news: items.slice(0, 20), lastScraped: new Date().toISOString(), status: "success", count: items.length };
    console.log(`  ✅ UNFCCC: ${items.length} news items`);
  } catch (e) {
    scrapedData.unfccc.status = "error";
    scrapedData.unfccc.error = e.message;
    scrapedData.unfccc.lastScraped = new Date().toISOString();
    console.log(`  ❌ UNFCCC scrape failed: ${e.message}`);
  }
}

// ── 4. CarbonCredits.com Market Intelligence ─────────────────────────────────
export async function scrapeCarbonCreditsNews() {
  console.log("🔍 Scraping carbon market news...");
  try {
    const html = await safeFetch("https://carboncredits.com/category/carbon-markets/");
    if (!html) throw new Error("No response");
    const $ = cheerio.load(html);
    const items = [];
    $("article, .post, .entry, .td-module-container").each((i, el) => {
      const title = $(el).find("h2, h3, .entry-title, .td-module-title a").first().text().trim();
      const link = $(el).find("a").attr("href") || "";
      const date = $(el).find("time, .date, .td-post-date").first().text().trim();
      const excerpt = $(el).find(".excerpt, .entry-summary, .td-excerpt, p").first().text().trim();
      if (title && title.length > 10) {
        items.push({
          id: `cc-${i}`,
          title: title.slice(0, 300),
          excerpt: excerpt.slice(0, 500),
          link,
          date: date || new Date().toISOString().split("T")[0],
          source: "CarbonCredits.com",
          category: "Carbon Market News",
        });
      }
    });
    scrapedData.carbonCredits = { articles: items.slice(0, 20), lastScraped: new Date().toISOString(), status: "success", count: items.length };
    console.log(`  ✅ CarbonCredits: ${items.length} articles`);
  } catch (e) {
    scrapedData.carbonCredits.status = "error";
    scrapedData.carbonCredits.error = e.message;
    scrapedData.carbonCredits.lastScraped = new Date().toISOString();
    console.log(`  ❌ CarbonCredits scrape failed: ${e.message}`);
  }
}

// ── 5. Gold Standard Registry ───────────────────────────────────────────────
export async function scrapeGoldStandard() {
  console.log("🔍 Scraping Gold Standard projects (India)...");
  try {
    const url = "https://registry.goldstandard.org/projects?q=&page=1&country=India";
    const html = await safeFetch(url);
    if (!html) throw new Error("No response");
    const $ = cheerio.load(html);
    const items = [];
    $(".project-card, .search-result, tr, .card").each((i, el) => {
      const name = $(el).find("h3, .project-name, td:first-child a, .card-title").first().text().trim();
      const status = $(el).find(".status, .badge, td:nth-child(2)").first().text().trim();
      const type = $(el).find(".type, td:nth-child(3)").first().text().trim();
      const link = $(el).find("a").attr("href") || "";
      if (name && name.length > 5) {
        items.push({
          id: `gs-${i}`,
          name: name.slice(0, 300),
          status: status || "Active",
          type: type || "Renewable Energy",
          registry: "Gold Standard",
          link: link.startsWith("http") ? link : `https://registry.goldstandard.org${link}`,
          country: "India",
        });
      }
    });
    scrapedData.goldStandard = { projects: items.slice(0, 30), lastScraped: new Date().toISOString(), status: "success", count: items.length };
    console.log(`  ✅ Gold Standard: ${items.length} India projects`);
  } catch (e) {
    scrapedData.goldStandard.status = "error";
    scrapedData.goldStandard.error = e.message;
    scrapedData.goldStandard.lastScraped = new Date().toISOString();
    console.log(`  ❌ Gold Standard scrape failed: ${e.message}`);
  }
}

// ── 6. Verra Registry ───────────────────────────────────────────────────────
export async function scrapeVerra() {
  console.log("🔍 Scraping Verra registry (India)...");
  try {
    const url = "https://registry.verra.org/app/search/VCS/All%20Projects";
    const html = await safeFetch(url);
    if (!html) throw new Error("No response");
    const $ = cheerio.load(html);
    const items = [];
    $("tr, .project-item, .search-result").each((i, el) => {
      const name = $(el).find("td:first-child a, .project-name, h4").first().text().trim();
      const status = $(el).find("td:nth-child(3), .status").first().text().trim();
      const type = $(el).find("td:nth-child(2), .type").first().text().trim();
      if (name && name.length > 5 && (name.toLowerCase().includes("india") || i < 15)) {
        items.push({
          id: `verra-${i}`,
          name: name.slice(0, 300),
          status: status || "Registered",
          type: type || "VCS",
          registry: "VCS (Verra)",
          country: "India",
        });
      }
    });
    scrapedData.verra = { projects: items.slice(0, 30), lastScraped: new Date().toISOString(), status: "success", count: items.length };
    console.log(`  ✅ Verra: ${items.length} projects`);
  } catch (e) {
    scrapedData.verra.status = "error";
    scrapedData.verra.error = e.message;
    scrapedData.verra.lastScraped = new Date().toISOString();
    console.log(`  ❌ Verra scrape failed: ${e.message}`);
  }
}

// ── 7. World Bank Carbon Pricing Dashboard ──────────────────────────────────
export async function scrapeWorldBank() {
  console.log("🔍 Scraping World Bank carbon pricing...");
  try {
    const html = await safeFetch("https://carbonpricingdashboard.worldbank.org/");
    if (!html) throw new Error("No response");
    const $ = cheerio.load(html);
    const items = [];
    $(".country-card, .pricing-mechanism, tr, .card, article").each((i, el) => {
      const name = $(el).find("h3, h4, .name, td:first-child").first().text().trim();
      const price = $(el).find(".price, td:nth-child(2), .value").first().text().trim();
      const type = $(el).find(".type, td:nth-child(3)").first().text().trim();
      if (name && name.length > 3) {
        items.push({
          id: `wb-${i}`,
          name: name.slice(0, 200),
          price: price || "N/A",
          type: type || "Carbon Tax / ETS",
          source: "World Bank Carbon Pricing Dashboard",
        });
      }
    });
    scrapedData.worldBank = { carbonPricing: items.slice(0, 20), lastScraped: new Date().toISOString(), status: "success", count: items.length };
    console.log(`  ✅ World Bank: ${items.length} pricing mechanisms`);
  } catch (e) {
    scrapedData.worldBank.status = "error";
    scrapedData.worldBank.error = e.message;
    scrapedData.worldBank.lastScraped = new Date().toISOString();
    console.log(`  ❌ World Bank scrape failed: ${e.message}`);
  }
}

// ── 8. EU CBAM Updates ──────────────────────────────────────────────────────
export async function scrapeEUCBAM() {
  console.log("🔍 Scraping EU CBAM updates...");
  try {
    const html = await safeFetch("https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en");
    if (!html) throw new Error("No response");
    const $ = cheerio.load(html);
    const items = [];
    $("article, .node, .views-row, li, .ecl-list-item").each((i, el) => {
      const title = $(el).find("h2, h3, a, .ecl-link").first().text().trim();
      const link = $(el).find("a").attr("href") || "";
      if (title && title.length > 15) {
        items.push({
          id: `cbam-${i}`,
          title: title.slice(0, 300),
          link: link.startsWith("http") ? link : `https://taxation-customs.ec.europa.eu${link}`,
          source: "European Commission",
          category: "EU CBAM",
          date: new Date().toISOString().split("T")[0],
        });
      }
    });
    scrapedData.euCbam = { updates: items.slice(0, 15), lastScraped: new Date().toISOString(), status: "success", count: items.length };
    console.log(`  ✅ EU CBAM: ${items.length} items`);
  } catch (e) {
    scrapedData.euCbam.status = "error";
    scrapedData.euCbam.error = e.message;
    scrapedData.euCbam.lastScraped = new Date().toISOString();
    console.log(`  ❌ EU CBAM scrape failed: ${e.message}`);
  }
}

// ── 9. ICAP ETS Map ─────────────────────────────────────────────────────────
export async function scrapeICAP() {
  console.log("🔍 Scraping ICAP Emissions Trading Systems...");
  try {
    const html = await safeFetch("https://icapcarbonaction.com/en/ets");
    if (!html) throw new Error("No response");
    const $ = cheerio.load(html);
    const items = [];
    $(".ets-card, .country-item, article, .views-row, tr").each((i, el) => {
      const name = $(el).find("h3, h4, .title, td:first-child").first().text().trim();
      const status = $(el).find(".status, .badge, td:nth-child(2)").first().text().trim();
      if (name && name.length > 3) {
        items.push({
          id: `icap-${i}`,
          name: name.slice(0, 200),
          status: status || "Active",
          source: "ICAP",
          category: "Emissions Trading Systems",
        });
      }
    });
    scrapedData.icap = { systems: items.slice(0, 20), lastScraped: new Date().toISOString(), status: "success", count: items.length };
    console.log(`  ✅ ICAP: ${items.length} ETS systems`);
  } catch (e) {
    scrapedData.icap.status = "error";
    scrapedData.icap.error = e.message;
    scrapedData.icap.lastScraped = new Date().toISOString();
    console.log(`  ❌ ICAP scrape failed: ${e.message}`);
  }
}

// ── 10. CEEW (Council on Energy, Environment and Water) ─────────────────────
export async function scrapeCEEW() {
  console.log("🔍 Scraping CEEW Research...");
  try {
    const html = await safeFetch("https://www.ceew.in/publications");
    if (!html) throw new Error("No response");
    const $ = cheerio.load(html);
    const items = [];
    $(".publication-card, .views-row, article, .card").each((i, el) => {
      const title = $(el).find("h3, h4, .title, a").first().text().trim();
      const link = $(el).find("a").attr("href") || "";
      const date = $(el).find(".date, time").first().text().trim();
      if (title && title.length > 10) {
        items.push({
          id: `ceew-${i}`,
          title: title.slice(0, 300),
          link: link.startsWith("http") ? link : `https://www.ceew.in${link}`,
          source: "CEEW",
          category: "Policy Research",
          date: date || new Date().toISOString().split("T")[0],
        });
      }
    });
    scrapedData.ceew = { research: items.slice(0, 15), lastScraped: new Date().toISOString(), status: "success", count: items.length };
    console.log(`  ✅ CEEW: ${items.length} research papers`);
  } catch (e) {
    scrapedData.ceew.status = "error";
    scrapedData.ceew.error = e.message;
    scrapedData.ceew.lastScraped = new Date().toISOString();
    console.log(`  ❌ CEEW scrape failed: ${e.message}`);
  }
}

// ── 11. IETA (International Emissions Trading Association) ──────────────────
export async function scrapeIETA() {
  console.log("🔍 Scraping IETA News...");
  try {
    const html = await safeFetch("https://www.ieta.org/news/");
    if (!html) throw new Error("No response");
    const $ = cheerio.load(html);
    const items = [];
    $("article, .post, .entry").each((i, el) => {
      const title = $(el).find("h2, h3, .entry-title").first().text().trim();
      const link = $(el).find("a").attr("href") || "";
      const date = $(el).find("time, .date").first().text().trim();
      if (title && title.length > 10) {
        items.push({
          id: `ieta-${i}`,
          title: title.slice(0, 300),
          link,
          source: "IETA",
          category: "Carbon Market News",
          date: date || new Date().toISOString().split("T")[0],
        });
      }
    });
    scrapedData.ieta = { news: items.slice(0, 15), lastScraped: new Date().toISOString(), status: "success", count: items.length };
    console.log(`  ✅ IETA: ${items.length} news items`);
  } catch (e) {
    scrapedData.ieta.status = "error";
    scrapedData.ieta.error = e.message;
    scrapedData.ieta.lastScraped = new Date().toISOString();
    console.log(`  ❌ IETA scrape failed: ${e.message}`);
  }
}

// ── 12. EEX (European Energy Exchange) Market Data ──────────────────────────
export async function scrapeEEX() {
  console.log("🔍 Scraping EEX Carbon Prices...");
  try {
    const html = await safeFetch("https://www.eex.com/en/market-data/environmental-markets/spot-market");
    if (!html) throw new Error("No response");
    const $ = cheerio.load(html);
    const items = [];
    $("table tr").each((i, el) => {
      const product = $(el).find("td:nth-child(1)").text().trim();
      const price = $(el).find("td:nth-child(2)").text().trim();
      if (product && price && (product.includes("EUA") || product.includes("EUAA"))) {
        items.push({
          id: `eex-${i}`,
          product: product.slice(0, 100),
          price: price,
          source: "EEX",
          category: "Carbon Price",
          date: new Date().toISOString().split("T")[0],
        });
      }
    });
    scrapedData.eex = { prices: items.slice(0, 10), lastScraped: new Date().toISOString(), status: "success", count: items.length };
    console.log(`  ✅ EEX: ${items.length} price points`);
  } catch (e) {
    scrapedData.eex.status = "error";
    scrapedData.eex.error = e.message;
    scrapedData.eex.lastScraped = new Date().toISOString();
    console.log(`  ❌ EEX scrape failed: ${e.message}`);
  }
}

// ── Master scrape function ──────────────────────────────────────────────────
export async function runAllScrapers() {
  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("🌿 CarbonCounsel Data Collection Engine — Starting scrape");
  console.log("═══════════════════════════════════════════════════════════\n");

  const scrapers = [
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
  ];

  // Run scrapers sequentially to be respectful to servers
  for (const scraper of scrapers) {
    await scraper();
    // Small delay between requests
    await new Promise((r) => setTimeout(r, 1500));
  }

  const summary = Object.entries(scrapedData).map(([source, data]) => ({
    source,
    status: data.status,
    count: data.count || (data.notifications || data.news || data.articles || data.projects || data.updates || data.systems || data.carbonPricing || []).length,
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
