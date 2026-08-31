import styled from "styled-components";

const Footer = styled.footer`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 7.2rem;
  border-top: 1px solid #f3f4f6;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 2rem;

  &:first-child {
    border-right: 1px solid #f1f2f4;
  }
`;

const StatTitle = styled.span`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  color: #6b7280;
  font-size: 1.2rem;
  font-weight: 500;

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const StatValue = styled.strong`
  color: #111827;
  font-size: 1.6rem;
  font-weight: 700;
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
