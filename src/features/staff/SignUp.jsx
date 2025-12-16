import { UserRoundPlus } from "lucide-react";
import SectionContainer from "../../ui/SectionContainer";
import { FormProvider, useForm } from "react-hook-form";
import FormFieldLayout from "../../ui/FormFieldLayout";
import FormInput from "../../ui/FormInput";
import useCreateStaff from "../../hooks/data/staff/useCreateStaff";
import PasswordInput from "../../components/PasswordInput";
import Button from "../../ui/Button";
import ButtonSpinner from "../../ui/ButtonSpinner";
import styled from "styled-components";
import { validatePhoneNumber } from "../../utils/helpers";
import ControlledSelect from "../../ui-old/ControlledSelect";

const Footer = styled.footer`
  margin-top: 4rem;
`;

function SignUp() {
  const { createStaff, isPending } = useCreateStaff();

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
        onSuccess: () => reset(),
      }
    );
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <SectionContainer title="新增帳號" icon={<UserRoundPlus size={20} />}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormFieldLayout id="name" label="用戶名稱" error={errors?.name}>
            <FormInput
              id="name"
              disabled={isPending}
              {...register("name", {
                required: "此欄位必須填寫",
                maxLength: {
                  value: 20,
                  message: "用戶名稱長度必須在20個字元以內",
                },
                setValueAs: (value) => value.trim(),
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
              disabled={isPending}
            />
          </FormFieldLayout>

          <FormFieldLayout label="電子信箱" id="email" error={errors?.email}>
            <FormInput
              id="email"
              disabled={isPending}
              {...register("email", {
                required: "此欄位必須填寫",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "信箱格式錯誤",
                },
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
              disabled={isPending}
              {...register("personalPhone", {
                required: "此欄位必須填寫",
                validate: (value) => validatePhoneNumber(value),
              })}
            />
          </FormFieldLayout>

          <FormFieldLayout label="密碼" id="password" error={errors?.password}>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              disabled={isPending}
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
              $isLoading={isPending}
              disabled={isPending}
            >
              <span>註冊</span>
              {isPending && <ButtonSpinner />}
            </Button>
          </Footer>
        </form>
      </FormProvider>
    </SectionContainer>
  );
}

export default SignUp;
