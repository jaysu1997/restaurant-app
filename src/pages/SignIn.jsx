import styled from "styled-components";
import { useForm } from "react-hook-form";
import useSignIn from "../hooks/data/auth/useSignIn";
import useUser from "../hooks/data/auth/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../ui/ButtonSpinner";
import PasswordInput from "../components/PasswordInput";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";

const StyledSignIn = styled.div`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3.2rem;
  padding: 3.6rem 1rem;
`;

const Logo = styled.img`
  width: 9.6rem;
  height: auto;
`;

const Heading = styled.h3`
  font-size: 2rem;
`;

const SignInFailMessage = styled.div`
  background-color: #fecaca;
  border: 1px solid #f87171;
  border-radius: 6px;
  color: #dc2626;
  width: clamp(0px, 32rem, 100%);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;
`;

const SignInForm = styled.form`
  width: clamp(0px, 32rem, 100%);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 1.4rem;

  label {
    font-weight: 500;
  }
`;

const MarginTop = styled.div`
  margin-top: 2rem;
`;

// 登入頁面UI元件
function SignIn() {
  const navigate = useNavigate();
  const { signIn, isPending } = useSignIn();
  const { user, userIsPending } = useUser();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "abglyo8ey3@mkzaso.com",
      password: "abglyo8ey3@mkzaso.com",
    },
  });

  useEffect(() => {
    if (!userIsPending && user) {
      navigate("/", { replace: true });
    }
  }, [user, userIsPending, navigate]);

  function onSubmit(data) {
    signIn(data, {
      onError: (error) =>
        setError("root", {
          message: error.message || "登入失敗，請檢查信箱和密碼是否正確。",
        }),
    });
  }

  function onError(error) {
    console.log(error);
  }

  // 避免手動修改路由回到signin時會露出登入ui
  if (userIsPending || user) return null;

  return (
    <StyledSignIn>
      <Logo src="/logo.webp" alt="logo" />
      <Heading>登入 Aurora Bites</Heading>

      {/* 登入失敗提示訊息ui */}
      {errors?.root && (
        <SignInFailMessage>{errors?.root?.message}</SignInFailMessage>
      )}

      <SignInForm onSubmit={handleSubmit(onSubmit, onError)}>
        <Field>
          <FormInput
            label="信箱"
            id="email"
            disabled={isPending}
            autoComplete="username"
            {...register("email", {
              required: "信箱必須填寫",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "信箱格式錯誤",
              },
            })}
            errors={errors?.email}
          />
        </Field>

        <Field>
          <PasswordInput
            label="密碼"
            id="password"
            autoComplete="current-password"
            disabled={isPending}
            {...register("password", {
              required: "密碼必須填寫",
              minLength: { value: 8, message: "密碼至少8碼" },
            })}
            errors={errors?.password}
          />
        </Field>
        <MarginTop>
          <Button
            $type="primary"
            $size="xl"
            $rounded="sm"
            $isLoading={isPending}
            disabled={isPending}
          >
            <span>登入</span>
            {isPending && <ButtonSpinner />}
          </Button>
        </MarginTop>
      </SignInForm>
    </StyledSignIn>
  );
}

export default SignIn;
