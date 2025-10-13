import styled from "styled-components";
import ControlledInput from "../../ui-old/ControlledInput";
import { useForm } from "react-hook-form";
import SettingFormSection from "../../ui-old/SettingFormSection";
import FormErrorsMessage from "../../ui-old/FormErrorsMessage";
import useUpsertSettings from "../../hooks/data/settings/useUpsertSettings";
import StyledHotToast from "../../ui-old/StyledHotToast";

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  li {
    display: grid;
    grid-template-rows: auto 3.8rem 2rem;
    row-gap: 0.3rem;
    align-items: center;
  }

  label {
    padding-bottom: 0.3rem;
  }

  input {
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

function StoreInfo({ data = {} }) {
  const { mutate } = useUpsertSettings();

  const {
    control,
    formState: { isDirty, errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { storeInfo: data },
  });

  function onSubmit(data) {
    console.log("成功", data);

    mutate(data, {
      onSuccess: (newData) => reset({ storeInfo: newData.storeInfo }),
    });
  }

  function onError(error) {
    console.log("失敗", error);
    StyledHotToast({ type: "error", title: "設定更新失敗" });
  }

  return (
    <SettingFormSection
      title="店鋪資訊設定"
      description="設定店鋪的基本資訊，包含店鋪地址、聯絡方式、統一編號。"
      handleSubmit={handleSubmit(onSubmit, onError)}
      handleReset={() => reset({ storeInfo: data })}
      isDirty={isDirty}
    >
      <Content>
        <li>
          <label htmlFor="phone">連絡電話</label>
          <ControlledInput
            control={control}
            id="phone"
            name="storeInfo.phone"
            type="tel"
            placeholder="請輸入連絡電話"
            rules={{
              required: "連絡電話不能空白",
              validate: (value) => {
                const trimmed = value.trim();

                const isMobile = /^09\d{8}$/.test(trimmed);
                const isLandline = /^0[2-8]\d{7,8}$/.test(trimmed);

                if (!isMobile && !isLandline) {
                  return "請輸入正確的市話或手機號碼(純數字)";
                }

                return true;
              },
            }}
          />

          <FormErrorsMessage errors={errors?.storeInfo?.phone} />
        </li>

        <li>
          <label htmlFor="address">店鋪地址</label>
          <ControlledInput
            control={control}
            id="address"
            name="storeInfo.address"
            type="text"
            placeholder="請輸入店鋪地址"
            rules={{
              required: "店鋪地址不能空白",
            }}
          />

          <FormErrorsMessage errors={errors?.storeInfo?.address} />
        </li>

        <li>
          <label htmlFor="taxId">統一編號</label>
          <ControlledInput
            control={control}
            id="taxId"
            name="storeInfo.taxId"
            type="number"
            placeholder="請輸入統一編號"
            rules={{
              required: "統一編號不能空白",
              validate: (value) => {
                return /^\d{8}$/.test(value) || "統一編號格式錯誤";
              },
            }}
          />
          <FormErrorsMessage errors={errors?.storeInfo?.taxId} />
        </li>
      </Content>
    </SettingFormSection>
  );
}

export default StoreInfo;
