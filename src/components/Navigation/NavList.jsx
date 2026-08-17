// ok
import { NavLink } from "react-router";
import styled from "styled-components";
import {
  LayoutDashboard,
  ClipboardList,
  BookOpenText,
  Refrigerator,
  Settings,
  UsersRound,
  ShoppingBasket,
} from "lucide-react";

const NavGroup = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.2rem 1rem;
  overflow-y: auto;

  @media (max-width: 64em) {
    scrollbar-width: thin;
  }
`;

const NavItem = styled(NavLink)`
  width: 100%;
  height: 5.2rem;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 2rem;
  padding: 1.4rem;
  border-radius: 10px;
  color: #4b5563;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: #f9fafb;
    color: #111827;
  }

  &.active {
    background-color: #eff6ff;
    color: #2563eb;
  }

  & > svg {
    width: 2.4rem;
    height: 2.4rem;
    flex-shrink: 0;
  }
`;

const NavLabel = styled.span`
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 64em) {
    display: ${({ $iconOnly }) => ($iconOnly ? "none" : "block")};
  }
`;

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "營運總覽" },
  { to: "menu", icon: ShoppingBasket, label: "點餐系統" },
  { to: "/orders", icon: ClipboardList, label: "訂單管理" },
  { to: "/menu-manage", icon: BookOpenText, label: "菜單設定" },
  { to: "/inventory", icon: Refrigerator, label: "庫存管理" },
  { to: "/settings", icon: Settings, label: "店鋪設定" },
];

function NavList({ isManager, onClose, iconOnly }) {
  return (
    <NavGroup>
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavItem to={item.to} onClick={onClose} key={item.label}>
            <Icon />
            <NavLabel $iconOnly={iconOnly}>{item.label}</NavLabel>
          </NavItem>
        );
      })}

      {isManager && (
        <NavItem to="/staff" onClick={onClose} key="員工管理">
          <UsersRound />
          <NavLabel $iconOnly={iconOnly}>員工管理</NavLabel>
        </NavItem>
      )}
    </NavGroup>
  );
}

export default NavList;
