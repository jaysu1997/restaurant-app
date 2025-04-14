import { useLocation } from "react-router-dom";
import useGetOrder from "../features/orders/useGetOrder";
import Heading from "../ui/Heading";
import LoadingSpinner from "../ui/LoadingSpinner";
import OrderSummaryView from "../features/orders/OrderSummaryView";
import OrderSummaryEdit from "../features/orders/OrderSummaryEdit";
import styled from "styled-components";
import OrderOperation from "../features/orders/OrderOperation";

const StyledOrderSummary = styled.div`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) minmax(0px, 28rem);
  gap: 4rem;
  padding: 1.6rem 0;
  font-weight: 500;
`;

function Order() {
  // 根據pathname判別當前是否為編輯狀態
  const { pathname } = useLocation();
  const isEditPage = pathname.includes("edit");
  const { data, isPending } = useGetOrder(isEditPage);

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Heading>訂單詳情</Heading>
      <StyledOrderSummary>
        {isEditPage ? (
          <OrderSummaryEdit isEdit={true} data={data} />
        ) : (
          <OrderSummaryView isEdit={false} data={data} />
        )}

        <OrderOperation isEdit={isEditPage} />
      </StyledOrderSummary>
    </>
  );
}

export default Order;
