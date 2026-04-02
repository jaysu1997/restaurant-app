// ok
import styled from "styled-components";
import {
  ClipboardList,
  CircleDollarSign,
  TrendingUpDown,
  Trophy,
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
  const { todayOrderCounts, todayRevenue, todayRevenueTrend, todayTopDishes } =
    analyzedData;

  const stats = [
    {
      heading: "今日訂單總數",
      value: todayOrderCounts,
      cardColor: "#dbeafe",
      iconColor: "#2563eb",
      icon: ClipboardList,
      trend: null,
    },
    {
      heading: "今日營收金額",
      value: `$ ${todayRevenue}`,
      cardColor: "#dcfce7",
      iconColor: "#16a34a",
      icon: CircleDollarSign,
      trend: null,
    },
    {
      heading: "今日營收趨勢",
      value: `$ ${todayRevenueTrend}`,
      cardColor: "#f3e8ff",
      iconColor: "#9333ea",
      icon: TrendingUpDown,
      trend: todayRevenueTrend,
    },
    {
      heading: "今日熱銷商品",
      value: todayTopDishes.length === 0 ? null : todayTopDishes[0].name,
      cardColor: "#ffedd5",
      iconColor: "#ea580c",
      icon: Trophy,
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
