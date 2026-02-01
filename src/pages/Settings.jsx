import PageHeader from "../ui/PageHeader.jsx";
import styled from "styled-components";
import RegularOpenHours from "../features/settings/RegularOpenHours.jsx";
import SpecialOpenHours from "../features/settings/SpecialOpenHours.jsx";
import DineInTableSettings from "../features/settings/DineInTableSettings.jsx";
import StoreInfo from "../features/settings/StoreInfo.jsx";
import QueryStatusFallback from "../ui/QueryStatusFallback.jsx";
import PageWrapper from "../ui/PageWrapper.jsx";
import useSettings from "../context/settings/useSettings.js";

const SettingsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  width: 100%;
  max-width: 60rem;
`;

function Settings() {
  const { settings, settingsError, settingsIsLoading, settingsIsError } =
    useSettings();

  return (
    <PageWrapper $maxWidth="60rem">
      <PageHeader title="店鋪設定" />

      <SettingsLayout>
        <QueryStatusFallback
          status={{
            isLoading: settingsIsLoading,
            isError: settingsIsError,
          }}
          errorFallback={settingsError}
        >
          <RegularOpenHours settings={settings} />
          <SpecialOpenHours settings={settings} />
          <DineInTableSettings settings={settings} />
          <StoreInfo settings={settings} />
        </QueryStatusFallback>
      </SettingsLayout>
    </PageWrapper>
  );
}

export default Settings;
