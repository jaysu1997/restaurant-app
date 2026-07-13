// ok
import styled from "styled-components";
import useSettings from "../../../context/settings/useSettings";

const Badge = styled.div`
  cursor: default;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1.2rem;
  font-weight: 500;
  font-size: 1.4rem;
  border-radius: 999px;
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
  font-size: 1.2rem;
  /* font-weight: 400; */
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
    indicator: "#9ca3af",
    bgColor: "#e5e7eb",
    color: "#6b7280",
  },
  unknown: {
    text: "未取得",
    indicator: "#fb923c",
    bgColor: "#e5e7eb",
    color: "#6b7280",
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
