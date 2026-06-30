import { Link, useLocation } from "wouter";
import { Activity, Briefcase, FileText, Bot, ShieldAlert } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { name: "Regulatory Feed", href: "/dashboard/regulatory", icon: FileText },
    { name: "Sector Tracker", href: "/dashboard/sectors", icon: Activity },
    { name: "Company Snapshot", href: "/dashboard/companies", icon: Briefcase },
    { name: "CarbonCounsel AI", href: "/dashboard/ai", icon: Bot },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-slate-900 p-1.5 rounded-sm group-hover:bg-green-700 transition-colors">
                <ShieldAlert className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-lg tracking-tight">CarbonCounsel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                    isActive
                      ? "bg-slate-100 text-slate-900 font-medium"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-green-600" : "text-slate-400"}`} />
                  <span className="text-sm">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="text-xs text-slate-400 font-medium tracking-wide uppercase mb-3">Intelligence Status</div>
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>BEE Live Feed Active</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>EU CBAM Sync Active</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-50/50">
        <div className="p-8 max-w-7xl mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
