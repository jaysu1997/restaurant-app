import OrdersTable from "../features/orders/OrdersTable";
import useGetPaginatedOrders from "../hooks/data/orders/useGetPaginatedOrders";
import Filter from "../ui/Filter/Filter";
import PageHeader from "../ui/PageHeader";
import Pagination from "../ui/Pagination";
import QueryStatusFallback from "../ui/QueryStatusFallback";

const filtersConfig = [
  {
    title: "取餐號碼",
    type: "input",
    inputType: "number",
    queryKey: "pickupNumber",
    placeholder: "搜尋取餐號碼(不含#)",
  },
  {
    title: "訂單建立時間",
    type: "datePicker",
    queryKey: "createdTime",
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
    createdTime,
    pickupNumber,
  } = useGetPaginatedOrders();

  const emptyStateMessage =
    createdTime || pickupNumber
      ? "查無符合當前篩選條件的訂單數據"
      : "目前沒有任何已經建立的訂單數據";

  return (
    <>
      <PageHeader title="訂單管理">
        <Filter filtersConfig={filtersConfig} />
      </PageHeader>
      <QueryStatusFallback
        isPending={isPending}
        isError={isError}
        error={error}
        isEmpty={Array.isArray(ordersData) && ordersData?.length === 0}
        emptyState={{
          message: emptyStateMessage,
          buttonText: createdTime || pickupNumber ? "" : "建立訂單",
          redirectTo: "/menu",
        }}
      >
        <OrdersTable ordersData={ordersData} />
        <Pagination curPage={Number(curPage)} maxPage={Number(maxPage)} />
      </QueryStatusFallback>
    </>
  );
}

export default Orders;
