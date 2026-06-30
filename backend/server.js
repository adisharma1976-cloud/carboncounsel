import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.BACKEND_PORT || 5001;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));
app.use(express.json());

// ── In-memory data store (replace with DB in production) ────────────────────
const earlyAccessSignups = [];
const aiQueries = [];

// ── CCTS Compliance Data ────────────────────────────────────────────────────
const cctsSectors = [
  {
    id: "cement",
    name: "Cement",
    riskLevel: "High",
    geiBaseline: 720,
    geiUnit: "kg CO₂e/tonne",
    covered: true,
    obligatedEntities: 42,
    complianceDeadline: "2026-03-31",
    tradingStatus: "Active",
    lastUpdated: "2026-06-15",
    notes: "BEE updated sectoral GEI baseline in June 2026. All plants above 50,000 tonne/year are obligated.",
  },
  {
    id: "iron-steel",
    name: "Iron & Steel",
    riskLevel: "High",
    geiBaseline: 2.5,
    geiUnit: "GJ/tonne",
    covered: true,
    obligatedEntities: 67,
    complianceDeadline: "2026-03-31",
    tradingStatus: "Active",
    lastUpdated: "2026-06-10",
    notes: "Includes integrated steel plants and electric arc furnace operators above threshold.",
  },
  {
    id: "aluminium",
    name: "Aluminium",
    riskLevel: "High",
    geiBaseline: 14.8,
    geiUnit: "GJ/tonne",
    covered: true,
    obligatedEntities: 18,
    complianceDeadline: "2026-03-31",
    tradingStatus: "Active",
    lastUpdated: "2026-05-28",
    notes: "Primary aluminium smelters and secondary producers covered.",
  },
  {
    id: "fertiliser",
    name: "Fertiliser",
    riskLevel: "Medium",
    geiBaseline: 8.2,
    geiUnit: "GJ/tonne",
    covered: true,
    obligatedEntities: 31,
    complianceDeadline: "2026-06-30",
    tradingStatus: "Pending",
    lastUpdated: "2026-06-01",
    notes: "Nitrogenous fertiliser plants currently in Phase I. Coverage expanding.",
  },
  {
    id: "petroleum-refinery",
    name: "Petroleum Refinery",
    riskLevel: "High",
    geiBaseline: 62.5,
    geiUnit: "kg CO₂e/tonne",
    covered: true,
    obligatedEntities: 23,
    complianceDeadline: "2026-03-31",
    tradingStatus: "Active",
    lastUpdated: "2026-06-20",
    notes: "All refineries above 1 MMTPA throughput are covered under CCTS Phase I.",
  },
  {
    id: "petrochemicals",
    name: "Petrochemicals",
    riskLevel: "Medium",
    geiBaseline: 10.1,
    geiUnit: "GJ/tonne",
    covered: true,
    obligatedEntities: 29,
    complianceDeadline: "2026-09-30",
    tradingStatus: "Pending",
    lastUpdated: "2026-05-15",
    notes: "Phase II expansion. Currently in notification review period.",
  },
  {
    id: "textiles",
    name: "Textiles",
    riskLevel: "Medium",
    geiBaseline: 3.4,
    geiUnit: "GJ/tonne",
    covered: false,
    obligatedEntities: 0,
    complianceDeadline: null,
    tradingStatus: "Not Covered",
    lastUpdated: "2026-06-01",
    notes: "Not yet covered under CCTS. Export-linked CBAM risk is growing.",
  },
];

