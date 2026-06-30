import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Clock, AlertTriangle, FileText } from "lucide-react";

export default function RegulatoryFeed() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/feed"],
  });

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-2">Regulatory Intelligence Feed</h1>
        <p className="text-slate-500 font-light">Real-time compilation of CCTS, CBAM, and Article 6 notifications.</p>
      </div>

      <div className="flex-1 overflow-auto bg-white rounded-xl border border-slate-200 shadow-sm">
        {isLoading ? (
          <div className="p-6 space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data?.feed?.map((item: any, i: number) => (
              <div key={i} className="p-6 hover:bg-slate-50/50 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {item.urgency === "High" ? (
                      <div className="bg-red-100 text-red-600 p-2 rounded-md">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                    ) : item.category === "Regulatory" ? (
                      <div className="bg-slate-100 text-slate-600 p-2 rounded-md">
                        <FileText className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="bg-blue-100 text-blue-600 p-2 rounded-md">
                        <Clock className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                          {item.source}
                        </span>
                        {item.urgency === "High" && (
                          <Badge variant="destructive" className="bg-red-500/10 text-red-700 hover:bg-red-500/20 border-0 rounded-sm">Critical</Badge>
                        )}
                        {item.type === "scraped" && (
                          <Badge variant="outline" className="text-slate-500 border-slate-200 rounded-sm">Automated Fetch</Badge>
                        )}
                      </div>
                      <span className="text-sm text-slate-400 font-mono">{item.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-slate-900 mb-2 leading-tight group-hover:text-green-700 transition-colors">
                      {item.title}
                    </h3>
                    
                    {(item.body || item.excerpt || item.summary) && (
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {item.body || item.excerpt || item.summary}
                      </p>
                    )}
                    
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        View Official Document
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {(!data?.feed || data.feed.length === 0) && (
              <div className="p-12 text-center text-slate-500">
                No recent regulatory updates found in the intelligence graph.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
