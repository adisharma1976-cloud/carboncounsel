import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = {
  High: "#f87171", // red-400
  Medium: "#fbbf24", // amber-400
  Low: "#34d399", // emerald-400
  Stable: "#94a3b8", // slate-400
};

const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, payload, colors, rank, name, value, risk } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? COLORS[risk as keyof typeof COLORS] || COLORS.Stable : "none",
          stroke: "#fff",
          strokeWidth: 2,
          strokeOpacity: 1,
        }}
      />
      {width > 50 && height > 30 ? (
        <text x={x + 8} y={y + 18} fill="#fff" fontSize={13} fontWeight="500" className="drop-shadow-sm">
          {name}
        </text>
      ) : null}
      {width > 50 && height > 50 ? (
        <text x={x + 8} y={y + 36} fill="#fff" fillOpacity={0.8} fontSize={12} className="drop-shadow-sm">
          {value} MT
        </text>
      ) : null}
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-slate-200 p-3 rounded-md shadow-sm">
        <p className="font-semibold text-slate-900 mb-1">{data.name}</p>
        <p className="text-sm text-slate-600">Emissions: {data.value} MT CO₂e</p>
        <p className="text-sm text-slate-600">Risk Level: {data.risk}</p>
        <p className="text-sm text-slate-600">Trend: <span className="capitalize">{data.trend}</span></p>
      </div>
    );
  }
  return null;
};

export default function HeatmapChart({ data }: { data: any[] }) {
  // Format data for Treemap
  const treeData = [
    {
      name: "Sectors",
      children: data.map(d => ({
        name: d.sector,
        size: d.emissions,
        value: d.emissions,
        risk: d.emissions > 200 ? "High" : d.emissions > 100 ? "Medium" : "Low",
        trend: d.trend
      }))
    }
  ];

  return (
    <div className="h-full w-full min-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={treeData}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="#fff"
          content={<CustomizedContent />}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
