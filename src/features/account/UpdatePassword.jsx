import styled from "styled-components";
import { useForm } from "react-hook-form";
import ButtonSpinner from "../../ui-old/ButtonSpinner";
import StyledHotToast from "../../ui-old/StyledHotToast";
import PasswordInput from "../../ui-old/PasswordInput";
import useUpdateUserPassword from "../../hooks/data/auth/useUpdateUserPassword";

// 以下這些ui或許都能夠做成重複使用的版本
const Form = styled.form`
  display: grid;
  grid-template-columns: 8rem 1fr;
  column-gap: 1rem;
  /* grid-template-rows: repeat(3, 3.8rem 2.8rem); */
  font-size: 1.4rem;
  font-weight: 500;
  align-items: center;

  div {
    position: relative;
  }
`;

const Footer = styled.footer`
  padding-top: 2.4rem;
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`;

const SubmitButton = styled.button`
  background-color: #2563eb;
  color: #fff;
  padding: 0.6rem 1.8rem;
  border-radius: 4px;
  font-weight: 500;
  width: 6.4rem;
`;

const CancelButton = styled(SubmitButton)`
  color: #333;
  background-color: #eee;
`;

function UpdatePassword({ userData }) {
  const { mutate, isPending } = useUpdateUserPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
    setError,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data) {
    const { currentPassword, newPassword } = data;

    const userCredentials = {
      email: userData.email,
      currentPassword,
      newPassword,
    };

    mutate(userCredentials, {
      onError: (error) => {
        // 現有密碼輸入錯誤
        if (error.code === "invalid_credentials") {
          setError("currentPassword", {
            type: "custom",
            message: "密碼不正確",
          });
        }
      },
    });
  }

  function onError(error) {
    console.log(error);
    StyledHotToast({ type: "error", title: "密碼更新失敗" });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <label>現有密碼</label>
      <PasswordInput
        id="password"
        autoComplete="current-password"
        disabled={isPending}
        {...register("currentPassword", {
          required: "密碼必須填寫",
          minLength: { value: 8, message: "密碼至少8碼" },
        })}
        errors={errors?.currentPassword}
      />

      <label>新的密碼</label>
      <PasswordInput
        id="newPassword"
        autoComplete="new-password"
        disabled={isPending}
        {...register("newPassword", {
          required: "請輸入新的密碼",
          minLength: { value: 8, message: "密碼至少要有8碼" },
          validate: (value) => {
            const currentPassword = watch("currentPassword");
            return value !== currentPassword || "新密碼不能與舊密碼相同";
          },
        })}
        errors={errors?.newPassword}
      />

      <label>確認新密碼</label>
      <PasswordInput
        id="confirmPassword"
        autoComplete="new-password"
        disabled={isPending}
        {...register("confirmPassword", {
          required: "請再次輸入新密碼",
          minLength: { value: 8, message: "密碼至少要有8碼" },
          validate: (value) => {
            const newPassword = watch("newPassword");
            return value === newPassword || "兩次輸入的新密碼不一致";
          },
        })}
        errors={errors?.confirmPassword}
      />

      <Footer>
        <SubmitButton disabled={!isDirty || isPending}>
          {isPending ? <ButtonSpinner /> : "儲存"}
        </SubmitButton>
        <CancelButton onClick={() => reset()} disabled={!isDirty || isPending}>
          取消
        </CancelButton>
      </Footer>
    </Form>
  );
}

export default UpdatePassword;
