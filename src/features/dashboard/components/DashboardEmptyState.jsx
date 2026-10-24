import { ClipboardX } from "lucide-react";
import styled from "styled-components";

const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 36rem;
  padding: var(--space-6);
  gap: var(--space-3);
`;

const EmptyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  color: var(--color-text-placeholder);
  background-color: var(--color-background);
  border-radius: var(--radius-lg);

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const EmptyTitle = styled.p`
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
`;

function DashboardEmptyState() {
  return (
    <StyledEmptyState>
      <EmptyIcon>
        <ClipboardX />
      </EmptyIcon>

      <EmptyTitle>今日尚無銷售資料</EmptyTitle>
    </StyledEmptyState>
  );
}

export default DashboardEmptyState;
