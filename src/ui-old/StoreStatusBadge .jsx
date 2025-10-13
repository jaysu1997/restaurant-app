import styled from "styled-components";

const BadgeWrapper = styled.div`
  position: relative;
  font-size: 1.4rem;

  &:hover > div:last-child {
    opacity: 1;
    transform: translateY(1rem);
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1.2rem;
  font-weight: 500;
  border-radius: 999px;
  background-color: ${({ $isBusinessDay }) =>
    $isBusinessDay ? "#d1fae5" : "#e5e7eb"};
  color: ${({ $isBusinessDay }) => ($isBusinessDay ? "#047857" : "#6b7280")};

  @media (max-width: 480px) {
    font-size: 1.3rem;
    padding: 0.3rem 1rem;
  }
`;

const Indicator = styled.span`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${({ $isBusinessDay }) =>
    $isBusinessDay ? "#10b981" : "#9ca3af"};
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: -100%;
  right: 0px;
  background-color: #111827;
  color: white;
  font-size: 1.2rem;
  padding: 0.6rem 1rem;
  border-radius: 2px;
  white-space: nowrap;
  opacity: 0;
  transition: all 0.2s ease;
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    right: 10px;
    border-width: 6px;
    border-style: solid;
    border-color: transparent transparent #111827 transparent;
  }
`;

// 當前營業狀態ui與tooltip
function StoreStatusBadge({ isOpenNow = false, tooltip = "今日公休" }) {
  return (
    <BadgeWrapper>
      <Badge $isBusinessDay={isOpenNow}>
        <Indicator $isBusinessDay={isOpenNow} />
        {isOpenNow ? "營業中" : "休息中"}
      </Badge>
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
    </BadgeWrapper>
  );
}

export default StoreStatusBadge;
