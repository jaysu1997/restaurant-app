import { useLocation } from "react-router";
import OrderSummaryView from "../features/orders/OrderSummaryView";
import OrderSummaryEdit from "../features/orders/OrderSummaryEdit";
import styled from "styled-components";
import PageHeader from "../ui/PageHeader";
import { formatPickupNumber } from "../utils/orderHelpers";
import useGetOrder from "../hooks/data/orders/useGetOrder";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import PageContainer from "../ui/PageContainer";
import useSettings from "../context/settings/useSettings";

const StyledOrderSummary = styled.div`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) minmax(0px, 26rem);
  /* column-gap: 2.4rem;
  row-gap: 3.6rem; */
  gap: 2.8rem;
  padding: 0 0 3.6rem;
  font-weight: 500;
  width: 100%;

  @media (max-width: 50em) {
    grid-template-columns: 1fr;
  }
`;

const OrderHeader = styled.header`
  background-color: #6366f1;
  color: #fff;
  padding: 2rem 2.4rem;
  font-size: 2.4rem;
  grid-column: 1 / -1;
  border-radius: 6px;
  font-weight: 600;
`;

function Order() {
  // 根據pathname判別當前是否為編輯狀態
  const { pathname } = useLocation();
  const isEditPage = pathname.includes("edit");
  const { order, orderIsLoading, orderIsError, orderError } = useGetOrder();
  const { settingsIsLoading, settingsIsError, settingsError } = useSettings();

  const pageQueryStatus = {
    isLoading: orderIsLoading || settingsIsLoading,
    isError: orderIsError || settingsIsError,
  };

  return (
    <PageContainer>
      <PageHeader title={isEditPage ? "訂單編輯" : "訂單詳情"} />
      <QueryStatusFallback
        status={pageQueryStatus}
        errorFallback={orderError || settingsError}
      >
        <StyledOrderSummary>
          <OrderHeader>{`取餐號碼 ${formatPickupNumber(
            order?.pickupNumber,
          )}`}</OrderHeader>

          {isEditPage ? (
            <OrderSummaryEdit orderData={order} />
          ) : (
            <OrderSummaryView orderData={order} />
          )}
        </StyledOrderSummary>
      </QueryStatusFallback>
    </PageContainer>
  );
}

export default Order;
