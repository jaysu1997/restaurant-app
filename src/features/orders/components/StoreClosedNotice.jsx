import styled from "styled-components";
import { AlertTriangle } from "lucide-react";

const StyledNotice = styled.div`
  height: fit-content;
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.2rem 1.4rem;
  border-radius: 6px;
  border-left: 6px solid #f59e0b;
  background: #fff7ed;
  color: #9a3412;
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: -0.8rem;
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  margin-top: 0.2rem;
`;

function StoreClosedNotice({ children }) {
  return (
    <StyledNotice>
      <IconWrapper>
        <AlertTriangle size={18} />
      </IconWrapper>

      <div>{children}</div>
    </StyledNotice>
  );
}

export default StoreClosedNotice;
