import { NavLink } from "react-router";
import styled from "styled-components";

const StyleNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.4rem;
  font-size: 1.8rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  color: #6b7280;

  svg {
    font-size: 2.6rem;
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
      font-size: 2rem;
    }
  }
`;

function NavItem({ navData, onClose }) {
  const Icon = navData.icon;
  return (
    <li>
      <StyleNavLink to={navData.to} onClick={onClose}>
        <Icon />
        <span>{navData.title}</span>
      </StyleNavLink>
    </li>
  );
}

export default NavItem;
