// 網站頂部
import styled from "styled-components";
import User from "./User";

const StyleHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid #dcdcdc;
  height: 6.4rem;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const HeaderContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 144rem;
  justify-content: space-between;
  align-items: center;
  height: 100%;
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
