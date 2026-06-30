import { Link } from "wouter";
import { ArrowRight, Search, AlertTriangle, FileText, BarChart2, Zap, Shield, TrendingUp, CheckCircle, Upload, ChevronRight } from "lucide-react";

const problemCards = [
  {
    icon: <AlertTriangle size={20} className="text-[#F59E0B]" />,
    title: "Regulations change quickly",
    desc: "Carbon market rules, compliance procedures, sectoral targets, and renewable-energy obligations are difficult to track manually.",
  },
  {
    icon: <BarChart2 size={20} className="text-[#0B3D2E]" />,
    title: "Company exposure is unclear",
    desc: "Businesses need to know whether their sector, facilities, supply chains, exports, or disclosures create carbon market risk.",
  },
  {
    icon: <FileText size={20} className="text-[#0B3D2E]" />,
    title: "Carbon-credit documents are complex",
    desc: "Project documents, monitoring reports, verification reports, methodologies, and registry data require careful due diligence.",
  },
  {
    icon: <Zap size={20} className="text-[#F59E0B]" />,
    title: "Raw data does not create decisions",
    desc: "Consultants, companies, lawyers, and investors need structured intelligence, not just more documents.",
  },
];

const solutionCards = [
  {
    title: "Ask CarbonCounsel AI",
    desc: "Get cited answers on CCTS, carbon credits, CBAM, Article 6, renewable-energy obligations, and company disclosures.",
    icon: <Search size={18} />,
  },
  {
    title: "CCTS Compliance Tracker",
    desc: "Track covered sectors, obligated entities, GEI targets, reporting obligations, deadlines, filings, and trading developments.",
    icon: <Shield size={18} />,
  },
  {
    title: "Company Exposure Database",
    desc: "Map carbon risk across companies and sectors using emissions exposure, RE disclosures, ESG claims, and export-linked climate risk.",
    icon: <BarChart2 size={18} />,
  },
  {
    title: "Carbon Project Due Diligence",
    desc: "Upload project documents and assess additionality, permanence, leakage, verification gaps, double-counting risk, and buyer-readiness.",
    icon: <FileText size={18} />,
  },
];

const workflowSteps = [
  {
    num: "01",
    title: "Collect",
    desc: "Government notifications, CCTS documents, company reports, carbon registries, COP decisions, energy agency data, ESG disclosures, and renewable-energy rules.",
  },
  {
    num: "02",
    title: "Structure",
    desc: "Extract obligations, deadlines, sectors, entities, project details, claims, targets, and risks into structured intelligence layers.",
  },
  {
    num: "03",
    title: "Analyse",
    desc: "Use AI to answer questions, compare documents, identify gaps, detect risks, and generate reports with source citations.",
  },
  {
    num: "04",
    title: "Act",
    desc: "Prepare compliance notes, project diligence memos, company risk profiles, board briefs, and market intelligence reports.",
  },
];

const useCases = [
  {
    audience: "Companies",
    desc: "Understand your exposure to CCTS, renewable-energy obligations, carbon-credit markets, and export-linked climate risks.",
  },
  {
    audience: "ESG Consultants",
    desc: "Generate client-ready carbon compliance notes, regulatory updates, sector summaries, and risk memos faster.",
  },
  {
    audience: "Law Firms",
    desc: "Track carbon market regulation, CCTS, CBAM, Article 6, renewable-energy rules, and climate compliance for client advisory work.",
  },
  {
    audience: "Project Developers",
    desc: "Evaluate project eligibility, documentation gaps, methodology risks, verification status, and buyer-readiness.",
  },
  {
    audience: "Investors & Buyers",
    desc: "Compare carbon projects, company claims, market risks, and credit quality before procurement or investment decisions.",
  },
  {
    audience: "Policy & Research",
    desc: "Monitor Indian and global carbon market developments with structured, cited intelligence.",
  },
];

