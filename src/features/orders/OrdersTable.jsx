import styled from "styled-components";
import { useState } from "react";
import OrderDropdownMenu from "./OrderDropdownMenu";
import {
  formatCreatedTime,
  formatPickupNumber,
} from "../../utils/orderHelpers";
import Tag from "../../ui/Tag";

const StyledOrdersTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: 1px solid #dfdfdf;

  @media (max-width: 45em) {
    border: none;
  }
`;

const OrderRow = styled.div`
  display: grid;
  grid-template-columns:
    minmax(0, 0.5fr) repeat(4, minmax(0, 0.75fr))
    minmax(0, 1.75fr);
  align-items: center;
  gap: 1rem;
  padding: 1.6rem;
`;

const OrderHeader = styled(OrderRow)`
  font-weight: 700;
  background-color: #525252;
  color: #fff;
  border-radius: 6px 6px 0 0;

  @media (max-width: 45em) {
    display: none;
  }
`;

const OrderBody = styled.section`
  display: flex;
  flex-direction: column;

  @media (max-width: 45em) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
    gap: 2rem;
  }
`;

const OrderData = styled(OrderRow)`
  background-color: #fff;

  &:hover {
    background-color: #f0f9ff;
  }

  & + & {
    border-top: 1px solid #f3f4f6;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    gap: 1rem;
  }

  @media (max-width: 45em) {
    grid-template-columns: 1fr;
    border-radius: 6px;

    & + & {
      border-top: none;
    }

    & > div {
      font-weight: 600;
    }

    &:last-child {
      border-radius: 6px;
    }

    &:hover {
      background-color: #fff;
    }

    & > div:not(:last-child)::before {
      content: attr(data-label);
      font-weight: 500;
      font-size: 1.4rem;
      color: #6b7280;
    }

    & > div:last-child {
      grid-row: 1;
    }
  }
`;

const DiningMethod = styled.span`
  font-size: 1.4rem;
  color: ${(props) => (props.$diningMethod === "內用" ? "#1e88e5" : "#43a047")};
  font-weight: 700;
`;

function OrdersTable({ ordersData }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <StyledOrdersTable>
      <OrderHeader as="header">
        <div aria-hidden="true"></div>
        <div>取餐號碼</div>
        <div>消費金額</div>
        <div>訂單狀態</div>
        <div>付款狀態</div>
        <div>建立時間</div>
      </OrderHeader>

      <OrderBody>
        {ordersData.map((orderData) => (
          <OrderData key={orderData.id}>
            <div data-label="用餐方式">
              <DiningMethod $diningMethod={orderData.diningMethod}>
                {`[${orderData.diningMethod}]`}
              </DiningMethod>
            </div>

            <div data-label="取餐號碼">
              <span>{formatPickupNumber(orderData.pickupNumber)}</span>
            </div>

            <div data-label="消費金額">
              <span>{`$ ${orderData.totalPrice}`}</span>
            </div>

            <div data-label="訂單狀態">
              <Tag $tagStatus={orderData.status}>{orderData.status}</Tag>
            </div>

            <div data-label="付款狀態">
              <Tag $tagStatus={orderData.paid}>{orderData.paid}</Tag>
            </div>

            <div>
              <span>{formatCreatedTime(orderData.createdAt)}</span>

              <OrderDropdownMenu
                orderData={orderData}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
              />
            </div>
          </OrderData>
        ))}
      </OrderBody>
    </StyledOrdersTable>
  );
}

export default OrdersTable;
