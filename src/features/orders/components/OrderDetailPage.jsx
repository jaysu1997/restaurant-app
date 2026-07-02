// 訂單詳情(檢視)
import OrderOverview from "./OrderOverview";
import OrderNote from "./OrderNote";

function OrderDetailPage({ orderData }) {
  const { note, items } = orderData;

  return (
    <>
      <OrderOverview
        orderData={orderData}
        items={items}
        isEdit={false}
        canModifyItems={false}
      />

      <OrderNote note={note} isEdit={false} />
    </>
  );
}

export default OrderDetailPage;
