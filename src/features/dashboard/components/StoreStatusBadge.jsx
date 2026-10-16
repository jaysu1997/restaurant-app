// ok
import styled from "styled-components";
import useSettings from "../../../context/settings/useSettings";

const Badge = styled.div`
  cursor: default;
  display: inline-flex;
  align-items: center;
  gap: var(--space-1-5);
  padding: var(--space-1) var(--space-3);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-full);
  color: ${({ $color }) => $color};
  background-color: ${({ $bgColor }) => $bgColor};
`;

const Indicator = styled.span`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: ${({ $indicator }) => $indicator};
`;

const Detail = styled.span`
  font-size: var(--font-size-xs);
  /* font-weight: var(--font-weight-regular); */
  opacity: 0.85;
`;

const storeStatusConfig = {
  open: {
    text: "營業中",
    indicator: "#10b981",
    bgColor: "#d1fae5",
    color: "#047857",
  },
  break: {
    text: "休息中",
    indicator: "var(--color-text-placeholder)",
    bgColor: "var(--color-border)",
    color: "var(--color-text-muted)",
  },
  unknown: {
    text: "未取得",
    indicator: "#fb923c",
    bgColor: "var(--color-border)",
    color: "var(--color-text-muted)",
  },
};

// 當前營業狀態ui與tooltip
function StoreStatusBadge() {
  const { openStatus } = useSettings();
  const { status, detail } = openStatus;
  const { text, indicator, bgColor, color } =
    storeStatusConfig[status] ?? storeStatusConfig.unknown;

  return (
    <Badge $color={color} $bgColor={bgColor}>
      <Indicator $indicator={indicator} />
      <span>{text}</span>
      {detail && <Detail>{detail}</Detail>}
    </Badge>
  );
}

export default StoreStatusBadge;
