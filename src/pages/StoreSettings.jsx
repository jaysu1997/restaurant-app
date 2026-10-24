import PageHeader from "../components/PageHeader.jsx";
import styled from "styled-components";
import DineInTableSettings from "../features/store-settings/components/DineInTableSettings.jsx";
import StoreInfo from "../features/store-settings/components/StoreInfo.jsx";
import QueryStatusFallback from "../components/QueryStatusFallback.jsx";
import PageContainer from "../components/PageContainer.jsx";
import useSettings from "../context/settings/useSettings.js";

const StoreSettingsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  max-width: 60rem;
`;

function StoreSettings() {
  const { settingsQuery } = useSettings();

  return (
    <PageContainer $maxWidth="60rem">
      <PageHeader title="店鋪設定" />

      <StoreSettingsLayout>
        <QueryStatusFallback queries={[settingsQuery]}>
          <DineInTableSettings settings={settingsQuery?.data} />
          <StoreInfo settings={settingsQuery?.data} />
        </QueryStatusFallback>
      </StoreSettingsLayout>
    </PageContainer>
  );
}

export default StoreSettings;
