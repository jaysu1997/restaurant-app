import OrderSummary from "../features/orders/OrderSummary";
import Heading from "../ui/Heading";

function Order() {
  return (
    <>
      <Heading>訂單詳情</Heading>
      <OrderSummary isEdit={false} />
    </>
  );
}

export default Order;
