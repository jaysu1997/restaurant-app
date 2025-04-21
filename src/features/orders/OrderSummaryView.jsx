// 訂單詳情(檢視)
import styled from "styled-components";
import { formatCreatedTime } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import OrderDishes from "./OrderDishes";
import OrderOperation from "./OrderOperation";

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
  grid-template-columns: auto 1fr;
  gap: 1.6rem;
  min-height: 3.8rem;
  align-items: center;
`;

function OrderSummaryView({ data, isEdit }) {
  return (
    <>
      <OrderInfo>
        <Row>
          <div>建立時間：</div>
          <div>{formatCreatedTime(data.createdTime)}</div>
        </Row>
        <Row>
          <div>訂單編號：</div>
          <div>{data.orderUUID}</div>
        </Row>
        <Row>
          <div>訂購餐點：</div>
        </Row>
        <OrderDishes dishData={data.order} isEdit={isEdit} />
      </OrderInfo>

      <OrderInfo>
        <Row>
          <div>用餐方式：</div>
          <div>{data.orderType}</div>
        </Row>
        <Row>
          <div>{data.orderType === "內用" ? "內用桌號：" : "取餐時間："}</div>
          <div>{data.tableNumber || data.pickupTime}</div>
        </Row>
        <Row>
          <div>訂單狀態：</div>
          <div>
            <Tag $tagStatus={data.status}>{data.status}</Tag>
          </div>
        </Row>
        <Row>
          <div>付款狀態：</div>
          <div>
            <Tag $tagStatus={data.paid}>{data.paid}</Tag>
          </div>
        </Row>
        <Row>
          <div>訂單備註：</div>
          <div>{data.note || "無"}</div>
        </Row>
      </OrderInfo>

      <OrderOperation isEdit={false} />
    </>
  );
}

export default OrderSummaryView;
