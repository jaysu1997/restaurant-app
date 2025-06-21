import { useLocation } from "react-router-dom";
import OrderSummaryView from "../features/orders/OrderSummaryView";
import OrderSummaryEdit from "../features/orders/OrderSummaryEdit";
import styled from "styled-components";
import PageHeader from "../ui/PageHeader";
import { formatPickupNumber } from "../utils/orderHelpers";
import useGetOrder from "../hooks/data/orders/useGetOrder";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import useGetInventory from "../hooks/data/inventory/useGetInventory";

const StyledOrderSummary = styled.div`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) minmax(0px, 28rem);
  gap: 4rem;
  padding: 1.6rem 0 3.6rem;
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

function Order() {
  const { inventoryIsPending, inventoryError, inventoryIsError } =
    useGetInventory(true);
  // 根據pathname判別當前是否為編輯狀態
  const { pathname } = useLocation();
  const isEditPage = pathname.includes("edit");
  const { orderData, orderIsPending, orderError, orderIsError } =
    useGetOrder(isEditPage);

  return (
    <>
      <PageHeader title={isEditPage ? "訂單編輯" : "訂單詳情"} />
      <QueryStatusFallback
        isPending={orderIsPending || inventoryIsPending}
        isError={orderIsError || inventoryIsError}
        error={orderError || inventoryError}
      >
        <StyledOrderSummary>
          <OrderHeader>{`取餐號碼 ${formatPickupNumber(
            orderData?.pickupNumber
          )}`}</OrderHeader>

          {isEditPage ? (
            <OrderSummaryEdit isEdit={true} orderData={orderData} />
          ) : (
            <OrderSummaryView isEdit={false} orderData={orderData} />
          )}
        </StyledOrderSummary>
      </QueryStatusFallback>
    </>
  );
}

export default Order;
