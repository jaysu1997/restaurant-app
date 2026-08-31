// ok
import styled from "styled-components";
import BrandImage from "./BrandImage";
import BrandName from "./BrandName";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & > img {
    height: 4rem;
    width: auto;

    @media (max-width: 80em) {
      height: 3.6rem;
      width: auto;
    }
  }

  & > span {
    font-size: 2.4rem;

    @media (max-width: 80em) {
      font-size: 2rem;
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
