import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import PageHeader from "../ui/PageHeader";
import useGetOrder from "../hooks/data/orders/useGetOrder";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import PageContainer from "../ui/PageContainer";
import useSettings from "../context/settings/useSettings";
import { ChevronLeft } from "lucide-react";
import OrderDetailPage from "../features/orders/components/OrderDetailPage";
import OrderEditPage from "../features/orders/components/OrderEditPage";

const OrderLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  width: fit-content;
  padding: 0.4rem 0.6rem;
  margin-bottom: 0.8rem;
  border-radius: 6px;
  color: #475569;
  font-size: 1.4rem;
  font-weight: 500;

  transition:
    background-color 0.2s,
    color 0.2s;

  svg {
    flex-shrink: 0;
    width: 1.8rem;
    height: 1.8rem;
  }

  &:hover {
    background-color: #f8fafc;
    color: #0f172a;
  }
`;

const OrderDetail = styled.div`
  display: grid;
  grid-template-columns: minmax(0px, 1fr) minmax(0px, 26rem);
  gap: 2.8rem;
  padding: 0 0 3.6rem;
  font-weight: 500;
  width: 100%;

  @media (max-width: 50em) {
    grid-template-columns: 1fr;
  }
`;

function Order() {
  const navigate = useNavigate();
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
        <OrderLayout>
          <BackButton onClick={() => navigate(-1)}>
            <ChevronLeft />
            返回
          </BackButton>
          <OrderDetail>
            {isEditPage ? (
              <OrderEditPage orderData={order} />
            ) : (
              <OrderDetailPage orderData={order} />
            )}
          </OrderDetail>
        </OrderLayout>
      </QueryStatusFallback>
    </PageContainer>
  );
}

export default Order;
