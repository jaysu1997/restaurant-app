import OrdersTable from "../features/orders/OrdersTable";
import Filter from "../ui/Filter";
import Heading from "../ui/Heading";

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
      <Heading>訂單管理</Heading>
      <Filter filtersConfig={filtersConfig} />
      <OrdersTable />
    </>
  );
}

export default Orders;
