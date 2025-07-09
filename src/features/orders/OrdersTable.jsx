import styled from "styled-components";
import { useRef, useState } from "react";
import OrderRow from "./OrderRow";
import OrderDropdownMenu from "./OrderDropdownMenu";
import useClickOutside from "../../hooks/ui/useClickOutside";

const OrderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: 1px solid #dfdfdf;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    border: none;
  }
`;

const OrderHeader = styled.header`
  display: grid;
  grid-template-columns:
    minmax(0, 5.6rem) minmax(0, 1fr) minmax(0, 1.5fr) repeat(3, minmax(0, 1fr))
    minmax(0, 2.8rem);
  align-items: center;
  justify-items: start;
  gap: 0.8rem;
  padding: 1.6rem;
  border: none;
  font-weight: 700;
  background-color: #525252;
  color: #fafafa;
  border-radius: 6px 6px 0 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const OrderBody = styled.section`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 1rem;
  }
`;

function OrdersTable({ ordersData }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const activeMenuRef = useRef(null);

  // 在父元件監聽點擊外部時關閉菜單(避免大量註冊事件監聽)
  useClickOutside(activeMenuRef, isOpenMenu, setIsOpenMenu, false);

  return (
    <OrderContainer>
      <OrderHeader>
        <div aria-hidden="true"></div>
        <div>取餐號碼</div>
        <div>建立時間</div>
        <div>訂單狀態</div>
        <div>消費金額</div>
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
              activeMenuRef={activeMenuRef}
            />
          </OrderRow>
        ))}
      </OrderBody>
    </OrderContainer>
  );
}

export default OrdersTable;
