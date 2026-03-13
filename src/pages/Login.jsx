// ok
import styled from "styled-components";
import { useForm } from "react-hook-form";
import useLogin from "../hooks/data/auth/useLogin";
import useUser from "../hooks/data/auth/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import PasswordInput from "../components/PasswordInput";
import FormInput from "../ui/FormInput";
import FormFieldLayout from "../ui/FormFieldLayout";
import { isValidEmail } from "../utils/validation";
import ButtonSubmit from "../ui/ButtonSubmit";

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

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "admin@test.com",
      password: "admin@test.com",
    },
  });

  const isProcessing = isLoggingIn || isSubmitting;

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

  function onError(error) {
    console.log(error);
  }

  // 避免手動修改路由回到login時會露出登入ui
  if (userIsLoading || user) return null;

  return (
    <PageLayout>
      <StyledLogin>
        <Logo src="/logo.webp" alt="logo" />
        <LoginHeading>登入 Aurora Bites</LoginHeading>

        {/* 登入失敗提示訊息ui */}
        {errors?.root && (
          <LoginFailMessage>{errors?.root?.message}</LoginFailMessage>
        )}

        <LoginForm onSubmit={handleSubmit(onSubmit, onError)}>
          <FormFieldLayout id="email" label="信箱" error={errors?.email}>
            <FormInput
              id="email"
              autoComplete="username"
              {...register("email", {
                required: "信箱必須填寫",
                validate: isValidEmail,
              })}
            />
          </FormFieldLayout>

          <FormFieldLayout label="密碼" id="password" error={errors?.password}>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: "密碼必須填寫",
                minLength: { value: 8, message: "密碼至少要有8碼" },
              })}
            />
          </FormFieldLayout>

          <ButtonSubmit
            label="登入"
            isFullWidth
            isProcessing={isProcessing}
            disabled={isProcessing}
          />
        </LoginForm>
      </StyledLogin>
    </PageLayout>
  );
}

export default Login;
