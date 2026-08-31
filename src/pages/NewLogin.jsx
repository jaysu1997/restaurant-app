import styled from "styled-components";

export const PageLayout = styled.div`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.6rem;
  background: #f8fafc;
`;

export const LoginCard = styled.div`
  width: min(42rem, 100%);
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 2rem;
  padding: 4.8rem;
  box-shadow:
    0 20px 48px rgba(15, 23, 42, 0.08),
    0 4px 12px rgba(15, 23, 42, 0.04);

  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 3.6rem;
`;

export const LogoPlaceholder = styled.div`
  width: 7.2rem;
  height: 7.2rem;
  border-radius: 1.8rem;
  background: #d1d5db;
  margin-bottom: 2.4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #6b7280;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const Heading = styled.h1`
  margin: 0;
  color: #111827;
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: -0.03em;
`;

export const SubHeading = styled.p`
  margin: 1rem 0 0;
  color: #6b7280;
  font-size: 1.4rem;
  line-height: 1.6;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const Label = styled.label`
  margin-bottom: 0.8rem;

  color: #374151;
  font-size: 1.4rem;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  height: 4.8rem;

  padding: 0 1.4rem;

  border: 1px solid #d1d5db;
  border-radius: 1.2rem;

  background: #ffffff;

  color: #111827;
  font-size: 1.5rem;

  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:hover {
    border-color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
`;

export const PasswordInput = styled(Input)`
  padding-right: 5rem;
`;

export const PasswordButton = styled.button`
  position: absolute;
  top: 50%;
  right: 1.2rem;
  transform: translateY(-50%);

  width: 3.2rem;
  height: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: transparent;
  border-radius: 50%;

  cursor: pointer;

  color: #6b7280;

  transition:
    background-color 0.18s ease,
    color 0.18s ease;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }
`;

export const ErrorContainer = styled.div`
  min-height: 5.2rem;
  margin: 0.8rem 0 2.4rem;
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;

  padding: 1.2rem 1.4rem;

  border-radius: 1.2rem;

  border: 1px solid #fecaca;

  background: #fef2f2;

  color: #b91c1c;

  font-size: 1.4rem;
  font-weight: 500;
`;

export const ErrorIcon = styled.div`
  flex-shrink: 0;

  width: 2rem;
  height: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #dc2626;

  color: white;

  font-size: 1.2rem;
  font-weight: 700;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 5rem;

  border: none;
  border-radius: 1.2rem;

  background: #2563eb;

  color: white;
  font-size: 1.5rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.18s ease,
    transform 0.12s ease,
    box-shadow 0.18s ease;

  &:hover:not(:disabled) {
    background: #1d4ed8;
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.28);
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const Footer = styled.footer`
  margin-top: 3.2rem;

  text-align: center;

  color: #9ca3af;

  font-size: 1.3rem;
`;

export const ForgotPasswordButton = styled.button`
  margin-top: 1.6rem;

  align-self: flex-end;

  border: none;
  background: transparent;

  padding: 0;

  cursor: pointer;

  color: #2563eb;

  font-size: 1.4rem;
  font-weight: 500;

  transition: color 0.18s ease;

  &:hover {
    color: #1d4ed8;
  }
`;

export const Copyright = styled.p`
  margin-top: 3.2rem;

  text-align: center;

  color: #9ca3af;
  font-size: 1.2rem;
`;

function NewLogin() {
  return (
    <PageLayout>
      <LoginCard>
        <Header>
          <LogoPlaceholder>LOGO</LogoPlaceholder>

          <Heading>登入 Restro</Heading>

          <SubHeading>Restaurant Management Platform</SubHeading>
        </Header>

        <LoginForm>
          <FormGroup>
            <Label>電子信箱</Label>

            <Input type="email" placeholder="admin@test.com" />
          </FormGroup>

          <FormGroup>
            <Label>密碼</Label>

            <PasswordWrapper>
              <PasswordInput type="password" placeholder="請輸入密碼" />

              <PasswordButton type="button">👁</PasswordButton>
            </PasswordWrapper>
          </FormGroup>

          <ForgotPasswordButton type="button">忘記密碼？</ForgotPasswordButton>

          <ErrorContainer>
            <ErrorMessage>
              <ErrorIcon>!</ErrorIcon>

              <span>帳號或密碼錯誤，請再次確認後重新登入。</span>
            </ErrorMessage>
          </ErrorContainer>

          <SubmitButton>登入</SubmitButton>
        </LoginForm>

        <Copyright>© 2026 Restro. All rights reserved.</Copyright>
      </LoginCard>
    </PageLayout>
  );
}

export default NewLogin;
