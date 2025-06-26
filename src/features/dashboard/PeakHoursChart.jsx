import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// 今日熱門時段圖表
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
          separator=""
          formatter={(value) => [` ${value} 筆訂單`, "總計建立"]}
          labelFormatter={(label) => {
            const hour = label.slice(0, -1);
            return `${hour}:00 ~ ${hour}:59`;
          }}
        />
        <Bar dataKey="totalOrders" fill="#0ea5e9" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PeakHoursChart;
