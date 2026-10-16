import styled from "styled-components";
import { AlertTriangle } from "lucide-react";

const StyledNotice = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2-5);
  padding: var(--space-3) var(--space-3-5);
  border-radius: var(--radius-md);
  border-left: 6px solid var(--color-warning);
  background: var(--color-warning-subtle);
  color: var(--color-warning-text);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-sm);

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

function StoreClosedNotice({ children }) {
  return (
    <StyledNotice>
      <AlertTriangle />
      {children}
    </StyledNotice>
  );
}

export default StoreClosedNotice;
