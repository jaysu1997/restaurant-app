// ok
import styled, { css } from "styled-components";
import { useState } from "react";
import OrderDropdownMenu from "../OrderDropdownMenu";
import { formatDateTime } from "../../../../utils/dateTime.js";
import { formatPickupNumber } from "../../../../utils/orderFormatting.js";
import Tag from "../../../../components/Tag";
import { hoverStyles } from "../../../../style/helpers";
import Price from "../../../../components/Price";

const StyledOrderList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  font-weight: var(--font-weight-semibold);

  @media (max-width: 50em) {
    display: none;
  }
`;

const OrderRow = styled.div`
  display: grid;
  grid-template-columns:
    5.2rem minmax(6rem, 0.5fr) minmax(16.4rem, 0.5fr)
    repeat(3, minmax(7.6rem, 0.5fr)) 3rem;
  align-items: center;
  justify-items: center;
  gap: var(--space-2-5);
  padding: var(--space-4) var(--space-5);
`;

const OrderHeader = styled(OrderRow)`
  background-color: #525252;
  color: var(--color-surface);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
`;

const OrderBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderData = styled(OrderRow)`
  background-color: var(--color-surface);

  ${hoverStyles(css`
    background-color: var(--color-background);
  `)}

  & + & {
    border-top: 1px solid var(--color-surface-subtle);
  }

  &:last-child {
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  }

  & > span:nth-child(3) {
    font-weight: var(--font-weight-regular);
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
            <Price value={orderData.totalAmount} />

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
