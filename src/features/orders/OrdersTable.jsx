import styled from "styled-components";
import { useState } from "react";
import OrderRow from "./OrderRow";
import OrderDropdownMenu from "./OrderDropdownMenu";

const OrderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: 1px solid #dfdfdf;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  @media (max-width: 48em) {
    border: none;
    box-shadow: none;
  }
`;

const OrderHeader = styled.header`
  display: grid;
  grid-template-columns:
    6.4rem minmax(0, 0.5fr) minmax(0, 1fr) repeat(3, minmax(0, 0.5fr))
    3.2rem;
  align-items: center;
  justify-items: start;
  gap: 0.8rem;
  padding: 1.6rem;
  border: none;
  font-weight: 700;
  background-color: #525252;
  color: #fafafa;
  border-radius: 6px 6px 0 0;

  @media (max-width: 48em) {
    display: none;
  }
`;

const OrderBody = styled.section`
  display: flex;
  flex-direction: column;

  @media (max-width: 48em) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
    gap: 1rem;
  }
`;

function OrdersTable({ ordersData }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <OrderContainer>
      <OrderHeader>
        <div aria-hidden="true"></div>
        <div>取餐號碼</div>
        <div>建立時間</div>
        <div>消費金額</div>
        <div>訂單狀態</div>
        <div>付款狀態</div>
        <div aria-hidden="true"></div>
      </OrderHeader>

      <OrderBody>
        {ordersData.map((orderData) => (
          <OrderRow orderData={orderData} key={orderData.id}>
            <OrderDropdownMenu
              orderData={orderData}
              isOpenMenu={isOpenMenu}
              setIsOpenMenu={setIsOpenMenu}
            />
          </OrderRow>
        ))}
      </OrderBody>
    </OrderContainer>
  );
}

export default OrdersTable;
