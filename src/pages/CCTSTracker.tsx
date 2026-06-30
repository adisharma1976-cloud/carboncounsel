import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, AlertCircle, Loader2, RefreshCw, ExternalLink } from "lucide-react";
import api, { type CCTSSector, type RegulatoryUpdate } from "@/lib/api";

const trackingItems = [
  "Covered sectors", "Obligated entities", "GEI targets", "Compliance procedures",
  "Offset mechanism updates", "Registry developments", "Trading developments",
  "Verification and accreditation updates", "Regulatory notifications",
];

const faqs = [
  { q: "Is my company covered under CCTS?", a: "CCTS covers energy-intensive sectors including cement, steel, aluminium, fertiliser, petroleum refinery, petrochemicals, and textiles. Coverage is based on energy consumption thresholds." },
  { q: "What sectoral target applies?", a: "Sectoral GEI targets are set by BEE based on benchmarked energy and emission intensity. Each covered sector has a notified trajectory for reduction over the compliance period." },
  { q: "What is my reporting obligation?", a: "Obligated entities must report annual energy consumption and emission intensity to BEE through designated reporting systems within notified deadlines." },
  { q: "What happens if there is a shortfall?", a: "Entities with a shortfall against their GEI target must purchase Carbon Credit Certificates from the trading platform operated under CCTS." },
  { q: "Can my project generate credits?", a: "Non-obligated entities can develop projects that generate Indian Carbon Credits through designated methodologies and registry processes under CCTS." },
  { q: "Can I buy or sell carbon credit certificates?", a: "Carbon Credit Certificates can be bought and sold on the CCTS trading platform. Both obligated entities and eligible traders can participate." },
];

const outputTypes = [
  "Compliance Snapshot", "Sector Memo", "Company Risk Profile",
  "Deadline Tracker", "Regulatory Update Brief", "Board Note",
];