const regulatoryUpdates = [
  {
    id: "upd-001",
    title: "BEE updates sectoral GEI baseline for Cement",
    body: "Bureau of Energy Efficiency revised the Gross Energy Intensity baseline for the cement sector downward by 3.2%, increasing compliance burden for FY2025-26.",
    source: "BEE Notification No. 12/2026",
    date: "2026-06-28",
    sector: "Cement",
    urgency: "High",
    tags: ["BEE", "GEI", "Cement", "CCTS"],
  },
  {
    id: "upd-002",
    title: "MoEFCC issues notification on CCTS offset mechanism",
    body: "Ministry of Environment, Forest and Climate Change clarifies rules for voluntary carbon credit use as offset under CCTS Phase I. Maximum 10% offset allowed.",
    source: "MoEFCC Gazette Notification G.S.R. 422(E)",
    date: "2026-06-26",
    sector: "All",
    urgency: "High",
    tags: ["MoEFCC", "Offset", "Carbon Credits", "CCTS"],
  },
  {
    id: "upd-003",
    title: "EU CBAM transition period reporting deadline update",
    body: "European Commission extends Q2 2026 transitional CBAM report submission deadline by 30 days for Indian exporters in cement and steel sectors.",
    source: "EU Commission Implementing Regulation 2026/814",
    date: "2026-06-23",
    sector: "Cement, Iron & Steel",
    urgency: "Medium",
    tags: ["CBAM", "EU", "Export", "Cement", "Steel"],
  },
  {
    id: "upd-004",
    title: "Article 6.4 mechanism supervisory body approves new methodology",
    body: "UN Article 6.4 Supervisory Body approved new VM0042-equivalent methodology for renewable energy projects enabling ITMOs issuance for Indian developers.",
    source: "UNFCCC SB-A6.4 Decision 2026/12",
    date: "2026-06-18",
    sector: "Renewable Energy",
    urgency: "Medium",
    tags: ["Article 6", "UNFCCC", "ITMOs", "Renewable Energy"],
  },
  {
    id: "upd-005",
    title: "SEBI proposes framework for Green Credit instruments",
    body: "Securities and Exchange Board of India releases consultation paper proposing listing and trading of Green Credits on recognised stock exchanges.",
    source: "SEBI Circular CD/DOP1/2026/45",
    date: "2026-06-12",
    sector: "Financial Services",
    urgency: "Low",
    tags: ["SEBI", "Green Credits", "Carbon Market"],
  },
];

const carbonProjects = [
  {
    id: "proj-001",
    name: "Rajasthan Solar + Storage Project",
    type: "Renewable Energy",
    registry: "Gold Standard",
    status: "Verified",
    vintage: "2024-2025",
    creditsIssued: 45200,
    creditsPending: 12000,
    additionality: "Strong",
    permanenceRisk: "Low",
    leakageRisk: "Negligible",
    doubleCounting: "No Flag",
    buyerReadiness: 87,
    lastAudit: "2026-03-15",
  },
  {
    id: "proj-002",
    name: "Gujarat Industrial Energy Efficiency Program",
    type: "Energy Efficiency",
    registry: "VCS (Verra)",
    status: "Under Verification",
    vintage: "2023-2024",
    creditsIssued: 0,
    creditsPending: 28400,
    additionality: "Moderate",
    permanenceRisk: "Low",
    leakageRisk: "Low",
    doubleCounting: "Review Required",
    buyerReadiness: 54,
    lastAudit: "2026-01-20",
  },
  {
    id: "proj-003",
    name: "Madhya Pradesh Avoided Deforestation (REDD+)",
    type: "Forestry & Land Use",
    registry: "VCS (Verra)",
    status: "Active",
    vintage: "2022-2025",
    creditsIssued: 89700,
    creditsPending: 5000,
    additionality: "Strong",
    permanenceRisk: "Medium",
    leakageRisk: "Medium",
    doubleCounting: "Monitoring",
    buyerReadiness: 71,
    lastAudit: "2025-11-30",
  },
];

