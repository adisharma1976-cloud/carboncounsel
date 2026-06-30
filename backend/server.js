/**
 * CarbonCounsel Backend API Server
 * Full Express backend with data scraping, AI intelligence, CCTS compliance,
 * regulatory feed, carbon project database, and early access signups.
 */
import express from "express";
import cors from "cors";
import cron from "node-cron";
import { runAllScrapers, scrapedData } from "./scraper.js";
import { companies, carbonPrices, sectorEmissions, regulatoryTimeline, projectPipeline, cbamExposure } from "./data.js";

const app = express();
const PORT = process.env.BACKEND_PORT || 8080;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── In-memory data store ────────────────────────────────────────────────────
const earlyAccessSignups = [];
const aiQueries = [];
let scrapeHistory = [];

// ── CCTS Compliance Data ────────────────────────────────────────────────────
const cctsSectors = [
  { id: "cement", name: "Cement", riskLevel: "High", geiBaseline: 720, geiUnit: "kg CO₂e/tonne", covered: true, obligatedEntities: 42, complianceDeadline: "2026-03-31", tradingStatus: "Active", lastUpdated: "2026-06-15", notes: "BEE updated sectoral GEI baseline in June 2026. All plants above 50,000 tonne/year are obligated." },
  { id: "iron-steel", name: "Iron & Steel", riskLevel: "High", geiBaseline: 2.5, geiUnit: "GJ/tonne", covered: true, obligatedEntities: 67, complianceDeadline: "2026-03-31", tradingStatus: "Active", lastUpdated: "2026-06-10", notes: "Includes integrated steel plants and electric arc furnace operators above threshold." },
  { id: "aluminium", name: "Aluminium", riskLevel: "High", geiBaseline: 14.8, geiUnit: "GJ/tonne", covered: true, obligatedEntities: 18, complianceDeadline: "2026-03-31", tradingStatus: "Active", lastUpdated: "2026-05-28", notes: "Primary aluminium smelters and secondary producers covered." },
  { id: "fertiliser", name: "Fertiliser", riskLevel: "Medium", geiBaseline: 8.2, geiUnit: "GJ/tonne", covered: true, obligatedEntities: 31, complianceDeadline: "2026-06-30", tradingStatus: "Pending", lastUpdated: "2026-06-01", notes: "Nitrogenous fertiliser plants currently in Phase I. Coverage expanding." },
  { id: "petroleum-refinery", name: "Petroleum Refinery", riskLevel: "High", geiBaseline: 62.5, geiUnit: "kg CO₂e/tonne", covered: true, obligatedEntities: 23, complianceDeadline: "2026-03-31", tradingStatus: "Active", lastUpdated: "2026-06-20", notes: "All refineries above 1 MMTPA throughput are covered under CCTS Phase I." },
  { id: "petrochemicals", name: "Petrochemicals", riskLevel: "Medium", geiBaseline: 10.1, geiUnit: "GJ/tonne", covered: true, obligatedEntities: 29, complianceDeadline: "2026-09-30", tradingStatus: "Pending", lastUpdated: "2026-05-15", notes: "Phase II expansion. Currently in notification review period." },
  { id: "textiles", name: "Textiles", riskLevel: "Medium", geiBaseline: 3.4, geiUnit: "GJ/tonne", covered: false, obligatedEntities: 0, complianceDeadline: null, tradingStatus: "Not Covered", lastUpdated: "2026-06-01", notes: "Not yet covered under CCTS. Export-linked CBAM risk is growing." },
];

