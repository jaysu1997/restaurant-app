import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import useUpdateUserPassword from "../../../hooks/data/auth/useUpdateUserPassword";
import FormPasswordField from "../../../components/FormPasswordField";
import Modal, {
  ModalContent,
  ModalFooter,
} from "../../../components/modal/Modal";
import useRestoreFocus from "../../../hooks/ui/useRestoreFocus";
import FormActions from "../../../components/FormActions";

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  font-size: var(--font-size-sm);
  padding: 0.8rem 0;
`;

function UpdatePasswordForm({ userData, onClose }) {
  const handleCloseModal = useRestoreFocus(onClose);
  const { updateUserPassword, isUpdatingUserPassword } =
    useUpdateUserPassword();

  const methods = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, clearErrors, setError, getValues } = methods;

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
        handleCloseModal();
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
      },
    });
  }

  return (
    <FormProvider {...methods}>
      <Modal
        title="變更密碼"
        onClose={handleCloseModal}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalContent>
          <FormFields>
            <FormPasswordField
              label="現有密碼"
              name="currentPassword"
              autoComplete="current-password"
              rules={{
                onChange: () => clearErrors("currentPassword"),
                deps: ["newPassword"],
                required: "密碼必須填寫",
                minLength: { value: 8, message: "密碼長度至少為 8 個字元" },
              }}
            />

            <FormPasswordField
              hint="密碼長度至少為 8 個字元"
              label="新的密碼"
              name="newPassword"
              autoComplete="new-password"
              rules={{
                deps: ["confirmPassword"],
                required: "請輸入新的密碼",
                minLength: { value: 8, message: "密碼長度至少為 8 個字元" },
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
                minLength: { value: 8, message: "密碼長度至少為 8 個字元" },
                validate: (value) =>
                  value === getValues("newPassword") ||
                  "兩次輸入的新密碼不一致",
              }}
            />
          </FormFields>
        </ModalContent>

        <ModalFooter>
          <FormActions
            onCancel={handleCloseModal}
            isProcessing={isUpdatingUserPassword}
            submitLabel="變更密碼"
          />
        </ModalFooter>
      </Modal>
    </FormProvider>
  );
}

export default UpdatePasswordForm;
