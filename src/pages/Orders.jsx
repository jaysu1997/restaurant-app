import styled from "styled-components";
import OrdersTable from "../features/orders/OrdersTable";
import useGetPaginatedOrders from "../hooks/data/orders/useGetPaginatedOrders";
import Filter from "../ui/Filter/Filter";
import PageHeader from "../ui/PageHeader";
import PageContainer from "../ui/PageContainer";
import Pagination from "../ui/Pagination";
import QueryStatusFallback from "../ui/QueryStatusFallback";

const OrdersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

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

function Orders() {
  const {
    ordersData,
    curPage,
    maxPage,
    isPending,
    isError,
    error,
    createdAt,
    pickupNumber,
  } = useGetPaginatedOrders();

  // 有使用篩選條件
  const hasFilters = createdAt || pickupNumber;
  // 數據庫完全沒有任何訂單數據
  const isEmpty = !hasFilters && !isPending && ordersData?.length === 0;

  const emptyStateMessage = hasFilters
    ? "查無符合當前篩選條件的訂單數據。"
    : "目前沒有任何已經建立的訂單數據。";

  return (
    <PageContainer>
      <PageHeader title="訂單管理">
        {!isEmpty && <Filter filtersConfig={filtersConfig} />}
      </PageHeader>

      <QueryStatusFallback
        status={{
          isLoading: isPending,
          isError,
          hasNoData: ordersData?.length === 0,
        }}
        errorFallback={error}
        noDataFallback={{
          message: emptyStateMessage,
          actionLabel: hasFilters ? "" : "建立訂單",
          redirectTo: "/menu",
        }}
      >
        <OrdersContainer>
          <OrdersTable ordersData={ordersData} />
          <Pagination curPage={Number(curPage)} maxPage={Number(maxPage)} />
        </OrdersContainer>
      </QueryStatusFallback>
    </PageContainer>
  );
}

export default Orders;
