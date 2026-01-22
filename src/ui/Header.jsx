// 網站頂部
import styled from "styled-components";
import Logo from "./Logo";
import User from "../features/account/User";
import { Menu } from "lucide-react";

const StyleHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid #dcdcdc;
  height: 6.4rem;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 3;
  grid-column: 1 / -1;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.078);

  display: grid;
  grid-template-columns: 24rem 1fr;
  justify-items: center;
  align-items: center;

  @media (max-width: 80em) {
    grid-template-columns: 20rem 1fr;
  }

  @media (max-width: 64em) {
    grid-template-columns: 1fr 20rem 1fr;
  }
`;

const ToggleButton = styled.button`
  justify-self: flex-start;
  display: none;

  svg {
    width: 3.6rem;
    height: 3.6rem;
    flex-shrink: 0;
  }

  @media (max-width: 64em) {
    display: flex;
    margin-left: 1rem;
  }
`;

function Header({ setIsOpen }) {
  return (
    <StyleHeader>
      <ToggleButton onClick={() => setIsOpen((prev) => !prev)}>
        <Menu />
      </ToggleButton>
      <Logo />
      <User />
    </StyleHeader>
  );
}

export default Header;
