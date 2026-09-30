// ok
import styled, { css } from "styled-components";
import { useState } from "react";
import useLogout from "../hooks/data/auth/useLogout";
import useUser from "../hooks/data/auth/useUser";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import { UserRound, LogOut, ChevronDown } from "lucide-react";
import { hoverStyles } from "../style/helpers";
import UserAvatar from "./UserAvatar";
import DropdownItem from "./DropdownMenu/DropdownItem";

const StyledUser = styled.div`
  margin-left: auto;
`;

const UserButton = styled.button`
  height: 5.6rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 1.3rem;
  border: 1px solid transparent;

  ${hoverStyles(css`
    background: #f9fafb;
    border-color: #e5e7eb;
  `)}

  @media (max-width: 50em) {
    padding: 0.6rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 50em) {
    display: none;
  }
`;

const UserName = styled.span`
  max-width: 10ch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
`;

const UserRole = styled.span`
  color: #71717a;
`;

const ArrowIcon = styled(ChevronDown)`
  width: 2rem;
  height: 2rem;
  color: #374151;
  transform: ${({ $isOpen }) => `rotate(${$isOpen ? "180deg" : "0"})`};
  transition: transform 0.2s ease;

  @media (max-width: 50em) {
    display: none;
  }
`;

function User() {
  const { logout } = useLogout();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user } = useUser();
  const { name, userRole, avatarFile } = user;

  const handleClose = () => setIsUserMenuOpen(false);

  return (
    <StyledUser>
      <DropdownMenu
        isOpen={isUserMenuOpen}
        onClose={() => setIsUserMenuOpen(false)}
        trigger={
          <UserButton
            aria-haspopup="menu"
            aria-expanded={isUserMenuOpen}
            onClick={() => {
              setIsUserMenuOpen((isOpenMenu) => !isOpenMenu);
            }}
          >
            <UserAvatar avatarFile={avatarFile} lazy={false} />

            <UserInfo>
              <UserName>{name}</UserName>
              <UserRole>{userRole.label}</UserRole>
            </UserInfo>

            <ArrowIcon strokeWidth={2.4} $isOpen={isUserMenuOpen} />
          </UserButton>
        }
      >
        <DropdownItem
          name="用戶設定"
          to="account"
          icon={<UserRound />}
          onClick={handleClose}
        />
        <DropdownItem
          as="button"
          type="button"
          name="登出"
          onClick={() => {
            logout();
            handleClose();
          }}
          icon={<LogOut />}
        />
      </DropdownMenu>
    </StyledUser>
  );
}

export default User;
