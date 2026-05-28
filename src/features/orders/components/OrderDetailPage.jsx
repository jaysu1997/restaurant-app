// 訂單詳情(檢視)
import Tag from "../../../ui/Tag";
import OrderDishes from "./OrderDishes";
import { formatPickupStr } from "../../../context/settings/settingsHelpers";
import OrderOverview from "./OrderOverview";
import OrderSection from "./OrderSection";
import OrderNote from "./OrderNote";

function OrderDetailPage({ orderData }) {
  const { diningMethod, tableNumber, pickupTime, status, paid, note, items } =
    orderData;

  const isTakeout = diningMethod === "外帶";

  return (
    <>
      <OrderOverview orderData={orderData} isEdit={false}>
        <OrderDishes items={items} isEdit={false} />
      </OrderOverview>

      <OrderSection>
        <div>
          <label>用餐方式：</label>
          <span>{diningMethod}</span>
        </div>

        <div>
          <label>{isTakeout ? "取餐時間：" : "內用桌號："}</label>
          <span>{isTakeout ? formatPickupStr(pickupTime) : tableNumber}</span>
        </div>

        <div>
          <label>付款狀態：</label>
          <Tag $tagStatus={paid}>{paid}</Tag>
        </div>

        <div>
          <label>訂單狀態：</label>
          <Tag $tagStatus={status}>{status}</Tag>
        </div>
      </OrderSection>

      <OrderNote isEdit={false} note={note} />
    </>
  );
}

export default OrderDetailPage;
