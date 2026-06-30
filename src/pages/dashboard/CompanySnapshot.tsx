import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompanySnapshot() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/companies"],
  });

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-2">Company Exposure Snapshot</h1>
        <p className="text-slate-500 font-light">BRSR/Annual Report integrated data layer mapping Scope 1/2 baselines against CCTS.</p>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/50 text-slate-500 font-medium border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Entity</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Sector</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Scope 1 (MT)</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">GEI Performance</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">CCTS Obligation</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">CBAM Risk</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">Exposure Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                [...Array(10)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-16" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-20" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-20" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-12" /></td>
                    <td className="px-6 py-4 text-right"><Skeleton className="h-5 w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : (
                data?.companies?.map((company: any) => (
                  <tr key={company.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{company.name}</div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">NSE: {company.nseSymbol}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{company.sector}</td>
                    <td className="px-6 py-4 font-mono text-slate-700">{company.scope1}</td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900 font-medium">{company.geiPerformance}</div>
                      <div className="text-xs text-slate-400">{company.geiUnit}</div>
                    </td>
                    <td className="px-6 py-4">
                      {company.cctsCovered ? (
                        <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50 rounded-sm">Covered</Badge>
                      ) : (
                        <Badge variant="outline" className="border-slate-200 text-slate-500 bg-slate-50 rounded-sm">Exempt</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {company.cbamExposed ? (
                        <span className="text-red-500 font-medium">Yes</span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {company.riskLevel === "High" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-50 text-red-700 font-medium text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> High
                        </span>
                      ) : company.riskLevel === "Medium" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 font-medium text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Medium
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-medium text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Low
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
