import styled from "styled-components";
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

const EmptyState = styled.p`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
`;

// 設定Y軸刻度文字的寬度和換行
function CustomYAxisTick({ x, y, payload }) {
  return (
    <Text
      x={x}
      y={y}
      style={{ fontSize: "1.4rem" }}
      width={45}
      textAnchor="end"
      verticalAnchor="middle"
      breakAll
      maxLines={2}
    >
      {payload.value}
    </Text>
  );
}

// 今日熱銷餐點圖表
function TopDishesChart({ analyzedData }) {
  const { todayTopDishes } = analyzedData;

  if (todayTopDishes.length === 0)
    return <EmptyState>今日尚無任何訂單</EmptyState>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        layout="vertical"
        data={todayTopDishes}
        barSize={20}
        margin={{ top: 0, right: 15, bottom: 0, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          tick={{ fontSize: 12 }}
          domain={[
            0,
            (dataMax) => {
              const dynamicMax = Math.ceil(dataMax * 1.15);
              const minDisplayMax = 10;
              return Math.max(dynamicMax, minDisplayMax);
            },
          ]}
          unit="份"
          allowDecimals={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={<CustomYAxisTick />}
          width={55}
        />
        <Tooltip
          separator=""
          cursor={false}
          formatter={(value) => [` ${value} 份`, "今日銷售"]}
          viewBox={{ x: 0, y: 0, width: 10, height: 10 }}
        />
        <Bar
          dataKey="totalServings"
          fill="#3b82f6"
          activeBar={{ fill: "#1d4ed8" }}
          background
          label={{ fill: "#000", fontSize: 12, position: "right" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TopDishesChart;
