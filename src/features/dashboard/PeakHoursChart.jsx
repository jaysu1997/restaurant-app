import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function PeakHoursChart({ analyzedData }) {
  const { hourlyOrderCounts } = analyzedData;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={hourlyOrderCounts}
        barCategoryGap="25%"
        margin={{ top: 0, right: 15, bottom: 0, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="hour"
          interval="equidistantPreserveStart"
          tick={{ fontSize: 12 }}
        />
        <YAxis allowDecimals={false} width={55} tick={{ fontSize: 14 }} />
        <Tooltip
          payload={[{ hour: hourlyOrderCounts.hour, value: 12, unit: "kg" }]}
        />
        <Bar dataKey="totalOrders" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PeakHoursChart;
