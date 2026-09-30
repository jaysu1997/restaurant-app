import FormSelectField from "../../../components/FormSelectField";

function PaymentStatusField() {
  return (
    <FormSelectField
      label="付款狀態"
      options={[
        { label: "已付款", value: "已付款" },
        { label: "未付款", value: "未付款" },
      ]}
      name="paid"
      placeholder="請選擇付款狀態"
      rules={{
        deps: ["status"],
        required: "請選擇付款狀態",
      }}
      required
      key="paid"
    />
  );
}

export default PaymentStatusField;
