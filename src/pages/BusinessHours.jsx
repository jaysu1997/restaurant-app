import PageHeader from "../components/PageHeader.jsx";
import styled from "styled-components";
import RegularOpenHours from "../features/business-hours/components/RegularOpenHours.jsx";
import SpecialOpenHours from "../features/business-hours/components/SpecialOpenHours.jsx";
import QueryStatusFallback from "../components/QueryStatusFallback.jsx";
import PageContainer from "../components/PageContainer.jsx";
import useSettings from "../context/settings/useSettings.js";

const BusinessHoursLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  max-width: 60rem;
`;

function BusinessHours() {
  const { settingsQuery } = useSettings();

  return (
    <PageContainer $maxWidth="60rem">
      <PageHeader title="營業時間" />

      <BusinessHoursLayout>
        <QueryStatusFallback queries={[settingsQuery]}>
          <SpecialOpenHours settings={settingsQuery?.data} />
          <RegularOpenHours settings={settingsQuery?.data} />
        </QueryStatusFallback>
      </BusinessHoursLayout>
    </PageContainer>
  );
}

export default BusinessHours;
