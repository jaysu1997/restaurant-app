import { useForm } from "react-hook-form";
import PageHeader from "../ui/PageHeader.jsx";
import styled from "styled-components";
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
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <>
      <PageHeader title="店鋪設定" />

      <Container>
        <RegularBusinessHours />

        {/* <SpecialBusinessHours control={control} /> */}

        {/* <DineInTableSettings control={control} /> */}

        {/* <StoreInfo /> */}
      </Container>
    </>
  );
}

export default Settings;
