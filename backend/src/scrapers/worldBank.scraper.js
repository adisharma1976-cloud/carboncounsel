import { load } from "cheerio";
import safeFetch from "./safeFetch.js";
import { recordSuccess, recordFailure } from "../services/sourceHealth.service.js";

const SOURCE_NAME = "WorldBank";
const URL = "https://carbonpricingdashboard.worldbank.org/";

export async function scrapeWorldBank() {
  console.log("🔍 Scraping World Bank carbon pricing...");
  const start = Date.now();
  try {
    const html = await safeFetch(URL);
    if (!html) throw new Error("No response");
    const $ = load(html);
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
    recordSuccess(SOURCE_NAME, Date.now() - start);
    console.log(`  ✅ World Bank: ${items.length} pricing mechanisms`);
    return { carbonPricing: items.slice(0, 20), lastScraped: new Date().toISOString(), status: "success", count: items.length };
  } catch (e) {
    recordFailure(SOURCE_NAME, e);
    console.log(`  ❌ World Bank scrape failed: ${e.message}`);
    return { carbonPricing: [], lastScraped: new Date().toISOString(), status: "error", error: e.message };
  }
}
