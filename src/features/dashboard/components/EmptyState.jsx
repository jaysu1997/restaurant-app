// ok
import { ClipboardX } from "lucide-react";
import styled from "styled-components";

const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 36rem;
  padding: 2.4rem;
  gap: 1.2rem;
`;

const EmptyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  color: #9ca3af;
  background-color: #f9fafb;
  border-radius: 8px;

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const EmptyTitle = styled.p`
  color: #374151;
  font-size: 1.4rem;
  font-weight: 600;
`;

function EmptyState() {
  return (
    <StyledEmptyState>
      <EmptyIcon>
        <ClipboardX />
      </EmptyIcon>

      <EmptyTitle>今日尚無銷售資料</EmptyTitle>
    </StyledEmptyState>
  );
}

export default EmptyState;
