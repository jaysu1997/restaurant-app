// 訂單詳情(編輯)
import { FormProvider } from "react-hook-form";
import { buildOrderData } from "../../../utils/orderHelpers";
import useUpdateOrder from "../../../hooks/data/orders/useUpdateOrder";
import QueryStatusFallback from "../../../components/QueryStatusFallback";
import StyledHotToast from "../../../ui/StyledHotToast";
import { Navigate, useNavigate } from "react-router";
import useOrderDraft from "../../../context/orders/useOrderDraft";
import useOrderInventory from "../hooks/useOrderInventory";
import OrderOverview from "./OrderOverview";
import OrderNote from "./OrderNote";
import OrderDishes from "./OrderDishes";
import useOrderEdit from "../hooks/useOrderEdit";
import styled from "styled-components";
import SubmitButton from "../../../components/button/SubmitButton";
import Button from "../../../components/button/Button";
import StoreClosedNotice from "./StoreClosedNotice";
import useSettings from "../../../context/settings/useSettings";
import { canCreateOrder } from "../../../context/settings/settingsHelpers";
import OrderInfo from "./OrderInfo";

const Footer = styled.footer`
  grid-column: 1;
  display: flex;
  align-items: center;
  gap: 2rem;

  & > div {
    margin-left: auto;
  }
`;

// 這裡的樣式需要修正(整體布局都需要)
function OrderEditPage({ orderData }) {
  const navigate = useNavigate();
  const { updateOrder, isUpdatingOrder } = useUpdateOrder();
  const { todayOpenInfo } = useSettings();
  const canPlaceOrder = canCreateOrder(todayOpenInfo);

  const {
    state: { items },
  } = useOrderDraft();

  const inventoryQuery = useOrderInventory();

  const methods = useOrderEdit(orderData);

  const { handleSubmit } = methods;

  function onSubmit(data) {
    const orderData = buildOrderData(items, data);
    updateOrder(orderData);
  }

  function onError(error) {
    console.log(error);
    const message = error?.status ? "訂單尚未付款，無法註記為已完成狀態" : "";
    StyledHotToast({ type: "error", title: "訂單更新失敗", content: message });
  }

  // 已完成訂單不可做編輯(自動轉到檢視頁面)
  if (orderData.status === "已完成") {
    return <Navigate to={`/orders/${orderData.id}`} replace />;
  }

  return (
    <QueryStatusFallback queries={[inventoryQuery]}>
      {!canPlaceOrder && (
        <StoreClosedNotice>
          目前為非營業時段，無法修改餐點與用餐資訊， 但仍可更新付款與訂單狀態。
        </StoreClosedNotice>
      )}

      <FormProvider {...methods}>
        <OrderOverview orderData={orderData} isEdit={true}>
          <OrderInfo
            orderData={orderData}
            isEdit={true}
            canModifyItems={canPlaceOrder}
          />
          <OrderDishes
            items={items}
            isEdit={true}
            canModifyItems={canPlaceOrder}
          />
        </OrderOverview>

        <OrderNote isEdit={true} note={orderData.note} />

        <Footer>
          <SubmitButton
            isProcessing={isUpdatingOrder}
            disabled={items.length === 0 || isUpdatingOrder}
            onClick={handleSubmit(onSubmit, onError)}
          />

          <Button
            $variant="outline"
            onClick={() => navigate(-1)}
            disabled={isUpdatingOrder}
          >
            取消
          </Button>
        </Footer>
      </FormProvider>
    </QueryStatusFallback>
  );
}

export default OrderEditPage;
