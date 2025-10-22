import styled from "styled-components";
import PageHeader from "../ui/PageHeader";
import UserProfileSetting from "../features/account/UserProfileSetting";
import UpdatePassword from "../features/account/UpdatePassword";
import useUser from "../hooks/data/auth/useUser";
import UpdateUserAvatar from "../features/account/UpdateUserAvatar";

const AccountLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
  width: clamp(0px, 100%, 60rem);
`;

function Account() {
  const { user } = useUser();

  return (
    <AccountLayout>
      <PageHeader title="用戶設定" />
      <UpdateUserAvatar userData={user} />
      <UserProfileSetting userData={user} />
      <UpdatePassword userData={user} />
    </AccountLayout>
  );
}

export default Account;
