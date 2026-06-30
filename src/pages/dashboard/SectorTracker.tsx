import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import HeatmapChart from "@/components/charts/HeatmapChart";
import { Badge } from "@/components/ui/badge";

export default function SectorTracker() {
  const { data: emissions, isLoading: emissionsLoading } = useQuery({
    queryKey: ["/api/sector-emissions"],
  });

  const { data: sectors, isLoading: sectorsLoading } = useQuery({
    queryKey: ["/api/ccts/sectors"],
  });

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-2">CCTS Sector Tracker</h1>
        <p className="text-slate-500 font-light">Exposure mapping and emissions baselines for obligated sectors.</p>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-6 overflow-hidden">
        {/* Left Col: Heatmap */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-medium text-slate-900">Sectoral Risk Heatmap</h2>
            <div className="flex gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-red-400"></div> High Risk</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-amber-400"></div> Medium Risk</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-400"></div> Low Risk</span>
            </div>
          </div>
          <div className="flex-1 p-6">
            {emissionsLoading ? (
              <Skeleton className="w-full h-full rounded-md" />
            ) : (
              <HeatmapChart data={emissions?.data || []} />
            )}
          </div>
        </div>

        {/* Right Col: Details */}
        <div className="col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-medium text-slate-900">Obligated Sectors</h2>
          </div>
          <div className="flex-1 overflow-auto p-0">
            {sectorsLoading ? (
              <div className="p-6 space-y-4">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {sectors?.sectors?.map((s: any, i: number) => (
                  <div key={i} className="p-6 hover:bg-slate-50/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-slate-900">{s.name}</h3>
                      <Badge variant="outline" className={
                        s.cctsPhase === "Phase I" ? "border-red-200 text-red-700 bg-red-50" : "border-amber-200 text-amber-700 bg-amber-50"
                      }>
                        {s.cctsPhase}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{s.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="block text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Baseline Indicator</span>
                        <span className="font-mono text-slate-700">{s.geiBaseline}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">CBAM Overlap</span>
                        <span className="font-medium text-slate-700">{s.cbamExposure ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
