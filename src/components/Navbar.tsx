import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Product", href: "/product" },
  { label: "Solutions", href: "/solutions" },
  { label: "CCTS Tracker", href: "/ccts-tracker" },
  { label: "Company Intelligence", href: "/company-intelligence" },
  { label: "Project Due Diligence", href: "/project-due-diligence" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-[#E5E7EB]" : "bg-white/90 backdrop-blur-sm border-b border-[#E5E7EB]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" data-testid="link-logo">
            <img
              src="/logo-mark.png"
              alt="CarbonCounsel"
              className="h-10 w-10 object-contain"
            />
            <span className="text-[#0B3D2E] font-bold text-lg tracking-tight hidden sm:block">
              Carbon<span className="text-[#22C55E]">Counsel</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  location === link.href
                    ? "text-[#0B3D2E] bg-[#A7F3D0]/30"
                    : "text-[#374151] hover:text-[#0B3D2E] hover:bg-[#F8FAF7]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/early-access"
              data-testid="button-early-access-nav"
              className="px-4 py-2 text-sm font-semibold text-white bg-[#0B3D2E] rounded-md hover:bg-[#14532D] transition-colors"
            >
              Early Access
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-[#374151] hover:text-[#0B3D2E] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#E5E7EB] shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="block px-3 py-2.5 text-sm font-medium text-[#374151] hover:text-[#0B3D2E] hover:bg-[#F8FAF7] rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#E5E7EB]">
              <Link
                href="/early-access"
                data-testid="button-mobile-early-access"
                className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-[#0B3D2E] rounded-md hover:bg-[#14532D] transition-colors"
              >
                Early Access
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
