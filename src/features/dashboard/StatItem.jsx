// ok
import styled from "styled-components";
import { Minus, ArrowBigDown, ArrowBigUp } from "lucide-react";

const StyledStatItem = styled.article`
  border-radius: 6px;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.6rem;
  background-color: ${(props) => props.$bgColor};
  border: 1px solid ${(props) => props.$bgColor};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);

  svg {
    width: 2rem;
    height: 2rem;
  }
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
`;

function StatItem({ item }) {
  const { icon: Icon, iconColor, trend, cardColor, heading, value } = item;
  const shouldShowTrend = trend != null;
  const trendDirection = trend > 0 ? "up" : trend < 0 ? "down" : null;

  return (
    <StyledStatItem $bgColor={cardColor}>
      <StatHeading>{heading}</StatHeading>
      <Icon color={iconColor} />

      <StatData>
        <span>
          {value === null ? (
            <>
              <Minus />
              <Minus />
            </>
          ) : (
            value
          )}
        </span>

        {shouldShowTrend && trendDirection === "up" && (
          <ArrowBigUp color="#22c55e" fill="#22c55e" />
        )}

        {shouldShowTrend && trendDirection === "down" && (
          <ArrowBigDown color="#f43f5e" fill="#f43f5e" />
        )}
      </StatData>
    </StyledStatItem>
  );
}

export default StatItem;
