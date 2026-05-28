import ControlledSelect from "../../../ui/ControlledSelect";

function OrderStatusField({ isPaid }) {
  return (
    <ControlledSelect
      options={[
        { label: "準備中", value: "準備中" },
        { label: "已完成", value: "已完成" },
      ]}
      name="status"
      creatable={false}
      placeholder="訂單狀態"
      rules={{
        required: "請選擇訂單狀態",
        validate: (value) => {
          // 假設如果沒付款就不能選「已完成」
          if (value?.value === "已完成" && isPaid?.value !== "已付款") {
            return "訂單尚未付款";
          }
          return true;
        },
      }}
      key="status"
    />
  );
}

export default OrderStatusField;
