import { load } from "cheerio";
import safeFetch from "./safeFetch.js";
import { recordSuccess, recordFailure } from "../services/sourceHealth.service.js";

const SOURCE_NAME = "MoEFCC";
const URL = "https://moef.gov.in/en/recent-whats-new/";

export async function scrapeMoEFCC() {
  console.log("🔍 Scraping MoEFCC...");
  const start = Date.now();
  try {
    const html = await safeFetch(URL);
    if (!html) throw new Error("No response");
    const $ = load(html);
    const items = [];
    $("table tbody tr, .views-row, .list-group-item, article").each((i, el) => {
      const title = $(el).find("a, td:first-child").first().text().trim();
      const link = $(el).find("a").attr("href") || "";
      const date = $(el).find("td:nth-child(2), .date, time").first().text().trim();
      if (title && title.length > 10) {
        items.push({
          id: `moefcc-${i}`,
          title: title.slice(0, 300),
          link: link.startsWith("http") ? link : `https://moef.gov.in${link}`,
          date: date || new Date().toISOString().split("T")[0],
          source: "MoEFCC",
          category: "Climate Policy / Carbon Markets",
        });
      }
    });
    recordSuccess(SOURCE_NAME, Date.now() - start);
    console.log(`  ✅ MoEFCC: ${items.length} items`);
    return { notifications: items.slice(0, 25), lastScraped: new Date().toISOString(), status: "success", count: items.length };
  } catch (e) {
    recordFailure(SOURCE_NAME, e);
    console.log(`  ❌ MoEFCC scrape failed: ${e.message}`);
    return { notifications: [], lastScraped: new Date().toISOString(), status: "error", error: e.message };
  }
}
