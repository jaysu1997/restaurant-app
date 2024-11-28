import styled from "styled-components";
import User from "./User";

const StyleHeader = styled.header`
  border-bottom: 1px solid #9ca3af;
  padding: 0.15rem 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 144rem;
  justify-content: space-between;
  align-items: center;
`;

const LogoStyle = styled.div`
  display: flex;
  align-items: center;
`;

const H1 = styled.h1`
  color: #ea580c;
  font-size: 2.4rem;
`;

const Img = styled.img`
  height: 6rem;
`;

function Header() {
  return (
    <StyleHeader>
      <HeaderContainer>
        <LogoStyle>
          <Img src="logo.png" alt="logo" />
          <H1>Aurora Bites</H1>
        </LogoStyle>
        <User />
      </HeaderContainer>
    </StyleHeader>
  );
}

export default Header;
