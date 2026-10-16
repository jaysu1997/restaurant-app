import styled from "styled-components";
import { MoveUp, MoveDown, Minus } from "lucide-react";

const trend = {
  up: "var(--color-success)",
  down: "var(--color-danger)",
  equal: "var(--color-text-placeholder)",
};

const Card = styled.article`
  min-width: 0;
  padding: var(--space-5);
  display: grid;
  grid-template-columns: 4rem minmax(0, 1fr);
  column-gap: var(--space-3);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
`;

const IconWrapper = styled.div`
  grid-row: 1 / 4;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  background-color: ${({ $iconStyle }) => $iconStyle.background};
  color: ${({ $iconStyle }) => $iconStyle.color};

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const Title = styled.h3`
  color: var(--color-text-tertiary);
  font-size: 1.3rem;
  font-weight: var(--font-weight-medium);
`;

const Value = styled.div`
  color: var(--color-text-strong);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Change = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: ${({ $changeType }) => trend[$changeType]};
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);

  svg {
    width: 1.3rem;
    height: 1.3rem;
    stroke-width: 2.8;
    flex-shrink: 0;
  }
`;

const Comparison = styled.span`
  color: var(--color-text-placeholder);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
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
