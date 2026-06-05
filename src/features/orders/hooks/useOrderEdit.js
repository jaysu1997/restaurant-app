import { useEffect } from "react";
import useOrderDraft from "../../../context/orders/useOrderDraft";
import { formatPickupStr } from "../../../context/settings/settingsHelpers";
import { useForm } from "react-hook-form";

function toSelectOption(value, label = value) {
  return value != null ? { label, value } : null;
}

function toPickupTimeOption(pickupTime) {
  if (!pickupTime) return null;

  const date = new Date(pickupTime);

  return {
    label: formatPickupStr(date),
    value: date.toISOString(),
  };
}

function createDraftItems(items) {
  return items.map((item) => ({
    ...item,

    unitUsage: Object.fromEntries(
      item.unitUsage.map(({ uuid, name, quantity }) => [
        uuid,
        {
          name,
          quantity,
        },
      ]),
    ),
  }));
}

// 訂單編輯所需邏輯
function useOrderEdit(orderData) {
  const { dispatch } = useOrderDraft();
  const { tableNumber, pickupTime, status, paid, items } = orderData;

  useEffect(() => {
    // 把訂單數據輸入到useReducer中
    dispatch({
      type: "draft/loadFromOrder",
      payload: createDraftItems(items),
    });
  }, [dispatch, items]);

  const methods = useForm({
    defaultValues: {
      ...orderData,
      tableNumber: toSelectOption(tableNumber),
      pickupTime: toPickupTimeOption(pickupTime),
      status: toSelectOption(status),
      paid: toSelectOption(paid),
    },
  });

  return methods;
}

export default useOrderEdit;
