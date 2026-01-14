import styled from "styled-components";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h1 {
    color: #ea580c;
    font-size: 2rem;
  }

  @media (max-width: 80em) {
    h1 {
      font-size: 1.6rem;
    }
  }
`;

const Img = styled.img`
  height: 5.6rem;
  width: auto;

  @media (max-width: 80em) {
    height: 4rem;
    width: auto;
  }
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo.webp" alt="logo" />
      <h1>Aurora Bites</h1>
    </StyledLogo>
  );
}

export default Logo;
