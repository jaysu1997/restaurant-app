import StatsCards from "../features/dashboard/StatsCards";
import StatsCharts from "../features/dashboard/StatsCharts";
import PageHeader from "../ui/PageHeader";
import styled from "styled-components";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import useAnalyzedOrders from "../hooks/data/orders/useAnalyzedOrders";
import StoreStatusBadge from "../ui/StoreStatusBadge ";
import { useSettings } from "../context/SettingsContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  width: 100%;
`;

function Dashboard() {
  const { analyzedData, isPending, isError, error } = useAnalyzedOrders();

  const { status } = useSettings();

  return (
    <>
      <PageHeader title="營運總覽">
        <StoreStatusBadge
          isOpenNow={status.isOpenNow}
          tooltip={status.tooltip}
        />
      </PageHeader>

      <QueryStatusFallback
        status={{
          isPending,
          isError,
        }}
        errorFallback={error}
      >
        <Container>
          <StatsCards analyzedData={analyzedData} />
          <StatsCharts analyzedData={analyzedData} />
        </Container>
      </QueryStatusFallback>
    </>
  );
}

export default Dashboard;
