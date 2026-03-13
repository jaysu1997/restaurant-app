import styled from "styled-components";
import PageHeader from "../ui/PageHeader";
import UserProfileSetting from "../features/account/UserProfileSetting";
import UpdatePassword from "../features/account/UpdatePassword";
import useUser from "../hooks/data/auth/useUser";
import UpdateUserAvatar from "../features/account/UpdateUserAvatar";
import PageContainer from "../ui/PageContainer";

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

function Account() {
  const { user } = useUser();

  return (
    <PageContainer $maxWidth="60rem">
      <PageHeader title="用戶設定" />
      <AccountContainer>
        <UpdateUserAvatar userData={user} />
        <UserProfileSetting userData={user} />
        <UpdatePassword userData={user} />
      </AccountContainer>
    </PageContainer>
  );
}

export default Account;
