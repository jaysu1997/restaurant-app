// ok
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useState } from "react";
import useLogout from "../hooks/data/auth/useLogout";
import useUser from "../hooks/data/auth/useUser";
import DropdownMenu from "../ui/DropdownMenu";
import UserAvatar from "../ui/UserAvatar";
import { UserRound, LogOut, ChevronRight } from "lucide-react";
import { AVATAR_URL } from "../utils/constants";

const StyledUser = styled.div`
  margin-right: 1rem;
  margin-left: auto;
`;

const UserButton = styled.button`
  height: 5.6rem;
  display: grid;
  grid-template-columns: 4rem auto 2rem;
  grid-template-rows: 2rem 2rem;
  align-content: center;
  align-items: center;
  column-gap: 1rem;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1.4rem;
  justify-items: start;

  &:hover {
    background-color: #f3f4f6;
  }

  svg {
    transform: ${({ $isOpen }) => `rotate(${$isOpen ? "270deg" : "90deg"})`};
    grid-row: 1 / -1;
    grid-column: 3;
    color: #374151;
    transition: transform 0.3s;
    width: 2rem;
    height: 2rem;
  }

  @media (max-width: 50em) {
    height: fit-content;
    grid-template-columns: 3.6rem;
    grid-template-rows: 3.6rem;
    padding: 0.8rem;

    span,
    svg {
      display: none;
    }
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

function User() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();
  const userName = user?.user_metadata?.name;
  const userRole = user?.user_metadata?.role;
  const avatarFile = user?.user_metadata?.avatarFile;
  const avatarUrl = `${AVATAR_URL}${avatarFile}`;

  const actions = [
    {
      name: "用戶設定",
      icon: UserRound,
      handleClick: () => navigate("/account"),
    },
    {
      name: "登出",
      icon: LogOut,
      handleClick: () => logout(),
    },
  ];

  return (
    <StyledUser>
      <DropdownMenu
        items={actions}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <UserButton
          $isOpen={isOpen}
          onClick={() => {
            setIsOpen((isOpenMenu) => !isOpenMenu);
          }}
        >
          <UserAvatar avatarUrl={avatarUrl} />
          <UserName>{userName}</UserName>
          <UserRole>{userRole}</UserRole>
          <ChevronRight strokeWidth={2.4} />
        </UserButton>
      </DropdownMenu>
    </StyledUser>
  );
}

export default User;
