import { Link } from "wouter";
import { CheckCircle, ArrowRight } from "lucide-react";

const solutions = [
  {
    audience: "Companies",
    headline: "Understand your carbon market exposure before compliance becomes expensive.",
    features: [
      "CCTS exposure check",
      "Sectoral obligation mapping",
      "Renewable-energy compliance tracking",
      "Carbon-credit opportunity assessment",
      "CBAM and export-risk screening",
      "Internal compliance memo generation",
    ],
    cta: "Check Company Exposure",
  },
  {
    audience: "ESG and Energy Consultants",
    headline: "Deliver sharper client work in less time.",
    features: [
      "Client-ready carbon compliance reports",
      "Weekly regulatory summaries",
      "Sector-wise CCTS briefs",
      "Carbon project review support",
      "Company exposure snapshots",
      "Document intelligence and memo generation",
    ],
    cta: "Use CarbonCounsel for Client Work",
  },
  {
    audience: "Law Firms",
    headline: "Climate regulation and carbon markets, structured for advisory work.",
    features: [
      "CCTS legal and regulatory tracking",
      "CBAM and Article 6 monitoring",
      "Renewable-energy compliance research",
      "Carbon-credit due diligence support",
      "Client memo generation",
      "Source-backed legal research support",
    ],
    cta: "Request Law Firm Demo",
  },
  {
    audience: "Carbon Project Developers",
    headline: "Improve project readiness, documentation quality, and buyer confidence.",
    features: [
      "Project document upload and analysis",
      "Methodology check",
      "Additionality risk review",
      "Verification gap analysis",
      "Buyer-readiness score",
      "Project summary memo",
    ],
    cta: "Review Project Readiness",
  },
  {
    audience: "Investors and Buyers",
    headline: "Evaluate carbon projects and company claims before committing capital.",
    features: [
      "Carbon-credit project comparison",
      "Risk scoring",
      "Registry and verification review",
      "Company climate claim assessment",
      "Market intelligence feed",
      "Portfolio monitoring",
    ],
    cta: "Explore Investor Intelligence",
  },
  {
    audience: "Policy and Research Teams",
    headline: "Track carbon market developments with structured climate intelligence.",
    features: [
      "India and global carbon market updates",
      "COP and Article 6 tracker",
      "CCTS and CBAM monitoring",
      "Energy agency data summaries",
      "Research-ready source database",
      "Policy brief generation",
    ],
    cta: "Join Research Access",
  },
];

export default function Solutions() {
  return (
    <div className="bg-[#F8FAF7]">
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#0B3D2E] uppercase tracking-wider mb-4">Solutions</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#111827] mb-5 leading-tight">
              Carbon intelligence for every team navigating climate compliance.
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              CarbonCounsel is built for teams that need reliable, cited, and decision-ready intelligence across carbon markets, renewable energy, compliance, and climate regulation.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {solutions.map((sol, i) => (
            <div
              key={sol.audience}
              className={`bg-white border border-[#E5E7EB] rounded-xl overflow-hidden`}
              data-testid={`card-solution-${sol.audience.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="p-7 lg:p-9">
                <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[#0B3D2E] uppercase tracking-wider mb-2">For {sol.audience}</div>
                    <h2 className="text-2xl font-bold text-[#111827] mb-4">{sol.headline}</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {sol.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-[#374151]">
                          <CheckCircle size={14} className="text-[#22C55E] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/early-access"
                      data-testid={`button-solution-${sol.audience.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B3D2E] text-white font-semibold text-sm rounded-lg hover:bg-[#14532D] transition-colors"
                    >
                      {sol.cta} <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="lg:w-64 flex-shrink-0">
                    <div className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-4 text-center">
                      <div className="text-5xl font-black text-[#0B3D2E]/10 mb-1">0{i + 1}</div>
                      <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">{sol.audience}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Track obligations before they become liabilities.</h2>
          <p className="text-[#9CA3AF] mb-8 max-w-lg mx-auto">CarbonCounsel is opening early access. Join to test the platform with your team's specific use case.</p>
          <Link href="/early-access" data-testid="button-solutions-cta" className="inline-flex items-center gap-2 px-7 py-3 bg-[#0B3D2E] text-white font-bold rounded-lg hover:bg-[#14532D] transition-colors">
            Request Access <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
