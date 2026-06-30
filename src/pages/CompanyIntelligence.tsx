import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";

type RiskLevel = "High" | "Medium" | "Low" | "Excellent" | "Good" | "Moderate" | "Limited" | "Poor" | "Improving" | "Active";

const riskColor: Record<string, string> = {
  "High": "text-[#EF4444]",
  "Medium": "text-[#F59E0B]",
  "Low": "text-[#22C55E]",
  "Excellent": "text-[#22C55E]",
  "Good": "text-[#22C55E]",
  "Moderate": "text-[#F59E0B]",
  "Limited": "text-[#EF4444]",
  "Poor": "text-[#EF4444]",
  "Improving": "text-[#F59E0B]",
  "Active": "text-[#22C55E]",
};

const scoreColor = (score: number) => {
  if (score >= 7.5) return "text-[#EF4444]";
  if (score >= 5) return "text-[#F59E0B]";
  return "text-[#22C55E]";
};

const companies = [
  { name: "Tata Steel", sector: "Steel", ccts: "High", cbam: "Medium", re: "Good", credits: "Active", esg: "Good", score: 7.2 },
  { name: "UltraTech Cement", sector: "Cement", ccts: "High", cbam: "High", re: "Moderate", credits: "Limited", esg: "Moderate", score: 8.1 },
  { name: "Hindalco", sector: "Aluminium", ccts: "High", cbam: "High", re: "Good", credits: "Active", esg: "Good", score: 6.8 },
  { name: "Reliance Industries", sector: "Petrochemicals", ccts: "Medium", cbam: "Medium", re: "Improving", credits: "Active", esg: "Moderate", score: 7.5 },
  { name: "JSW Steel", sector: "Steel", ccts: "High", cbam: "High", re: "Good", credits: "Limited", esg: "Moderate", score: 7.8 },
  { name: "Indian Oil", sector: "Petroleum Refinery", ccts: "High", cbam: "Low", re: "Improving", credits: "Limited", esg: "Limited", score: 8.4 },
  { name: "Dalmia Cement", sector: "Cement", ccts: "High", cbam: "Medium", re: "Good", credits: "Active", esg: "Good", score: 6.2 },
  { name: "Vedanta", sector: "Aluminium", ccts: "High", cbam: "Medium", re: "Moderate", credits: "Limited", esg: "Poor", score: 8.7 },
  { name: "NTPC", sector: "Power", ccts: "Medium", cbam: "Low", re: "Active", credits: "Moderate", esg: "Moderate", score: 6.5 },
  { name: "ReNew Energy", sector: "Renewable Energy", ccts: "Low", cbam: "Low", re: "Excellent", credits: "Active", esg: "Good", score: 2.1 },
];

const mappingItems = [
  "Sector exposure", "Facility and plant data, where available",
  "ESG and annual report disclosures", "Renewable-energy use",
  "Net-zero targets", "Carbon-credit claims",
  "Export-linked climate risk", "Regulatory exposure",
  "Litigation or controversy risk, where available",
];

const useCases = [
  "Company screening", "ESG due diligence", "Supplier risk review",
  "Carbon procurement planning", "Investor research", "Consultant reports", "Legal advisory notes",
];

const outputFormats = [
  "Company Exposure Snapshot", "Sector Comparison Table",
  "Risk Scorecard", "Disclosure Gap Report",
  "Board-ready Memo", "Investor Brief",
];

export default function CompanyIntelligence() {
  return (
    <div className="bg-[#F8FAF7]">
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#0B3D2E] uppercase tracking-wider mb-4">Company Intelligence</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#111827] mb-5 leading-tight">
              Company-level carbon exposure intelligence.
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed mb-8">
              Map carbon market risk across companies, sectors, disclosures, energy use, ESG claims, renewable-energy commitments, and export-linked climate obligations.
            </p>
            <Link href="/early-access" data-testid="button-company-explore" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B3D2E] text-white font-semibold rounded-lg hover:bg-[#14532D] transition-colors">
              Explore Company Database <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Company Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#111827]">Company Carbon Exposure Database</h2>
            <span className="text-xs text-[#6B7280] bg-[#F8FAF7] border border-[#E5E7EB] px-3 py-1.5 rounded-full">Sample data — illustrative only</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {companies.map((co) => (
              <div key={co.name} className="bg-white border border-[#E5E7EB] rounded-xl p-5 hover:border-[#A7F3D0] hover:shadow-sm transition-all" data-testid={`card-company-${co.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-bold text-[#111827]">{co.name}</div>
                    <div className="text-xs text-[#6B7280] mt-0.5">{co.sector}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-black ${scoreColor(co.score)}`}>{co.score}</div>
                    <div className="text-[10px] text-[#6B7280]">Risk Score /10</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs border-t border-[#E5E7EB] pt-3">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">CCTS Exposure</span>
                    <span className={`font-semibold ${riskColor[co.ccts] || "text-[#374151]"}`}>{co.ccts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">CBAM Exposure</span>
                    <span className={`font-semibold ${riskColor[co.cbam] || "text-[#374151]"}`}>{co.cbam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">RE Disclosure</span>
                    <span className={`font-semibold ${riskColor[co.re] || "text-[#374151]"}`}>{co.re}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Credit Activity</span>
                    <span className={`font-semibold ${riskColor[co.credits] || "text-[#374151]"}`}>{co.credits}</span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span className="text-[#6B7280]">ESG Disclosure Quality</span>
                    <span className={`font-semibold ${riskColor[co.esg] || "text-[#374151]"}`}>{co.esg}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we map */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#111827] mb-8">What we map</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mappingItems.map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg" data-testid={`tag-mapping-${item.toLowerCase().replace(/\s+/g, "-").slice(0, 30)}`}>
                <CheckCircle size={14} className="text-[#0B3D2E] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#374151]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases & Outputs */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold text-[#111827] mb-5">Use cases</h2>
              <ul className="space-y-2.5">
                {useCases.map((uc) => (
                  <li key={uc} className="flex items-center gap-2 text-sm text-[#374151]" data-testid={`item-usecase-${uc.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0B3D2E] flex-shrink-0" />
                    {uc}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#111827] mb-5">Output formats</h2>
              <div className="flex flex-wrap gap-2.5">
                {outputFormats.map((o) => (
                  <div key={o} className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#374151] font-medium" data-testid={`tag-output-${o.toLowerCase().replace(/\s+/g, "-")}`}>
                    {o}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#0B3D2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">From PDFs to board-ready reports.</h2>
          <p className="text-[#A7F3D0]/80 mb-7 max-w-lg mx-auto">Access company-level carbon exposure intelligence for India's most-covered sectors and beyond.</p>
          <Link href="/early-access" data-testid="button-company-cta" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#0B3D2E] font-bold rounded-lg hover:bg-[#A7F3D0] transition-colors">
            Join Early Access <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
