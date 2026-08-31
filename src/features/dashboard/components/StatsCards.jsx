// ok
import styled from "styled-components";
import StatCard from "./StatCard";
import { ClipboardList, Calculator, DollarSign, Utensils } from "lucide-react";

const StyledStatsCards = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2.8rem;

  @media (max-width: 64em) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 30em) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

// 今日數據卡
function StatsCards({ analyzedData }) {
  const { todayStat, growth } = analyzedData;

  const stats = [
    {
      title: "今日訂單",
      value: todayStat.orderCount,
      iconStyle: { color: "#3b82f6", background: "#eff6ff" },
      icon: ClipboardList,
      change: growth.orderCount,
      formatter: (value) => `${value} 筆`,
    },
    {
      title: "今日營收",
      value: todayStat.revenue,
      iconStyle: { color: "#16a34a", background: "#f0fdf4" },
      icon: DollarSign,
      change: growth.revenue,
      formatter: (value) => `$${value}`,
    },
    {
      title: "內用訂單占比",
      value: todayStat.dineInRate,
      iconStyle: { color: "#f97316", background: "#fff7ed" },
      icon: Utensils,
      change: growth.dineInRate,
      formatter: (value) => `${Number(value.toFixed(1))}%`,
    },
    {
      title: "訂單平均營收",
      value: todayStat.averageOrderRevenue,
      iconStyle: { color: "#8b5cf6", background: "#f5f3ff" },
      icon: Calculator,
      change: growth.averageOrderRevenue,
      formatter: (value) => `$${Number(value.toFixed(1))}`,
    },
  ];

  return (
    <StyledStatsCards>
      {stats.map((stat) => (
        <StatCard key={stat.title} stat={stat} />
      ))}
    </StyledStatsCards>
  );
}

export default StatsCards;
