import styled from "styled-components";
import { useForm } from "react-hook-form";
import useSignIn from "../hooks/data/auth/useSignIn";
import useUser from "../hooks/data/auth/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../ui-old/ButtonSpinner";
import FormErrorsMessage from "../ui-old/FormErrorsMessage";
import PasswordInput from "../ui-old/PasswordInput";
import StandaloneLayout from "../ui/StandaloneLayout";
import FormInput from "../ui/FormInput";

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
    font-weight: 600;
  }
`;

// input嘗試重複使用
// const Input = styled.input`
//   font-size: 1.4rem;
//   border: 1px solid #ddd;
//   padding: 0.2rem 0.8rem;
//   height: 3.8rem;
//   border-radius: 6px;
//   width: 100%;

//   &:focus {
//     border-color: transparent;
//     outline: 2px solid #3b82f6;
//   }
// `;

const SignInButton = styled.button`
  height: 3.8rem;
  background-color: #000;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.4rem 1.4rem;
  margin-top: 1.4rem;
  border-radius: 6px;
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
    <StandaloneLayout>
      <Logo src="/logo.webp" alt="logo" />
      <Heading>登入 Aurora Bites</Heading>
      {errors?.root && (
        <SignInFailMessage>{errors?.root?.message}</SignInFailMessage>
      )}
      <SignInForm onSubmit={handleSubmit(onSubmit, onError)}>
        <Field>
          <label htmlFor="email">信箱</label>

          <FormInput
            disabled={isPending}
            autoComplete="username"
            id="email"
            {...register("email", {
              required: "信箱必須填寫",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "信箱格式錯誤",
              },
            })}
            errors={errors?.email}
          />

          {/* <FormErrorsMessage errors={errors?.email} minHeight={2} /> */}
        </Field>
        <Field>
          <label htmlFor="password">密碼</label>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            disabled={isPending}
            {...register("password", {
              required: "密碼必須填寫",
              minLength: { value: 8, message: "密碼至少8碼" },
            })}
            errors={errors?.password}
          />
          {/* <FormErrorsMessage errors={errors?.password} minHeight={2} /> */}
        </Field>
        <SignInButton disabled={isPending}>
          {isPending ? <ButtonSpinner /> : "登入"}
        </SignInButton>
      </SignInForm>
    </StandaloneLayout>
  );
}

export default SignIn;
