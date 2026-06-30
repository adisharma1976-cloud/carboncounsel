import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";

const approach = [
  { label: "India-first", desc: "Starting with India's carbon market and regulatory landscape." },
  { label: "Global-ready", desc: "Architecture built to expand into CBAM, Article 6, and global registries." },
  { label: "Source-backed", desc: "Every answer cites the underlying regulatory document or data source." },
  { label: "AI-native", desc: "Not a retrofitted database. Built with AI at the core of every workflow." },
  { label: "Compliance-focused", desc: "Designed for regulatory, legal, and compliance-grade requirements." },
  { label: "Built for professional users", desc: "Designed for ESG consultants, lawyers, investors, and project teams — not generic audiences." },
];

const building = [
  "AI research assistant",
  "Regulatory tracker",
  "Company exposure database",
  "Carbon project due diligence engine",
  "Market intelligence feed",
  "Report generator",
];

export default function About() {
  return (
    <div className="bg-[#F8FAF7]">
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#0B3D2E] uppercase tracking-wider mb-4">About</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#111827] mb-5 leading-tight">
              Building the intelligence layer for carbon markets.
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              CarbonCounsel is being built to help businesses, consultants, lawyers, investors, and project developers navigate the next generation of carbon market compliance and climate intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Thesis + Why Now */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-7" data-testid="card-thesis">
              <div className="text-xs font-bold text-[#0B3D2E] uppercase tracking-wider mb-4">Our thesis</div>
              <p className="text-[#374151] leading-relaxed">
                Carbon markets are becoming regulatory, financial, and strategic infrastructure. But the data remains fragmented, technical, and difficult to act upon. CarbonCounsel exists to convert that complexity into structured, cited, and decision-ready intelligence.
              </p>
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-7" data-testid="card-why-now">
              <div className="text-xs font-bold text-[#0B3D2E] uppercase tracking-wider mb-4">Why now</div>
              <p className="text-[#374151] leading-relaxed">
                India's carbon market is emerging. Global climate rules are tightening. Companies are facing new compliance obligations, export-linked climate risks, and growing scrutiny around carbon claims. Teams need an intelligence system built for this new reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#111827] mb-8">Our approach</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {approach.map((item) => (
              <div key={item.label} className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-xl p-5" data-testid={`card-approach-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#0B3D2E]" />
                  <div className="font-bold text-[#111827] text-sm">{item.label}</div>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed pl-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we are building */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-[#111827] mb-6">What we are building</h2>
              <ul className="space-y-3">
                {building.map((item) => (
                  <li key={item} className="flex items-center gap-3" data-testid={`item-building-${item.toLowerCase().replace(/\s+/g, "-")}`}>
                    <CheckCircle size={16} className="text-[#22C55E] flex-shrink-0" />
                    <span className="text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#111827] rounded-xl p-7">
              <div className="text-[#A7F3D0] text-xs font-semibold uppercase tracking-wider mb-6">The CarbonCounsel stack</div>
              <div className="space-y-4">
                {[
                  { layer: "Intelligence Layer", items: ["AI Research Assistant", "Regulatory Feed", "Report Generator"] },
                  { layer: "Data Layer", items: ["Company Database", "Project Due Diligence", "Market Intelligence"] },
                  { layer: "Compliance Layer", items: ["CCTS Tracker", "CBAM Monitor", "Article 6 Watch"] },
                ].map((group) => (
                  <div key={group.layer} className="border border-[#1F2937] rounded-lg p-4">
                    <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">{group.layer}</div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="text-xs text-[#D1D5DB] bg-[#1F2937] px-2.5 py-1 rounded">{item}</span>
                      ))}
                    </div>
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
          <h2 className="text-2xl font-bold text-white mb-3">Help shape CarbonCounsel.</h2>
          <p className="text-[#A7F3D0]/80 mb-7 max-w-lg mx-auto">Join early access and test the platform with your use case. Your feedback will directly shape the product.</p>
          <Link href="/early-access" data-testid="button-about-cta" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#0B3D2E] font-bold rounded-lg hover:bg-[#A7F3D0] transition-colors">
            Join Early Access <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
