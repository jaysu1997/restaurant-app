import styled from "styled-components";
import PageHeader from "../components/PageHeader";
import UserProfileSetting from "../features/account/components/UserProfileSetting";
import PasswordSetting from "../features/account/components/PasswordSetting";
import useUser from "../hooks/data/auth/useUser";
import UpdateUserAvatar from "../features/account/components/UpdateUserAvatar";
import PageContainer from "../components/PageContainer";

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

function Account() {
  const { user } = useUser();

  return (
    <PageContainer $maxWidth="60rem">
      <PageHeader title="用戶設定" />
      <AccountContainer>
        <UpdateUserAvatar userData={user} />
        <UserProfileSetting userData={user} />
        <PasswordSetting userData={user} />
      </AccountContainer>
    </PageContainer>
  );
}

export default Account;
