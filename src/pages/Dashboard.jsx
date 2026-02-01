import StatsCards from "../features/dashboard/StatsCards";
import StatsCharts from "../features/dashboard/StatsCharts";
import PageHeader from "../ui/PageHeader";
import styled from "styled-components";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import useRecentOrders from "../hooks/data/orders/useRecentOrders";
import StoreStatusBadge from "../ui/StoreStatusBadge ";
import PageWrapper from "../ui/PageWrapper";
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
    <PageWrapper>
      <PageHeader title="營運總覽">
        <StoreStatusBadge
          isOpenNow={status.isOpenNow}
          tooltip={status.tooltip}
        />
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
    </PageWrapper>
  );
}

export default Dashboard;