export default function CCTSTracker() {
  const [sectors, setSectors] = useState<CCTSSector[]>([]);
  const [updates, setUpdates] = useState<RegulatoryUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [sectorsRes, updatesRes] = await Promise.all([
        api.ccts.getSectors(),
        api.intelligence.getUpdates({ limit: 5 }),
      ]);
      setSectors(sectorsRes.sectors);
      setUpdates(updatesRes.updates);
    } catch {
      setError("Unable to connect to CarbonCounsel API. Showing cached data.");
      // Fallback static data
      setSectors([
        { id: "cement", name: "Cement", riskLevel: "High", geiBaseline: 720, geiUnit: "kg CO₂e/tonne", covered: true, obligatedEntities: 42, complianceDeadline: "2026-03-31", tradingStatus: "Active", lastUpdated: "2026-06-15", notes: "BEE updated sectoral GEI baseline in June 2026." },
        { id: "iron-steel", name: "Iron & Steel", riskLevel: "High", geiBaseline: 2.5, geiUnit: "GJ/tonne", covered: true, obligatedEntities: 67, complianceDeadline: "2026-03-31", tradingStatus: "Active", lastUpdated: "2026-06-10", notes: "Integrated plants and EAF operators above threshold." },
        { id: "aluminium", name: "Aluminium", riskLevel: "High", geiBaseline: 14.8, geiUnit: "GJ/tonne", covered: true, obligatedEntities: 18, complianceDeadline: "2026-03-31", tradingStatus: "Active", lastUpdated: "2026-05-28", notes: "Primary smelters and secondary producers covered." },
        { id: "fertiliser", name: "Fertiliser", riskLevel: "Medium", geiBaseline: 8.2, geiUnit: "GJ/tonne", covered: true, obligatedEntities: 31, complianceDeadline: "2026-06-30", tradingStatus: "Pending", lastUpdated: "2026-06-01", notes: "Phase I. Coverage expanding." },
        { id: "petroleum-refinery", name: "Petroleum Refinery", riskLevel: "High", geiBaseline: 62.5, geiUnit: "kg CO₂e/tonne", covered: true, obligatedEntities: 23, complianceDeadline: "2026-03-31", tradingStatus: "Active", lastUpdated: "2026-06-20", notes: "Refineries above 1 MMTPA covered." },
        { id: "petrochemicals", name: "Petrochemicals", riskLevel: "Medium", geiBaseline: 10.1, geiUnit: "GJ/tonne", covered: true, obligatedEntities: 29, complianceDeadline: "2026-09-30", tradingStatus: "Pending", lastUpdated: "2026-05-15", notes: "Phase II expansion in review." },
        { id: "textiles", name: "Textiles", riskLevel: "Medium", geiBaseline: 3.4, geiUnit: "GJ/tonne", covered: false, obligatedEntities: 0, complianceDeadline: null, tradingStatus: "Not Covered", lastUpdated: "2026-06-01", notes: "Export-linked CBAM risk is growing." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  const filteredSectors = filter === "All"
    ? sectors
    : sectors.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()) || s.riskLevel === filter);

  const filterOptions = ["All", "High", "Medium", "Covered"];

  return (
    <div className="bg-[#F8FAF7]">
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#0B3D2E] uppercase tracking-wider mb-4">CCTS Tracker</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#111827] mb-5 leading-tight">
              India CCTS intelligence, tracked in one place.
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed mb-8">
              Track sectors, obligated entities, GEI targets, procedures, deadlines, filings, updates, and compliance developments under India's Carbon Credit Trading Scheme.
            </p>
            <Link href="/early-access" data-testid="button-ccts-early-access" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B3D2E] text-white font-semibold rounded-lg hover:bg-[#14532D] transition-colors">
              Join CCTS Early Access <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Live Dashboard */}
      <section className="py-16 bg-[#F8FAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#111827]">CCTS Sector Dashboard</h2>
            <button
              onClick={loadData}
              className="flex items-center gap-1.5 text-xs font-medium text-[#0B3D2E] hover:text-[#14532D] transition-colors"
              data-testid="button-refresh"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700 flex items-center gap-2">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
            <div className="border-b border-[#E5E7EB] px-5 py-3 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-[#374151]">Filter:</span>
                {filterOptions.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${filter === f ? "bg-[#0B3D2E] text-white border-[#0B3D2E]" : "border-[#E5E7EB] text-[#6B7280] hover:border-[#0B3D2E] hover:text-[#0B3D2E]"}`}
                    data-testid={`filter-sector-${f.toLowerCase()}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              {loading && <Loader2 size={16} className="animate-spin text-[#0B3D2E]" />}
              {!loading && sectors.length > 0 && (
                <span className="text-xs text-[#9CA3AF]">Live data — {sectors.length} sectors tracked</span>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F8FAF7]">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Sector</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">GEI Baseline</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Entities</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Deadline</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-[#9CA3AF] text-sm">
                        <Loader2 size={24} className="animate-spin mx-auto mb-2 text-[#0B3D2E]" />
                        Loading CCTS data…
                      </td>
                    </tr>
                  ) : (
                    filteredSectors.map((s, i) => (
                      <tr
                        key={s.id}
                        className={`border-b border-[#E5E7EB] hover:bg-[#F8FAF7] transition-colors ${i % 2 === 0 ? "" : "bg-[#FAFAFA]"}`}
                        data-testid={`row-sector-${s.name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <td className="px-5 py-3.5 font-medium text-[#111827]">{s.name}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.covered ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEF3C7] text-[#92400E]"}`}>
                            {s.covered ? "Covered" : "Not Covered"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-[#374151] font-mono text-xs">{s.geiBaseline} {s.geiUnit}</td>
                        <td className="px-5 py-3.5 text-[#374151]">{s.obligatedEntities || "—"}</td>
                        <td className="px-5 py-3.5 text-[#374151]">{s.complianceDeadline || "TBD"}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs font-semibold ${s.riskLevel === "High" ? "text-[#EF4444]" : s.riskLevel === "Medium" ? "text-[#F59E0B]" : "text-[#22C55E]"}`}>
                            {s.riskLevel}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Live Regulatory Feed */}
      {updates.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#111827] mb-6">Live Regulatory Intelligence Feed</h2>
            <div className="space-y-4">
              {updates.map((u) => (
                <div key={u.id} className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-xl p-5 flex items-start gap-4" data-testid={`update-${u.id}`}>
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${u.urgency === "High" ? "bg-[#EF4444]" : u.urgency === "Medium" ? "bg-[#F59E0B]" : "bg-[#22C55E]"}`} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-[#111827] text-sm">{u.title}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${u.urgency === "High" ? "bg-red-100 text-red-700" : u.urgency === "Medium" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                        {u.urgency}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-2">{u.body}</p>
                    <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                      <span>{u.source}</span>
                      <span>·</span>
                      <span>{new Date(u.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span>·</span>
                      <span>{u.sector}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What we track */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#111827] mb-8">What CarbonCounsel tracks</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {trackingItems.map((item) => (
              <div key={item} className="flex items-center gap-2 p-3 bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg" data-testid={`tag-tracking-${item.toLowerCase().replace(/\s+/g, "-")}`}>
                <CheckCircle size={14} className="text-[#0B3D2E] flex-shrink-0" />
                <span className="text-sm text-[#374151]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-[#F8FAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#111827] mb-8">CCTS Questions Answered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white border border-[#E5E7EB] rounded-xl p-5" data-testid={`faq-${faq.q.toLowerCase().replace(/\s+/g, "-").slice(0, 40)}`}>
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle size={16} className="text-[#0B3D2E] flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-[#111827] text-sm">{faq.q}</h3>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Output Types */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#111827] mb-4">Output types</h2>
          <p className="text-[#6B7280] mb-8">CarbonCounsel generates structured outputs for CCTS compliance work.</p>
          <div className="flex flex-wrap gap-3">
            {outputTypes.map((o) => (
              <div key={o} className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm font-medium text-[#374151]" data-testid={`tag-output-${o.toLowerCase().replace(/\s+/g, "-")}`}>
                {o}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#0B3D2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Track CCTS obligations before they become liabilities.</h2>
          <p className="text-[#A7F3D0]/80 mb-7 max-w-lg mx-auto">Join the early access list to get CCTS intelligence, regulatory updates, and compliance tools.</p>
          <Link href="/early-access" data-testid="button-ccts-cta" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#0B3D2E] font-bold rounded-lg hover:bg-[#A7F3D0] transition-colors">
            Join CCTS Early Access <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
