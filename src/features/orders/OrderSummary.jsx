// 訂單詳情內容
import styled from "styled-components";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { formatCreatedTime, formatOrderNumber } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import useGetOrder from "./useGetOrder";
import OrderOperation from "./OrderOperation";
import OrderDishes from "./OrderDishes";
import { useOrder } from "../../context/OrderContext";

const StyledOrderSummary = styled.div`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) minmax(0px, 28rem);
  gap: 4rem;
  padding: 1.6rem 0;
  font-weight: 500;
`;

const OrderHeader = styled.header`
  background-color: #6366f1;
  color: #fff;
  padding: 1.6rem 3.6rem;
  font-size: 2.4rem;
  grid-column: 1 / -1;
  border-radius: 6px;
  font-weight: 600;
`;

const OrderInfo = styled.section`
  background-color: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 6px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.6rem 3.6rem;
  height: fit-content;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.6rem;
`;

function OrderSummary({ isEdit }) {
  const { data, isPending } = useGetOrder();

  if (isPending) {
    return <LoadingSpinner />;
  }

  const orderSummary = [
    { title: "用餐方式：", content: data.orderType },
    {
      title: data.tableNumber ? "內用桌號：" : "取餐時間：",
      content: data.tableNumber || data.pickupTime,
    },
    {
      title: "付款狀態：",
      content: <Tag $tagStatus={data.paid}>{data.paid}</Tag>,
    },
    {
      title: "訂單狀態：",
      content: <Tag $tagStatus={data.status}>{data.status}</Tag>,
    },
    { title: "訂單備註：", content: data.note || "無" },
  ];

  return (
    <StyledOrderSummary>
      <OrderHeader>{`取餐號碼 ${formatOrderNumber(
        data.orderNumber
      )}`}</OrderHeader>
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
        <OrderDishes data={data} isEdit={isEdit} />
      </OrderInfo>

      <OrderInfo>
        {orderSummary.map((info) => (
          <Row key={info.title}>
            <div>{info.title}</div>
            <div>{info.content}</div>
          </Row>
        ))}
      </OrderInfo>
      <OrderOperation />
    </StyledOrderSummary>
  );
}

export default OrderSummary;
