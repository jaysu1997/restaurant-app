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
  console.log(analyzedData);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={last7DaysStats}
        margin={{ top: 0, right: 15, bottom: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" interval={0} tick={{ fontSize: 12 }} />
        <YAxis width={55} tick={{ fontSize: 14 }} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="totalRevenue"
          stroke="#8884d8"
          fillOpacity={0.5}
          fill="url(#colorCount)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default RevenueTrendChart;
