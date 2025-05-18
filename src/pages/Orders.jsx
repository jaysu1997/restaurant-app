import OrdersTable from "../features/orders/OrdersTable";
import Filter from "../ui/Filter";
import PageHeader from "../ui/PageHeader";

function Orders() {
  const filtersConfig = [
    {
      title: "取餐號碼",
      type: "search",
      inputType: "number",
      queryKey: "pickupNumber",
      placeholder: "搜尋取餐號碼",
    },
    {
      title: "訂單建立時間",
      type: "datePicker",
      queryKey: "createdTime",
      placeholder: "選擇篩選日期範圍",
    },
  ];

  return (
    <>
      <PageHeader title="訂單管理">
        <Filter filtersConfig={filtersConfig} />
      </PageHeader>
      <OrdersTable />
    </>
  );
}

export default Orders;
