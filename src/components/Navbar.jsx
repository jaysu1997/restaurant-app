import styled from "styled-components";
import {
  BiChalkboard,
  BiEdit,
  BiFoodMenu,
  BiFork,
  BiFridge,
  BiCog,
  BiUserPlus,
} from "react-icons/bi";
import useUser from "../hooks/data/auth/useUser";
import useClickOutside from "../hooks/ui/useClickOutside";
import { useRef } from "react";
import StyleNavLink from "../ui/StyledNavLink";
import useScrollLock from "../hooks/ui/useScrollLock";

const Wrapper = styled.div`
  position: sticky;
  top: 6.4rem;
  height: calc(100dvh - 6.4rem);
  display: flex;

  @media (max-width: 64em) {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    height: 100dvh;
    width: ${({ $isOpen }) => ($isOpen ? "100%" : "0")};
    background-color: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(2px);

    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition: opacity 0.25s;
  }
`;

const Nav = styled.nav`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 24rem;
  background-color: #fff;
  border-right: 1px solid #dcdcdc;
  overflow-y: auto;

  @media (max-width: 80em) {
    flex-basis: 20rem;
  }

  @media (max-width: 64em) {
    box-shadow: 2px 0 20px rgba(0, 0, 0, 0.25);
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(-20rem)"};

    transition: transform 0.35s;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  padding: 3.6rem 0rem;

  @media (max-width: 80em) {
    gap: 1rem;
  }
`;

const navigationsLink = [
  { to: "/", icon: BiChalkboard, title: "營運總覽" },
  { to: "menu", icon: BiFork, title: "點餐系統" },
  { to: "/orders", icon: BiEdit, title: "訂單管理" },
  { to: "/menu-manage", icon: BiFoodMenu, title: "菜單設定" },
  { to: "/inventory", icon: BiFridge, title: "庫存管理" },
  { to: "/settings", icon: BiCog, title: "店鋪設定" },
];

function Navbar({ isOpen, setIsOpen }) {
  const { user } = useUser();
  const userRole = user?.user_metadata?.user_role;
  const isManager = userRole === "店長";

  const navRef = useRef(null);
  useClickOutside(navRef, isOpen, setIsOpen);

  // 自動關閉以及html滾動功能
  useScrollLock(64, isOpen, () => setIsOpen(false));

  return (
    <Wrapper $isOpen={isOpen}>
      <Nav ref={navRef} $isOpen={isOpen}>
        <NavList>
          {navigationsLink.map((nav) => {
            const Icon = nav.icon;
            return (
              <li key={nav.title}>
                <StyleNavLink to={nav.to} onClick={() => setIsOpen(false)}>
                  <Icon />
                  <span>{nav.title}</span>
                </StyleNavLink>
              </li>
            );
          })}

          {isManager && (
            <li>
              <StyleNavLink to="/signup" onClick={() => setIsOpen(false)}>
                <BiUserPlus />
                <span>新增員工</span>
              </StyleNavLink>
            </li>
          )}
        </NavList>
      </Nav>
    </Wrapper>
  );
}

export default Navbar;
