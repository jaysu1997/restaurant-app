import { NavLink } from "react-router-dom";
import styled from "styled-components";

import {
  BiBarChartSquare,
  BiChalkboard,
  BiEdit,
  BiFoodMenu,
  BiFork,
  BiFridge,
  BiUserPlus,
} from "react-icons/bi";
import StyledOverlayScrollbars from "./StyledOverlayScrollbars";

const StyleNav = styled.nav`
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  min-width: 18rem;
  background-color: #fff;
  margin-top: 6.2rem;
  position: sticky;
  top: 16.2rem;
  height: fit-content;
  max-height: calc(100dvh - 16.2rem);
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
  padding: 1.4rem;
`;

const StyleNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 10px;

  svg {
    color: #475569;
    width: 2rem;
    height: 2rem;
  }

  &:link,
  &:visited {
    text-decoration: none;
    color: #475569;
  }

  &:hover,
  &:active,
  &:hover svg,
  &:active svg {
    color: #3b82f6;
  }

  &.active:link,
  &.active:visited,
  &.active:link svg,
  &.active:visited svg {
    color: #2563eb;
  }
`;

function Nav() {
  return (
    <StyleNav>
      <StyledOverlayScrollbars style={{ maxHeight: "inherit" }}>
        <NavList>
          <li>
            <StyleNavLink to="/">
              <BiChalkboard />
              <span>總覽頁面</span>
            </StyleNavLink>
          </li>
          <li>
            <StyleNavLink to="/menu">
              <BiFork />
              <span>點餐系統</span>
            </StyleNavLink>
          </li>
          <li>
            <StyleNavLink to="/orders">
              <BiEdit />
              <span>訂單管理</span>
            </StyleNavLink>
          </li>
          <li>
            <StyleNavLink to="/menu-manage">
              <BiFoodMenu />
              <span>菜單設定</span>
            </StyleNavLink>
          </li>
          <li>
            <StyleNavLink to="/inventory">
              <BiFridge />
              <span>庫存管理</span>
            </StyleNavLink>
          </li>
          <li>
            <StyleNavLink to="/analytics">
              <BiBarChartSquare />
              <span>營業數據</span>
            </StyleNavLink>
          </li>
          <li>
            <StyleNavLink to="staff">
              <BiUserPlus />
              <span>員工管理</span>
            </StyleNavLink>
          </li>
        </NavList>
      </StyledOverlayScrollbars>
    </StyleNav>
  );
}

export default Nav;
