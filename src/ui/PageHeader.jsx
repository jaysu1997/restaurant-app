import styled from "styled-components";

const StyledPageHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

const PageHeading = styled.h1`
  font-size: 3.2rem;
`;

const PageActions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 1rem;

  @media (max-width: 30em) {
    button > span {
      display: none;
    }
  }
`;

function PageHeader({ title, children }) {
  return (
    <StyledPageHeader>
      <PageHeading>{title}</PageHeading>
      <PageActions>{children}</PageActions>
    </StyledPageHeader>
  );
}

export default PageHeader;
