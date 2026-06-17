// ok
import styled from "styled-components";
import useGetPaginatedOrders from "../hooks/data/orders/useGetPaginatedOrders";
import Filter from "../components/Filter/Filter";
import PageHeader from "../components/PageHeader";
import PageContainer from "../components/PageContainer";
import Pagination from "../ui/Pagination";
import QueryStatusFallback from "../components/QueryStatusFallback";
import OrdersListDesktop from "../features/orders/components/OrdersList/OrdersListDesktop";
import { hasActiveFilters, parseFilterQuery } from "../utils/filterHelpers";
import { useSearchParams } from "react-router";
import OrdersListMobile from "../features/orders/components/OrdersList/OrdersListMobile";

const OrdersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

function Orders() {
  const [searchParams] = useSearchParams();
  const ordersQuery = useGetPaginatedOrders();
  const { isPending, data: { ordersData = [], page = 1, maxPage = 1 } = {} } =
    ordersQuery;

  const filtersConfig = [
    {
      title: "取餐號碼",
      type: "numberInput",
      queryKey: "pickupNumber",
      placeholder: "搜尋取餐號碼(不含#)",
    },
    {
      title: "訂單建立時間",
      type: "datePicker",
      queryKey: "createdAt",
    },
  ];

  const filterState = parseFilterQuery(searchParams, filtersConfig);
  const hasAppliedFilters = hasActiveFilters(filterState);

  // 沒有符合篩選條件的數據
  const hasNoData = ordersData.length === 0;
  // 數據庫完全沒有任何訂單數據
  const hasNoOrders = !hasAppliedFilters && !isPending && hasNoData;

  const emptyStateMessage = hasAppliedFilters
    ? "查無符合當前篩選條件的訂單數據。"
    : "目前沒有任何已經建立的訂單數據。";

  return (
    <PageContainer>
      <PageHeader title="訂單管理">
        {!hasNoOrders && (
          <Filter filtersConfig={filtersConfig} filterState={filterState} />
        )}
      </PageHeader>

      <QueryStatusFallback
        queries={[ordersQuery]}
        hasNoData={hasNoData}
        noDataFallback={{
          message: emptyStateMessage,
          actionLabel: hasAppliedFilters ? "" : "建立訂單",
          redirectTo: "/menu",
        }}
      >
        <OrdersContainer>
          <OrdersListDesktop ordersData={ordersData} />
          <OrdersListMobile ordersData={ordersData} />

          <Pagination curPage={Number(page)} maxPage={Number(maxPage)} />
        </OrdersContainer>
      </QueryStatusFallback>
    </PageContainer>
  );
}

export default Orders;
