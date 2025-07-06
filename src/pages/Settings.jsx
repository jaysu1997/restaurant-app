import { useFieldArray, useForm } from "react-hook-form";
import useSignUp from "../hooks/data/auth/useSignUp.js";
import useSignIn from "../hooks/data/auth/useSignin.js";
import PageHeader from "../ui/PageHeader.jsx";
import styled from "styled-components";
import { useRef, useState } from "react";
import useClickOutside from "../hooks/ui/useClickOutside.js";
import RegularBusinessHours from "../features/settings/RegularBusinessHours.jsx";
import SpecialBusinessHours from "../features/settings/SpecialBusinessHours.jsx";
import DineInTableSettings from "../features/settings/DineInTableSettings.jsx";
import StoreInfo from "../features/settings/StoreInfo.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 2.8rem;
  padding-bottom: 3.6rem;
`;

function Settings() {
  const [selectedDate, setSelectedDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);

  useClickOutside(datePickerRef, isOpen, setIsOpen, true);
  const { mutate } = useSignUp();
  const { logIn } = useSignIn();
  const { register, handleSubmit, reset, control } = useForm();
  const { fields, remove, prepend } = useFieldArray({
    control,
    name: "customize",
  });

  function onSubmit(data) {
    const { email, password } = data;

    logIn({ email, password }, { onSettled: () => reset() });
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <>
      <PageHeader title="店鋪設定" />

      <Container>
        <RegularBusinessHours control={control} />
        <SpecialBusinessHours control={control} />
        <DineInTableSettings control={control} />
        <StoreInfo control={control} />
      </Container>
    </>
  );
}

export default Settings;

// 模組名稱	說明文字（副標）
// 一般營業時間	設定每週固定的營業時間，系統將依此顯示開店與關店狀態。
// 特殊營業時間	當遇到節日、活動或臨時變更，可在此指定某天為公休或營業，以覆蓋平日設定。
// 內用桌號設定	設定店內的桌號配置與區域分類，用於點餐時標記桌位，無即時座位管理功能。
// 店鋪基本資訊	編輯店鋪名稱、地址與聯絡方式，部分資訊將可能顯示在前台或訂單頁。
