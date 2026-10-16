// ok
import styled from "styled-components";
import BrandImage from "./BrandImage";
import BrandName from "./BrandName";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2-5);

  & > img {
    height: 4rem;
    width: auto;

    @media (max-width: 80em) {
      height: 3.6rem;
      width: auto;
    }
  }

  & > span {
    font-size: var(--font-size-xl);

    @media (max-width: 80em) {
      font-size: var(--font-size-lg);
    }
  }
`;

function Logo() {
  return (
    <StyledLogo>
      <BrandImage />
      <BrandName />
    </StyledLogo>
  );
}

export default Logo;
