import styled from "styled-components";
import useUser from "../hooks/data/auth/useUser";
import { useRef } from "react";
import StyleNavLink from "../ui/StyledNavLink";
import useScrollLock from "../hooks/ui/useScrollLock";
import {
  LayoutDashboard,
  ClipboardList,
  BookOpenText,
  Refrigerator,
  Settings,
  UserRoundCog,
  Soup,
} from "lucide-react";
import useMediaQuery from "../hooks/ui/useMediaQuery";

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
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};

    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition: opacity 0.25s;
  }
`;

const Nav = styled.nav`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24rem;
  background-color: #fff;
  box-shadow: inset -1px 0px #e5e7eb;
  overflow-y: auto;

  @media (max-width: 80em) {
    width: 20rem;
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
  { to: "/", icon: LayoutDashboard, title: "營運總覽" },
  { to: "menu", icon: Soup, title: "點餐系統" },
  { to: "/orders", icon: ClipboardList, title: "訂單管理" },
  { to: "/menu-manage", icon: BookOpenText, title: "菜單設定" },
  { to: "/inventory", icon: Refrigerator, title: "庫存管理" },
  { to: "/settings", icon: Settings, title: "店鋪設定" },
];

function Navbar({ isOpen, setIsOpen }) {
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;
  const isManager = userRole === "店長";

  const navRef = useRef(null);
  const isMatched = useMediaQuery(64, () => setIsOpen(false));

  // 自動關閉以及html滾動功能
  useScrollLock(isMatched && isOpen);

  return (
    <Wrapper
      $isOpen={isOpen}
      inert={isMatched && !isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
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
              <StyleNavLink to="/staff" onClick={() => setIsOpen(false)}>
                <UserRoundCog />
                <span>員工管理</span>
              </StyleNavLink>
            </li>
          )}
        </NavList>
      </Nav>
    </Wrapper>
  );
}

export default Navbar;
