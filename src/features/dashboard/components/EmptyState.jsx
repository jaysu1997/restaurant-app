// ok
import styled from "styled-components";

const StyledEmptyState = styled.p`
  height: 30rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
`;

function EmptyState() {
  return <StyledEmptyState>今日尚無任何訂單</StyledEmptyState>;
}

export default EmptyState;
