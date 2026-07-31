// ok
import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import { useState } from "react";
import useLogout from "../hooks/data/auth/useLogout";
import useUser from "../hooks/data/auth/useUser";
import DropdownMenu from "../components/DropdownMenu";
import { UserRound, LogOut, ChevronDown } from "lucide-react";
import { hoverStyles } from "../style/helpers";
import UserAvatar from "./UserAvatar";

const StyledUser = styled.div`
  margin-right: 1rem;
  margin-left: auto;
`;

const UserButton = styled.button`
  height: 5.6rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  font-size: 1.3rem;
  border: 1px solid transparent;

  ${hoverStyles(css`
    background: #f9fafb;
    border-color: #e5e7eb;
  `)}

  @media (max-width: 50em) {
    padding: 0.8rem;
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
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user } = useUser();
  const userName = user?.user_metadata?.name;
  const userRole = user?.user_metadata?.role;
  const avatarFile = user?.user_metadata?.avatarFile;

  const actions = [
    {
      name: "用戶設定",
      icon: UserRound,
      handleClick: () => navigate("/account"),
      hidden: false,
    },
    {
      name: "登出",
      icon: LogOut,
      handleClick: () => logout(),
      hidden: false,
    },
  ];

  return (
    <StyledUser>
      <DropdownMenu
        items={actions}
        isOpen={isUserMenuOpen}
        onClose={() => setIsUserMenuOpen(false)}
      >
        <UserButton
          aria-haspopup="menu"
          aria-expanded={isUserMenuOpen}
          onClick={() => {
            setIsUserMenuOpen((isOpenMenu) => !isOpenMenu);
          }}
        >
          <UserAvatar avatarFile={avatarFile} lazy={false} />

          <UserInfo>
            <UserName>{userName}</UserName>
            <UserRole>{userRole}</UserRole>
          </UserInfo>

          <ArrowIcon strokeWidth={2.4} $isOpen={isUserMenuOpen} />
        </UserButton>
      </DropdownMenu>
    </StyledUser>
  );
}

export default User;
