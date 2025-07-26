import PageHeader from "../ui/PageHeader.jsx";
import styled from "styled-components";
import RegularBusinessHours from "../features/settings/RegularBusinessHours.jsx";
import SpecialBusinessHours from "../features/settings/SpecialBusinessHours.jsx";
import DineInTableSettings from "../features/settings/DineInTableSettings.jsx";
import StoreInfo from "../features/settings/StoreInfo.jsx";
import useGetSettings from "../hooks/data/settings/useGetSettings.js";
import { useForm } from "react-hook-form";
import { areIntervalsOverlapping, parseISO } from "date-fns";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 5.6rem;
  padding-bottom: 3.6rem;
`;

function Settings() {
  const { data, error, isPending, isSuccess, isError } = useGetSettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  function onError(error) {
    console.log(error);
  }

  // 之後這個拆掉
  if (isPending) return;

  return (
    <>
      <PageHeader title="店鋪設定" />

      <Container>
        <RegularBusinessHours data={data.regularOpenHours} />
        <SpecialBusinessHours data={data.specialOpenHours} />
        <DineInTableSettings />
        <StoreInfo />
      </Container>
    </>
  );
}

export default Settings;
