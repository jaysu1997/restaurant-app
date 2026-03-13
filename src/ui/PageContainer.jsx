// ok
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || "100%"};
`;

export default PageContainer;
