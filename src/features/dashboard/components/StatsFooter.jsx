import styled from "styled-components";

const Footer = styled.footer`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 7.2rem;
  border-top: 1px solid var(--color-surface-subtle);
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--space-3) var(--space-5);

  &:first-child {
    border-right: 1px solid #f1f2f4;
  }
`;

const StatTitle = styled.span`
  display: flex;
  gap: var(--space-1);
  align-items: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const StatValue = styled.strong`
  color: var(--color-text-strong);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
`;

function StatsFooter({ stats }) {
  return (
    <Footer>
      {stats.map(({ icon, label, value }) => (
        <Stat key={label}>
          <StatTitle>
            {icon}
            {label}
          </StatTitle>
          <StatValue>{value}</StatValue>
        </Stat>
      ))}
    </Footer>
  );
}

export default StatsFooter;
