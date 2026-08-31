// Navbar.styles.js
import styled from "styled-components";
import {
  LayoutDashboard,
  Utensils,
  ClipboardList,
  BookOpen,
  Warehouse,
  Store,
  Users,
  Menu,
  X,
} from "lucide-react";

/* =========================
   Layout
========================= */

export const Sidebar = styled.aside`
  width: 260px;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;

  position: fixed;
  left: 0;
  top: 0;

  z-index: 100;

  transition:
    width 0.25s ease,
    transform 0.25s ease;

  /* Tablet */
  @media (max-width: 1024px) {
    width: 80px;
  }

  /* Mobile */

  @media (max-width: 768px) {
    width: 260px;

    transform: translateX(-100%);
  }

  ${({ $open }) =>
    $open &&
    `
      @media(max-width:768px){
        transform:translateX(0);
      }
    `}
`;

export const SidebarInner = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  padding: 1.6rem 1.2rem;
`;

/* =========================
   Logo
========================= */

export const LogoArea = styled.div`
  height: 48px;

  display: flex;
  align-items: center;

  padding: 0 1.2rem;

  margin-bottom: 2.4rem;

  gap: 1rem;
`;

export const LogoIcon = styled.div`
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background-color: #eff6ff;

  color: #2563eb;

  flex-shrink: 0;
`;

export const LogoText = styled.span`
  font-size: 1.6rem;

  font-weight: 700;

  color: #111827;

  white-space: nowrap;

  @media (max-width: 1024px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

/* =========================
   Navigation
========================= */

export const Navigation = styled.nav`
  display: flex;

  flex-direction: column;

  gap: 0.4rem;
`;

export const NavGroup = styled.div`
  display: flex;

  flex-direction: column;

  gap: 0.4rem;
`;

export const NavTitle = styled.p`
  padding: 0 1.2rem;

  margin: 1.6rem 0 0.8rem;

  font-size: 1.2rem;

  font-weight: 600;

  color: #9ca3af;

  text-transform: uppercase;

  @media (max-width: 1024px) {
    display: none;
  }
`;

/* =========================
   Navigation Item
========================= */

export const NavItem = styled.div`
  width: 100%;

  height: 48px;

  display: flex;

  align-items: center;

  gap: 1.2rem;

  padding: 0 1.2rem;

  border-radius: 10px;

  cursor: pointer;

  color: #4b5563;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: #f9fafb;

    color: #111827;
  }

  ${({ $active }) =>
    $active &&
    `

      background-color:#eff6ff;

      color:#2563eb;


      &:hover{

        background-color:#eff6ff;

      }

    `}

  @media(max-width:1024px) {
    justify-content: center;

    padding: 0;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;

    padding: 0 1.2rem;
  }
`;

export const NavIcon = styled.div`
  width: 22px;

  height: 22px;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  color: inherit;

  svg {
    width: 20px;

    height: 20px;

    stroke-width: 2;
  }
`;

export const NavLabel = styled.span`
  font-size: 1.4rem;

  font-weight: 500;

  white-space: nowrap;

  @media (max-width: 1024px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

/* =========================
   Bottom Area
========================= */

export const SidebarFooter = styled.div`
  margin-top: auto;

  padding-top: 1.6rem;

  border-top: 1px solid #e5e7eb;
`;

export const UserCard = styled.div`
  height: 56px;

  display: flex;

  align-items: center;

  gap: 1.2rem;

  padding: 0 1.2rem;

  border-radius: 10px;

  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }

  @media (max-width: 1024px) {
    justify-content: center;

    padding: 0;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;

    padding: 0 1.2rem;
  }
`;

export const UserAvatar = styled.div`
  width: 36px;

  height: 36px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  background-color: #f3f4f6;

  color: #4b5563;

  font-size: 1.4rem;

  flex-shrink: 0;
`;

export const UserInfo = styled.div`
  display: flex;

  flex-direction: column;

  overflow: hidden;

  @media (max-width: 1024px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const UserName = styled.span`
  font-size: 1.4rem;

  font-weight: 600;

  color: #111827;
`;

export const UserRole = styled.span`
  font-size: 1.2rem;

  color: #6b7280;
`;

/* =========================
   Mobile
========================= */

export const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;

    position: fixed;

    inset: 0;

    background-color: rgba(0, 0, 0, 0.25);

    opacity: ${({ $open }) => ($open ? 1 : 0)};

    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};

    transition: opacity 0.25s ease;

    z-index: 90;
  }
`;

/* =========================
   Mobile Toggle
========================= */

export const MenuButton = styled.button`
  width: 40px;

  height: 40px;

  display: none;

  align-items: center;

  justify-content: center;

  border: none;

  background: none;

  cursor: pointer;

  color: #374151;

  svg {
    width: 22px;

    height: 22px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobileHeader = styled.div`
  display: none;

  @media (max-width: 768px) {
    height: 64px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding: 0 1.6rem;

    border-bottom: 1px solid #e5e7eb;
  }
`;

export const MobileBrand = styled.div`
  display: flex;

  align-items: center;

  gap: 1rem;
`;

export const MobileLogo = styled.div`
  width: 36px;

  height: 36px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 10px;

  background: #eff6ff;

  color: #2563eb;

  svg {
    width: 20px;

    height: 20px;
  }
`;

export const MobileTitle = styled.span`
  font-size: 1.6rem;

  font-weight: 700;

  color: #111827;
`;

export const CloseButton = styled.button`
  width: 40px;

  height: 40px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: none;

  background: none;

  color: #374151;

  cursor: pointer;

  svg {
    width: 22px;

    height: 22px;
  }
`;

const navItems = [
  {
    label: "營運總覽",
    icon: LayoutDashboard,
  },

  {
    label: "點餐系統",
    icon: Utensils,
  },

  {
    label: "訂單管理",
    icon: ClipboardList,
  },

  {
    label: "菜單設定",
    icon: BookOpen,
  },

  {
    label: "庫存管理",
    icon: Warehouse,
  },

  {
    label: "店鋪設定",
    icon: Store,
  },

  {
    label: "員工管理",
    icon: Users,
  },
];

function Nav() {
  return (
    <>
      {/* Mobile open button */}

      <MenuButton>
        <Menu />
      </MenuButton>

      {/* Overlay */}

      <Overlay $open={false} />

      <Sidebar $open={false}>
        <SidebarInner>
          {/* Only mobile display */}

          <MobileHeader>
            <MobileBrand>
              <MobileLogo>
                <Store />
              </MobileLogo>

              <MobileTitle>Restaurant OS</MobileTitle>
            </MobileBrand>

            <CloseButton>
              <X />
            </CloseButton>
          </MobileHeader>

          <Navigation>
            <NavGroup>
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavItem key={item.label} $active={item.label === "營運總覽"}>
                    <NavIcon>
                      <Icon />
                    </NavIcon>

                    <NavLabel>{item.label}</NavLabel>
                  </NavItem>
                );
              })}
            </NavGroup>
          </Navigation>
        </SidebarInner>
      </Sidebar>
    </>
  );
}

export default Nav;
