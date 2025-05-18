import styled from "styled-components";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useEffect, useRef, useState } from "react";
import OrderRow from "./OrderRow";
import Pagination from "../../ui/Pagination";
import usePagination from "./usePagination";
import OrderDropdownMenu from "./OrderDropdownMenu";
import useClickOutside from "./useClickOutside";
import EmptyState from "../../ui/EmptyState";
import FetchFailFallback from "../../ui/FetchFailFallback";

const OrderContainer = styled.div`
  max-width: 95dvw;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  overflow: hidden;
  margin: 1.6rem 0;

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
  /* z-index: -10; */

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
  const { ordersData, curPage, maxPage, isPending, isError } = usePagination();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const tableRef = useRef(null);
  const activeMenuRef = useRef(null);

  // 在父元件監聽點擊外部時關閉菜單(避免大量註冊事件監聽)
  useClickOutside(activeMenuRef, isOpenMenu, setIsOpenMenu);

  useEffect(
    function () {
      if (!isOpenMenu) return;

      const handleClickOutside = (e) => {
        if (
          activeMenuRef.current &&
          !activeMenuRef.current.contains(e.target)
        ) {
          setIsOpenMenu(false);
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    },
    [isOpenMenu]
  );

  // 監聽頁面滾動(包含滾輪和鍵盤的滾動)時關閉菜單
  useEffect(
    function () {
      if (!isOpenMenu) return;

      const handleScroll = () => {
        setIsOpenMenu(false);
      };

      window.addEventListener("scroll", handleScroll, { capture: true });

      return () => {
        window.removeEventListener("scroll", handleScroll, { capture: true });
      };
    },
    [isOpenMenu, setIsOpenMenu]
  );

  if (isPending) return <LoadingSpinner />;

  if (isError) return <FetchFailFallback />;

  if (ordersData.length === 0)
    return <EmptyState message="目前沒有任何訂單數據" />;

  return (
    <>
      <OrderContainer ref={tableRef}>
        <OrderHeader>
          <div></div>
          <div>取餐號碼</div>
          <div>建立時間</div>
          <div>訂單狀態</div>
          <div>消費金額</div>
          <div>付款狀態</div>
          <div></div>
        </OrderHeader>

        <OrderBody>
          {ordersData.map((orderData) => (
            <OrderRow orderData={orderData} key={orderData.id}>
              <OrderDropdownMenu
                orderData={orderData}
                isOpenMenu={isOpenMenu}
                setIsOpenMenu={setIsOpenMenu}
                tableRef={tableRef}
                activeMenuRef={activeMenuRef}
              />
            </OrderRow>
          ))}
        </OrderBody>
      </OrderContainer>
      <Pagination curPage={Number(curPage)} maxPage={Number(maxPage)} />
    </>
  );
}

export default OrdersTable;
