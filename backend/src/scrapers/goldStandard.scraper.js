import { load } from "cheerio";
import safeFetch from "./safeFetch.js";
import { recordSuccess, recordFailure } from "../services/sourceHealth.service.js";

const SOURCE_NAME = "GoldStandard";
const URL = "https://registry.goldstandard.org/projects?q=&page=1&country=India";

export async function scrapeGoldStandard() {
  console.log("🔍 Scraping Gold Standard projects (India)...");
  const start = Date.now();
  try {
    const html = await safeFetch(URL);
    if (!html) throw new Error("No response");
    const $ = load(html);
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
    recordSuccess(SOURCE_NAME, Date.now() - start);
    console.log(`  ✅ Gold Standard: ${items.length} India projects`);
    return { projects: items.slice(0, 30), lastScraped: new Date().toISOString(), status: "success", count: items.length };
  } catch (e) {
    recordFailure(SOURCE_NAME, e);
    console.log(`  ❌ Gold Standard scrape failed: ${e.message}`);
    return { projects: [], lastScraped: new Date().toISOString(), status: "error", error: e.message };
  }
}
