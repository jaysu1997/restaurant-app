// ok
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import SectionContainer from "../../../ui/SectionContainer";

// 今日熱門時段圖表
function PeakHoursChart({ data }) {
  return (
    <SectionContainer title="今日熱門時段">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          barCategoryGap="25%"
          margin={{ top: 0, right: 15, bottom: 0, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="hour"
            interval="equidistantPreserveStart"
            tick={{ fontSize: 12 }}
          />
          <YAxis width={55} allowDecimals={false} tick={{ fontSize: 12 }} />
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
    </SectionContainer>
  );
}

export default PeakHoursChart;
