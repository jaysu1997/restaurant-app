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
  background-color: var(--color-surface);
  position: sticky;
  top: 0;
  z-index: 50;
  grid-column: 1 / -1;
  box-shadow: inset 0px -1px var(--color-border);

  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-3);
  align-items: center;
  padding-left: var(--space-6);

  @media (max-width: 80em) {
    grid-template-columns: 7.2rem auto 1fr;
    padding-left: 0;
  }

  @media (max-width: 50em) {
    grid-template-columns: auto auto 1fr;
    padding: 0 var(--space-2-5);
  }
`;

const MenuButton = styled.button`
  display: none;

  @media (max-width: 80em) {
    justify-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-lg);
    width: 3.6rem;
    height: 3.6rem;

    svg {
      width: 2.4rem;
      height: 2.4rem;
    }

    ${hoverStyles(css`
      background-color: var(--color-background);
    `)}
  }
`;

const HeaderBrand = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--space-3);

  & > img {
    height: 4rem;
    width: auto;
  }

  & > span {
    font-size: var(--font-size-xl);
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
