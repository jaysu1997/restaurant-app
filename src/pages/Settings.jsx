import { useForm } from "react-hook-form";
import PageHeader from "../ui/PageHeader.jsx";
import styled from "styled-components";
import RegularBusinessHours from "../features/settings/RegularBusinessHours.jsx";
import SpecialBusinessHours from "../features/settings/SpecialBusinessHours.jsx";
import DineInTableSettings from "../features/settings/DineInTableSettings.jsx";
import StoreInfo from "../features/settings/StoreInfo.jsx";
import useGetSettings from "../hooks/data/settings/useGetSettings.js";
import useUpsertSetting from "../hooks/data/settings/useUpsertSetting.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 2.8rem;
  padding-bottom: 3.6rem;
`;

function Settings() {
  const { data, error, isPending, isSuccess, isError } = useGetSettings();

  // 之後這個拆掉
  if (isPending) return;

  return (
    <>
      <PageHeader title="店鋪設定" />

      <Container>
        <RegularBusinessHours data={data.regularOpenHours} />

        <SpecialBusinessHours data={data.specialOpenHours} />

        <DineInTableSettings />

        {/* <StoreInfo /> */}
      </Container>
    </>
  );
}

export default Settings;
