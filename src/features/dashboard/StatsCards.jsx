import styled from "styled-components";
import {
  LuClipboardList,
  LuCircleDollarSign,
  LuTrendingUpDown,
  LuMinus,
  LuTrophy,
  LuArrowBigDown,
  LuArrowBigUp,
} from "react-icons/lu";

const StyledStatsCardRow = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(15rem, 1fr));
  gap: 2.8rem;

  @media (max-width: 48em) {
    grid-template-columns: repeat(2, minmax(15rem, 1fr));
    gap: 2rem;
  }
`;

const StatCard = styled.article`
  border-radius: 6px;
  padding: 2rem;
  display: grid;
  grid-template-columns: auto 2rem;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  row-gap: 0.6rem;
  background-color: ${(props) => props.$bgColor};
  border: 1px solid ${(props) => props.$bgColor};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  align-items: center;
`;

const StatHeading = styled.h6`
  color: #6b7280;
  font-size: 1.3rem;
  font-weight: 500;
`;

const StatData = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;

  span {
    font-size: 1.8rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    flex-shrink: 0;
  }
`;

// 今日數據卡
function StatsCards({ analyzedData }) {
  const { todayOrderCounts, todayRevenue, todayRevenueTrend, todayTopDishes } =
    analyzedData;

  const statCardItems = [
    {
      heading: "今日訂單總數",
      value: todayOrderCounts,
      cardColor: "#dbeafe",
      iconColor: "#2563eb",
      icon: LuClipboardList,
    },
    {
      heading: "今日營收金額",
      value: `$ ${todayRevenue}`,
      cardColor: "#dcfce7",
      iconColor: "#16a34a",
      icon: LuCircleDollarSign,
    },
    {
      heading: "今日營收趨勢",
      value: `$ ${todayRevenueTrend}`,
      cardColor: "#f3e8ff",
      iconColor: "#9333ea",
      icon: LuTrendingUpDown,
    },
    {
      heading: "今日熱銷商品",
      value: todayTopDishes[0]?.name,
      cardColor: "#ffedd5",
      iconColor: "#ea580c",
      icon: LuTrophy,
    },
  ];

  return (
    <StyledStatsCardRow>
      {statCardItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <StatCard $bgColor={item.cardColor} key={index}>
            <StatHeading>{item.heading}</StatHeading>
            <Icon size={20} color={item.iconColor} />

            <StatData>
              <span>
                {!item.value && item.value !== 0 ? (
                  <>
                    <LuMinus size={24} />
                    <LuMinus size={24} />
                  </>
                ) : (
                  item.value
                )}
              </span>

              {item.heading === "今日營收趨勢" ? (
                todayRevenueTrend >= 0 ? (
                  <LuArrowBigUp color="#22c55e" fill="#22c55e" size={24} />
                ) : (
                  <LuArrowBigDown color="#f43f5e" fill="#f43f5e" size={24} />
                )
              ) : undefined}
            </StatData>
          </StatCard>
        );
      })}
    </StyledStatsCardRow>
  );
}

export default StatsCards;
