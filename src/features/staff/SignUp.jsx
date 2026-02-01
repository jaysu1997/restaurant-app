import { FormProvider, useForm } from "react-hook-form";
import FormFieldLayout from "../../ui/FormFieldLayout";
import FormInput from "../../ui/FormInput";
import useCreateStaff from "../../hooks/data/staff/useCreateStaff";
import PasswordInput from "../../components/PasswordInput";
import Button from "../../ui/Button";
import ButtonSpinner from "../../ui/ButtonSpinner";
import styled from "styled-components";
import { trimString, validatePhoneNumber } from "../../utils/helpers";
import ControlledSelect from "../../ui/ControlledSelect";
import { isValidEmail } from "../../utils/validation";

const Form = styled.form`
  max-width: 100%;
  width: 36rem;
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  padding: 2rem;

  label {
    color: #525252;
    font-weight: 500;
  }
`;

const Footer = styled.footer`
  margin-top: 4rem;
`;

function Signup({ setIsOpenModal }) {
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
          setIsOpenModal(false);
        },
      },
    );
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormFieldLayout id="name" label="用戶名稱" error={errors?.name}>
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

        <FormFieldLayout id="role" label="職位" error={errors?.role}>
          <ControlledSelect
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
          id="personalPhone"
          label="連絡電話"
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

        <FormFieldLayout label="密碼" id="password" error={errors?.password}>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            {...register("password", {
              required: "此欄位必須填寫",
              minLength: { value: 8, message: "密碼至少要有8碼" },
            })}
          />
        </FormFieldLayout>

        <Footer>
          <Button
            type="submit"
            $isFullWidth={true}
            $isProcessing={isCreatingStaff}
            disabled={isCreatingStaff}
          >
            <span>註冊</span>
            {isCreatingStaff && <ButtonSpinner />}
          </Button>
        </Footer>
      </Form>
    </FormProvider>
  );
}

export default Signup;
