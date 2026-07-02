import { FormProvider, useForm } from "react-hook-form";
import FormFieldLayout from "../../components/FormFieldLayout";
import FormInput from "../../components/FormInput";
import useCreateStaff from "../../hooks/data/staff/useCreateStaff";
import PasswordInput from "../../components/PasswordInput";
import Button from "../../components/button/Button";
import ButtonSpinner from "../../ui/ButtonSpinner";
import { trimString, validatePhoneNumber } from "../../utils/helpers";
import ControlledSelect from "../../ui/ControlledSelect";
import { isValidEmail } from "../../utils/validation";
import {
  ModalContainer,
  ModalContent,
  ModalFooter,
} from "../../components/modal/ModalBody";
import ModalFormSection from "../../components/modal/ModalFormSection";

function Signup({ onClose }) {
  const { createStaff, isCreatingStaff } = useCreateStaff();

  const methods = useForm({
    defaultValues: {
      role: null,
    },
  });

  const {
    register,
    handleSubmit,
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
      },
    );
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <FormProvider {...methods}>
      <ModalContainer as="form" onSubmit={handleSubmit(onSubmit, onError)}>
        <ModalContent>
          <ModalFormSection
            columns={1}
            title="登入資訊"
            descriptions={["員工將使用此電子信箱與密碼登入系統"]}
          >
            <FormFieldLayout label="電子信箱" id="email" error={errors?.email}>
              <FormInput
                id="email"
                {...register("email", {
                  setValueAs: trimString,
                  required: "此欄位必須填寫",
                  validate: isValidEmail,
                })}
              />
            </FormFieldLayout>

            <FormFieldLayout
              label="密碼"
              id="password"
              error={errors?.password}
            >
              <PasswordInput
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "此欄位必須填寫",
                  minLength: { value: 8, message: "密碼至少要有8碼" },
                })}
              />
            </FormFieldLayout>
          </ModalFormSection>

          <ModalFormSection columns={1} title="員工資料">
            <FormFieldLayout label="用戶名稱" id="name" error={errors?.name}>
              <FormInput
                id="name"
                {...register("name", {
                  required: "此欄位必須填寫",
                  maxLength: {
                    value: 20,
                    message: "用戶名稱長度必須在20個字元以內",
                  },
                  setValueAs: trimString,
                })}
              />
            </FormFieldLayout>

            <FormFieldLayout label="職位" id="role" error={errors?.role}>
              <ControlledSelect
                inputId="role"
                name="role"
                options={[
                  { label: "店長", value: "店長" },
                  { label: "員工", value: "員工" },
                ]}
                rules={{
                  required: "此欄位必須填寫",
                }}
              />
            </FormFieldLayout>

            <FormFieldLayout
              label="連絡電話"
              id="personalPhone"
              error={errors?.personalPhone}
            >
              <FormInput
                id="personalPhone"
                {...register("personalPhone", {
                  setValueAs: trimString,
                  required: "此欄位必須填寫",
                  validate: (value) => validatePhoneNumber(value),
                })}
              />
            </FormFieldLayout>
          </ModalFormSection>
        </ModalContent>

        <ModalFooter>
          <Button
            type="submit"
            $isFullWidth={true}
            $isProcessing={isCreatingStaff}
            disabled={isCreatingStaff}
          >
            <span>註冊</span>
            {isCreatingStaff && <ButtonSpinner />}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </FormProvider>
  );
}

export default Signup;
