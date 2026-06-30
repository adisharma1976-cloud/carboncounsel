import { Link } from "wouter";
import { ArrowRight, Upload, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const analysisCards = [
  { title: "Project Summary", score: null, status: "Auto-generated", color: "text-[#0B3D2E]", bg: "bg-[#DCFCE7]" },
  { title: "Additionality Risk", score: "Medium", status: "Risk identified", color: "text-[#F59E0B]", bg: "bg-[#FEF3C7]" },
  { title: "Permanence Risk", score: "Low", status: "Satisfactory", color: "text-[#22C55E]", bg: "bg-[#DCFCE7]" },
  { title: "Leakage Risk", score: "Medium", status: "Review required", color: "text-[#F59E0B]", bg: "bg-[#FEF3C7]" },
  { title: "Double Counting Risk", score: "Low", status: "Cleared", color: "text-[#22C55E]", bg: "bg-[#DCFCE7]" },
  { title: "Verification Gaps", score: "High", status: "Gaps found", color: "text-[#EF4444]", bg: "bg-[#FEE2E2]" },
  { title: "Methodology Integrity", score: "Medium", status: "Moderate confidence", color: "text-[#F59E0B]", bg: "bg-[#FEF3C7]" },
  { title: "Buyer-Readiness Score", score: "6.1 / 10", status: "Conditional", color: "text-[#F59E0B]", bg: "bg-[#FEF3C7]" },
  { title: "Suggested Diligence Questions", score: null, status: "12 questions generated", color: "text-[#0B3D2E]", bg: "bg-[#EFF6FF]" },
];

const audiences = [
  "Carbon project developers", "Credit buyers", "Investors",
  "ESG consultants", "Law firms", "Climate finance teams",
];

const docTypes = [
  "Project design documents (PDD)", "Monitoring reports",
  "Verification reports", "Methodology documents",
  "Annual reports", "ESG reports",
  "Registry extracts", "Buyer-side diligence files",
];

const reportSections = [
  "Executive summary", "Project details", "Risk table",
  "Missing information", "Source-backed findings",
  "Questions for developer", "Buyer memo",
];

export default function ProjectDueDiligence() {
  return (
    <div className="bg-[#F8FAF7]">
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#0B3D2E] uppercase tracking-wider mb-4">Project Due Diligence</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#111827] mb-5 leading-tight">
              AI-assisted due diligence for carbon-credit projects.
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed mb-8">
              Upload project documents and identify risks across additionality, permanence, leakage, methodology, verification, double counting, registry status, and buyer-readiness.
            </p>
            <Link href="/early-access" data-testid="button-diligence-review" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B3D2E] text-white font-semibold rounded-lg hover:bg-[#14532D] transition-colors">
              Review a Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Upload Panel + Analysis */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Upload Panel */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-[#111827] mb-4">Document Upload</h2>
              <div className="bg-white border-2 border-dashed border-[#A7F3D0] rounded-xl p-8 text-center hover:border-[#0B3D2E] transition-colors cursor-pointer" data-testid="panel-document-upload">
                <div className="w-12 h-12 rounded-full bg-[#F0FDF4] border border-[#A7F3D0] flex items-center justify-center mx-auto mb-4">
                  <Upload size={22} className="text-[#0B3D2E]" />
                </div>
                <div className="font-semibold text-[#111827] mb-2">Upload project documents</div>
                <div className="text-sm text-[#6B7280] mb-4">PDD, monitoring report, verification report, ESG report, methodology document, or registry file</div>
                <div className="text-xs text-[#9CA3AF] mb-5">Drag and drop or click to select</div>
                <button className="px-5 py-2 bg-[#0B3D2E] text-white text-sm font-semibold rounded-lg hover:bg-[#14532D] transition-colors" data-testid="button-select-files">
                  Select Files
                </button>
              </div>

              <div className="mt-5 bg-[#F8FAF7] border border-[#E5E7EB] rounded-xl p-5">
                <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Supported document types</div>
                <ul className="space-y-1.5">
                  {docTypes.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-xs text-[#374151]">
                      <CheckCircle size={12} className="text-[#22C55E] flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Analysis Cards */}
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-[#111827] mb-4">Analysis Output</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {analysisCards.map((card) => (
                  <div key={card.title} className="bg-white border border-[#E5E7EB] rounded-xl p-4" data-testid={`card-analysis-${card.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-semibold text-[#6B7280]">{card.title}</div>
                      {card.score && (
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${card.bg} ${card.color}`}>{card.score}</span>
                      )}
                    </div>
                    <div className={`text-sm font-semibold ${card.color}`}>{card.status}</div>
                    <div className="mt-2 h-1 rounded-full bg-[#E5E7EB] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          card.color.includes("EF4444") ? "bg-[#EF4444] w-[80%]" :
                          card.color.includes("F59E0B") ? "bg-[#F59E0B] w-[55%]" :
                          "bg-[#22C55E] w-[30%]"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold text-[#111827] mb-5">Who this is for</h2>
              <div className="grid grid-cols-2 gap-3">
                {audiences.map((a) => (
                  <div key={a} className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg p-3 text-sm font-medium text-[#374151]" data-testid={`tag-audience-${a.toLowerCase().replace(/\s+/g, "-")}`}>
                    {a}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#111827] mb-5">Diligence report output</h2>
              <ul className="space-y-2.5">
                {reportSections.map((r) => (
                  <li key={r} className="flex items-center gap-2.5 text-sm text-[#374151]" data-testid={`item-report-${r.toLowerCase().replace(/\s+/g, "-")}`}>
                    <CheckCircle size={14} className="text-[#0B3D2E] flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Turn project documents into structured diligence intelligence.</h2>
          <p className="text-[#9CA3AF] mb-7 max-w-lg mx-auto">Join early access to review your first carbon-credit project with CarbonCounsel.</p>
          <Link href="/early-access" data-testid="button-diligence-cta" className="inline-flex items-center gap-2 px-7 py-3 bg-[#0B3D2E] text-white font-bold rounded-lg hover:bg-[#14532D] transition-colors">
            Review a Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
