import PageHeader from "../ui/PageHeader.jsx";
import styled from "styled-components";
import RegularOpenHours from "../features/settings/RegularOpenHours.jsx";
import SpecialOpenHours from "../features/settings/SpecialOpenHours.jsx";
import DineInTableSettings from "../features/settings/DineInTableSettings.jsx";
import StoreInfo from "../features/settings/StoreInfo.jsx";
import QueryStatusFallback from "../ui/QueryStatusFallback.jsx";
import { useSettings } from "../context/SettingsContext.jsx";
import PageWrapper from "../ui/PageWrapper.jsx";

const SettingsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  width: 100%;
  max-width: 60rem;
`;

function Settings() {
  const { data, error, isPending, isError } = useSettings();

  return (
    <PageWrapper $maxWidth="60rem">
      <PageHeader title="店鋪設定" />

      <SettingsLayout>
        <QueryStatusFallback
          status={{
            isPending,
            isError,
          }}
          errorFallback={error}
        >
          <RegularOpenHours data={data.regularOpenHours} />
          <SpecialOpenHours data={data.specialOpenHours} />
          <DineInTableSettings data={data.dineInTableConfig} />
          <StoreInfo data={data.storeInfo} />
        </QueryStatusFallback>
      </SettingsLayout>
    </PageWrapper>
  );
}

export default Settings;
