import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RevenueTrendChart({ analyzedData }) {
  const { last7DaysStats } = analyzedData;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={last7DaysStats}
        margin={{ top: 0, right: 15, bottom: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          interval={0}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => {
            const day = value.slice(8);
            return `${day}日`;
          }}
        />
        <YAxis width={55} tick={{ fontSize: 14 }} unit="$" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          separator=""
          formatter={(value) => [` ${value} 元`, "當日營收"]}
        />
        <Area
          type="monotone"
          dataKey="totalRevenue"
          stroke="#8b5cf6"
          fillOpacity={0.5}
          fill="url(#colorCount)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default RevenueTrendChart;
