import styled from "styled-components";

const StyledPageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4.8rem;
  gap: 1rem;
`;

const PageHeading = styled.h1`
  font-size: 3.2rem;
  line-height: 1.25;

  @media (max-width: 30em) {
    font-size: 2.8rem;
  }
`;

const PageTools = styled.div`
  display: flex;
  gap: 1rem;
`;

function PageHeader({ title, children }) {
  return (
    <StyledPageHeader>
      <PageHeading>{title}</PageHeading>
      <PageTools>{children}</PageTools>
    </StyledPageHeader>
  );
}

export default PageHeader;
