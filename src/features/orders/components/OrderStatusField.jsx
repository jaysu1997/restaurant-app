import { useFormContext } from "react-hook-form";
import FormSelectField from "../../../components/FormSelectField";

function OrderStatusField() {
  const { getValues } = useFormContext();

  return (
    <FormSelectField
      label="訂單狀態"
      name="status"
      options={[
        { label: "準備中", value: "準備中" },
        { label: "已完成", value: "已完成" },
      ]}
      placeholder="訂單狀態"
      rules={{
        required: "請選擇訂單狀態",
        validate: (value) => {
          const isPaid = getValues("paid");

          // 假設如果沒完成付款就不能選「已完成」
          if (value?.value === "已完成" && isPaid?.value !== "已付款") {
            return "尚未付款，無法將訂單設為已完成";
          }
          return true;
        },
      }}
    />
  );
}

export default OrderStatusField;
