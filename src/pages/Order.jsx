import { useLocation } from "react-router-dom";
import OrderSummaryView from "../features/orders/OrderSummaryView";
import OrderSummaryEdit from "../features/orders/OrderSummaryEdit";
import styled from "styled-components";
import PageHeader from "../ui/PageHeader";
import { formatPickupNumber } from "../utils/orderHelpers";
import useGetOrder from "../hooks/data/orders/useGetOrder";
import QueryStatusFallback from "../ui-old/QueryStatusFallback";
import { useSettings } from "../context/SettingsContext";

const StyledOrderSummary = styled.div`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) minmax(0px, 26rem);
  column-gap: 2.4rem;
  row-gap: 3.6rem;
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
  const {
    data: orderData,
    isPending: orderIsPending,
    error: orderError,
    isError: orderIsError,
  } = useGetOrder();

  const {
    settings,
    error: settingsError,
    isPending: settingsIsPending,
    isError: settingsIsError,
  } = useSettings();

  const pageQueryStatus = {
    isPending: orderIsPending || settingsIsPending,
    isError: orderIsError || settingsIsError,
  };

  return (
    <>
      <PageHeader title={isEditPage ? "訂單編輯" : "訂單詳情"} />
      <QueryStatusFallback
        status={pageQueryStatus}
        errorFallback={orderError || settingsError}
      >
        <StyledOrderSummary>
          <OrderHeader>{`取餐號碼 ${formatPickupNumber(
            orderData?.pickupNumber,
          )}`}</OrderHeader>

          {isEditPage ? (
            <OrderSummaryEdit orderData={orderData} settingsData={settings} />
          ) : (
            <OrderSummaryView orderData={orderData} />
          )}
        </StyledOrderSummary>
      </QueryStatusFallback>
    </>
  );
}

export default Order;
