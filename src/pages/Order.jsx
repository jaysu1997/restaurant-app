import { useLocation } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import OrderSummaryView from "../features/orders/OrderSummaryView";
import OrderSummaryEdit from "../features/orders/OrderSummaryEdit";
import styled from "styled-components";
import OrderOperation from "../features/orders/OrderOperation";
import PageHeader from "../ui/PageHeader";
import { formatPickupNumber } from "../utils/orderHelpers";
import useGetOrder from "../hooks/data/orders/useGetOrder";

const StyledOrderSummary = styled.div`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) minmax(0px, 28rem);
  gap: 4rem;
  padding: 1.6rem 0;
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
  // 根據pathname判別當前是否為編輯狀態
  const { pathname } = useLocation();
  const isEditPage = pathname.includes("edit");
  const { data, isPending } = useGetOrder(isEditPage);

  if (isPending) return <LoadingSpinner />;

  return (
    <>
      <PageHeader title="訂單詳情" />
      <StyledOrderSummary>
        <OrderHeader>{`取餐號碼 ${formatPickupNumber(
          data.pickupNumber
        )}`}</OrderHeader>

        {isEditPage ? (
          <OrderSummaryEdit isEdit={true} orderData={data} />
        ) : (
          <OrderSummaryView isEdit={false} orderData={data} />
        )}

        {/* <OrderOperation isEdit={isEditPage} /> */}
      </StyledOrderSummary>
    </>
  );
}

export default Order;
