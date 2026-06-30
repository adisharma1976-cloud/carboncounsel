import { Link } from "wouter";

const footerLinks = {
  Product: [
    { label: "Product Overview", href: "/product" },
    { label: "Solutions", href: "/solutions" },
  ],
  Platform: [
    { label: "CCTS Tracker", href: "/ccts-tracker" },
    { label: "Company Intelligence", href: "/company-intelligence" },
    { label: "Project Due Diligence", href: "/project-due-diligence" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Resources", href: "/resources" },
    { label: "Early Access", href: "/early-access" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4" data-testid="link-footer-logo">
              <img src="/logo-mark.png" alt="CarbonCounsel" className="h-9 w-auto brightness-200 invert" />
              <span className="text-lg font-bold text-white tracking-tight">CarbonCounsel</span>
            </Link>
            <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xs">
              AI-powered carbon market intelligence for India's new compliance economy and global carbon markets.
            </p>
            <div className="mt-6">
              <Link
                href="/early-access"
                data-testid="button-footer-early-access"
                className="inline-block px-4 py-2 text-sm font-semibold text-white bg-[#0B3D2E] rounded-md hover:bg-[#14532D] transition-colors"
              >
                Join Early Access
              </Link>
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-[#D1D5DB] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#1F2937]">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p className="text-[#6B7280] text-xs">
              &copy; {new Date().getFullYear()} CarbonCounsel. All rights reserved.
            </p>
            <p className="text-[#6B7280] text-xs max-w-xl leading-relaxed">
              CarbonCounsel provides research and intelligence support. It does not provide legal, financial, or investment advice unless separately agreed through qualified professionals.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
