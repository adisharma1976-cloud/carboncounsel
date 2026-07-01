import { load } from "cheerio";
import safeFetch from "./safeFetch.js";
import { recordSuccess, recordFailure } from "../services/sourceHealth.service.js";

const SOURCE_NAME = "CarbonCredits";
const URL = "https://carboncredits.com/category/carbon-markets/";

export async function scrapeCarbonCreditsNews() {
  console.log("🔍 Scraping carbon market news...");
  const start = Date.now();
  try {
    const html = await safeFetch(URL);
    if (!html) throw new Error("No response");
    const $ = load(html);
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
    recordSuccess(SOURCE_NAME, Date.now() - start);
    console.log(`  ✅ CarbonCredits: ${items.length} articles`);
    return { articles: items.slice(0, 20), lastScraped: new Date().toISOString(), status: "success", count: items.length };
  } catch (e) {
    recordFailure(SOURCE_NAME, e);
    console.log(`  ❌ CarbonCredits scrape failed: ${e.message}`);
    return { articles: [], lastScraped: new Date().toISOString(), status: "error", error: e.message };
  }
}
