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
import { scrollToTop } from "../utils/scrollToTop";

const StyleNav = styled.nav`
  border-right: 1px solid #dcdcdc;
  min-width: 18rem;
  background-color: #fff;
  position: sticky;
  top: 6.4rem;
  height: 100%;
  max-height: calc(100dvh - 6.4rem);
  width: 24rem;
  /* display: none; */
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
  padding: 3.6rem 0rem;
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

const navigationsLink = [
  { to: "/", icon: <BiChalkboard />, title: "總覽頁面" },
  { to: "menu", icon: <BiFork />, title: "點餐系統" },
  { to: "/orders", icon: <BiEdit />, title: "訂單管理" },
  { to: "/menu-manage", icon: <BiFoodMenu />, title: "菜單設定" },
  { to: "/inventory", icon: <BiFridge />, title: "庫存管理" },
  { to: "/analytics", icon: <BiBarChartSquare />, title: "營業數據" },
  { to: "/staff", icon: <BiUserPlus />, title: "員工管理" },
];

function Navbar() {
  return (
    <StyleNav>
      <StyledOverlayScrollbars style={{ maxHeight: "inherit" }}>
        <NavList>
          {navigationsLink.map((nav) => (
            <li key={nav.title}>
              <StyleNavLink to={nav.to} onClick={() => scrollToTop()}>
                {nav.icon}
                <span>{nav.title}</span>
              </StyleNavLink>
            </li>
          ))}
        </NavList>
      </StyledOverlayScrollbars>
    </StyleNav>
  );
}

export default Navbar;
