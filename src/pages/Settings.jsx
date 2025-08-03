import PageHeader from "../ui/PageHeader.jsx";
import styled from "styled-components";
import RegularBusinessHours from "../features/settings/RegularBusinessHours.jsx";
import SpecialBusinessHours from "../features/settings/SpecialBusinessHours.jsx";
import DineInTableSettings from "../features/settings/DineInTableSettings.jsx";
import StoreInfo from "../features/settings/StoreInfo.jsx";
import QueryStatusFallback from "../ui/QueryStatusFallback.jsx";
import { useSettings } from "../context/SettingsContext.jsx";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 4rem;
  padding-bottom: 3.6rem;
`;

function Settings() {
  const { data, error, isPending, isError } = useSettings();

  return (
    <>
      <PageHeader title="店鋪設定" />

      <QueryStatusFallback
        isPending={isPending}
        isError={isError}
        error={error}
      >
        <Container>
          <RegularBusinessHours data={data.regularOpenHours} />
          <SpecialBusinessHours data={data.specialOpenHours} />
          <DineInTableSettings data={data.dineInTableConfig} />
          <StoreInfo data={data.storeInfo} />
        </Container>
      </QueryStatusFallback>
    </>
  );
}

export default Settings;
