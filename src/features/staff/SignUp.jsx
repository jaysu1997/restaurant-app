import { FormProvider, useForm } from "react-hook-form";
import FormInputField from "../../components/FormInputField";
import useCreateStaff from "../../hooks/data/staff/useCreateStaff";
import FormPasswordField from "../../components/FormPasswordField";
import { trimString, validatePhoneNumber } from "../../utils/helpers";
import FormSelectField from "../../components/FormSelectField";
import { isValidEmail } from "../../utils/validation";
import {
  ModalContainer,
  ModalContent,
  ModalFooter,
} from "../../components/modal/Modal";
import ModalFormSection from "../../components/modal/ModalFormSection";
import showToast from "../../utils/showToast";
import SubmitButton from "../../components/button/SubmitButton";

function Signup({ onClose }) {
  const { createStaff, isCreatingStaff } = useCreateStaff();

  const methods = useForm({
    defaultValues: { role: null },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = methods;

  function onSubmit(data) {
    createStaff(
      { ...data, role: data.role.value },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
        onError: (error) => {
          if (error.code === "EMAIL_EXISTS") {
            setError(
              "email",
              { type: "server", message: error.message },
              { shouldFocus: true },
            );
            return;
          }

          showToast({
            type: "error",
            title: "註冊失敗",
            content: error.message,
          });
        },
      },
    );
  }

  return (
    <FormProvider {...methods}>
      <ModalContainer as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalFormSection columns={1} title="登入資訊">
            <FormInputField
              label="電子信箱"
              name="email"
              rules={{
                setValueAs: trimString,
                required: "此欄位必須填寫",
                validate: isValidEmail,
              }}
            />

            <FormPasswordField
              id="password"
              autoComplete="current-password"
              label="密碼"
              error={errors?.password}
              {...register("password", {
                required: "此欄位必須填寫",
                minLength: { value: 8, message: "密碼至少要有8碼" },
              })}
            />
          </ModalFormSection>

          <ModalFormSection columns={1} title="員工資料">
            <FormInputField
              label="用戶名稱"
              name="name"
              rules={{
                required: "此欄位必須填寫",
                maxLength: {
                  value: 20,
                  message: "用戶名稱長度必須在20個字元以內",
                },
                setValueAs: trimString,
              }}
            />

            <FormSelectField
              label="職位"
              name="role"
              options={[
                { label: "店長", value: "manager" },
                { label: "員工", value: "staff" },
              ]}
              rules={{
                required: "此欄位必須填寫",
              }}
            />

            <FormInputField
              label="連絡電話"
              name="personalPhone"
              rules={{
                setValueAs: trimString,
                required: "此欄位必須填寫",
                validate: (value) => validatePhoneNumber(value),
              }}
            />
          </ModalFormSection>
        </ModalContent>

        <ModalFooter>
          <SubmitButton
            fullWidth
            processing={isCreatingStaff}
            disabled={isCreatingStaff}
          >
            註冊
          </SubmitButton>
        </ModalFooter>
      </ModalContainer>
    </FormProvider>
  );
}

export default Signup;
