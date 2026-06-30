import { Link } from "wouter";
import { Search, BarChart2, FileText, Database, Upload, FileOutput, ArrowRight, CheckCircle } from "lucide-react";

const modules = [
  {
    icon: <Search size={22} className="text-white" />,
    title: "Ask CarbonCounsel AI",
    desc: "Ask complex questions about CCTS, carbon credits, CBAM, Article 6, renewable-energy compliance, company exposure, ESG reports, and climate regulation. Receive source-backed answers with citations and suggested next steps.",
    features: [
      "Cited answers with source references",
      "Multi-document comparison",
      "Compliance memo generation",
      "Sector-specific analysis",
    ],
    examples: [
      "Is a textile exporter exposed to CCTS or CBAM risk?",
      "What are the obligations for a cement company under India's carbon market?",
      "Summarise the latest CCTS update for an ESG consultant.",
      "Generate a compliance memo for an aluminium company.",
      "What risks should a buyer check before purchasing carbon credits?",
    ],
  },
  {
    icon: <BarChart2 size={22} className="text-white" />,
    title: "Regulatory Intelligence Feed",
    desc: "Track updates from Indian regulators, government agencies, climate bodies, carbon registries, energy agencies, and global frameworks in one structured feed.",
    features: [
      "BEE and MoEFCC updates",
      "CERC and Grid Controller updates",
      "UNFCCC and COP updates",
      "EU CBAM and Article 6 updates",
      "Carbon registry and RE policy updates",
    ],
    feedItems: [
      { tag: "BEE", text: "Sectoral energy intensity targets updated for cement sector" },
      { tag: "CERC", text: "Carbon Credit Trading Scheme trading platform update" },
      { tag: "CBAM", text: "EU CBAM quarterly reporting window opens" },
      { tag: "UNFCCC", text: "Article 6.4 methodology approval — forest carbon" },
    ],
  },
  {
    icon: <FileText size={22} className="text-white" />,
    title: "CCTS Tracker",
    desc: "Monitor India's Carbon Credit Trading Scheme through sector coverage, obligated entities, GEI targets, procedures, deadlines, compliance status, and trading developments.",
    features: [
      "Sector coverage and obligated entities",
      "GEI target tracking",
      "Deadline and filing tracker",
      "Trading and offset developments",
      "Verification and accreditation updates",
    ],
  },
  {
    icon: <Database size={22} className="text-white" />,
    title: "Company Exposure Database",
    desc: "Track company-level carbon market exposure across sectors using emissions intensity, ESG disclosures, energy use, renewable-energy commitments, carbon-credit activity, regulatory exposure, and export-linked climate risk.",
    features: [
      "Emissions intensity and GEI data",
      "ESG disclosure quality assessment",
      "RE commitments and net-zero targets",
      "Carbon-credit activity tracking",
      "Export-linked climate risk (CBAM)",
    ],
  },
  {
    icon: <Upload size={22} className="text-white" />,
    title: "Carbon Project Due Diligence",
    desc: "Upload project documents and analyse carbon-credit project quality using structured risk parameters across additionality, permanence, leakage, methodology, verification, and buyer-readiness.",
    features: [
      "Additionality and permanence assessment",
      "Leakage and baseline integrity review",
      "Verification gap analysis",
      "Double counting risk check",
      "Registry status and host country auth",
    ],
    riskParams: [
      "Additionality", "Permanence", "Leakage", "Baseline Integrity",
      "Methodology Risk", "Double Counting", "Verification Gaps",
      "Registry Status", "Host Country Authorization", "Buyer-Readiness",
    ],
  },
  {
    icon: <FileOutput size={22} className="text-white" />,
    title: "Report Generator",
    desc: "Generate board-ready, client-ready, or investor-ready reports from regulatory and project data in minutes.",
    features: [
      "CCTS compliance notes",
      "Sector risk briefs",
      "Company carbon exposure profiles",
      "Carbon project diligence memos",
      "CBAM exposure snapshots",
    ],
    reportTypes: [
      "CCTS Compliance Note",
      "Sector Risk Brief",
      "Company Carbon Exposure Profile",
      "Carbon Project Diligence Memo",
      "Weekly Regulatory Update",
      "CBAM Exposure Snapshot",
      "RE Compliance Summary",
    ],
  },
];

