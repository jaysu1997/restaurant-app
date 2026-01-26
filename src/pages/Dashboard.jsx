import StatsCards from "../features/dashboard/StatsCards";
import StatsCharts from "../features/dashboard/StatsCharts";
import PageHeader from "../ui/PageHeader";
import styled from "styled-components";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import useAnalyzedOrders from "../hooks/data/orders/useAnalyzedOrders";
import StoreStatusBadge from "../ui/StoreStatusBadge ";
import { useSettings } from "../context/SettingsContext";
import PageWrapper from "../ui/PageWrapper";
import { useMemo } from "react";
import analyzeOrders from "../features/dashboard/analyzeOrders";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  width: 100%;
`;

function Dashboard() {
  const { data, isPending, isError, error } = useAnalyzedOrders();

  const { status } = useSettings();

  // 取得數據後進行分析
  const analyzedData = useMemo(() => {
    if (!data) return null;

    return analyzeOrders(data);
  }, [data]);

  return (
    <PageWrapper>
      <PageHeader title="營運總覽">
        <StoreStatusBadge
          isOpenNow={status.isOpenNow}
          tooltip={status.tooltip}
        />
      </PageHeader>

      <QueryStatusFallback
        status={{ isPending, isError }}
        errorFallback={error}
      >
        <DashboardContainer>
          <StatsCards analyzedData={analyzedData} />
          <StatsCharts analyzedData={analyzedData} />
        </DashboardContainer>
      </QueryStatusFallback>
    </PageWrapper>
  );
}

export default Dashboard;
