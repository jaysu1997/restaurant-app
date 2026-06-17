import styled from "styled-components";
import { AlertTriangle } from "lucide-react";

const StyledNotice = styled.div`
  height: 4.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.4rem;
  border-radius: 6px;
  border-left: 6px solid #f59e0b;
  background: #fff7ed;
  color: #9a3412;
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: -0.8rem;

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
