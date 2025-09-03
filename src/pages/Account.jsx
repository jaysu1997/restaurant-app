import styled from "styled-components";
import PageHeader from "../ui/PageHeader";
import { LuUserRoundPen, LuKeyRound } from "react-icons/lu";
import UserProfileSetting from "../features/account/UserProfileSetting";
import UpdatePassword from "../features/account/UpdatePassword";

const AccountLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
  width: clamp(0px, 100%, 60rem);
  padding-bottom: 3.6rem;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem;
  background: #fff;
  border: 1px solid #dfdfdf;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;

  display: flex;
  align-items: center;
  gap: 1.4rem;

  svg {
    color: #6b7280;
    size: 2rem;
  }
`;

function Account() {
  // const { signOut } = useSignOut();

  return (
    <AccountLayout>
      <PageHeader title="用戶設定" />
      <Section>
        <SectionTitle>
          個人資料
          <LuUserRoundPen />
        </SectionTitle>
        <UserProfileSetting />
      </Section>

      <Section>
        <SectionTitle>
          變更密碼
          <LuKeyRound />
        </SectionTitle>
        <UpdatePassword />
      </Section>
    </AccountLayout>
  );
}

export default Account;
