import { Link } from "wouter";
import { ArrowRight, BookOpen, FileText, BarChart2, Globe } from "lucide-react";
import { useState } from "react";

const categories = [
  "All", "CCTS", "Carbon Credits", "CBAM", "Article 6",
  "Renewable Energy", "Company Exposure", "Project Due Diligence",
  "Climate Regulation", "ESG and Disclosures",
];

const resources = [
  {
    title: "India CCTS: What companies and consultants need to track",
    category: "CCTS",
    type: "Explainer",
    date: "June 2025",
    desc: "A structured overview of India's Carbon Credit Trading Scheme — covered sectors, GEI targets, compliance procedures, and compliance timelines.",
    featured: true,
  },
  {
    title: "CBAM: What Indian exporters need to know",
    category: "CBAM",
    type: "Regulatory Update",
    date: "May 2025",
    desc: "Understanding the EU's Carbon Border Adjustment Mechanism and its implications for India's cement, steel, aluminium, and fertiliser exporters.",
  },
  {
    title: "Carbon credit due diligence checklist",
    category: "Project Due Diligence",
    type: "Diligence Guide",
    date: "May 2025",
    desc: "A structured checklist covering additionality, permanence, leakage, verification, registry status, and buyer-readiness for carbon credit projects.",
  },
  {
    title: "Understanding GEI targets for cement and steel sectors",
    category: "CCTS",
    type: "Sector Brief",
    date: "April 2025",
    desc: "A sector-specific briefing on Gross Energy Intensity targets notified by BEE for India's cement and steel industries under CCTS.",
  },
  {
    title: "Article 6 mechanisms: What carbon project developers need to know",
    category: "Article 6",
    type: "Explainer",
    date: "April 2025",
    desc: "An overview of Article 6.2 and 6.4 under the Paris Agreement, correspondent adjustments, and implications for Indian project developers.",
  },
  {
    title: "Company-level decarbonisation disclosure: ESG report analysis",
    category: "ESG and Disclosures",
    type: "Company Analysis",
    date: "March 2025",
    desc: "How to assess the quality, completeness, and credibility of corporate decarbonisation disclosures in Indian ESG and annual reports.",
  },
  {
    title: "Voluntary carbon markets: Quality assessment framework",
    category: "Carbon Credits",
    type: "Diligence Guide",
    date: "March 2025",
    desc: "A structured framework for assessing carbon credit quality across key standards including Verra VCS, Gold Standard, and emerging Article 6 methodologies.",
  },
  {
    title: "India's renewable energy obligations: RPO tracker",
    category: "Renewable Energy",
    type: "Regulatory Update",
    date: "February 2025",
    desc: "A summary of Renewable Purchase Obligation targets, compliance mechanisms, and the intersection with India's emerging carbon markets.",
  },
];

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = activeCategory === "All" ? resources : resources.filter(r => r.category === activeCategory);
  const featured = resources.find(r => r.featured);
  const listed = filtered.filter(r => !r.featured || activeCategory !== "All");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <div className="bg-[#F8FAF7]">
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#0B3D2E] uppercase tracking-wider mb-4">Resources</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#111827] mb-5 leading-tight">
              Carbon market insights, briefings, and research.
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              Stay updated on India's CCTS, global carbon markets, CBAM, Article 6, renewable energy, project due diligence, and company decarbonisation trends.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Brief */}
      {featured && activeCategory === "All" && (
        <section className="py-12 bg-white border-b border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-5">Featured Brief</div>
            <div className="bg-[#F0FDF4] border border-[#A7F3D0] rounded-xl p-7 flex flex-col md:flex-row gap-6 items-start" data-testid="card-featured-brief">
              <div className="w-12 h-12 rounded-xl bg-[#0B3D2E] flex items-center justify-center flex-shrink-0">
                <BookOpen size={22} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs font-bold text-white bg-[#0B3D2E] px-2.5 py-0.5 rounded-full">CCTS</span>
                  <span className="text-xs text-[#0B3D2E] bg-[#A7F3D0]/50 px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">Explainer</span>
                  <span className="text-xs text-[#6B7280]">June 2025</span>
                </div>
                <h2 className="text-xl font-bold text-[#111827] mb-2">{featured.title}</h2>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-4">{featured.desc}</p>
                <Link href="/early-access" data-testid="button-featured-read" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B3D2E] hover:text-[#14532D] transition-colors">
                  Read Brief <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories + Resources */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`filter-category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className={`text-xs px-3.5 py-1.5 rounded-full border font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[#0B3D2E] text-white border-[#0B3D2E]"
                    : "border-[#E5E7EB] text-[#6B7280] hover:border-[#0B3D2E] hover:text-[#0B3D2E] bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(activeCategory === "All" ? resources : filtered).filter(r => activeCategory !== "All" || !r.featured).map((r) => (
              <div key={r.title} className="bg-white border border-[#E5E7EB] rounded-xl p-5 hover:border-[#A7F3D0] hover:shadow-sm transition-all flex flex-col" data-testid={`card-resource-${r.title.toLowerCase().replace(/\s+/g, "-").slice(0, 40)}`}>
                <div className="flex gap-2 mb-3">
                  <span className="text-[10px] font-bold text-white bg-[#0B3D2E] px-2 py-0.5 rounded-full">{r.category}</span>
                  <span className="text-[10px] text-[#6B7280] bg-[#F8FAF7] border border-[#E5E7EB] px-2 py-0.5 rounded-full">{r.type}</span>
                  <span className="text-[10px] text-[#9CA3AF] ml-auto">{r.date}</span>
                </div>
                <h3 className="font-semibold text-[#111827] text-sm mb-2 leading-snug">{r.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed flex-1 mb-4">{r.desc}</p>
                <Link href="/early-access" data-testid={`button-resource-read-${r.title.toLowerCase().replace(/\s+/g, "-").slice(0, 30)}`} className="text-xs font-semibold text-[#0B3D2E] hover:text-[#14532D] flex items-center gap-1 transition-colors">
                  Read <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-14 bg-[#0B3D2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Get the Weekly CCTS Brief.</h2>
            <p className="text-[#A7F3D0]/80 mb-7">A concise weekly update on India's carbon market, regulatory changes, compliance risks, and market developments. Delivered to your inbox every week.</p>
            {subscribed ? (
              <div className="bg-white/10 border border-white/20 rounded-xl p-6">
                <div className="text-white font-semibold mb-1">You're subscribed.</div>
                <div className="text-[#A7F3D0]/80 text-sm">We'll send your first CCTS brief shortly.</div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto" data-testid="form-newsletter">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Work email address"
                  data-testid="input-newsletter-email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#A7F3D0]"
                />
                <button type="submit" data-testid="button-newsletter-subscribe" className="px-5 py-3 bg-white text-[#0B3D2E] font-bold text-sm rounded-lg hover:bg-[#A7F3D0] transition-colors flex-shrink-0">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Resource Types */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-[#111827] mb-5">Resource types</h2>
          <div className="flex flex-wrap gap-3">
            {["Explainers", "Regulatory Updates", "Sector Briefs", "Company Analysis", "Project Diligence Guides", "Market Intelligence Notes"].map((type) => (
              <div key={type} className="bg-[#F8FAF7] border border-[#E5E7EB] rounded-lg px-4 py-2 text-sm text-[#374151] font-medium" data-testid={`tag-resourcetype-${type.toLowerCase().replace(/\s+/g, "-")}`}>
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
