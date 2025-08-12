import styled from "styled-components";

export const BadgeWrapper = styled.div`
  display: inline-block;
  position: relative;
  font-size: 14px;
`;

export const TooltipWrapper = styled.div`
  position: relative;

  &:hover > div:last-child {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-weight: 500;
  border-radius: 999px;
  background-color: ${({ $isBusinessDay }) =>
    $isBusinessDay ? "#d1fae5" : "#e5e7eb"};
  color: ${({ $isBusinessDay }) => ($isBusinessDay ? "#047857" : "#6b7280")};
  cursor: default;

  svg {
    stroke: currentColor;
    width: 16px;
    height: 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 3px 8px;
  }
`;

export const Indicator = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background-color: ${({ $isBusinessDay }) =>
    $isBusinessDay ? "#10b981" : "#9ca3af"};
`;

export const Tooltip = styled.div`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  background-color: #111827;
  color: white;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -6px;
    border-width: 6px;
    border-style: solid;
    border-color: #111827 transparent transparent transparent;
  }
`;

function StoreStatusBadge({ isOpenNow = true, tooltip = "10:00" }) {
  return (
    <BadgeWrapper>
      <TooltipWrapper>
        <Badge $isBusinessDay={isOpenNow}>
          <Indicator $isBusinessDay={isOpenNow} />
          {isOpenNow ? "營業中" : "休息中"}
        </Badge>
        {tooltip && <Tooltip>{tooltip}</Tooltip>}
      </TooltipWrapper>
    </BadgeWrapper>
  );
}

export default StoreStatusBadge;
