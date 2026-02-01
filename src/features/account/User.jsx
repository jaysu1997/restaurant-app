import styled from "styled-components";
import { useNavigate } from "react-router";
import { useState } from "react";
import useLogout from "../../hooks/data/auth/useLogout";
import useUser from "../../hooks/data/auth/useUser";
import DropdownMenu from "../../ui/DropdownMenu";
import UserAvatar from "../../ui/UserAvatar";
import { UserRound, LogOut, ChevronRight } from "lucide-react";
import { AVATAR_URL } from "../../utils/constants";

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
  margin-left: auto;

  &:hover {
    background-color: #f3f4f6;
  }

  svg {
    transform: ${({ $open }) => `rotate(${$open ? "270deg" : "90deg"})`};
    grid-row: 1 / -1;
    grid-column: 3;
    color: #374151;
    transition: transform 0.3s;
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
  font-size: 1.4rem;
  font-weight: 600;
  justify-self: start;
`;

const UserRole = styled(UserName)`
  color: #71717a;
  font-weight: 400;
  font-size: 1.4rem;
`;

function User() {
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { logout } = useLogout();

  const { user } = useUser();
  const userName = user?.user_metadata?.name;
  const userRole = user?.user_metadata?.role;
  const avatarFile = user?.user_metadata?.avatarFile;
  const avatarUrl = `${AVATAR_URL}${avatarFile}`;

  const itemsConfig = [
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
        itemsConfig={itemsConfig}
        open={isOpenMenu}
        setIsOpenMenu={setIsOpenMenu}
        isOpenMenu={isOpenMenu}
      >
        <UserButton
          $open={isOpenMenu}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenMenu((isOpenMenu) => !isOpenMenu);
          }}
        >
          <UserAvatar avatarUrl={avatarUrl} />
          <UserName>{userName}</UserName>
          <UserRole>{userRole}</UserRole>
          <ChevronRight className="icon-lg" strokeWidth={2.4} />
        </UserButton>
      </DropdownMenu>
    </StyledUser>
  );
}

export default User;
