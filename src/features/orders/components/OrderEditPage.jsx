// 訂單詳情(編輯)
import { FormProvider } from "react-hook-form";
import { buildOrderData } from "../../../utils/orderHelpers";
import useUpdateOrder from "../../../hooks/data/orders/useUpdateOrder";
import QueryStatusFallback from "../../../components/QueryStatusFallback";
import { Navigate, useNavigate } from "react-router";
import useOrderDraft from "../../../context/orders/useOrderDraft";
import useOrderInventory from "../hooks/useOrderInventory";
import OrderOverview from "./OrderOverview";
import OrderNote from "./OrderNote";
import useOrderEdit from "../hooks/useOrderEdit";
import StoreClosedNotice from "./StoreClosedNotice";
import useSettings from "../../../context/settings/useSettings";
import { canCreateOrder } from "../../../context/settings/settingsHelpers";
import FormActions from "../../../components/FormActions";

function OrderEditPage({ orderData }) {
  const navigate = useNavigate();
  const { updateOrder, isUpdatingOrder } = useUpdateOrder();
  const { todayOpenInfo } = useSettings();
  // 當前屬於可以建立訂單的時段
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
        <OrderOverview
          orderData={orderData}
          items={items}
          isEdit={true}
          canModifyItems={canPlaceOrder}
        />

        <OrderNote isEdit={true} note={orderData.note} />

        <FormActions
          onSubmit={handleSubmit(onSubmit)}
          onCancel={() => navigate(-1)}
          isProcessing={isUpdatingOrder}
          submitDisabled={items.length === 0 || isUpdatingOrder}
        />
      </FormProvider>
    </QueryStatusFallback>
  );
}

export default OrderEditPage;
