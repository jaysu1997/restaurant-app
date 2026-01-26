// ok
import styled from "styled-components";
import { Minus, ArrowBigDown, ArrowBigUp } from "lucide-react";

const StyledStatItem = styled.article`
  border-radius: 6px;
  padding: 2rem;
  display: grid;
  grid-template-columns: auto 2rem;
  grid-template-rows: auto auto;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.6rem;
  background-color: ${(props) => props.$bgColor};
  border: 1px solid ${(props) => props.$bgColor};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
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

function StatItem({ item }) {
  const Icon = item.icon;
  // 需要渲染趨勢icon
  const shouldShowTrend = item.trend != null;
  const trendDirection = item.trend > 0 ? "up" : item.trend < 0 ? "down" : null;

  return (
    <StyledStatItem $bgColor={item.cardColor}>
      <StatHeading>{item.heading}</StatHeading>
      <Icon className="icon-lg" color={item.iconColor} />

      <StatData>
        <span>
          {item.value === null ? (
            <>
              <Minus className="icon-xl" />
              <Minus className="icon-xl" />
            </>
          ) : (
            item.value
          )}
        </span>

        {shouldShowTrend && trendDirection === "up" && (
          <ArrowBigUp color="#22c55e" fill="#22c55e" className="icon-lg" />
        )}

        {shouldShowTrend && trendDirection === "down" && (
          <ArrowBigDown color="#f43f5e" fill="#f43f5e" className="icon-lg" />
        )}
      </StatData>
    </StyledStatItem>
  );
}

export default StatItem;
