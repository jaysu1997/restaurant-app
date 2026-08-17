// ok
import styled from "styled-components";
import {
  ClipboardList,
  CircleDollarSign,
  TrendingUpDown,
  Calculator,
} from "lucide-react";
import StatItem from "./StatItem";

const StyledStatsCards = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(15rem, 1fr));
  gap: 2.8rem;

  @media (max-width: 48em) {
    grid-template-columns: repeat(2, minmax(15rem, 1fr));
    gap: 2rem;
  }
`;

// 今日數據卡
function StatsCards({ analyzedData }) {
  const {
    todayOrderCount,
    todayRevenue,
    todayRevenueTrend,
    averageOrderValue,
  } = analyzedData;

  console.log(todayOrderCount);

  const stats = [
    {
      heading: "今日訂單總數",
      value: todayOrderCount,
      cardStyle: { bg: "#eff6ff", border: "#bfdbfe" },
      iconStyle: "#2563eb",
      icon: ClipboardList,
      trend: null,
    },
    {
      heading: "今日營收金額",
      value: `$ ${todayRevenue}`,
      cardStyle: { bg: "#f0fdf4", border: "#bbf7d0" },
      iconStyle: "#16a34a",
      icon: CircleDollarSign,
      trend: null,
    },
    {
      heading: "今日營收變化",
      value: `${Math.abs(Number(todayRevenueTrend.toFixed(1)))}%`,
      cardStyle: { bg: "#faf5ff", border: "#e9d5ff" },
      iconStyle: "#9333ea",
      icon: TrendingUpDown,
      trend: todayRevenueTrend,
    },
    {
      heading: "訂單平均營收",
      value: `$ ${Math.round(averageOrderValue)}`,
      cardStyle: { bg: "#fff7ed", border: "#fed7aa" },
      iconStyle: "#ea580c",
      icon: Calculator,
      trend: null,
    },
  ];

  return (
    <StyledStatsCards>
      {stats.map((stat) => (
        <StatItem stat={stat} key={stat.heading} />
      ))}
    </StyledStatsCards>
  );
}

export default StatsCards;
