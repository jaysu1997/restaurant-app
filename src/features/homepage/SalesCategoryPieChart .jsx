import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 彩虹 6 色（紅、橙、黃、綠、藍、紫）— 去除靛色
const RAINBOW_COLORS = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#8B00FF",
];

const processData = (rawData) => {
  if (!rawData || rawData.length === 0) return [];

  const sorted = [...rawData].sort((a, b) => b.count - a.count);
  const top5 = sorted.slice(0, 5);
  const others = sorted.slice(5);

  if (others.length > 0) {
    const otherTotal = others.reduce((sum, item) => sum + item.count, 0);
    top5.push({ category: "其他", count: otherTotal });
  }

  return top5;
};

const SalesCategoryPieChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [chartWidth, setChartWidth] = useState(0);

  const containerRef = React.useRef(null);

  const processedData = processData(data);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setChartWidth(entry.contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const onPieEnter = (_, index) => setActiveIndex(index);
  const activeData = activeIndex !== null ? processedData[activeIndex] : null;

  return (
    <div style={{ width: "100%", height: 400 }} ref={containerRef}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={processedData}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={65} // 薄圓餅效果
            onMouseEnter={onPieEnter}
            onMouseLeave={() => setActiveIndex(null)}
            labelLine={true}
            label={({ category }) => (
              <text style={{ fontSize: 14 }}>{category}</text>
            )}
          >
            {processedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={RAINBOW_COLORS[index % RAINBOW_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} 份`]} />
          <Legend
            layout={chartWidth > 500 ? "vertical" : "horizontal"} // 當空間足夠顯示右側，否則下方
            verticalAlign={chartWidth > 500 ? "middle" : "bottom"}
            align={chartWidth > 500 ? "right" : "center"}
          />

          {/* 中心文字顯示懸浮資訊 */}
          {activeData && (
            <>
              <text
                x="50%"
                y="45%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={16}
                fill="#333"
              >
                {activeData.category}
              </text>
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={14}
                fill="#666"
              >
                {activeData.count} 份
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesCategoryPieChart;
