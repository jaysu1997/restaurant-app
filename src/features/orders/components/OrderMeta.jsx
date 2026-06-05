import { useFormContext, useWatch } from "react-hook-form";
import DiningMethodSegmented from "../../../ui/DiningMethodSegmented";
import FormFieldLayout from "../../../ui/FormFieldLayout";
import OrderSection from "./OrderSection";
import OrderStatusField from "./OrderStatusField";
import PaymentStatusField from "./PaymentStatusField";
import DiningInfoField from "./DiningInfoField";

function OrderMeta({ canPlaceOrder }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const isPaid = useWatch({
    control,
    name: "paid",
  });

  const diningMethod = useWatch({
    control,
    name: "diningMethod",
  });

  // 是否外帶
  const isTakeout = diningMethod === "外帶";

  return (
    <OrderSection>
      <div>
        <label>用餐方式：</label>
        <DiningMethodSegmented disabled={!canPlaceOrder} />
      </div>
      <div>
        <label>{isTakeout ? "取餐時間：" : "內用桌號："}</label>
        <FormFieldLayout
          error={isTakeout ? errors?.pickupTime : errors?.tableNumber}
        >
          <DiningInfoField isTakeout={isTakeout} disabled={!canPlaceOrder} />
        </FormFieldLayout>
      </div>

      <div>
        <label>付款狀態：</label>
        <FormFieldLayout>
          <PaymentStatusField />
        </FormFieldLayout>
      </div>

      <div>
        <label>訂單狀態：</label>
        <FormFieldLayout error={errors?.status}>
          <OrderStatusField isPaid={isPaid} />
        </FormFieldLayout>
      </div>
    </OrderSection>
  );
}

export default OrderMeta;