// ── AI Intelligence (mock responses for demo) ───────────────────────────────
const aiKnowledgeBase = {
  "cement ccts": {
    answer: "Yes, cement manufacturers in India are covered under the Carbon Credit Trading Scheme (CCTS) Phase I, notified by MoEFCC. Plants with a production capacity above 50,000 tonnes per annum are obligated entities. The Gross Energy Intensity (GEI) baseline for cement was recently updated by BEE to 720 kg CO₂e per tonne. Companies must report energy consumption and GHG emissions to BEE annually and must achieve the sectoral target or procure Energy Saving Certificates (ESCerts) or Carbon Credit Certificates (CCCs).",
    riskLevel: "High",
    sources: ["MoEFCC CCTS Notification 2023", "BEE GEI Baseline Update June 2026", "CCTS Phase I Regulations"],
    relatedSectors: ["Cement"],
    actionItems: ["Audit current GEI performance", "Register as obligated entity with BEE", "Assess ESCert shortfall"],
  },
  "textile exporter carbon risk": {
    answer: "A textile exporter in India faces growing carbon risk from multiple directions, even though textiles are not currently covered under CCTS Phase I. Key exposures include: (1) EU CBAM applicability if exports include goods with significant embedded carbon; (2) Supply chain decarbonisation requirements from European buyers implementing Scope 3 disclosures; (3) Potential CCTS Phase II coverage as the scheme expands; (4) Renewable Energy obligations under BEE if energy consumption exceeds threshold. CarbonCounsel recommends a full carbon exposure mapping for textile exporters.",
    riskLevel: "Medium",
    sources: ["EU CBAM Regulation 2023/956", "BEE Notification RE Obligations", "CCTS Phase I Sectors List"],
    relatedSectors: ["Textiles"],
    actionItems: ["Map Scope 1, 2, 3 emissions", "Assess EU buyer requirements", "Monitor CCTS Phase II expansion"],
  },
  "article 6 india": {
    answer: "India has not yet signed bilateral Article 6 agreements, but is actively engaged in COP negotiations. The Government of India has established a national framework for Internationally Transferred Mitigation Outcomes (ITMOs) under the Environment (Protection) Act. Projects wishing to export ITMOs must be authorised by the MoEFCC Designated National Authority (DNA). The new Article 6.4 mechanism supervisory body has approved methodologies applicable to Indian renewable energy projects. Article 6.2 bilateral agreements are expected to be finalised with Switzerland, UAE, and Japan in 2026.",
    riskLevel: "Low",
    sources: ["UNFCCC Paris Agreement Article 6", "MoEFCC DNA Framework 2024", "SB-A6.4 Decision 2026/12"],
    relatedSectors: ["Renewable Energy", "Forestry"],
    actionItems: ["Contact MoEFCC DNA for ITMO registration", "Assess project eligibility under approved methodologies"],
  },
  "cbam india": {
    answer: "The EU Carbon Border Adjustment Mechanism (CBAM) entered its transitional phase in October 2023 and will be fully operative from 2026. Indian exporters of cement, iron & steel, aluminium, fertilisers, electricity, and hydrogen to the EU must report embedded GHG emissions quarterly. From 2026, importers will need to purchase CBAM certificates. Indian companies should immediately register embedded carbon data, engage EU importers, and prepare for financial liability from 2026. The compliance deadline for Q2 2026 reports has been extended by 30 days.",
    riskLevel: "High",
    sources: ["EU CBAM Regulation 2023/956", "EU Commission Implementing Regulation 2026/814", "MoEFCC Advisory on CBAM"],
    relatedSectors: ["Cement", "Iron & Steel", "Aluminium", "Fertiliser"],
    actionItems: ["Register on EU CBAM portal", "Measure and report embedded emissions", "Engage EU importer on cost sharing"],
  },
};

// ── API Routes ───────────────────────────────────────────────────────────────

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", version: "1.0.0", timestamp: new Date().toISOString() });
});

// CCTS Sectors
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

// Regulatory Updates / Intelligence Feed
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

// Carbon Projects
app.get("/api/projects", (req, res) => {
  const { type, status, registry } = req.query;
  let projects = carbonProjects;
  if (type) projects = projects.filter((p) => p.type.toLowerCase().includes(type.toLowerCase()));
  if (status) projects = projects.filter((p) => p.status.toLowerCase() === status.toLowerCase());
  if (registry) projects = projects.filter((p) => p.registry.toLowerCase().includes(registry.toLowerCase()));
  res.json({ projects, total: projects.length });
});

