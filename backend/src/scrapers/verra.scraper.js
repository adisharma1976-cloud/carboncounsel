import { load } from "cheerio";
import safeFetch from "./safeFetch.js";
import { recordSuccess, recordFailure } from "../services/sourceHealth.service.js";

const SOURCE_NAME = "Verra";
const URL = "https://registry.verra.org/app/search/VCS/All%20Projects";

export async function scrapeVerra() {
  console.log("🔍 Scraping Verra registry (India)...");
  const start = Date.now();
  try {
    const html = await safeFetch(URL);
    if (!html) throw new Error("No response");
    const $ = load(html);
    const items = [];
    $("tr, .project-item, .search-result").each((i, el) => {
      const name = $(el).find("td:first-child a, .project-name, h4").first().text().trim();
      const status = $(el).find("td:nth-child(3), .status").first().text().trim();
      const type = $(el).find("td:nth-child(2), .type").first().text().trim();
      if (name && name.length > 5 && (name.toLowerCase().includes("india") || i < 15)) {
        items.push({
          id: `verra-${i}`,
          name: name.slice(0, 300),
          status: status || "Registered",
          type: type || "VCS",
          registry: "VCS (Verra)",
          country: "India",
        });
      }
    });
    recordSuccess(SOURCE_NAME, Date.now() - start);
    console.log(`  ✅ Verra: ${items.length} projects`);
    return { projects: items.slice(0, 30), lastScraped: new Date().toISOString(), status: "success", count: items.length };
  } catch (e) {
    recordFailure(SOURCE_NAME, e);
    console.log(`  ❌ Verra scrape failed: ${e.message}`);
    return { projects: [], lastScraped: new Date().toISOString(), status: "error", error: e.message };
  }
}
