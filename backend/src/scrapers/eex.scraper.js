import { load } from "cheerio";
import safeFetch from "./safeFetch.js";
import { recordSuccess, recordFailure } from "../services/sourceHealth.service.js";

const SOURCE_NAME = "EEX";
const URL = "https://www.eex.com/en/market-data/environmental-markets/spot-market";

export async function scrapeEEX() {
  console.log("🔍 Scraping EEX Carbon Prices...");
  const start = Date.now();
  try {
    const html = await safeFetch(URL);
    if (!html) throw new Error("No response");
    const $ = load(html);
    const items = [];
    $("table tr").each((i, el) => {
      const product = $(el).find("td:nth-child(1)").text().trim();
      const price = $(el).find("td:nth-child(2)").text().trim();
      if (product && price && (product.includes("EUA") || product.includes("EUAA"))) {
        items.push({
          id: `eex-${i}`,
          product: product.slice(0, 100),
          price,
          source: "EEX",
          category: "Carbon Price",
          date: new Date().toISOString().split("T")[0],
        });
      }
    });
    recordSuccess(SOURCE_NAME, Date.now() - start);
    console.log(`  ✅ EEX: ${items.length} price points`);
    return { prices: items.slice(0, 10), lastScraped: new Date().toISOString(), status: "success", count: items.length };
  } catch (e) {
    recordFailure(SOURCE_NAME, e);
    console.log(`  ❌ EEX scrape failed: ${e.message}`);
    return { prices: [], lastScraped: new Date().toISOString(), status: "error", error: e.message };
  }
}
