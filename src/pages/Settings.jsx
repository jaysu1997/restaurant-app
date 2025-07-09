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

const SettingSection = styled.section`
  background: #fff;
  border: 1px solid #dfdfdf;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
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
        <SettingSection>
          <RegularBusinessHours control={control} />
        </SettingSection>

        <SettingSection>
          <SpecialBusinessHours control={control} />
        </SettingSection>

        <SettingSection>
          <DineInTableSettings control={control} />
        </SettingSection>

        <SettingSection>
          <StoreInfo control={control} />
        </SettingSection>
      </Container>
    </>
  );
}

export default Settings;
