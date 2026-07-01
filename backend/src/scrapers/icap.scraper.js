import { load } from "cheerio";
import safeFetch from "./safeFetch.js";
import { recordSuccess, recordFailure } from "../services/sourceHealth.service.js";

const SOURCE_NAME = "ICAP";
const URL = "https://icapcarbonaction.com/en/ets";

export async function scrapeICAP() {
  console.log("🔍 Scraping ICAP Emissions Trading Systems...");
  const start = Date.now();
  try {
    const html = await safeFetch(URL);
    if (!html) throw new Error("No response");
    const $ = load(html);
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
    recordSuccess(SOURCE_NAME, Date.now() - start);
    console.log(`  ✅ ICAP: ${items.length} ETS systems`);
    return { systems: items.slice(0, 20), lastScraped: new Date().toISOString(), status: "success", count: items.length };
  } catch (e) {
    recordFailure(SOURCE_NAME, e);
    console.log(`  ❌ ICAP scrape failed: ${e.message}`);
    return { systems: [], lastScraped: new Date().toISOString(), status: "error", error: e.message };
  }
}
