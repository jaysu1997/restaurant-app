import styled from "styled-components";
import ControlledInput from "../../ui/ControlledInput";
import { useForm } from "react-hook-form";
import SettingFormSection from "../../ui/SettingFormSection";
import FormErrorsMessage from "../../ui/FormErrorsMessage";

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  li {
    display: grid;
    grid-template-columns: 6rem 1fr 6rem 1fr 2rem 2rem;
    grid-auto-rows: auto;
    row-gap: 1rem;
    column-gap: 2rem;
    align-items: center;
  }

  input {
    border: 1px solid #ccc;
    border-radius: 6px;
  }
`;

function StoreInfo() {
  const data = {
    name: "小王餐廳",
    phone: "0912345678",
    address: "台北市中山區xx路100號",
    taxId: "12345678",
  };
  const {
    control,
    formState: { isDirty, errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: data,
  });

  function onSubmit(data) {
    console.log("成功", data);
  }

  function onError(error) {
    console.log("失敗", error);
  }

  return (
    <SettingFormSection
      title="店鋪資訊設定"
      description="設定店鋪的基本資訊，包含店鋪名稱、地址、聯絡方式、統一編號，部分資訊將可能顯示在前台或訂單頁。"
      handleSubmit={handleSubmit(onSubmit, onError)}
      handleReset={() => reset({ regularOpenHours: data })}
      isDirty={isDirty}
    >
      <Content>
        <li>
          <label>分店名稱</label>
          <ControlledInput
            control={control}
            name="name"
            type="text"
            placeholder="請輸入分店名稱"
            rules={{
              required: "分店名稱不能空白",
            }}
          />
          <FormErrorsMessage fieldName={errors?.name} />
          <label>連絡電話</label>
          <ControlledInput
            control={control}
            name="phone"
            type="number"
            placeholder="請輸入連絡電話"
            rules={{
              required: "連絡電話不能空白",
            }}
          />
        </li>
        <li>
          <label>店鋪地址</label>
          <ControlledInput
            control={control}
            name="address"
            type="text"
            placeholder="請輸入店鋪地址"
            rules={{
              required: "店鋪地址不能空白",
            }}
          />
          <label>統一編號</label>
          <ControlledInput
            control={control}
            name="taxId"
            type="number"
            placeholder="請輸入統一編號"
            rules={{
              required: "統一編號不能空白",
            }}
          />
        </li>
      </Content>
    </SettingFormSection>
  );
}

export default StoreInfo;
