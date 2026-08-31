import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import useUpdateUserProfile from "../../hooks/data/auth/useUpdateUserProfile";
import SectionContainer from "../../components/SectionContainer";
import FormInputField from "../../components/FormInputField";
import { UserRoundPen } from "lucide-react";
import { trimString, validatePhoneNumber } from "../../utils/helpers";
import SectionForm from "../../components/SectionForm";

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

function UserProfileSetting({ userData }) {
  const { updateUserProfile, isUpdatingUserProfile } = useUpdateUserProfile();
  const { name, personalPhone } = userData;

  const methods = useForm({
    defaultValues: { name, personalPhone },
  });

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = methods;

  function onSubmit(data) {
    updateUserProfile(data, {
      onSuccess: (newData) => {
        // 消除field的focus狀態
        document.activeElement?.blur();

        const { name, personalPhone } = newData.user.user_metadata;
        reset({ name, personalPhone });
      },
    });
  }

  return (
    <FormProvider {...methods}>
      <SectionContainer header="個人資料" icon={<UserRoundPen />}>
        <SectionForm
          onSubmit={handleSubmit(onSubmit)}
          onReset={() => reset()}
          isDirty={isDirty}
          isProcessing={isUpdatingUserProfile}
        >
          <Fields>
            <FormInputField
              label="用戶名稱"
              name="name"
              rules={{
                setValueAs: trimString,
                required: "用戶名稱不可空白",
                maxLength: {
                  value: 20,
                  message: "名稱長度必須在20個字元以內",
                },
              }}
            />

            <FormInputField
              label="連絡電話"
              name="personalPhone"
              rules={{
                setValueAs: trimString,
                required: "連絡電話不能空白",
                validate: (value) => validatePhoneNumber(value),
              }}
            />
          </Fields>
        </SectionForm>
      </SectionContainer>
    </FormProvider>
  );
}

export default UserProfileSetting;
