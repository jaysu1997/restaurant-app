import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

// 模擬 24 小時資料
const data = [
  {
    hour: "0:00",
    orders: 16,
  },
  {
    hour: "1:00",
    orders: 19,
  },
  {
    hour: "2:00",
    orders: 3,
  },
  {
    hour: "3:00",
    orders: 0,
  },
  {
    hour: "4:00",
    orders: 1,
  },
  {
    hour: "5:00",
    orders: 3,
  },
  {
    hour: "6:00",
    orders: 2,
  },
  {
    hour: "7:00",
    orders: 9,
  },
  {
    hour: "8:00",
    orders: 11,
  },
  {
    hour: "9:00",
    orders: 5,
  },
  {
    hour: "10:00",
    orders: 18,
  },
  {
    hour: "11:00",
    orders: 15,
  },
  {
    hour: "12:00",
    orders: 8,
  },
  {
    hour: "13:00",
    orders: 7,
  },
  {
    hour: "14:00",
    orders: 12,
  },
  {
    hour: "15:00",
    orders: 12,
  },
  {
    hour: "16:00",
    orders: 1,
  },
  {
    hour: "17:00",
    orders: 0,
  },
  {
    hour: "18:00",
    orders: 5,
  },
  {
    hour: "19:00",
    orders: 16,
  },
  {
    hour: "20:00",
    orders: 18,
  },
  {
    hour: "21:00",
    orders: 14,
  },
  {
    hour: "22:00",
    orders: 16,
  },
  {
    hour: "23:00",
    orders: 5,
  },
];

function PeakHoursChart() {
  return (
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
        <YAxis allowDecimals={false} width={55} tick={{ fontSize: 14 }} />
        <Tooltip
          formatter={(value) => [`${value} 筆訂單`, "時段"]}
          labelFormatter={(label) => `時間：${label}`}
        />
        <Bar dataKey="orders" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PeakHoursChart;
