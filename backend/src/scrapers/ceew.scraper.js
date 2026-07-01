import { load } from "cheerio";
import safeFetch from "./safeFetch.js";
import { recordSuccess, recordFailure } from "../services/sourceHealth.service.js";

const SOURCE_NAME = "CEEW";
const URL = "https://www.ceew.in/publications";

export async function scrapeCEEW() {
  console.log("🔍 Scraping CEEW Research...");
  const start = Date.now();
  try {
    const html = await safeFetch(URL);
    if (!html) throw new Error("No response");
    const $ = load(html);
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
    recordSuccess(SOURCE_NAME, Date.now() - start);
    console.log(`  ✅ CEEW: ${items.length} research papers`);
    return { research: items.slice(0, 15), lastScraped: new Date().toISOString(), status: "success", count: items.length };
  } catch (e) {
    recordFailure(SOURCE_NAME, e);
    console.log(`  ❌ CEEW scrape failed: ${e.message}`);
    return { research: [], lastScraped: new Date().toISOString(), status: "error", error: e.message };
  }
}
