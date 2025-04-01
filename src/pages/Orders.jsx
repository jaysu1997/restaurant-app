import OrdersTable from "../features/orders/OrdersTable";
import Heading from "../ui/Heading";

function Orders() {
  return (
    <>
      <Heading>訂單管理</Heading>
      <OrdersTable />
    </>
  );
}

export default Orders;
