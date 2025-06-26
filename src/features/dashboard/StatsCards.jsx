import styled from "styled-components";
import {
  LuReceiptText,
  LuBanknote,
  LuTrendingUpDown,
  LuFlame,
  LuMinus,
} from "react-icons/lu";
import {
  TbArrowBigUpLinesFilled,
  TbArrowBigDownLinesFilled,
} from "react-icons/tb";

const StyledStatsCardRow = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.8rem;
`;

const StatCard = styled.article`
  border-radius: 6px;
  padding: 2rem;
  display: grid;
  grid-template-areas:
    "icon heading"
    "icon value";
  grid-template-columns: 6rem 1fr;
  column-gap: 1.4rem;
  background-color: ${(props) => props.$bgColor};
`;

const StatIcon = styled.span`
  grid-area: icon;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  color: #fff;
  background-color: ${(props) => props.$bgColor || "inherit"};
  color: ${(props) => props.$iconColor || "#fff"};
`;

const StatHeading = styled.h6`
  grid-area: heading;
  color: #6b7280;
  font-size: 1.3rem;
  font-weight: 600;
  align-self: end;
`;

const StatData = styled.div`
  grid-area: value;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  max-width: 16.5rem;

  span {
    font-size: 2.2rem;
    font-weight: 700;
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

  const { trendValue, trendExtraIcon, trendExtraIconColor } = (() => {
    if (todayRevenueTrend === 0)
      return {
        trendValue: "無變化",
        trendExtraIcon: "",
        trendExtraIconColor: "",
      };

    const isPositive = todayRevenueTrend > 0;
    return {
      trendValue: `${isPositive ? "+" : "-"} $${Math.abs(todayRevenueTrend)}`,
      trendExtraIcon: isPositive
        ? TbArrowBigUpLinesFilled
        : TbArrowBigDownLinesFilled,
      trendExtraIconColor: isPositive ? "#22c55e" : "#f43f5e",
    };
  })();

  const statCardItems = [
    {
      heading: "今日訂單總數",
      value: todayOrderCounts,
      cardColor: "#dbeafe",
      iconColor: "#2563eb",
      icon: LuReceiptText,
      iconSize: 24,
    },
    {
      heading: "今日營收金額",
      value: `$ ${todayRevenue}`,
      cardColor: "#dcfce7",
      iconColor: "#16a34a",
      icon: LuBanknote,
      iconSize: 28,
    },
    {
      heading: "今日營收趨勢",
      value: trendValue,
      cardColor: "#f3e8ff",
      iconColor: "#9333ea",
      icon: LuTrendingUpDown,
      iconSize: 24,
      extraIcon: trendExtraIcon,
      extraIconColor: trendExtraIconColor,
    },
    {
      heading: "今日熱銷分類",
      value: todayTopDishes[0]?.name,
      cardColor: "#ffedd5",
      iconColor: "#ea580c",
      icon: LuFlame,
      iconSize: 24,
    },
  ];

  return (
    <StyledStatsCardRow>
      {statCardItems.map((item, index) => {
        const Icon = item.icon;
        const ExtraIcon = item?.extraIcon;

        return (
          <StatCard $bgColor={item.cardColor} key={index}>
            <StatIcon $bgColor={item.iconColor}>
              <Icon size={item.iconSize} />
            </StatIcon>
            <StatHeading>{item.heading}</StatHeading>
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

              {item?.extraIcon && (
                <StatIcon $iconColor={item.extraIconColor}>
                  <ExtraIcon size={24} />
                </StatIcon>
              )}
            </StatData>
          </StatCard>
        );
      })}
    </StyledStatsCardRow>
  );
}

export default StatsCards;
