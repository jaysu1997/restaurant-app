// ok
// 網站頂部
import styled, { css } from "styled-components";
import User from "./User";
import { Menu } from "lucide-react";
import BrandImage from "./BrandImage";
import BrandName from "./BrandName";
import { Link } from "react-router";
import { hoverStyles } from "../style/helpers";

const StyleHeader = styled.header`
  width: 100%;
  height: 6.4rem;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 50;
  grid-column: 1 / -1;
  box-shadow: inset 0px -1px #e5e7eb;

  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.2rem;
  align-items: center;
  padding-left: 2.4rem;

  @media (max-width: 80em) {
    grid-template-columns: 7.2rem auto 1fr;
    padding-left: 0;
  }

  @media (max-width: 50em) {
    grid-template-columns: auto auto 1fr;
    padding: 0 1rem;
  }
`;

const MenuButton = styled.button`
  display: none;

  @media (max-width: 80em) {
    justify-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    width: 3.6rem;
    height: 3.6rem;

    svg {
      width: 2.4rem;
      height: 2.4rem;
    }

    ${hoverStyles(css`
      background-color: #f9fafb;
    `)}
  }
`;

const HeaderBrand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  & > img {
    height: 4rem;
    width: auto;
  }

  & > span {
    font-size: 2.4rem;
  }
`;

function Header({ onOpenNav }) {
  return (
    <StyleHeader>
      <MenuButton onClick={onOpenNav}>
        <Menu />
      </MenuButton>

      <HeaderBrand to="/">
        <BrandImage />
        <BrandName />
      </HeaderBrand>

      <User />
    </StyleHeader>
  );
}

export default Header;