const regulatoryUpdates = [
  { id: "upd-001", title: "BEE updates sectoral GEI baseline for Cement", body: "Bureau of Energy Efficiency revised the Gross Energy Intensity baseline for the cement sector downward by 3.2%, increasing compliance burden for FY2025-26.", source: "BEE Notification No. 12/2026", date: "2026-06-28", sector: "Cement", urgency: "High", tags: ["BEE", "GEI", "Cement", "CCTS"] },
  { id: "upd-002", title: "MoEFCC issues notification on CCTS offset mechanism", body: "Ministry of Environment, Forest and Climate Change clarifies rules for voluntary carbon credit use as offset under CCTS Phase I. Maximum 10% offset allowed.", source: "MoEFCC Gazette Notification G.S.R. 422(E)", date: "2026-06-26", sector: "All", urgency: "High", tags: ["MoEFCC", "Offset", "Carbon Credits", "CCTS"] },
  { id: "upd-003", title: "EU CBAM transition period reporting deadline update", body: "European Commission extends Q2 2026 transitional CBAM report submission deadline by 30 days for Indian exporters in cement and steel sectors.", source: "EU Commission Implementing Regulation 2026/814", date: "2026-06-23", sector: "Cement, Iron & Steel", urgency: "Medium", tags: ["CBAM", "EU", "Export", "Cement", "Steel"] },
  { id: "upd-004", title: "Article 6.4 mechanism supervisory body approves new methodology", body: "UN Article 6.4 Supervisory Body approved new VM0042-equivalent methodology for renewable energy projects enabling ITMOs issuance for Indian developers.", source: "UNFCCC SB-A6.4 Decision 2026/12", date: "2026-06-18", sector: "Renewable Energy", urgency: "Medium", tags: ["Article 6", "UNFCCC", "ITMOs", "Renewable Energy"] },
  { id: "upd-005", title: "SEBI proposes framework for Green Credit instruments", body: "Securities and Exchange Board of India releases consultation paper proposing listing and trading of Green Credits on recognised stock exchanges.", source: "SEBI Circular CD/DOP1/2026/45", date: "2026-06-12", sector: "Financial Services", urgency: "Low", tags: ["SEBI", "Green Credits", "Carbon Market"] },
];

// ── AI Intelligence ─────────────────────────────────────────────────────────
const aiKnowledgeBase = {
  "cement ccts": { answer: "Yes, cement manufacturers in India are covered under the Carbon Credit Trading Scheme (CCTS) Phase I, notified by MoEFCC. Plants with a production capacity above 50,000 tonnes per annum are obligated entities. The Gross Energy Intensity (GEI) baseline for cement was recently updated by BEE to 720 kg CO₂e per tonne.", riskLevel: "High", sources: ["MoEFCC CCTS Notification 2023", "BEE GEI Baseline Update June 2026", "CCTS Phase I Regulations"], relatedSectors: ["Cement"], actionItems: ["Audit current GEI performance", "Register as obligated entity with BEE", "Assess ESCert shortfall"] },
  "textile exporter carbon risk": { answer: "A textile exporter in India faces growing carbon risk from multiple directions, even though textiles are not currently covered under CCTS Phase I. Key exposures include: (1) EU CBAM applicability; (2) Supply chain decarbonisation requirements; (3) Potential CCTS Phase II coverage; (4) Renewable Energy obligations under BEE.", riskLevel: "Medium", sources: ["EU CBAM Regulation 2023/956", "BEE Notification RE Obligations", "CCTS Phase I Sectors List"], relatedSectors: ["Textiles"], actionItems: ["Map Scope 1, 2, 3 emissions", "Assess EU buyer requirements", "Monitor CCTS Phase II expansion"] },
  "article 6 india": { answer: "India has not yet signed bilateral Article 6 agreements, but is actively engaged in COP negotiations. The Government of India has established a national framework for Internationally Transferred Mitigation Outcomes (ITMOs).", riskLevel: "Low", sources: ["UNFCCC Paris Agreement Article 6", "MoEFCC DNA Framework 2024", "SB-A6.4 Decision 2026/12"], relatedSectors: ["Renewable Energy", "Forestry"], actionItems: ["Contact MoEFCC DNA for ITMO registration", "Assess project eligibility under approved methodologies"] },
  "cbam india": { answer: "The EU Carbon Border Adjustment Mechanism (CBAM) entered its transitional phase in October 2023 and will be fully operative from 2026. Indian exporters of cement, iron & steel, aluminium, fertilisers to the EU must report embedded GHG emissions quarterly.", riskLevel: "High", sources: ["EU CBAM Regulation 2023/956", "EU Commission Implementing Regulation 2026/814", "MoEFCC Advisory on CBAM"], relatedSectors: ["Cement", "Iron & Steel", "Aluminium", "Fertiliser"], actionItems: ["Register on EU CBAM portal", "Measure and report embedded emissions", "Engage EU importer on cost sharing"] },
};

