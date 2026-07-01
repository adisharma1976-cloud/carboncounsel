import { load } from "cheerio";
import safeFetch from "./safeFetch.js";
import { recordSuccess, recordFailure } from "../services/sourceHealth.service.js";

const SOURCE_NAME = "BEE";
const URL = "https://beeindia.gov.in/en/recent-notifications";

export async function scrapeBEE() {
  console.log("🔍 Scraping BEE notifications...");
  const start = Date.now();
  try {
    const html = await safeFetch(URL);
    if (!html) throw new Error("No response");
    const $ = load(html);
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
    recordSuccess(SOURCE_NAME, Date.now() - start);
    console.log(`  ✅ BEE: ${items.length} notifications`);
    return { notifications: items.slice(0, 25), lastScraped: new Date().toISOString(), status: "success", count: items.length };
  } catch (e) {
    recordFailure(SOURCE_NAME, e);
    console.log(`  ❌ BEE scrape failed: ${e.message}`);
    return { notifications: [], lastScraped: new Date().toISOString(), status: "error", error: e.message };
  }
}
