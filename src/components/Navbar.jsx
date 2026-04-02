// ok
import styled from "styled-components";
import NavItem from "./NavItem";
import useUser from "../hooks/data/auth/useUser";
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
import StyledOverlay from "./StyledOverlay";

const Overlay = styled(StyledOverlay)`
  display: none;

  @media (max-width: 64em) {
    display: block;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition: opacity 0.25s;
  }
`;

const Nav = styled.nav`
  position: sticky;
  top: 6.4rem;
  height: calc(100dvh - 6.4rem);
  width: 24rem;
  background-color: #fff;
  box-shadow: inset -1px 0px #e5e7eb;
  overflow-y: auto;

  @media (max-width: 80em) {
    width: 20rem;
  }

  @media (max-width: 64em) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 150;
    height: 100%;
    box-shadow: ${({ $isOpen }) =>
      $isOpen ? "2px 0 20px rgba(0, 0, 0, 0.25)" : "none"};
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(-20rem)"};

    transition: transform 0.25s;
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

const navItems = [
  { to: "/", icon: LayoutDashboard, title: "營運總覽" },
  { to: "menu", icon: Soup, title: "點餐系統" },
  { to: "/orders", icon: ClipboardList, title: "訂單管理" },
  { to: "/menu-manage", icon: BookOpenText, title: "菜單設定" },
  { to: "/inventory", icon: Refrigerator, title: "庫存管理" },
  { to: "/settings", icon: Settings, title: "店鋪設定" },
];

function Navbar({ isOpen, onClose }) {
  const { user } = useUser();
  const userRole = user?.user_metadata?.role;
  const isManager = userRole === "店長";

  const isMatched = useMediaQuery(64, onClose);
  // html滾動功能鎖定
  useScrollLock(isMatched && isOpen);

  return (
    <>
      <Overlay
        inert={isMatched && !isOpen}
        $isOpen={isOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      />

      <Nav $isOpen={isOpen} inert={isMatched && !isOpen}>
        <NavList>
          {navItems.map((navItem) => (
            <NavItem navItem={navItem} onClose={onClose} key={navItem.title} />
          ))}

          {isManager && (
            <NavItem
              navItem={{
                to: "/staff",
                icon: UserRoundCog,
                title: "員工管理",
              }}
              onClose={onClose}
              key="員工管理"
            />
          )}
        </NavList>
      </Nav>
    </>
  );
}

export default Navbar;