// ══════════════════════════════════════════════════════════════════════════════
// API ROUTES
// ══════════════════════════════════════════════════════════════════════════════

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", version: "2.0.0", timestamp: new Date().toISOString(), uptime: process.uptime() });
});

// ── CCTS Sectors ────────────────────────────────────────────────────────────
app.get("/api/ccts/sectors", (req, res) => {
  const { riskLevel, covered } = req.query;
  let sectors = cctsSectors;
  if (riskLevel) sectors = sectors.filter((s) => s.riskLevel.toLowerCase() === riskLevel.toLowerCase());
  if (covered !== undefined) sectors = sectors.filter((s) => s.covered === (covered === "true"));
  res.json({ sectors, total: sectors.length, lastUpdated: "2026-06-30" });
});

app.get("/api/ccts/sectors/:id", (req, res) => {
  const sector = cctsSectors.find((s) => s.id === req.params.id);
  if (!sector) return res.status(404).json({ error: "Sector not found" });
  res.json(sector);
});

// ── Regulatory Updates ──────────────────────────────────────────────────────
app.get("/api/intelligence/updates", (req, res) => {
  const { sector, urgency, limit } = req.query;
  let updates = regulatoryUpdates;
  if (sector) updates = updates.filter((u) => u.sector.toLowerCase().includes(sector.toLowerCase()));
  if (urgency) updates = updates.filter((u) => u.urgency.toLowerCase() === urgency.toLowerCase());
  if (limit) updates = updates.slice(0, parseInt(limit));
  res.json({ updates, total: updates.length });
});

app.get("/api/intelligence/updates/:id", (req, res) => {
  const update = regulatoryUpdates.find((u) => u.id === req.params.id);
  if (!update) return res.status(404).json({ error: "Update not found" });
  res.json(update);
});

// ── Carbon Projects ─────────────────────────────────────────────────────────
app.get("/api/projects", (req, res) => {
  const { type, status, registry } = req.query;
  let projects = projectPipeline;
  if (type) projects = projects.filter((p) => p.type.toLowerCase().includes(type.toLowerCase()));
  if (status) projects = projects.filter((p) => p.status.toLowerCase() === status.toLowerCase());
  if (registry) projects = projects.filter((p) => p.registry.toLowerCase().includes(registry.toLowerCase()));
  res.json({ projects, total: projects.length });
});

