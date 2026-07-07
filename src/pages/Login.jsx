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

const PageLayout = styled.div`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.6rem 1rem;
`;

const StyledLogin = styled.div`
  width: clamp(0px, 32rem, 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3.2rem;
`;

const Logo = styled.img`
  width: 9.6rem;
  height: auto;
`;

const LoginHeading = styled.h3`
  font-size: 2rem;
`;

const LoginFailMessage = styled.div`
  background-color: #fecaca;
  border: 1px solid #f87171;
  border-radius: 6px;
  color: #dc2626;
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 500;
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    font-size: 1.4rem;
    font-weight: 500;
  }

  & > button {
    margin-top: 2rem;
  }
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
          <Logo src="/logo.webp" alt="logo" />
          <LoginHeading>登入 Aurora Bites</LoginHeading>

          {/* 登入失敗提示訊息 */}
          {errors?.root && (
            <LoginFailMessage>{errors?.root?.message}</LoginFailMessage>
          )}

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

            <SubmitButton
              label="登入"
              fullWidth={true}
              isProcessing={isLoggingIn}
              disabled={isLoggingIn}
            />
          </LoginForm>
        </StyledLogin>
      </PageLayout>
    </FormProvider>
  );
}

export default Login;
