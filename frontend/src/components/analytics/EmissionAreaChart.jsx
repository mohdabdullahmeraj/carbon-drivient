import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function EmissionAreaChart({ data }) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#4CAF50" stopOpacity={0.8} />
              <stop offset="90%" stopColor="#4CAF50" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="emissions"
            stroke="#2e7d32"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCo2)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
