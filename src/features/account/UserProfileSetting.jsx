import styled from "styled-components";
import { useForm } from "react-hook-form";
import useUpdateUserProfile from "../../hooks/data/auth/useUpdateUserProfile";
import StyledHotToast from "../../ui/StyledHotToast";
import SectionContainer from "../../ui/SectionContainer";
import FormInput from "../../ui/FormInput";
import { UserRoundPen } from "lucide-react";
import FormFieldLayout from "../../ui/FormFieldLayout";
import { trimString, validatePhoneNumber } from "../../utils/helpers";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.4rem;

  label {
    color: #525252;
    font-weight: 500;
  }
`;

function UserProfileSetting({ userData }) {
  const { updateUserProfile, isUpdateUserProfile } = useUpdateUserProfile();
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
    updateUserProfile(data, {
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
      icon={<UserRoundPen />}
      form={{
        formId: "userProfile",
        handleReset: () => reset(),
        isDirty: isDirty,
        isProcessing: isUpdateUserProfile,
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit, onError)} id="userProfile">
        <FormFieldLayout id="name" label="用戶名稱" error={errors?.name}>
          <FormInput
            id="name"
            {...register("name", {
              setValueAs: trimString,
              required: "用戶名稱不可空白",
              maxLength: {
                value: 20,
                message: "名稱長度必須在20個字元以內",
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
            {...register("personalPhone", {
              setValueAs: trimString,
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
