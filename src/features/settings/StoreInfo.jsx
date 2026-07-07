import styled from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import useSubmitSettings from "../../hooks/data/settings/useSubmitSettings";
import SectionContainer from "../../components/SectionContainer";
import FormInputField from "../../components/FormInputField";
import { Store } from "lucide-react";
import { trimString, validatePhoneNumber } from "../../utils/helpers";

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
    console.log("成功", data);

    submitSettings(data, {
      onSuccess: (newData) => reset({ storeInfo: newData.storeInfo }),
    });
  }

  return (
    <FormProvider {...methods}>
      <SectionContainer
        header={{
          title: "店鋪資訊設定",
          icon: <Store />,
          description: "設定店鋪的基本資訊，包含店鋪地址、聯絡方式、統一編號。",
        }}
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()}
        isDirty={isDirty}
        isProcessing={isSubmittingSettings}
      >
        <Fields>
          <FormInputField
            label="連絡電話"
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
        </Fields>
      </SectionContainer>
    </FormProvider>
  );
}

export default StoreInfo;
