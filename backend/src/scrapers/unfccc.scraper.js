import { load } from "cheerio";
import safeFetch from "./safeFetch.js";
import { recordSuccess, recordFailure } from "../services/sourceHealth.service.js";

const SOURCE_NAME = "UNFCCC";
const URL = "https://unfccc.int/news";

export async function scrapeUNFCCC() {
  console.log("🔍 Scraping UNFCCC news...");
  const start = Date.now();
  try {
    const html = await safeFetch(URL);
    if (!html) throw new Error("No response");
    const $ = load(html);
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
    recordSuccess(SOURCE_NAME, Date.now() - start);
    console.log(`  ✅ UNFCCC: ${items.length} news items`);
    return { news: items.slice(0, 20), lastScraped: new Date().toISOString(), status: "success", count: items.length };
  } catch (e) {
    recordFailure(SOURCE_NAME, e);
    console.log(`  ❌ UNFCCC scrape failed: ${e.message}`);
    return { news: [], lastScraped: new Date().toISOString(), status: "error", error: e.message };
  }
}
