import styled from "styled-components";

const StyledPageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5.2rem;
`;

const PageHeading = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
`;

const PageActions = styled.div`
  display: flex;
  gap: 1rem;
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
