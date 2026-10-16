import styled from "styled-components";

const StyledBrandName = styled.span`
  color: var(--color-text-strong);
  font-weight: var(--font-weight-bold);
`;

function BrandName() {
  return <StyledBrandName>Restro</StyledBrandName>;
}

export default BrandName;