const sectors = [
  { name: "Cement", risk: "High", color: "text-[#EF4444]" },
  { name: "Iron & Steel", risk: "High", color: "text-[#EF4444]" },
  { name: "Aluminium", risk: "High", color: "text-[#EF4444]" },
  { name: "Fertiliser", risk: "Medium", color: "text-[#F59E0B]" },
  { name: "Petroleum Refinery", risk: "High", color: "text-[#EF4444]" },
  { name: "Petrochemicals", risk: "Medium", color: "text-[#F59E0B]" },
  { name: "Textiles", risk: "Medium", color: "text-[#F59E0B]" },
];

function DashboardMockup() {
  return (
    <div className="bg-white rounded-xl shadow-2xl border border-[#E5E7EB] overflow-hidden text-left w-full max-w-lg">
      <div className="bg-[#0B3D2E] px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]/70" />
        </div>
        <span className="text-[#A7F3D0] text-xs font-semibold ml-2 tracking-wide">CarbonCounsel Intelligence</span>
      </div>
      <div className="bg-[#F8FAF7] p-3 flex items-center gap-2 border-b border-[#E5E7EB]">
        <Search size={14} className="text-[#6B7280]" />
        <span className="text-[#6B7280] text-xs">Ask CarbonCounsel AI — e.g. "Is a cement company covered under CCTS?"</span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 col-span-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">CCTS Compliance Tracker</span>
            <span className="text-[10px] text-[#A7F3D0] bg-[#0B3D2E] px-1.5 py-0.5 rounded-full font-medium">Live</span>
          </div>
          <div className="space-y-1.5">
            {sectors.slice(0, 4).map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="text-xs text-[#374151]">{s.name}</span>
                <span className={`text-[10px] font-semibold ${s.color}`}>{s.risk} Risk</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-3">
          <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">Exposure Score</div>
          <div className="text-2xl font-bold text-[#0B3D2E]">7.4</div>
          <div className="text-[10px] text-[#EF4444] font-medium mt-0.5">High Risk</div>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-3">
          <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">Credits Reviewed</div>
          <div className="text-2xl font-bold text-[#0B3D2E]">142</div>
          <div className="text-[10px] text-[#22C55E] font-medium mt-0.5">+18 this week</div>
        </div>
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 col-span-2">
          <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Regulatory Intelligence Feed</div>
          <div className="space-y-1.5">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0B3D2E] mt-1.5 flex-shrink-0" />
              <span className="text-[10px] text-[#374151]">BEE updates sectoral GEI baseline for Cement — 2 days ago</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-1.5 flex-shrink-0" />
              <span className="text-[10px] text-[#374151]">MoEFCC issues notification on CCTS offset mechanism — 4 days ago</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0B3D2E] mt-1.5 flex-shrink-0" />
              <span className="text-[10px] text-[#374151]">EU CBAM transition period reporting deadline update — 1 week ago</span>
            </div>
          </div>
        </div>
        <div className="col-span-2 border border-dashed border-[#A7F3D0] bg-[#F0FDF4] rounded-lg p-3 flex items-center gap-3">
          <Upload size={16} className="text-[#0B3D2E]" />
          <div>
            <div className="text-[10px] font-semibold text-[#0B3D2E]">Document Upload Panel</div>
            <div className="text-[9px] text-[#6B7280]">Upload PDD, monitoring report, or registry file for AI analysis</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-[#F8FAF7]">
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#A7F3D0]/30 border border-[#A7F3D0] rounded-full px-3 py-1 text-xs font-semibold text-[#0B3D2E] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                India's first AI-native carbon market intelligence platform
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#111827] leading-tight mb-5">
                AI-powered carbon market intelligence for India's new compliance economy.
              </h1>
              <p className="text-lg text-[#6B7280] leading-relaxed mb-8">
                CarbonCounsel helps companies, consultants, law firms, investors, and project developers track CCTS obligations, renewable-energy compliance, carbon-credit risk, and company-level decarbonisation exposure through one intelligence platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/early-access"
                  data-testid="button-hero-early-access"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0B3D2E] text-white font-semibold rounded-lg hover:bg-[#14532D] transition-colors"
                >
                  Join Early Access <ArrowRight size={16} />
                </Link>
                <Link
                  href="/early-access"
                  data-testid="button-hero-request-demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#0B3D2E] text-[#0B3D2E] font-semibold rounded-lg hover:bg-[#F0FDF4] transition-colors"
                >
                  Request Demo
                </Link>
              </div>
              <p className="text-xs text-[#9CA3AF]">Built for carbon markets, climate compliance, renewable energy, and regulatory intelligence.</p>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold text-[#111827] mb-4">Carbon market data is scattered. Compliance risk is not.</h2>
            <p className="text-[#6B7280] leading-relaxed">
              India's carbon market is emerging across government notifications, sectoral targets, company disclosures, carbon project documents, renewable-energy standards, trading frameworks, and global climate rules. The information exists, but it is fragmented across PDFs, portals, reports, registries, and regulatory updates.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {problemCards.map((card) => (
              <div key={card.title} className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-xl p-6" data-testid={`card-problem-${card.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827] mb-2">{card.title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold text-[#111827] mb-4">One intelligence layer for carbon markets, compliance, and decarbonisation.</h2>
            <p className="text-[#6B7280] leading-relaxed">
              CarbonCounsel converts fragmented climate and carbon market information into cited answers, compliance trackers, risk scores, company profiles, project reviews, and client-ready reports.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {solutionCards.map((card) => (
              <div key={card.title} className="bg-white border border-[#E5E7EB] rounded-xl p-6 hover:border-[#A7F3D0] hover:shadow-md transition-all duration-200" data-testid={`card-solution-${card.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="w-10 h-10 rounded-lg bg-[#0B3D2E] flex items-center justify-center text-white mb-4">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-[#111827] mb-2">{card.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">From raw documents to decision-ready intelligence.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, i) => (
              <div key={step.num} className="relative" data-testid={`card-workflow-${step.title.toLowerCase()}`}>
                {i < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-full w-full h-px bg-[#1F2937] z-0" />
                )}
                <div className="relative z-10">
                  <div className="text-[#A7F3D0] text-xs font-bold tracking-widest mb-3">{step.num}</div>
                  <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Answer Card Sample */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-4">Source-backed intelligence for carbon market decisions.</h2>
              <p className="text-[#6B7280] leading-relaxed mb-6">
                CarbonCounsel answers complex regulatory questions with citations, risk assessments, and actionable next steps. Not just data — decision-ready intelligence.
              </p>
              <ul className="space-y-3">
                {["Cited answers with source references", "Risk level assessment per query", "Compliance memo generation", "Sector-specific analysis"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#374151]">
                    <CheckCircle size={16} className="text-[#22C55E] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-xl p-6" data-testid="card-ai-answer-sample">
              <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Sample Query</div>
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Search size={14} className="text-[#0B3D2E] mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-[#111827]">Is a textile exporter in India exposed to carbon market risk?</p>
                </div>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#374151]">CarbonCounsel Analysis</span>
                  <span className="text-[10px] font-semibold text-[#F59E0B] bg-[#FEF3C7] px-2 py-0.5 rounded-full">Medium Risk</span>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                  A textile exporter may face carbon market exposure through domestic compliance developments, renewable-energy obligations, supply-chain requirements, and export-linked climate rules. CarbonCounsel can assess the company's sector, facilities, energy use, disclosures, and export markets.
                </p>
                <div className="border-t border-[#E5E7EB] pt-3 flex items-center justify-between">
                  <div className="text-xs text-[#6B7280]">
                    <span className="font-medium text-[#374151]">4 sources</span> reviewed · BEE, MoEFCC, CCTS Notification
                  </div>
                  <button className="text-xs font-semibold text-white bg-[#0B3D2E] px-3 py-1.5 rounded-md hover:bg-[#14532D] transition-colors" data-testid="button-generate-memo">
                    Generate Memo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#111827] mb-12">Built for real carbon market workflows.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((uc) => (
              <div key={uc.audience} className="bg-white border border-[#E5E7EB] rounded-xl p-6 hover:border-[#A7F3D0] transition-colors" data-testid={`card-usecase-${uc.audience.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="text-xs font-bold text-[#0B3D2E] uppercase tracking-wider mb-2">For {uc.audience}</div>
                <p className="text-sm text-[#6B7280] leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* India First */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-4">Starting with India. Built for global carbon markets.</h2>
              <p className="text-[#6B7280] leading-relaxed mb-6">
                CarbonCounsel begins with India's Carbon Credit Trading Scheme and renewable-energy compliance landscape. As carbon markets mature, the platform will expand into CBAM, Article 6, voluntary carbon markets, global registries, carbon credit ratings, and emerging market carbon intelligence.
              </p>
              <div className="flex flex-wrap gap-2">
                {["India CCTS", "CBAM", "Article 6", "Voluntary Markets", "Global Registries", "Carbon Ratings"].map((tag) => (
                  <span key={tag} className="text-xs font-medium text-[#0B3D2E] bg-[#A7F3D0]/30 border border-[#A7F3D0] px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            <div className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-xl p-6" data-testid="card-india-sectors">
              <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4">CCTS Covered Sectors — India</div>
              <div className="space-y-2">
                {sectors.map((s) => (
                  <div key={s.name} className="flex items-center justify-between py-2 border-b border-[#E5E7EB] last:border-0">
                    <span className="text-sm font-medium text-[#111827]">{s.name}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${s.risk === "High" ? "bg-[#EF4444]" : "bg-[#F59E0B]"}`} />
                      <span className={`text-xs font-semibold ${s.color}`}>{s.risk}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access CTA */}
      <section className="py-16 bg-[#0B3D2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Join the early access list.</h2>
              <p className="text-[#A7F3D0]/80 leading-relaxed mb-6">
                We are opening early access for ESG consultants, energy lawyers, companies, carbon project developers, investors, and policy teams who want to test an AI-native carbon market intelligence platform.
              </p>
              <ul className="space-y-2">
                {["ESG Consultants", "Energy Law Firms", "Companies & Corporates", "Carbon Project Developers", "Investors & Buyers", "Policy & Research Teams"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#D1FAE5]">
                    <ChevronRight size={14} className="text-[#A7F3D0]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <EarlyAccessFormInline />
          </div>
        </div>
      </section>
    </div>
  );
}

function EarlyAccessFormInline() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white/10 border border-white/20 rounded-xl p-8 text-center">
        <CheckCircle size={36} className="text-[#A7F3D0] mx-auto mb-4" />
        <h3 className="text-white font-bold text-lg mb-2">Thank you — we'll be in touch shortly.</h3>
        <p className="text-[#A7F3D0]/80 text-sm">You've been added to the CarbonCounsel early access list.</p>
      </div>
    );
  }

  return (
    <form className="bg-white/10 border border-white/20 rounded-xl p-6 space-y-4" onSubmit={handleSubmit} data-testid="form-early-access-inline">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#A7F3D0]" placeholder="Name" data-testid="input-name" />
        <input required type="email" className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#A7F3D0]" placeholder="Work email" data-testid="input-email" />
      </div>
      <input required className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#A7F3D0]" placeholder="Organisation" data-testid="input-organisation" />
      <input required className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#A7F3D0]" placeholder="Role" data-testid="input-role" />
      <input className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#A7F3D0]" placeholder="Sector" data-testid="input-sector" />
      <textarea className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#A7F3D0] resize-none" rows={3} placeholder="What do you want to use CarbonCounsel for?" data-testid="input-usecase" />
      <button type="submit" className="w-full py-3 bg-[#A7F3D0] text-[#0B3D2E] font-bold rounded-lg hover:bg-white transition-colors text-sm" data-testid="button-submit-early-access">
        Request Early Access
      </button>
    </form>
  );
}

import { useState } from "react";
