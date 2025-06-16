import StatsCards from "../features/dashboard/StatsCards";
import StatsCharts from "../features/dashboard/StatsCharts";
import PageHeader from "../ui/PageHeader";
import styled from "styled-components";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import useGetOrders from "../hooks/data/orders/useGetOrders";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

function Dashboard() {
  const { ordersData, ordersIsPending, ordersError, ordersIsError } =
    useGetOrders();

  return (
    <>
      <PageHeader title="營運總覽" />
      <QueryStatusFallback
        isPending={ordersIsPending}
        isError={ordersIsError}
        error={ordersError}
      >
        <Container>
          <StatsCards ordersData={ordersData} />
          <StatsCharts ordersData={ordersData} />
        </Container>
      </QueryStatusFallback>
    </>
  );
}

export default Dashboard;
