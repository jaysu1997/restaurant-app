// 訂單詳情(編輯)
import { FormProvider } from "react-hook-form";
import { buildOrderData } from "../../../utils/orderHelpers";
import useUpdateOrder from "../../../hooks/data/orders/useUpdateOrder";
import QueryStatusFallback from "../../../components/QueryStatusFallback";
import { Navigate, useNavigate } from "react-router";
import useOrderDraft from "../../../context/orders/useOrderDraft";
import useOrderInventory from "../hooks/useOrderInventory";
import useOrderEdit from "../hooks/useOrderEdit";
import FormActions from "../../../components/FormActions";
import OrderContent from "./OrderContent";

function OrderEditPage({ orderData, canModifyItems }) {
  const navigate = useNavigate();
  const inventoryQuery = useOrderInventory();
  const { updateOrder, isUpdatingOrder } = useUpdateOrder();

  const {
    state: { items: draftItems },
  } = useOrderDraft();

  const methods = useOrderEdit(orderData);
  const { handleSubmit } = methods;

  function onSubmit(data) {
    const orderData = buildOrderData(draftItems, data);
    updateOrder(orderData);
  }

  // 已完成訂單不可做編輯(自動轉到檢視頁面)
  if (orderData.status === "已完成") {
    return <Navigate to={`/orders/${orderData.id}`} replace />;
  }

  return (
    <QueryStatusFallback queries={[inventoryQuery]}>
      <FormProvider {...methods}>
        <OrderContent
          orderData={orderData}
          orderItems={draftItems}
          canModifyItems={canModifyItems}
          isEdit={true}
        />

        <FormActions
          onSubmit={handleSubmit(onSubmit)}
          onCancel={() => navigate(-1)}
          isProcessing={isUpdatingOrder}
          submitDisabled={draftItems.length === 0 || isUpdatingOrder}
        />
      </FormProvider>
    </QueryStatusFallback>
  );
}

export default OrderEditPage;
