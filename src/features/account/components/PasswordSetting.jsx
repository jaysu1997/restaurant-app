import styled from "styled-components";
import SectionContainer from "../../../components/SectionContainer";
import { LockKeyhole } from "lucide-react";
import Button from "../../../components/button/Button";
import { useState } from "react";
import UpdatePasswordForm from "./UpdatePasswordForm";

const StyledUpdatePassword = styled.div`
  padding: 3.2rem 2.4rem;
  display: grid;
  grid-template-columns: 4rem 1fr auto;
  align-items: center;
  gap: 0.8rem;
`;

const PasswordIcon = styled.div`
  svg {
    width: 3.6rem;
    height: 3.6rem;
    color: #4b5563;
  }
`;

const PasswordSettingsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const PasswordSettingsTitle = styled.span`
  font-size: 1.6rem;
  color: #374151;
  font-weight: 500;
`;

const PasswordSettingsDescription = styled.span`
  color: #9ca3af;
  font-size: 1.4rem;
`;

function PasswordSetting({ userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SectionContainer headerPlacement="outside" title="變更密碼">
        <StyledUpdatePassword>
          <PasswordIcon>
            <LockKeyhole />
          </PasswordIcon>

          <PasswordSettingsContent>
            <PasswordSettingsTitle>登入密碼</PasswordSettingsTitle>
            <PasswordSettingsDescription>
              定期更新密碼，保護你的帳戶安全。
            </PasswordSettingsDescription>
          </PasswordSettingsContent>

          <Button $variant="secondary" onClick={() => setIsModalOpen(true)}>
            變更密碼
          </Button>
        </StyledUpdatePassword>
      </SectionContainer>

      {isModalOpen && (
        <UpdatePasswordForm
          userData={userData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default PasswordSetting;