app.get("/api/projects/:id", (req, res) => {
  const project = carbonProjects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

// AI Query endpoint
app.post("/api/ai/query", (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Query is required" });
  }

  const queryId = `q-${Date.now()}`;
  const queryLower = query.toLowerCase();
  
  // Simple keyword matching for demo AI
  let result = null;
  for (const [key, value] of Object.entries(aiKnowledgeBase)) {
    const keywords = key.split(" ");
    if (keywords.every((kw) => queryLower.includes(kw))) {
      result = value;
      break;
    }
  }

  // Fallback response
  if (!result) {
    result = {
      answer: `CarbonCounsel has analysed your query: "${query}". Based on our intelligence database covering Indian CCTS regulations, carbon credit markets, CBAM, Article 6, and renewable energy obligations, we recommend conducting a detailed sector-specific review. Our system has identified relevant regulatory updates and risk factors. Please refine your query for a more specific analysis, or contact our team for a full intelligence report.`,
      riskLevel: "Moderate",
      sources: ["CarbonCounsel Intelligence Database", "BEE Regulatory Feed", "MoEFCC Notifications"],
      relatedSectors: [],
      actionItems: ["Refine query for sector-specific analysis", "Request full intelligence report"],
    };
  }

  const record = { id: queryId, query, result, timestamp: new Date().toISOString() };
  aiQueries.push(record);

  res.json({
    id: queryId,
    query,
    answer: result.answer,
    riskLevel: result.riskLevel,
    sources: result.sources,
    relatedSectors: result.relatedSectors,
    actionItems: result.actionItems,
    timestamp: record.timestamp,
  });
});

// Get AI query history
app.get("/api/ai/queries", (req, res) => {
  res.json({ queries: aiQueries.slice(-20), total: aiQueries.length });
});

// Early Access signup
app.post("/api/early-access", (req, res) => {
  const { name, email, phone, org, role, sector, type, usecase, interest, message } = req.body;
  
  if (!name || !email || !org || !role || !type) {
    return res.status(400).json({ error: "Required fields: name, email, org, role, type" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const existing = earlyAccessSignups.find((s) => s.email === email);
  if (existing) {
    return res.status(409).json({ error: "This email is already registered for early access" });
  }

  const signup = {
    id: `ea-${Date.now()}`,
    name, email, phone: phone || null, org, role,
    sector: sector || null, type, usecase: usecase || null,
    interest: interest || [], message: message || null,
    registeredAt: new Date().toISOString(),
    status: "pending",
  };

  earlyAccessSignups.push(signup);
  console.log(`[Early Access] New signup: ${name} <${email}> from ${org}`);

  res.status(201).json({
    success: true,
    message: "You've been added to the CarbonCounsel early access list. We'll be in touch shortly.",
    id: signup.id,
  });
});

// Get all signups (admin endpoint - protect in production)
app.get("/api/admin/early-access", (req, res) => {
  res.json({ signups: earlyAccessSignups, total: earlyAccessSignups.length });
});

// Company intelligence endpoint
app.post("/api/intelligence/company", (req, res) => {
  const { company, sector } = req.body;
  if (!company) return res.status(400).json({ error: "Company name is required" });

  // Mock company intelligence
  res.json({
    company,
    sector: sector || "Unknown",
    exposureScore: Math.floor(Math.random() * 4 + 5) + "." + Math.floor(Math.random() * 9),
    exposureLevel: ["Medium", "High", "Very High"][Math.floor(Math.random() * 3)],
    cctsExposure: sector ? cctsSectors.find((s) => s.name.toLowerCase().includes(sector.toLowerCase())) !== undefined : false,
    cbamExposure: ["Cement", "Iron & Steel", "Aluminium", "Fertiliser"].some((s) => (sector || "").toLowerCase().includes(s.toLowerCase())),
    reObligations: true,
    disclosureGaps: ["Scope 3 emissions not reported", "RE consumption disaggregation missing"],
    recommendations: [
      "Conduct full CCTS compliance audit",
      "Map Scope 1, 2, 3 emissions inventory",
      "Assess CBAM implications for EU exports",
      "Review renewable energy obligations under BEE",
    ],
    timestamp: new Date().toISOString(),
  });
});

// Dashboard stats endpoint
app.get("/api/dashboard/stats", (req, res) => {
  res.json({
    sectorsTracked: cctsSectors.length,
    regulatoryUpdates: regulatoryUpdates.length,
    projectsReviewed: carbonProjects.length,
    earlyAccessSignups: earlyAccessSignups.length,
    lastSync: new Date().toISOString(),
    coverageZones: ["India CCTS", "EU CBAM", "Article 6", "VCM"],
  });
});

// ── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌿 CarbonCounsel API Server running on http://localhost:${PORT}`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/ccts/sectors`);
  console.log(`   GET  /api/intelligence/updates`);
  console.log(`   GET  /api/projects`);
  console.log(`   POST /api/ai/query`);
  console.log(`   POST /api/early-access`);
  console.log(`   GET  /api/dashboard/stats\n`);
});
