import { load } from "cheerio";
import safeFetch from "./safeFetch.js";
import { recordSuccess, recordFailure } from "../services/sourceHealth.service.js";

const SOURCE_NAME = "IETA";
const URL = "https://www.ieta.org/news/";

export async function scrapeIETA() {
  console.log("🔍 Scraping IETA News...");
  const start = Date.now();
  try {
    const html = await safeFetch(URL);
    if (!html) throw new Error("No response");
    const $ = load(html);
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
    recordSuccess(SOURCE_NAME, Date.now() - start);
    console.log(`  ✅ IETA: ${items.length} news items`);
    return { news: items.slice(0, 15), lastScraped: new Date().toISOString(), status: "success", count: items.length };
  } catch (e) {
    recordFailure(SOURCE_NAME, e);
    console.log(`  ❌ IETA scrape failed: ${e.message}`);
    return { news: [], lastScraped: new Date().toISOString(), status: "error", error: e.message };
  }
}
