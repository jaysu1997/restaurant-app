// 訂單詳情(檢視)
import OrderDishes from "./OrderDishes";
import OrderOverview from "./OrderOverview";
import OrderInfo from "./OrderInfo";
import OrderNote from "./OrderNote";

function OrderDetailPage({ orderData }) {
  const { note, items } = orderData;

  return (
    <>
      <OrderOverview orderData={orderData} isEdit={false}>
        <OrderInfo
          orderData={orderData}
          isEdit={false}
          canModifyItems={false}
        />
        <OrderDishes items={items} isEdit={false} canModifyItems={false} />
      </OrderOverview>

      <OrderNote note={note} isEdit={false} />
    </>
  );
}

export default OrderDetailPage;
