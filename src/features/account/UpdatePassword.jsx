import styled from "styled-components";
import { useForm } from "react-hook-form";
import StyledHotToast from "../../ui-old/StyledHotToast";
import PasswordInput from "../../components/PasswordInput";
import useUpdateUserPassword from "../../hooks/data/auth/useUpdateUserPassword";
import SectionContainer from "../../ui/SectionContainer";
import { LuKeyRound } from "react-icons/lu";

// 以下這些ui或許都能夠做成重複使用的版本
const Form = styled.form`
  display: grid;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  row-gap: 0.4rem;
  font-size: 1.4rem;
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
    <SectionContainer
      title="變更密碼"
      icon={<LuKeyRound />}
      form={{
        formId: "updatePassword",
        handleReset: () => reset(),
        isDirty: isDirty,
        isUpdating: isPending,
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit, onError)} id="updatePassword">
        <label htmlFor="password">現有密碼</label>
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

        <label htmlFor="newPassword">新的密碼</label>
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

        <label htmlFor="confirmPassword">確認新密碼</label>
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
      </Form>
    </SectionContainer>
  );
}

export default UpdatePassword;
