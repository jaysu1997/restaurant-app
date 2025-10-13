import styled from "styled-components";

const StyledPageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5.2rem;
`;

const PageTitle = styled.h1`
  font-size: 3.2rem;
`;

const PageActions = styled.div`
  display: flex;
  gap: 1rem;
`;

function PageHeader({ title, children }) {
  return (
    <StyledPageHeader>
      <PageTitle>{title}</PageTitle>
      <PageActions>{children}</PageActions>
    </StyledPageHeader>
  );
}

export default PageHeader;
