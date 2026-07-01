/**
 * CarbonCounsel Backend API Server
 * Modularized, Evidence-backed, and Source-aware.
 */
import express from "express";
import cors from "cors";
import cron from "node-cron";

import apiRoutes from "./src/routes/api.routes.js";
import { runSeed } from "./src/db/seed.js";
import { runAllScrapers, scrapedData } from "./src/scrapers/index.js";

const app = express();
const PORT = process.env.BACKEND_PORT || 8080;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Memory Store for Early Access (Demo) ──────────────────────────────────
const earlyAccessSignups = [];
let scrapeHistory = [];

// ── Routes ──────────────────────────────────────────────────────────────────
// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", version: "3.0.0", timestamp: new Date().toISOString(), uptime: process.uptime() });
});

// Mount modular API routes
app.use("/api", apiRoutes);

// Early Access Route
app.post("/api/early-access", (req, res) => {
  const { name, email, phone, org, role, sector, type, usecase, interest, message } = req.body;
  if (!name || !email || !org || !role || !type) return res.status(400).json({ error: "Required fields: name, email, org, role, type" });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: "Invalid email address" });
  if (earlyAccessSignups.find((s) => s.email === email)) return res.status(409).json({ error: "Email already registered" });

  const signup = {
    id: `ea-${Date.now()}`, name, email, phone: phone || null, org, role,
    sector: sector || null, type, usecase: usecase || null,
    interest: interest || [], message: message || null,
    registeredAt: new Date().toISOString(), status: "pending",
  };
  earlyAccessSignups.push(signup);
  console.log(`[Early Access] New signup: ${name} <${email}> from ${org}`);
  res.status(201).json({ success: true, message: "You've been added to the CarbonCounsel early access list.", id: signup.id });
});

app.get("/api/admin/early-access", (req, res) => {
  res.json({ signups: earlyAccessSignups, total: earlyAccessSignups.length });
});

// Scraper API Routes
app.get("/api/scraper/data", (req, res) => {
  const summary = {};
  for (const [key, val] of Object.entries(scrapedData)) {
    summary[key] = {
      status: val.status,
      lastScraped: val.lastScraped,
      count: (val.notifications || val.news || val.articles || val.projects || val.updates || val.systems || val.carbonPricing || []).length,
    };
  }
  res.json({ sources: summary, totalSources: Object.keys(scrapedData).length });
});

app.get("/api/scraper/data/:source", (req, res) => {
  const source = req.params.source;
  if (!scrapedData[source]) return res.status(404).json({ error: `Source '${source}' not found. Available: ${Object.keys(scrapedData).join(", ")}` });
  res.json(scrapedData[source]);
});

app.post("/api/scraper/run", async (req, res) => {
  console.log("\n🔄 Manual scrape triggered via API...");
  const summary = await runAllScrapers();
  scrapeHistory.push({ timestamp: new Date().toISOString(), trigger: "manual", summary });
  res.json({ success: true, message: "Scrape complete", summary });
});

app.get("/api/scraper/history", (req, res) => {
  res.json({ history: scrapeHistory.slice(-10), total: scrapeHistory.length });
});

// ══════════════════════════════════════════════════════════════════════════════
// START SERVER + INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════════

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true' || !!process.env.VERCEL;

if (isVercel) {
  // In serverless environments, we run seed synchronously on boot (cold start).
  // Scrapes are manually triggered or triggered by external CRON,
  // since node-cron won't run indefinitely in a lambda.
  runSeed();
  console.log("🌱 Vercel cold-start: DB Seeded into /tmp");
} else {
  // Local Development
  app.listen(PORT, () => {
    console.log(`\n🌿 CarbonCounsel API Server v3.0 running on http://localhost:${PORT}`);

    // 1. Initialize DB and Seed
    runSeed();

    // 2. Start initial scrape
    console.log("⏳ Running initial data collection via modular scrapers...\n");
    runAllScrapers().then(summary => {
      scrapeHistory.push({ timestamp: new Date().toISOString(), trigger: "startup", summary });
    }).catch(err => console.error("Scrape failed on startup:", err));

    // 3. Schedule recurring scrape
    cron.schedule("0 */6 * * *", async () => {
      console.log("\n⏰ Scheduled scrape triggered...");
      try {
        const summary = await runAllScrapers();
        scrapeHistory.push({ timestamp: new Date().toISOString(), trigger: "cron", summary });
      } catch(err) {
        console.error("Scheduled scrape failed:", err);
      }
    });
  });
}

// Export for Vercel
export default app;
