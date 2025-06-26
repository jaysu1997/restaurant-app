import styled from "styled-components";

const StyledPageNotFound = styled.main`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function PageNotFound() {
  return <StyledPageNotFound>404 Not Found</StyledPageNotFound>;
}

export default PageNotFound;
