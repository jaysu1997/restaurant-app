// ok
import StatsCards from "../features/dashboard/components/StatsCards";
import StatsCharts from "../features/dashboard/components/StatsCharts";
import PageHeader from "../ui/PageHeader";
import styled from "styled-components";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import PageContainer from "../ui/PageContainer";
import { getDashboardStats } from "../features/dashboard/utils/getDashboardStats";
import useRecentOrders from "../hooks/data/orders/useRecentOrders";
import StoreStatusBadge from "../features/dashboard/components/StoreStatusBadge";

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

  // 取得數據後進行分析
  const analyzedData = getDashboardStats(recentOrders);

  return (
    <PageContainer>
      <PageHeader title="營運總覽">
        <StoreStatusBadge />
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
