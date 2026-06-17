import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import PageHeader from "../components/PageHeader";
import useGetOrder from "../hooks/data/orders/useGetOrder";
import QueryStatusFallback from "../components/QueryStatusFallback";
import PageContainer from "../components/PageContainer";
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
  margin-bottom: 1rem;
  border-radius: 8px;
  color: #64748b;
  font-size: 1.4rem;
  font-weight: 500;
  transition: color 0.2s ease;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  &:hover {
    color: #2563eb;
  }
`;

const OrderDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  width: 100%;
`;

function Order() {
  const navigate = useNavigate();
  // 根據pathname判別當前是否為編輯狀態
  const { pathname } = useLocation();
  const isEditPage = pathname.includes("edit");
  const orderQuery = useGetOrder();
  const { settingsQuery } = useSettings();

  return (
    <PageContainer>
      <PageHeader title={isEditPage ? "訂單編輯" : "訂單詳情"} />
      <QueryStatusFallback queries={[orderQuery, settingsQuery]}>
        <OrderLayout>
          <BackButton onClick={() => navigate(-1)}>
            <ChevronLeft />
            返回
          </BackButton>

          <OrderDetail>
            {isEditPage ? (
              <OrderEditPage orderData={orderQuery.data} />
            ) : (
              <OrderDetailPage orderData={orderQuery.data} />
            )}
          </OrderDetail>
        </OrderLayout>
      </QueryStatusFallback>
    </PageContainer>
  );
}

export default Order;
