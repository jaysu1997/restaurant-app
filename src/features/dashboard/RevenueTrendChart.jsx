import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "12/12", count: 200000 },
  { date: "12/13", count: 35 },
  { date: "12/14", count: 30 },
  { date: "12/15", count: 42 },
  { date: "12/16", count: 25 },
  { date: "12/17", count: 28 },
  { date: "12/18", count: 34 },
];

function RevenueTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 0, right: 15, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" interval={0} tick={{ fontSize: 12 }} />
        <YAxis width={55} tick={{ fontSize: 14 }} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorCount)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default RevenueTrendChart;
