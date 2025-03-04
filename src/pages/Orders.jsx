import OrdersTable from "../features/orders/OrdersTable";
import Heading from "../ui/Heading";

function OrderManagement() {
  return (
    <>
      <Heading>訂單管理</Heading>
      <OrdersTable />
    </>
  );
}

export default OrderManagement;
