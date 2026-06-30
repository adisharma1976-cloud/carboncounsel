import { useState } from "react";
import { CheckCircle, Users, Handshake, Mail, Loader2 } from "lucide-react";
import api from "@/lib/api";

const roles = ["Company / Corporate", "ESG Consultant", "Energy Lawyer / Law Firm", "Carbon Project Developer", "Investor / Buyer", "Policy / Research Team", "Other"];
const sectors = ["Cement", "Iron and Steel", "Aluminium", "Fertiliser", "Petroleum Refinery", "Petrochemicals", "Textiles", "Renewable Energy", "Power", "Financial Services", "Legal / Advisory", "Other"];
const interests = ["Demo", "Pilot", "Newsletter", "Partnership"];

export default function EarlyAccess() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", org: "", role: "", sector: "", type: "", usecase: "", interest: [] as string[], message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleInterest(item: string) {
    setForm(prev => ({
      ...prev,
      interest: prev.interest.includes(item)
        ? prev.interest.filter(i => i !== item)
        : [...prev.interest, item],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.earlyAccess.submit({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        org: form.org,
        role: form.role,
        sector: form.sector || undefined,
        type: form.type,
        usecase: form.usecase || undefined,
        interest: form.interest,
        message: form.message || undefined,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-[#F8FAF7] min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#DCFCE7] flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-[#22C55E]" />
          </div>
          <h1 className="text-2xl font-bold text-[#111827] mb-3">Thank you — we'll be in touch shortly.</h1>
          <p className="text-[#6B7280] leading-relaxed">
            You've been added to the CarbonCounsel early access list. We'll reach out within a few days to discuss your use case and next steps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAF7]">
      {/* Hero */}
      <section className="pt-28 pb-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold text-[#0B3D2E] uppercase tracking-wider mb-4">Early Access</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#111827] mb-5 leading-tight">
              Get early access to CarbonCounsel.
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              We are inviting ESG consultants, companies, law firms, carbon project developers, investors, and policy teams to test the first version of CarbonCounsel.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white border border-[#E5E7EB] rounded-xl p-7 space-y-5" data-testid="form-early-access">
                <h2 className="text-xl font-bold text-[#111827] mb-2">Request Early Access</h2>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Name *</label>
                    <input required name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:border-transparent" placeholder="Your full name" data-testid="input-name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Work Email *</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:border-transparent" placeholder="name@company.com" data-testid="input-email" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Phone <span className="text-[#9CA3AF] font-normal">(optional)</span></label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:border-transparent" placeholder="+91 98000 00000" data-testid="input-phone" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Organisation *</label>
                    <input required name="org" value={form.org} onChange={handleChange} className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:border-transparent" placeholder="Company or firm name" data-testid="input-organisation" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Role *</label>
                    <input required name="role" value={form.role} onChange={handleChange} className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:border-transparent" placeholder="Your title or role" data-testid="input-role" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Sector</label>
                    <select name="sector" value={form.sector} onChange={handleChange} className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] bg-white" data-testid="select-sector">
                      <option value="">Select sector</option>
                      {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">I am a *</label>
                  <select required name="type" value={form.type} onChange={handleChange} className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] bg-white" data-testid="select-type">
                    <option value="">Select one</option>
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">What do you want to use CarbonCounsel for?</label>
                  <textarea name="usecase" value={form.usecase} onChange={handleChange} rows={3} className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] resize-none" placeholder="Describe your use case — e.g. CCTS compliance tracking, carbon project due diligence, ESG consulting support..." data-testid="input-usecase" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">I am interested in</label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleInterest(item)}
                        data-testid={`checkbox-interest-${item.toLowerCase()}`}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                          form.interest.includes(item)
                            ? "bg-[#0B3D2E] text-white border-[#0B3D2E]"
                            : "bg-white text-[#374151] border-[#E5E7EB] hover:border-[#0B3D2E]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Message <span className="text-[#9CA3AF] font-normal">(optional)</span></label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] resize-none" placeholder="Anything else you'd like to share..." data-testid="input-message" />
                </div>

                <button
                  type="submit"
                  data-testid="button-submit-early-access"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#0B3D2E] text-white font-bold rounded-lg hover:bg-[#14532D] transition-colors text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {loading ? "Submitting..." : "Request Early Access"}
                </button>

                <p className="text-xs text-[#9CA3AF] text-center">
                  CarbonCounsel provides research and intelligence support. It does not provide legal, financial, or investment advice.
                </p>
              </form>
            </div>

            {/* Info Cards */}
            <div className="space-y-5">
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5" data-testid="card-pilots">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0B3D2E] flex items-center justify-center">
                    <Users size={16} className="text-white" />
                  </div>
                  <div className="font-semibold text-[#111827]">For pilots</div>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed">Test CarbonCounsel on your company, sector, client, or project use case.</p>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5" data-testid="card-partnerships">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0B3D2E] flex items-center justify-center">
                    <Handshake size={16} className="text-white" />
                  </div>
                  <div className="font-semibold text-[#111827]">For partnerships</div>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed">Collaborate on data, research, consulting, legal advisory, or climate intelligence.</p>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5" data-testid="card-newsletter">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0B3D2E] flex items-center justify-center">
                    <Mail size={16} className="text-white" />
                  </div>
                  <div className="font-semibold text-[#111827]">For newsletter</div>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed">Subscribe to receive structured CCTS and carbon market updates every week.</p>
              </div>

              <div className="bg-[#F0FDF4] border border-[#A7F3D0] rounded-xl p-5">
                <div className="text-xs font-semibold text-[#0B3D2E] uppercase tracking-wider mb-2">Early access is open for</div>
                <ul className="space-y-1.5">
                  {["ESG Consultants", "Energy Law Firms", "Companies & Corporates", "Carbon Project Developers", "Investors & Buyers", "Policy & Research Teams"].map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#374151]">
                      <CheckCircle size={12} className="text-[#22C55E] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
