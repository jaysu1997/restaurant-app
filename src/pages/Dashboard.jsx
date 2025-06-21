import StatsCards from "../features/dashboard/StatsCards";
import StatsCharts from "../features/dashboard/StatsCharts";
import PageHeader from "../ui/PageHeader";
import styled from "styled-components";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import analyzeOrders from "../features/dashboard/analyzeOrders";
import useAnalyzedOrders from "../hooks/data/orders/useAnalyzedOrders";
import useGetSettings from "../hooks/data/settings/useGetSettings";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  padding-bottom: 3.6rem;
`;

function Dashboard() {
  const { ordersData, ordersIsPending, ordersError, ordersIsError } =
    useAnalyzedOrders();

  const { data } = useGetSettings();

  return (
    <>
      <PageHeader title="營運總覽" />
      <QueryStatusFallback
        isPending={ordersIsPending}
        isError={ordersIsError}
        error={ordersError}
        render={() => {
          analyzeOrders(ordersData);

          return (
            <Container>
              <StatsCards ordersData={ordersData} />
              <StatsCharts ordersData={ordersData} />
            </Container>
          );
        }}
      ></QueryStatusFallback>
    </>
  );
}

export default Dashboard;
