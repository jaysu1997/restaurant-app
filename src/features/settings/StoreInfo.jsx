import styled from "styled-components";
import ControlledInput from "../../ui/ControlledInput";
import { useForm } from "react-hook-form";
import SettingFormSection from "../../ui/SettingFormSection";
import FormErrorsMessage from "../../ui/FormErrorsMessage";
import useUpsertSettings from "../../hooks/data/settings/useUpsertSettings";
import StyledHotToast from "../../ui/StyledHotToast";

const Content = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  column-gap: 2.4rem;
  row-gap: 0.4rem;

  li {
    display: grid;
    grid-template-columns: 6rem 1fr;
    grid-auto-rows: 3.8rem 2rem;
    row-gap: 0.4rem;
    column-gap: 2rem;
    align-items: center;
  }

  input {
    border: 1px solid #ccc;
    border-radius: 6px;
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
      description="設定店鋪的基本資訊，包含店鋪名稱、地址、聯絡方式、統一編號。"
      handleSubmit={handleSubmit(onSubmit, onError)}
      handleReset={() => reset({ storeInfo: data })}
      isDirty={isDirty}
    >
      <Content>
        <li>
          <label>分店名稱</label>
          <ControlledInput
            control={control}
            name="storeInfo.name"
            type="text"
            placeholder="請輸入分店名稱"
            rules={{
              required: "分店名稱不能空白",
            }}
          />

          <FormErrorsMessage
            fieldName={errors?.storeInfo?.name}
            gridColumn="2"
          />
        </li>

        <li>
          <label>連絡電話</label>
          <ControlledInput
            control={control}
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

          <FormErrorsMessage
            fieldName={errors?.storeInfo?.phone}
            gridColumn="2"
          />
        </li>

        <li>
          <label>店鋪地址</label>
          <ControlledInput
            control={control}
            name="storeInfo.address"
            type="text"
            placeholder="請輸入店鋪地址"
            rules={{
              required: "店鋪地址不能空白",
            }}
          />

          <FormErrorsMessage
            fieldName={errors?.storeInfo?.address}
            gridColumn="2"
          />
        </li>

        <li>
          <label>統一編號</label>
          <ControlledInput
            control={control}
            name="storeInfo.taxId"
            type="text"
            placeholder="請輸入統一編號"
            rules={{
              required: "統一編號不能空白",
              validate: (value) => {
                return /^\d{8}$/.test(value) || "統一編號格式錯誤";
              },
            }}
          />

          <FormErrorsMessage
            fieldName={errors?.storeInfo?.taxId}
            gridColumn="2"
          />
        </li>
      </Content>
    </SettingFormSection>
  );
}

export default StoreInfo;
