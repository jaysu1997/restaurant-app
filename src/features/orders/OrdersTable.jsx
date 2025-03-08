import styled from "styled-components";
import useGetOrders from "./useGetOrders";
import LoadingSpinner from "../../ui/LoadingSpinner";
import StyledOverlayScrollbars from "../../ui/StyledOverlayScrollbars";
import { useEffect, useRef, useState } from "react";
import OrderRow from "./OrderRow";

const OrderContainer = styled.div`
  max-width: 95dvw;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto;

  @media (max-width: 768px) {
    border: none;
  }
`;

const OrderHeader = styled.header`
  display: grid;
  grid-template-columns:
    5.6rem minmax(0, 1fr) minmax(0, 1.5fr) repeat(3, minmax(0, 1fr))
    2.8rem;
  align-items: center;
  justify-items: start;
  gap: 0.8rem;
  padding: 1.6rem;
  border: none;
  font-weight: 700;
  background-color: #bfdbfe;
  z-index: -10;

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

function OrdersTable() {
  const { ordersData, isPending } = useGetOrders();
  const [isOpen, setIsOpen] = useState(false);
  const tableRef = useRef(null);
  const activeMenuRef = useRef(null);

  // 在父元件監聽點擊外部時關閉菜單(避免大量註冊事件監聽)
  useEffect(
    function () {
      if (!isOpen) return;

      const handleClickOutside = (e) => {
        if (
          activeMenuRef.current &&
          !activeMenuRef.current.contains(e.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    },
    [isOpen]
  );

  // 監聽頁面滾動(包含滾輪和按鍵的滾動)時關閉菜單
  useEffect(
    function () {
      if (!isOpen) return;

      const handleScroll = () => {
        setIsOpen(false);
      };

      window.addEventListener("scroll", handleScroll, { capture: true });

      return () => {
        window.removeEventListener("scroll", handleScroll, { capture: true });
      };
    },
    [isOpen, setIsOpen]
  );

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <OrderContainer ref={tableRef}>
        <OrderHeader>
          <div></div>
          <div>取餐號碼</div>
          <div>建立時間</div>
          <div>付款狀態</div>
          <div>消費金額</div>
          <div>訂單狀態</div>
          <div></div>
        </OrderHeader>

        <StyledOverlayScrollbars style={{ maxHeight: "100%" }}>
          <OrderBody>
            {ordersData.map((orderData) => (
              <OrderRow
                orderData={orderData}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                tableRef={tableRef}
                activeMenuRef={activeMenuRef}
                key={orderData.id}
              />
            ))}
          </OrderBody>
        </StyledOverlayScrollbars>
      </OrderContainer>
    </>
  );
}

export default OrdersTable;
