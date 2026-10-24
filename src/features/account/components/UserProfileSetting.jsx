import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import useUpdateUserProfile from "../../../hooks/data/auth/useUpdateUserProfile.js";
import SectionContainer from "../../../components/SectionContainer.jsx";
import FormInputField from "../../../components/FormInputField.jsx";
import { trimString } from "../../../utils/text.js";
import { validatePhoneNumber } from "../../../utils/validation.js";

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  font-size: var(--font-size-sm);
  padding: 3.2rem 2.4rem;
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
      <SectionContainer
        headerPlacement="outside"
        title="個人資料"
        description="管理你的名稱與聯絡電話。"
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()}
        isDirty={isDirty}
        isProcessing={isUpdatingUserProfile}
      >
        <FormFields>
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
        </FormFields>
      </SectionContainer>
    </FormProvider>
  );
}

export default UserProfileSetting;
