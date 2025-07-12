// 訂單詳情(檢視)
import styled from "styled-components";
import Tag from "../../ui/Tag";
import OrderDishes from "./OrderDishes";
import OrderOperation from "./OrderOperation";
import { formatCreatedTime } from "../../utils/orderHelpers";

const OrderInfo = styled.section`
  background-color: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 6px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.4rem 2.8rem;
  height: fit-content;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1.6rem;
  min-height: 3.8rem;
  align-items: center;

  &:last-child {
    align-items: start;
  }

  div {
    overflow: hidden;
    overflow-wrap: break-word;
  }
`;

function OrderSummaryView({ orderData, isEdit }) {
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
      <OrderInfo>
        <Row>
          <div>建立時間：</div>
          <div>{formatCreatedTime(createdTime)}</div>
        </Row>
        <Row>
          <div>訂單編號：</div>
          <div>{orderUUID}</div>
        </Row>
        <Row>
          <div>訂購餐點：</div>
        </Row>
        <OrderDishes dishData={dishes} isEdit={isEdit} />
      </OrderInfo>

      <OrderInfo>
        <Row>
          <div>用餐方式：</div>
          <div>{diningMethod === "dineIn" ? "內用" : "外帶"}</div>
        </Row>
        <Row>
          <div>{diningMethod === "dineIn" ? "內用桌號：" : "取餐時間："}</div>
          <div>{tableNumber || pickupTime}</div>
        </Row>
        <Row>
          <div>訂單狀態：</div>
          <div>
            <Tag $tagStatus={status}>{status}</Tag>
          </div>
        </Row>
        <Row>
          <div>付款狀態：</div>
          <div>
            <Tag $tagStatus={paid}>{paid}</Tag>
          </div>
        </Row>
        <Row>
          <div>訂單備註：</div>
          <div>{note || "無"}</div>
        </Row>
      </OrderInfo>

      <OrderOperation isEdit={false} orderData={orderData} />
    </>
  );
}

export default OrderSummaryView;
