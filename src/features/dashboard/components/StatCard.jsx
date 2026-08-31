import styled from "styled-components";
import { MoveUp, MoveDown, Minus } from "lucide-react";

const trend = {
  up: "#16a34a",
  down: "#dc2626",
  equal: "#9ca3af",
};

const Card = styled.article`
  min-width: 0;
  padding: 2rem;
  display: grid;
  grid-template-columns: 4rem minmax(0, 1fr);
  column-gap: 1.2rem;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
`;

const IconWrapper = styled.div`
  grid-row: 1 / 4;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({ $iconStyle }) => $iconStyle.background};
  color: ${({ $iconStyle }) => $iconStyle.color};

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const Title = styled.h3`
  color: #4b5563;
  font-size: 1.3rem;
  font-weight: 500;
`;

const Value = styled.div`
  color: #111827;
  font-size: 2.4rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Change = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ $changeType }) => trend[$changeType]};
  font-size: 1.2rem;
  font-weight: 500;

  svg {
    width: 1.3rem;
    height: 1.3rem;
    stroke-width: 2.8;
    flex-shrink: 0;
  }
`;

const Comparison = styled.span`
  color: #9ca3af;
  font-size: 1.2rem;
  font-weight: 500;
`;

function StatCard({ stat }) {
  const { title, value, iconStyle, icon: Icon, change, formatter } = stat;
  const changeType = change > 0 ? "up" : change < 0 ? "down" : "equal";
  const formattedValue = formatter(value);
  const formattedChange = formatter(Math.abs(change));

  return (
    <Card>
      <IconWrapper $iconStyle={iconStyle}>
        <Icon />
      </IconWrapper>

      <Title>{title}</Title>

      <Value>{formattedValue}</Value>

      <Change $changeType={changeType}>
        {changeType === "up" && <MoveUp />}
        {changeType === "down" && <MoveDown />}
        {changeType === "equal" && <Minus />}

        <span>{changeType === "equal" ? "與昨日持平" : formattedChange}</span>

        {changeType !== "equal" && <Comparison>vs 昨日</Comparison>}
      </Change>
    </Card>
  );
}

export default StatCard;
