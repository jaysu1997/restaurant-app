import ControlledSelect from "../../../ui/ControlledSelect";

function PaymentStatusField({ isClosed }) {
  return (
    <ControlledSelect
      options={[
        { label: "已付款", value: "已付款" },
        { label: "未付款", value: "未付款" },
      ]}
      name="paid"
      creatable={false}
      placeholder={isClosed ? "非營業時間" : "請選擇付款狀態"}
      disabled={isClosed}
      rules={{ required: true }}
      key="paid"
    />
  );
}

export default PaymentStatusField;
