import PageHeader from "../components/PageHeader.jsx";
import styled from "styled-components";
import RegularOpenHours from "../features/settings/RegularOpenHours.jsx";
import SpecialOpenHours from "../features/settings/SpecialOpenHours.jsx";
import DineInTableSettings from "../features/settings/DineInTableSettings.jsx";
import StoreInfo from "../features/settings/StoreInfo.jsx";
import QueryStatusFallback from "../components/QueryStatusFallback.jsx";
import PageContainer from "../components/PageContainer.jsx";
import useSettings from "../context/settings/useSettings.js";

const SettingsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  width: 100%;
  max-width: 60rem;
`;

function Settings() {
  const { settingsQuery } = useSettings();

  return (
    <PageContainer $maxWidth="60rem">
      <PageHeader title="店鋪設定" />

      <SettingsLayout>
        <QueryStatusFallback queries={[settingsQuery]}>
          <RegularOpenHours settings={settingsQuery?.data} />
          <SpecialOpenHours settings={settingsQuery?.data} />
          <DineInTableSettings settings={settingsQuery?.data} />
          <StoreInfo settings={settingsQuery?.data} />
        </QueryStatusFallback>
      </SettingsLayout>
    </PageContainer>
  );
}

export default Settings;
