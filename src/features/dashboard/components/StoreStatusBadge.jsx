import styled from "styled-components";
import useSettings from "../../../context/settings/useSettings";

const BadgeWrapper = styled.div`
  position: relative;
`;

const Badge = styled.div`
  cursor: default;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1.2rem;
  font-weight: 500;
  font-size: 1.4rem;
  border-radius: 999px;
  background-color: ${({ $isOpen }) => ($isOpen ? "#d1fae5" : "#e5e7eb")};
  color: ${({ $isOpen }) => ($isOpen ? "#047857" : "#6b7280")};

  &:hover + div {
    opacity: 1;
    transform: translateY(1rem);
  }
`;

const Indicator = styled.span`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: ${({ $isOpen }) => ($isOpen ? "#10b981" : "#9ca3af")};
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: -100%;
  right: 0px;
  z-index: 1;
  background-color: #111827;
  color: white;
  font-size: 1.2rem;
  padding: 0.6rem 1rem;
  border-radius: 2px;
  white-space: nowrap;
  user-select: none;

  opacity: 0;
  transition:
    transform 0.6s ease,
    opacity 0.3s ease;

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

const statusBadge = {
  open: "營業中",
  closed: "休息中",
  unknown: "未取得",
};

// 當前營業狀態ui與tooltip
function StoreStatusBadge() {
  const { openStatus } = useSettings();
  const { status, tooltip } = openStatus;

  const isOpen = status === "open";

  return (
    <BadgeWrapper>
      <Badge $isOpen={isOpen}>
        <Indicator $isOpen={isOpen} />
        <span>{statusBadge[status]}</span>
      </Badge>
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
    </BadgeWrapper>
  );
}

export default StoreStatusBadge;
