import styled from "styled-components";
import { useForm } from "react-hook-form";
import useSignIn from "../hooks/data/auth/useSignIn";
import useUser from "../hooks/data/auth/useUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../ui/ButtonSpinner";
import FormErrorsMessage from "../ui/FormErrorsMessage";
import PasswordInput from "../ui/PasswordInput";

const SignInLayout = styled.main`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  padding: 3.6rem 0;
`;

const Logo = styled.img`
  width: 9.6rem;
  height: 9.6rem;
`;

const Heading = styled.h3`
  font-size: 2rem;
`;

const SignInFailMessage = styled.div`
  background-color: #fecaca;
  border: 1px solid #f87171;
  border-radius: 6px;
  color: #dc2626;
  width: clamp(0px, 32rem, 90dvw);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;
`;

const SignInForm = styled.form`
  width: clamp(0px, 32rem, 90dvw);
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

  div {
    position: relative;
  }
`;

const Input = styled.input`
  font-size: 1.4rem;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 6px;
  width: 100%;

  &:focus {
    border-color: transparent;
    outline: 2px solid #3b82f6;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  z-index: 1;
  display: flex;
  align-items: center;
`;

const SignInButton = styled.button`
  height: 4rem;
  background-color: #000;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 1rem 1.4rem;
  margin-top: 1.4rem;
  border-radius: 6px;
`;

// 登入頁面UI元件
function SignIn() {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(true);
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
    <SignInLayout>
      <Logo src="/logo.webp" alt="logo" />
      <Heading>登入 Aurora Bites</Heading>
      {errors?.root && (
        <SignInFailMessage>{errors?.root?.message}</SignInFailMessage>
      )}
      <SignInForm onSubmit={handleSubmit(onSubmit, onError)}>
        <Field>
          <label htmlFor="email">信箱</label>
          <div>
            <Input
              disabled={isPending}
              id="email"
              {...register("email", {
                required: "信箱必須填寫",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "信箱格式錯誤",
                },
              })}
            />
          </div>

          <FormErrorsMessage errors={errors?.email} minHeight={2} />
        </Field>
        <Field>
          <label htmlFor="password">密碼</label>
          <PasswordInput
            disabled={isPending}
            id="password"
            {...register("password", {
              required: "密碼必須填寫",
              minLength: { value: 8, message: "密碼至少 8 碼" },
            })}
          />
          {/* <div>
            <Input
            type={isHidden ? "password" : "text"}
            disabled={isPending}
              id="password"
              {...register("password", {
                required: "密碼必須填寫",
                minLength: { value: 8, message: "密碼至少 8 碼" },
              })}
            />
            <ToggleButton
              type="button"
              onClick={() => setIsHidden((prev) => !prev)}
            >
              {isHidden ? <HiEye size={18} /> : <HiEyeSlash size={18} />}
            </ToggleButton>
          </div> */}

          <FormErrorsMessage errors={errors?.password} minHeight={2} />
        </Field>
        <SignInButton disabled={isPending}>
          {isPending ? <ButtonSpinner /> : "登入"}
        </SignInButton>
      </SignInForm>
    </SignInLayout>
  );
}

export default SignIn;
