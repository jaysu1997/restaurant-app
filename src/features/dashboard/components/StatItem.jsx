// ok
import styled from "styled-components";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

const StyledStatItem = styled.article`
  border-radius: 6px;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 2.4rem;
  align-items: center;
  column-gap: 0rem;
  row-gap: 1.2rem;
  background-color: ${({ $cardStyle }) => $cardStyle.bg};
  border: 1px solid ${({ $cardStyle }) => $cardStyle.border};
`;

const StatHeading = styled.h6`
  color: #6b7280;
  font-size: 1.3rem;
  font-weight: 500;
`;

const StatValue = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;

  span {
    display: flex;
    font-size: 2rem;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #111827;
  }
`;

function StatItem({ stat }) {
  const { icon: Icon, cardStyle, trend, iconStyle, heading, value } = stat;
  const isPositive = trend > 0;
  const isNegative = trend < 0;

  return (
    <StyledStatItem $cardStyle={cardStyle}>
      <StatHeading>{heading}</StatHeading>
      <Icon color={iconStyle} />

      <StatValue>
        {isPositive && <ArrowBigUp color="#22c55e" fill="#22c55e" />}
        {isNegative && <ArrowBigDown color="#f43f5e" fill="#f43f5e" />}

        <span>{value}</span>
      </StatValue>
    </StyledStatItem>
  );
}

export default StatItem;
