// ok
import { NavLink } from "react-router";
import styled from "styled-components";

const StyleNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.4rem;
  font-size: 1.8rem;
  font-weight: 500;
  padding: 1.2rem 0;
  color: #6b7280;

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  &:hover {
    color: #374151;
  }

  &.active {
    color: #2563eb;
    font-weight: 600;
  }

  @media (max-width: 80em) {
    font-size: 1.6rem;

    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

function NavItem({ navItem, onClose }) {
  const { to, title, icon: Icon } = navItem;

  return (
    <li>
      <StyleNavLink to={to} onClick={onClose}>
        <Icon />
        <span>{title}</span>
      </StyleNavLink>
    </li>
  );
}

export default NavItem;
