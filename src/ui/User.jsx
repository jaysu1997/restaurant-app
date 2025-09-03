import styled from "styled-components";
import defaultAvatar from "../assets/default-user.png";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/data/auth/useUser";
import { RiArrowRightSLine } from "react-icons/ri";
import DropdownMenu from "./DropdownMenu";
import { GoPerson, GoSignOut } from "react-icons/go";
import { useState } from "react";
import useSignOut from "../hooks/data/auth/useSignOut";

const StyledUser = styled.div`
  padding: 0 2.4rem;
  margin-left: auto;
  /* width: 100%; */
`;

const UserButton = styled.button`
  height: 5.6rem;
  display: grid;
  grid-template-columns: 4rem auto 2rem;
  grid-template-rows: 2rem 2rem;
  align-content: center;
  align-items: center;
  column-gap: 1rem;
  padding: 0.8rem 0.2rem;
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
`;

const UserAvatar = styled.img`
  grid-row: 1 / -1;
  display: block;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center;
`;

const UserName = styled.span`
  max-width: 20ch;
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
  const { signOut, isPending } = useSignOut();

  const { userIsPending, user } = useUser();
  const avatarFile = user?.user_metadata?.avatar_file;
  const avatarUrl = `https://yaoivzqoyuqdmvxnxvwm.supabase.co/storage/v1/object/public/avatar/${avatarFile}`;
  const userName = user?.user_metadata?.user_name;
  const userRole = user?.user_metadata?.user_role;

  const itemsConfig = [
    {
      name: "用戶設定",
      icon: GoPerson,
      handleClick: () => navigate("/account"),
    },
    {
      name: "登出",
      icon: GoSignOut,
      handleClick: () => signOut(),
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
          <UserAvatar
            src={avatarFile ? avatarUrl : defaultAvatar}
            alt="userAvatar"
          />
          <UserName>{userName}</UserName>
          <UserRole>{userRole}</UserRole>
          <RiArrowRightSLine size={22} />
        </UserButton>
      </DropdownMenu>
    </StyledUser>
  );
}

export default User;
