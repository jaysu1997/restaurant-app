// 訂單詳情(檢視)
import Tag from "../../ui/Tag";
import OrderDishes from "./OrderDishes";
import OrderOperation from "./OrderOperation";
// 這裡的format可能需要整理(變成通用助手或是統一成一個函式)
import { formatCreatedTime } from "../../utils/orderHelpers";
import OrderCard from "./OrderCard";
import ContentContainer from "../../ui/ContentContainer";
import Note from "../../ui/Note";
import { formatToHourMinute } from "../../context/settings/settingsHelpers";

function OrderSummaryView({ orderData }) {
  const {
    diningMethod,
    tableNumber,
    pickupTime,
    status,
    paid,
    createdTime,
    orderUUID,
    dishes,
    note,
  } = orderData;

  return (
    <>
      <ContentContainer>
        <OrderCard>
          <div>
            <label>建立時間：</label>
            <span>{formatCreatedTime(createdTime)}</span>
          </div>

          <div>
            <label>訂單編號：</label>
            <span>{orderUUID}</span>
          </div>

          <OrderDishes dishes={dishes} isEdit={false} />
        </OrderCard>
      </ContentContainer>

      <ContentContainer>
        <OrderCard>
          <div>
            <label>用餐方式：</label>
            <span>{diningMethod}</span>
          </div>

          <div>
            <label>
              {diningMethod === "內用" ? "內用桌號：" : "取餐時間："}
            </label>
            <span>{tableNumber || formatToHourMinute(pickupTime)}</span>
          </div>

          <div>
            <label>付款狀態：</label>
            <Tag $tagStatus={paid}>{paid}</Tag>
          </div>

          <div>
            <label>訂單狀態：</label>
            <Tag $tagStatus={status}>{status}</Tag>
          </div>
        </OrderCard>
      </ContentContainer>

      <ContentContainer>
        <Note value={note} mode="view">
          <label>訂單備註：</label>
        </Note>
      </ContentContainer>

      <OrderOperation isEdit={false} orderData={orderData} />
    </>
  );
}

export default OrderSummaryView;
