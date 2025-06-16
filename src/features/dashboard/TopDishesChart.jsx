import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Text,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "經典gfhrfhjfkj fhfh", value: 100, amount: 10000 },
  { name: "", value: "", amount: 18 },
  { name: "綜合拼餐", value: 120, amount: 12 },
  { name: "漢堡漢堡漢堡", value: 240, amount: 24000 },
  { name: "飲料", value: 90, amount: 9 },
];

function CustomYAxisTick({ x, y, payload }) {
  return (
    <Text
      x={x}
      y={y}
      style={{ fontSize: "1.4rem" }}
      width={45} // 設定寬度，超出時自動換行
      textAnchor="end"
      verticalAnchor="middle"
      breakAll // 允許在任意字元處換行，適用於中文
      maxLines={2} // 限制最多顯示的行數，超出時顯示省略號
    >
      {payload.value}
    </Text>
  );
}

function TopDishesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        layout="vertical"
        data={data}
        barSize={20}
        margin={{ top: 0, right: 15, bottom: 0, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis
          type="category"
          dataKey="name"
          tick={<CustomYAxisTick />}
          width={55}
        />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TopDishesChart;
