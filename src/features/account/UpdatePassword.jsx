import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import showToast from "../../utils/showToast";
import FormPasswordField from "../../components/FormPasswordField";
import useUpdateUserPassword from "../../hooks/data/auth/useUpdateUserPassword";
import SectionContainer from "../../components/SectionContainer";
import { KeyRound } from "lucide-react";

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.4rem;

  label {
    color: #525252;
    font-weight: 500;
  }
`;

function UpdatePassword({ userData }) {
  const { updateUserPassword, isUpdatingUserPassword } =
    useUpdateUserPassword();

  const methods = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
    clearErrors,
    setError,
    getValues,
  } = methods;

  function onSubmit(data) {
    const { currentPassword, newPassword } = data;

    const userCredentials = {
      email: userData.email,
      currentPassword,
      newPassword,
    };

    updateUserPassword(userCredentials, {
      onSuccess: () => {
        // 消除field的focus狀態
        document.activeElement?.blur();
      },
      onError: (error) => {
        // 現有密碼輸入錯誤
        if (error.code === "invalid_credentials") {
          setError(
            "currentPassword",
            { type: "server", message: error.message },
            { shouldFocus: true },
          );

          return;
        }

        showToast({
          type: "error",
          title: "密碼變更失敗",
          content: error.message,
        });
      },
    });
  }

  return (
    <FormProvider {...methods}>
      <SectionContainer
        header={{ title: "變更密碼", icon: <KeyRound /> }}
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()}
        isDirty={isDirty}
        isProcessing={isUpdatingUserPassword}
      >
        <Fields>
          <FormPasswordField
            label="現有密碼"
            name="currentPassword"
            autoComplete="current-password"
            rules={{
              onChange: () => clearErrors("currentPassword"),
              deps: ["newPassword"],
              required: "密碼必須填寫",
              minLength: { value: 8, message: "密碼至少要有8碼" },
            }}
          />

          <FormPasswordField
            label="新的密碼"
            name="newPassword"
            autoComplete="new-password"
            rules={{
              deps: ["confirmPassword"],
              required: "請輸入新的密碼",
              minLength: { value: 8, message: "密碼至少要有8碼" },
              validate: (value) =>
                value !== getValues("currentPassword") ||
                "新密碼不能與舊密碼相同",
            }}
          />

          <FormPasswordField
            label="確認新密碼"
            name="confirmPassword"
            autoComplete="new-password"
            rules={{
              required: "請再次輸入新密碼",
              minLength: { value: 8, message: "密碼至少要有8碼" },
              validate: (value) =>
                value === getValues("newPassword") || "兩次輸入的新密碼不一致",
            }}
          />
        </Fields>
      </SectionContainer>
    </FormProvider>
  );
}

export default UpdatePassword;
