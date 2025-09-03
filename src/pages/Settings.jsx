import PageHeader from "../ui/PageHeader.jsx";
import styled from "styled-components";
import RegularOpenHours from "../features/settings/RegularOpenHours.jsx";
import SpecialOpenHours from "../features/settings/SpecialOpenHours.jsx";
import DineInTableSettings from "../features/settings/DineInTableSettings.jsx";
import StoreInfo from "../features/settings/StoreInfo.jsx";
import QueryStatusFallback from "../ui/QueryStatusFallback.jsx";
import { useSettings } from "../context/SettingsContext.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4rem;
  padding-bottom: 3.6rem;
`;

function Settings() {
  const { data, settingsError, settingsIsPending, settingsIsError } =
    useSettings();

  return (
    <>
      <PageHeader title="店鋪設定" />

      <QueryStatusFallback
        isPending={settingsIsPending}
        isError={settingsIsError}
        error={settingsError}
      >
        <Container>
          <RegularOpenHours data={data.regularOpenHours} />
          <SpecialOpenHours data={data.specialOpenHours} />
          <DineInTableSettings data={data.dineInTableConfig} />
          <StoreInfo data={data.storeInfo} />
        </Container>
      </QueryStatusFallback>
    </>
  );
}

export default Settings;
