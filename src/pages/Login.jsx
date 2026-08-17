// ok
import styled from "styled-components";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useLogin from "../hooks/data/auth/useLogin";
import useUser from "../hooks/data/auth/useUser";
import FormPasswordField from "../components/FormPasswordField";
import FormInputField from "../components/FormInputField";
import { isValidEmail } from "../utils/validation";
import SubmitButton from "../components/button/SubmitButton";
import BrandImage from "../components/BrandImage";

const PageLayout = styled.div`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.6rem;

  @media (max-width: 30em) {
    padding: 0;
  }
`;

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: min(42rem, 100%);
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 4.8rem;
  font-size: 1.4rem;
  font-weight: 500;
  box-shadow:
    0 20px 48px rgba(15, 23, 42, 0.08),
    0 4px 12px rgba(15, 23, 42, 0.04);

  @media (max-width: 30em) {
    box-shadow: none;
    border: none;
    background-color: transparent;
    padding: 4.8rem 2.8rem;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

  & > img {
    width: 8rem;
    height: auto;

    @media (max-width: 30em) {
      width: 6.4rem;
    }
  }
`;

const Heading = styled.h1`
  color: #111827;
  font-size: 2.8rem;
  font-weight: 700;

  @media (max-width: 30em) {
    font-size: 2.4rem;
  }
`;

const ErrorContainer = styled.div`
  padding: 1.6rem 0 2.4rem;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.2rem 1.4rem;
  border-radius: 1.2rem;
  border: 1px solid #fecaca;
  background-color: #fef2f2;
  color: #b91c1c;
`;

const ErrorIcon = styled.div`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #dc2626;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  label {
    color: #374151;
  }
`;

const LoginButton = styled(SubmitButton)`
  height: 5rem;
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
`;

// 登入頁面UI元件
function Login() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useLogin();
  const { user, userIsLoading } = useUser();

  const methods = useForm({
    defaultValues: {
      email: "admin@test.com",
      password: "admin@test.com",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  // 如果已經有登入帳號就自動轉跳到首頁
  useEffect(() => {
    if (!userIsLoading && user) {
      navigate("/", { replace: true });
    }
  }, [user, userIsLoading, navigate]);

  function onSubmit(data) {
    login(data, {
      onError: (error) =>
        setError("root", {
          message: error.message || "登入失敗，請檢查信箱和密碼是否正確。",
        }),
    });
  }

  // 避免手動修改路由回到login時會露出登入ui
  if (userIsLoading || user) return null;

  return (
    <FormProvider {...methods}>
      <PageLayout>
        <StyledLogin>
          <Header>
            <BrandImage />
            <Heading>登入 Restro</Heading>
          </Header>

          {/* 登入失敗提示訊息 */}
          <ErrorContainer>
            {errors?.root && (
              <ErrorMessage role="alert">
                <ErrorIcon aria-hidden="true">!</ErrorIcon>
                <span>{errors.root.message}</span>
              </ErrorMessage>
            )}
          </ErrorContainer>

          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <FormInputField
              label="信箱"
              name="email"
              autoComplete="username"
              rules={{
                required: "信箱必須填寫",
                validate: isValidEmail,
              }}
            />

            <FormPasswordField
              label="密碼"
              name="password"
              autoComplete="current-password"
              rules={{
                required: "密碼必須填寫",
                minLength: { value: 8, message: "密碼至少要有8碼" },
              }}
            />

            <LoginButton
              fullWidth
              processing={isLoggingIn}
              disabled={isLoggingIn}
            >
              登入
            </LoginButton>
          </LoginForm>
        </StyledLogin>
      </PageLayout>
    </FormProvider>
  );
}

export default Login;
