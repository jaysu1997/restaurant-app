import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  BiChalkboard,
  BiEdit,
  BiFoodMenu,
  BiFork,
  BiFridge,
  BiSliderAlt,
} from "react-icons/bi";
import { scrollToTop } from "../utils/scrollToTop";
import useUser from "../hooks/data/auth/useUser";

const StyleNav = styled.nav`
  border-right: 1px solid #dcdcdc;
  background-color: #fff;
  min-width: 18rem;
  position: sticky;
  top: 6.4rem;
  height: 100%;
  max-height: calc(100dvh - 6.4rem);
  width: 24rem;
  overflow-y: auto;
  scrollbar-width: thin;

  display: flex;
  flex-direction: column;
  align-items: center;
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
  border-radius: 6px;

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

const SignUpButton = styled.button`
  margin-top: auto;
  margin-bottom: 3.2rem;
  background-color: aliceblue;
  width: 15rem;
  padding: 1rem 2rem;
`;

const navigationsLink = [
  { to: "/", icon: <BiChalkboard />, title: "營運總覽" },
  { to: "menu", icon: <BiFork />, title: "點餐系統" },
  { to: "/orders", icon: <BiEdit />, title: "訂單管理" },
  { to: "/menu-manage", icon: <BiFoodMenu />, title: "菜單設定" },
  { to: "/inventory", icon: <BiFridge />, title: "庫存管理" },
  { to: "/settings", icon: <BiSliderAlt />, title: "店鋪設定" },
];

// 這裡需要再加上一個新增帳號的按鈕
function Navbar() {
  const { user } = useUser();
  const userRole = user?.user_metadata?.user_role;
  const isManager = userRole === "店長";

  return (
    <StyleNav>
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
      {isManager && <SignUpButton>新增員工</SignUpButton>}
    </StyleNav>
  );
}

export default Navbar;
