import StatsCards from "../features/dashboard/StatsCards";
import StatsCharts from "../features/dashboard/StatsCharts";
import PageHeader from "../ui/PageHeader";
import styled from "styled-components";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import useRecentOrders from "../hooks/data/orders/useRecentOrders";
import StoreStatusBadge from "../ui/StoreStatusBadge ";
import PageContainer from "../ui/PageContainer";
import { useMemo } from "react";
import analyzeOrders from "../features/dashboard/analyzeOrders";
import useSettings from "../context/settings/useSettings";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  width: 100%;
`;

function Dashboard() {
  const {
    recentOrders,
    recentOrdersIsLoading,
    recentOrdersIsError,
    recentOrdersError,
  } = useRecentOrders();

  const { status } = useSettings();

  // 取得數據後進行分析
  const analyzedData = useMemo(() => {
    if (!recentOrders) return null;

    return analyzeOrders(recentOrders);
  }, [recentOrders]);

  return (
    <PageContainer>
      <PageHeader title="營運總覽">
        <StoreStatusBadge status={status} />
      </PageHeader>

      <QueryStatusFallback
        status={{
          isLoading: recentOrdersIsLoading,
          isError: recentOrdersIsError,
        }}
        errorFallback={recentOrdersError}
      >
        <DashboardContainer>
          <StatsCards analyzedData={analyzedData} />
          <StatsCharts analyzedData={analyzedData} />
        </DashboardContainer>
      </QueryStatusFallback>
    </PageContainer>
  );
}

export default Dashboard;
