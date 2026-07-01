import { load } from "cheerio";
import safeFetch from "./safeFetch.js";
import { recordSuccess, recordFailure } from "../services/sourceHealth.service.js";

const SOURCE_NAME = "EU_CBAM";
const URL = "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en";

export async function scrapeEUCBAM() {
  console.log("🔍 Scraping EU CBAM updates...");
  const start = Date.now();
  try {
    const html = await safeFetch(URL);
    if (!html) throw new Error("No response");
    const $ = load(html);
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
    recordSuccess(SOURCE_NAME, Date.now() - start);
    console.log(`  ✅ EU CBAM: ${items.length} items`);
    return { updates: items.slice(0, 15), lastScraped: new Date().toISOString(), status: "success", count: items.length };
  } catch (e) {
    recordFailure(SOURCE_NAME, e);
    console.log(`  ❌ EU CBAM scrape failed: ${e.message}`);
    return { updates: [], lastScraped: new Date().toISOString(), status: "error", error: e.message };
  }
}
