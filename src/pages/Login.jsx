import styled from "styled-components";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useLogin from "../hooks/data/auth/useLogin";
import useUser from "../hooks/data/auth/useUser";
import FormPasswordField from "../components/FormPasswordField";
import FormInputField from "../components/FormInputField";
import { isValidEmail } from "../utils/validation.js";
import SubmitButton from "../components/button/SubmitButton";
import BrandImage from "../components/BrandImage";

const PageLayout = styled.div`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-10) var(--space-4);

  @media (max-width: 30em) {
    padding: 0;
  }
`;

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: min(42rem, 100%);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: var(--space-11);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-lg), var(--shadow-md);

  @media (max-width: 30em) {
    box-shadow: none;
    border: none;
    background-color: transparent;
    padding: var(--space-11) var(--space-7);
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);

  & > img {
    width: 8rem;
    height: auto;

    @media (max-width: 30em) {
      width: 6.4rem;
    }
  }
`;

const Heading = styled.h1`
  color: var(--color-text-strong);
  font-size: 2.8rem;
  font-weight: var(--font-weight-bold);

  @media (max-width: 30em) {
    font-size: var(--font-size-xl);
  }
`;

const ErrorContainer = styled.div`
  padding: var(--space-4) 0 var(--space-6);
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2-5);
  padding: var(--space-3) var(--space-3-5);
  border-radius: 1.2rem;
  border: 1px solid var(--color-danger-border);
  background-color: var(--color-danger-subtle);
  color: var(--color-danger-text);
`;

const ErrorIcon = styled.div`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-danger);
  color: var(--color-surface);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const LoginButton = styled(SubmitButton)`
  height: 5rem;
  border-radius: var(--radius-xl);
  font-size: 1.5rem;
  font-weight: var(--font-weight-semibold);
  margin-top: var(--space-5);
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
                minLength: { value: 8, message: "密碼長度至少為 8 個字元" },
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