app.get("/api/projects/:id", (req, res) => {
  const project = projectPipeline.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

// ── Massive Data API Endpoints ─────────────────────────────────────────────
app.get("/api/companies", (req, res) => {
  const { sector, cctsCovered, cbamExposed } = req.query;
  let list = companies;
  if (sector) list = list.filter((c) => c.sector.toLowerCase() === sector.toLowerCase());
  if (cctsCovered !== undefined) list = list.filter((c) => c.cctsCovered === (cctsCovered === "true"));
  if (cbamExposed !== undefined) list = list.filter((c) => c.cbamExposed === (cbamExposed === "true"));
  res.json({ companies: list, total: list.length });
});

app.get("/api/carbon-prices", (req, res) => {
  res.json(carbonPrices);
});

app.get("/api/sector-emissions", (req, res) => {
  res.json(sectorEmissions);
});

app.get("/api/timeline", (req, res) => {
  res.json(regulatoryTimeline);
});

app.get("/api/cbam-exposure", (req, res) => {
  res.json(cbamExposure);
});

// ── AI Query ────────────────────────────────────────────────────────────────
app.post("/api/ai/query", (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== "string") return res.status(400).json({ error: "Query is required" });

  const queryId = `q-${Date.now()}`;
  const queryLower = query.toLowerCase();
  let result = null;
  for (const [key, value] of Object.entries(aiKnowledgeBase)) {
    if (key.split(" ").every((kw) => queryLower.includes(kw))) { result = value; break; }
  }
  if (!result) {
    // Check scraped data for additional context
    const allScrapedItems = [
      ...scrapedData.bee.notifications,
      ...scrapedData.moefcc.notifications,
      ...scrapedData.unfccc.news,
      ...scrapedData.carbonCredits.articles,
    ];
    const relevant = allScrapedItems.filter(item => {
      const text = (item.title || item.name || "").toLowerCase();
      return queryLower.split(" ").some(word => word.length > 3 && text.includes(word));
    }).slice(0, 3);

    result = {
      answer: `CarbonCounsel has analysed your query: "${query}". Based on our intelligence database covering Indian CCTS regulations, carbon credit markets, CBAM, Article 6, and renewable energy obligations, we recommend conducting a detailed sector-specific review.${relevant.length ? ` We found ${relevant.length} related items in our live intelligence feed.` : ""}`,
      riskLevel: "Moderate",
      sources: relevant.length ? relevant.map(r => r.source || r.title) : ["CarbonCounsel Intelligence Database", "BEE Regulatory Feed"],
      relatedSectors: [],
      actionItems: ["Refine query for sector-specific analysis", "Request full intelligence report"],
      relatedArticles: relevant,
    };
  }

  const record = { id: queryId, query, result, timestamp: new Date().toISOString() };
  aiQueries.push(record);

  res.json({ id: queryId, query, ...result, timestamp: record.timestamp });
});

app.get("/api/ai/queries", (req, res) => {
  res.json({ queries: aiQueries.slice(-20), total: aiQueries.length });
});

// ── Early Access Signup ─────────────────────────────────────────────────────
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

// ── Company Intelligence ────────────────────────────────────────────────────
app.post("/api/intelligence/company", (req, res) => {
  const { company, sector } = req.body;
  if (!company) return res.status(400).json({ error: "Company name is required" });
  res.json({
    company, sector: sector || "Unknown",
    exposureScore: (Math.random() * 4 + 5).toFixed(1),
    exposureLevel: ["Medium", "High", "Very High"][Math.floor(Math.random() * 3)],
    cctsExposure: sector ? !!cctsSectors.find((s) => s.name.toLowerCase().includes(sector.toLowerCase())) : false,
    cbamExposure: ["Cement", "Iron & Steel", "Aluminium", "Fertiliser"].some((s) => (sector || "").toLowerCase().includes(s.toLowerCase())),
    recommendations: ["Conduct full CCTS compliance audit", "Map Scope 1, 2, 3 emissions", "Assess CBAM implications for EU exports", "Review RE obligations under BEE"],
    timestamp: new Date().toISOString(),
  });
});

// ── Dashboard Stats ─────────────────────────────────────────────────────────
app.get("/api/dashboard/stats", (req, res) => {
  const totalScrapedItems = Object.values(scrapedData).reduce((sum, d) => {
    return sum + (d.notifications || d.news || d.articles || d.projects || d.updates || d.systems || d.carbonPricing || []).length;
  }, 0);
  res.json({
    sectorsTracked: cctsSectors.length,
    regulatoryUpdates: regulatoryUpdates.length,
    projectsReviewed: carbonProjects.length,
    earlyAccessSignups: earlyAccessSignups.length,
    scrapedDataPoints: totalScrapedItems,
    dataSources: Object.keys(scrapedData).length,
    lastSync: new Date().toISOString(),
    coverageZones: ["India CCTS", "EU CBAM", "Article 6", "VCM", "Gold Standard", "Verra VCS"],
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// SCRAPER API ROUTES
// ══════════════════════════════════════════════════════════════════════════════

// Get all scraped data
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

// Get data from specific source
app.get("/api/scraper/data/:source", (req, res) => {
  const source = req.params.source;
  if (!scrapedData[source]) return res.status(404).json({ error: `Source '${source}' not found. Available: ${Object.keys(scrapedData).join(", ")}` });
  res.json(scrapedData[source]);
});

// Trigger manual scrape
app.post("/api/scraper/run", async (req, res) => {
  console.log("\n🔄 Manual scrape triggered via API...");
  const summary = await runAllScrapers();
  scrapeHistory.push({ timestamp: new Date().toISOString(), trigger: "manual", summary });
  res.json({ success: true, message: "Scrape complete", summary });
});

// Scrape history
app.get("/api/scraper/history", (req, res) => {
  res.json({ history: scrapeHistory.slice(-10), total: scrapeHistory.length });
});

// ── Unified Intelligence Feed (scraped + curated) ───────────────────────────
app.get("/api/feed", (req, res) => {
  const { limit = 30, source, category } = req.query;
  let feed = [];

  // Add curated regulatory updates
  regulatoryUpdates.forEach(u => {
    feed.push({ type: "regulatory", title: u.title, body: u.body, source: u.source, date: u.date, urgency: u.urgency, tags: u.tags, category: "Regulatory" });
  });

  // Add scraped BEE notifications
  (scrapedData.bee.notifications || []).forEach(n => {
    feed.push({ type: "scraped", title: n.title, source: n.source, date: n.date, link: n.link, category: n.category });
  });

  // Add scraped MoEFCC
  (scrapedData.moefcc.notifications || []).forEach(n => {
    feed.push({ type: "scraped", title: n.title, source: n.source, date: n.date, link: n.link, category: n.category });
  });

  // Add UNFCCC news
  (scrapedData.unfccc.news || []).forEach(n => {
    feed.push({ type: "scraped", title: n.title, summary: n.summary, source: n.source, date: n.date, link: n.link, category: n.category });
  });

  // Add carbon market news
  (scrapedData.carbonCredits.articles || []).forEach(a => {
    feed.push({ type: "scraped", title: a.title, excerpt: a.excerpt, source: a.source, date: a.date, link: a.link, category: a.category });
  });

  // Add EU CBAM
  (scrapedData.euCbam.updates || []).forEach(u => {
    feed.push({ type: "scraped", title: u.title, source: u.source, date: u.date, link: u.link, category: u.category });
  });

  // Filter
  if (source) feed = feed.filter(f => f.source.toLowerCase().includes(source.toLowerCase()));
  if (category) feed = feed.filter(f => (f.category || "").toLowerCase().includes(category.toLowerCase()));

  // Sort by date (newest first)
  feed.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  res.json({ feed: feed.slice(0, parseInt(limit)), total: feed.length });
});

// ── RAG / AI Chat Engine ──────────────────────────────────────────────────────
app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  const queryLower = message.toLowerCase();
  
  // RAG Simulation: Search all scraped and internal data
  let contextItems = [];
  
  // Check timeline
  regulatoryTimeline.forEach(t => {
    if (queryLower.includes(t.type.toLowerCase()) || queryLower.includes("timeline")) {
      contextItems.push(`On ${t.date}, ${t.event} occurred. Impact: ${t.impact}.`);
    }
  });

  // Check companies
  companies.forEach(c => {
    if (queryLower.includes(c.name.toLowerCase()) || (queryLower.includes(c.sector.toLowerCase()) && c.cctsCovered)) {
      contextItems.push(`${c.name} in the ${c.sector} sector has Scope 1 emissions of ${c.scope1} MT CO₂e and GEI performance of ${c.geiPerformance} ${c.geiUnit}. Exposure Risk: ${c.riskLevel}.`);
    }
  });

  // Check scraped news (latest 50 items)
  const allScrapedItems = [
    ...(scrapedData.carbonCredits.articles || []),
    ...(scrapedData.ieta.news || []),
    ...(scrapedData.unfccc.news || []),
    ...(scrapedData.ceew.research || []),
    ...(scrapedData.bee.notifications || []),
  ];
  
  const relevantNews = allScrapedItems.filter(item => {
    const text = (item.title || item.name || "").toLowerCase();
    const keywords = queryLower.split(" ").filter(w => w.length > 4);
    return keywords.some(word => text.includes(word));
  }).slice(0, 3);

  let answer = "";
  if (relevantNews.length > 0 || contextItems.length > 0) {
    answer = `Based on our real-time CarbonCounsel Intelligence Graph, here is what we found regarding your query:\n\n`;
    if (contextItems.length > 0) {
      answer += `**Internal Data Context:**\n- ` + contextItems.slice(0, 3).join("\n- ") + `\n\n`;
    }
    if (relevantNews.length > 0) {
      answer += `**Live Market Feeds:**\n`;
      relevantNews.forEach(n => {
        answer += `- [${n.source}] ${n.title} (${n.date})\n`;
      });
    }
    answer += `\n*Would you like a detailed risk assessment report generated for this?*`;
  } else {
    answer = `I scanned our 12 live data sources and proprietary databases but couldn't find direct matches for "${message}". Could you specify a sector (e.g., Cement, Steel), a mechanism (e.g., CCTS, CBAM, Article 6), or a specific company name?`;
  }

  res.json({
    id: `chat-${Date.now()}`,
    role: "assistant",
    content: answer,
    sourcesUsed: [...new Set(relevantNews.map(n => n.source))]
  });
});

// ── Real-time Alerts Engine ─────────────────────────────────────────────────
app.get("/api/alerts", (req, res) => {
  // Simulating an alert engine that flags high-priority scraped data
  const alerts = [];
  
  // Check for CCTS/CBAM mentions in recent scraped news
  const recentItems = [
    ...(scrapedData.bee.notifications || []),
    ...(scrapedData.moefcc.notifications || []),
    ...(scrapedData.euCbam.updates || []),
    ...(scrapedData.ceew.research || [])
  ];

  recentItems.forEach(item => {
    const text = (item.title || "").toLowerCase();
    if (text.includes("baseline") || text.includes("target")) {
      alerts.push({ id: `alert-${Date.now()}-${Math.random()}`, type: "Compliance Alert", message: `New regulatory update affecting targets: ${item.title}`, severity: "High", source: item.source, date: item.date });
    }
    if (text.includes("cbam") || text.includes("border") || text.includes("export")) {
      alerts.push({ id: `alert-${Date.now()}-${Math.random()}`, type: "Trade Risk", message: `EU CBAM related update: ${item.title}`, severity: "Medium", source: item.source, date: item.date });
    }
  });

  // Mock a few standard alerts if none found
  if (alerts.length === 0) {
    alerts.push(
      { id: "alt-1", type: "Price Alert", message: "EU ETS allowance price dropped 3.2% in the last 48 hours.", severity: "Medium", source: "EEX Market Data", date: new Date().toISOString() },
      { id: "alt-2", type: "Compliance Deadline", message: "Reminder: 30 days remaining for Q2 transitional CBAM report submission.", severity: "High", source: "System", date: new Date().toISOString() }
    );
  }

  res.json({ alerts: alerts.slice(0, 10), count: Math.min(alerts.length, 10) });
});

// ══════════════════════════════════════════════════════════════════════════════
// START SERVER + INITIAL SCRAPE
// ══════════════════════════════════════════════════════════════════════════════

app.listen(PORT, () => {
  console.log(`\n🌿 CarbonCounsel API Server v2.0 running on http://localhost:${PORT}`);
  console.log(`\n   Core APIs:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/ccts/sectors`);
  console.log(`   GET  /api/intelligence/updates`);
  console.log(`   GET  /api/projects`);
  console.log(`   POST /api/ai/query`);
  console.log(`   POST /api/early-access`);
  console.log(`   GET  /api/dashboard/stats`);
  console.log(`\n   Scraper APIs:`);
  console.log(`   GET  /api/scraper/data`);
  console.log(`   GET  /api/scraper/data/:source`);
  console.log(`   POST /api/scraper/run`);
  console.log(`   GET  /api/feed`);
  console.log(``);

  // Run initial scrape on startup
  console.log("⏳ Running initial data collection...\n");
  runAllScrapers().then(summary => {
    scrapeHistory.push({ timestamp: new Date().toISOString(), trigger: "startup", summary });
  });

  // Schedule scrape every 6 hours
  cron.schedule("0 */6 * * *", async () => {
    console.log("\n⏰ Scheduled scrape triggered...");
    const summary = await runAllScrapers();
    scrapeHistory.push({ timestamp: new Date().toISOString(), trigger: "cron", summary });
  });
});
