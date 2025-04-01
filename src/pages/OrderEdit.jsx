import useGetInventory from "../features/inventory/useGetInventory";
import OrderSummary from "../features/orders/OrderSummary";
import Heading from "../ui/Heading";

function OrderEdit() {
  useGetInventory(true);

  return (
    <>
      <Heading>訂單編輯</Heading>
      <OrderSummary isEdit={true} />
    </>
  );
}

export default OrderEdit;
