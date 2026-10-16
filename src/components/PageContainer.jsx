import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || "100%"};
`;

export default PageContainer;
