// 網站頂部
import styled from "styled-components";

import Logo from "./Logo";
import User from "../features/account/User";

const StyleHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid #dcdcdc;
  height: 6.4rem;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
  grid-column: 1 / -1;
  /* padding: 0 2.4rem; */
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.078);

  display: grid;
  grid-template-columns: 24rem 1fr;
  justify-items: center;
  align-items: center;
`;

function Header() {
  return (
    <StyleHeader>
      <Logo />
      <User />
    </StyleHeader>
  );
}

export default Header;