export default function Product() {
  return (
    <div className="bg-[#F8FAF7]">
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#0B3D2E] uppercase tracking-wider mb-4">Platform Overview</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#111827] mb-5 leading-tight">
              The intelligence platform for carbon markets and climate compliance.
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed mb-8">
              CarbonCounsel brings together regulatory data, company disclosures, carbon project documents, energy-sector updates, and global climate frameworks into one AI-powered research and decision platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/early-access" data-testid="button-product-explore" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B3D2E] text-white font-semibold rounded-lg hover:bg-[#14532D] transition-colors">
                Explore Platform <ArrowRight size={16} />
              </Link>
              <Link href="/early-access" data-testid="button-product-demo" className="inline-flex items-center gap-2 px-6 py-3 border border-[#0B3D2E] text-[#0B3D2E] font-semibold rounded-lg hover:bg-[#F0FDF4] transition-colors">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {modules.map((mod, i) => (
              <div key={mod.title} className={`bg-white border border-[#E5E7EB] rounded-xl overflow-hidden`} data-testid={`card-module-${mod.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="p-7 lg:p-9">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-[#0B3D2E] flex items-center justify-center flex-shrink-0">
                          {mod.icon}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Module {String(i + 1).padStart(2, "0")}</div>
                          <h2 className="text-xl font-bold text-[#111827]">{mod.title}</h2>
                        </div>
                      </div>
                      <p className="text-[#6B7280] leading-relaxed mb-5">{mod.desc}</p>
                      {mod.features && (
                        <ul className="space-y-2">
                          {mod.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-[#374151]">
                              <CheckCircle size={14} className="text-[#22C55E] flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="lg:w-80 flex-shrink-0">
                      {mod.examples && (
                        <div className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-4">
                          <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Example Queries</div>
                          <div className="space-y-2">
                            {mod.examples.map((q) => (
                              <div key={q} className="flex items-start gap-2 p-2 bg-white rounded border border-[#E5E7EB]">
                                <Search size={12} className="text-[#0B3D2E] mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-[#374151]">{q}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {mod.feedItems && (
                        <div className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-4">
                          <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Live Feed Preview</div>
                          <div className="space-y-2.5">
                            {mod.feedItems.map((item) => (
                              <div key={item.text} className="flex items-start gap-2">
                                <span className="text-[10px] font-bold text-white bg-[#0B3D2E] px-1.5 py-0.5 rounded flex-shrink-0">{item.tag}</span>
                                <span className="text-xs text-[#374151]">{item.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {mod.riskParams && (
                        <div className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-4">
                          <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Risk Parameters</div>
                          <div className="flex flex-wrap gap-1.5">
                            {mod.riskParams.map((param) => (
                              <span key={param} className="text-xs bg-white border border-[#E5E7EB] px-2 py-1 rounded text-[#374151]">{param}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {mod.reportTypes && (
                        <div className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-4">
                          <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Report Types</div>
                          <div className="space-y-1.5">
                            {mod.reportTypes.map((r) => (
                              <div key={r} className="flex items-center gap-2 text-xs text-[#374151]">
                                <div className="w-1 h-1 rounded-full bg-[#0B3D2E]" />
                                {r}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#0B3D2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Not just climate data. Decision-ready carbon intelligence.</h2>
          <p className="text-[#A7F3D0]/80 mb-8 max-w-xl mx-auto">Join the early access list to test CarbonCounsel on your use case — company exposure, project due diligence, regulatory compliance, or client advisory work.</p>
          <Link href="/early-access" data-testid="button-product-cta" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#0B3D2E] font-bold rounded-lg hover:bg-[#A7F3D0] transition-colors">
            Join Early Access <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
