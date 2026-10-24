import styled from "styled-components";
import StatCard from "./StatCard";
import { ClipboardList, Calculator, DollarSign, Utensils } from "lucide-react";

const StyledStatsCards = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-7);

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
      iconStyle: {
        color: "var(--color-info)",
        background: "var(--color-brand-subtle)",
      },
      icon: ClipboardList,
      change: growth.orderCount,
      formatter: (value) => `${value} 筆`,
    },
    {
      title: "今日營收",
      value: todayStat.revenue,
      iconStyle: {
        color: "var(--color-success)",
        background: "var(--color-success-subtle)",
      },
      icon: DollarSign,
      change: growth.revenue,
      formatter: (value) => `$${value.toLocaleString("zh-TW")}`,
    },
    {
      title: "內用訂單占比",
      value: todayStat.dineInRate,
      iconStyle: {
        color: "#f97316",
        background: "var(--color-warning-subtle)",
      },
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
      formatter: (value) =>
        `$${Number(value.toFixed(1)).toLocaleString("zh-TW")}`,
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
