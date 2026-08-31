// ok
import styled, { css } from "styled-components";
import { useState } from "react";
import OrderDropdownMenu from "../OrderDropdownMenu";
import {
  formatDateTime,
  formatPickupNumber,
} from "../../../../utils/orderHelpers";
import Tag from "../../../../components/Tag";
import { hoverStyles } from "../../../../style/helpers";

const StyledOrderList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-weight: 600;

  @media (max-width: 45em) {
    display: none;
  }
`;

const OrderRow = styled.div`
  display: grid;
  grid-template-columns:
    minmax(0, 0.3fr) minmax(0, 0.5fr) minmax(0, 1fr)
    repeat(3, minmax(0, 0.5fr)) 3rem;
  align-items: center;
  gap: 1rem;
  padding: 1.6rem 2rem;
`;

const OrderHeader = styled(OrderRow)`
  background-color: #525252;
  color: #fff;
  border-radius: 8px 8px 0 0;
`;

const OrderBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderData = styled(OrderRow)`
  background-color: #fff;

  ${hoverStyles(css`
    background-color: #f9fafb;
  `)}

  & + & {
    border-top: 1px solid #f3f4f6;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  & > span:nth-child(3) {
    font-weight: 400;
  }
`;

function OrdersListDesktop({ ordersData }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <StyledOrderList>
      <OrderHeader as="header">
        <div>類型</div>
        <div>取餐編號</div>
        <div>建立時間</div>
        <div>訂單狀態</div>
        <div>付款狀態</div>
        <div>金額</div>
        <div></div>
      </OrderHeader>

      <OrderBody>
        {ordersData.map((orderData) => (
          <OrderData key={orderData.id}>
            <Tag $status={orderData.diningMethod}>{orderData.diningMethod}</Tag>
            <span>{formatPickupNumber(orderData.pickupNumber)}</span>
            <span>{formatDateTime(orderData.createdAt)}</span>
            <Tag $status={orderData.status}>{orderData.status}</Tag>
            <Tag $status={orderData.paid}>{orderData.paid}</Tag>
            <span>${orderData.totalPrice}</span>

            <OrderDropdownMenu
              orderData={orderData}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
            />
          </OrderData>
        ))}
      </OrderBody>
    </StyledOrderList>
  );
}

export default OrdersListDesktop;
