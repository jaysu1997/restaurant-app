import styled from "styled-components";
import { useForm } from "react-hook-form";
import useUpdateUserProfile from "../../hooks/data/auth/useUpdateUserProfile";
import StyledHotToast from "../../ui-old/StyledHotToast";
import SectionContainer from "../../ui/SectionContainer";
import FormInput from "../../ui/FormInput";
import { UserRoundPen } from "lucide-react";
import FormFieldLayout from "../../ui/FormFieldLayout";
import { validatePhoneNumber } from "../../utils/helpers";

// 以下這些ui或許都能夠做成重複使用的版本
const Form = styled.form`
  display: grid;
  grid-template-rows: auto auto;
  column-gap: 1rem;
  row-gap: 0.4rem;
  font-size: 1.4rem;
`;

function UserProfileSetting({ userData }) {
  const { mutate, isPending } = useUpdateUserProfile();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      name: userData?.user_metadata?.name,
      personalPhone: userData?.user_metadata?.personalPhone,
    },
  });

  function onSubmit(data) {
    mutate(data, {
      onSuccess: (newData) =>
        reset({
          name: newData.user.user_metadata.name,
          personalPhone: newData.user.user_metadata.personalPhone,
        }),
    });
  }

  function onError(error) {
    console.log(error);
    StyledHotToast({ type: "error", title: "個人資料更新失敗" });
  }

  return (
    <SectionContainer
      title="個人資料"
      icon={<UserRoundPen size={20} />}
      form={{
        formId: "userProfile",
        handleReset: () => reset(),
        isDirty: isDirty,
        isUpdating: isPending,
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit, onError)} id="userProfile">
        <FormFieldLayout id="name" label="用戶名稱" error={errors?.name}>
          <FormInput
            id="name"
            disabled={isPending}
            {...register("name", {
              required: "用戶名稱不可空白",
              maxLength: {
                value: 20,
                message: "名稱長度必須在20個字元以內",
              },
              setValueAs: (value) => value.trim(),
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
              required: "連絡電話不能空白",
              validate: (value) => validatePhoneNumber(value),
            })}
          />
        </FormFieldLayout>
      </Form>
    </SectionContainer>
  );
}

export default UserProfileSetting;
