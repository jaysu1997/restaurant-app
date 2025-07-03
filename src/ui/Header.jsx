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
  z-index: 10;
  grid-column: 1 / -1;
  padding: 0 2.4rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const LogoStyle = styled.div`
  display: flex;
  align-items: center;

  h1 {
    color: #ea580c;
    font-size: 2rem;
  }
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
          <h1>Aurora Bites</h1>
        </LogoStyle>
        <User />
      </HeaderContainer>
    </StyleHeader>
  );
}

export default Header;
