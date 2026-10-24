import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import useSubmitSettings from "../../../hooks/data/settings/useSubmitSettings";
import SectionContainer from "../../../components/SectionContainer";
import FormInputField from "../../../components/FormInputField";
import { trimString } from "../../../utils/text.js";
import { validatePhoneNumber } from "../../../utils/validation.js";

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  font-size: var(--font-size-sm);
  padding: 3.2rem 2.4rem;
`;

function StoreInfo({ settings }) {
  const { submitSettings, isSubmittingSettings } = useSubmitSettings();

  const { storeInfo } = settings;

  const methods = useForm({
    defaultValues: { storeInfo },
  });

  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = methods;

  function onSubmit(data) {
    submitSettings(data, {
      onSuccess: (newData) => reset({ storeInfo: newData.storeInfo }),
    });
  }

  return (
    <FormProvider {...methods}>
      <SectionContainer
        headerPlacement="outside"
        title="店鋪基本資訊"
        description="設定店鋪的聯絡電話、地址與統一編號。"
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()}
        isDirty={isDirty}
        isProcessing={isSubmittingSettings}
      >
        <FormFields>
          <FormInputField
            label="聯絡電話"
            name="storeInfo.phone"
            type="tel"
            placeholder="請輸入連絡電話"
            rules={{
              setValueAs: trimString,
              required: "連絡電話不能空白",
              validate: (value) => validatePhoneNumber(value),
            }}
          />

          <FormInputField
            label="店鋪地址"
            name="storeInfo.address"
            placeholder="請輸入店鋪地址"
            rules={{
              setValueAs: trimString,
              required: "店鋪地址不能空白",
            }}
          />

          <FormInputField
            label="統一編號"
            name="storeInfo.taxId"
            placeholder="請輸入統一編號"
            rules={{
              setValueAs: trimString,
              required: "統一編號不能空白",
              validate: (value) => {
                return /^\d{8}$/.test(value) || "統一編號格式錯誤";
              },
            }}
          />
        </FormFields>
      </SectionContainer>
    </FormProvider>
  );
}

export default StoreInfo;
