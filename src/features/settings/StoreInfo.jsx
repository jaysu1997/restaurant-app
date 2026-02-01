import styled from "styled-components";
import { useForm } from "react-hook-form";
import useSubmitSettings from "../../hooks/data/settings/useSubmitSettings";
import StyledHotToast from "../../ui/StyledHotToast";
import SectionContainer from "../../ui/SectionContainer";
import FormInput from "../../ui/FormInput";
import { Store } from "lucide-react";
import FormFieldLayout from "../../ui/FormFieldLayout";
import { trimString, validatePhoneNumber } from "../../utils/helpers";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.4rem;
`;

function StoreInfo({ settings }) {
  const { submitSettings, isSubmittingSettings } = useSubmitSettings();

  const { storeInfo } = settings;

  const {
    formState: { isDirty, errors },
    handleSubmit,
    reset,
    register,
  } = useForm({
    defaultValues: { storeInfo },
  });

  function onSubmit(data) {
    console.log("成功", data);

    submitSettings(data, {
      onSuccess: (newData) => reset({ storeInfo: newData.storeInfo }),
    });
  }

  function onError(error) {
    console.log("失敗", error);
    StyledHotToast({ type: "error", title: "設定更新失敗" });
  }

  return (
    <SectionContainer
      title="店鋪資訊設定"
      icon={<Store />}
      description="設定店鋪的基本資訊，包含店鋪地址、聯絡方式、統一編號。"
      form={{
        formId: "storeInfo",
        handleReset: () => reset(),
        isDirty,
        isProcessing: isSubmittingSettings,
      }}
    >
      <Form id="storeInfo" onSubmit={handleSubmit(onSubmit, onError)}>
        <FormFieldLayout
          id="phone"
          label="連絡電話"
          error={errors?.storeInfo?.phone}
        >
          <FormInput
            id="phone"
            type="tel"
            placeholder="請輸入連絡電話"
            {...register("storeInfo.phone", {
              setValueAs: trimString,
              required: "連絡電話不能空白",
              validate: (value) => validatePhoneNumber(value),
            })}
          />
        </FormFieldLayout>

        <FormFieldLayout
          id="address"
          label="店鋪地址"
          error={errors?.storeInfo?.address}
        >
          <FormInput
            id="address"
            placeholder="請輸入店鋪地址"
            {...register("storeInfo.address", {
              setValueAs: trimString,
              required: "店鋪地址不能空白",
            })}
          />
        </FormFieldLayout>

        <FormFieldLayout
          id="taxId"
          label="統一編號"
          error={errors?.storeInfo?.taxId}
        >
          <FormInput
            id="taxId"
            placeholder="請輸入統一編號"
            {...register("storeInfo.taxId", {
              setValueAs: trimString,
              required: "統一編號不能空白",
              validate: (value) => {
                return /^\d{8}$/.test(value) || "統一編號格式錯誤";
              },
            })}
          />
        </FormFieldLayout>
      </Form>
    </SectionContainer>
  );
}

export default StoreInfo;
