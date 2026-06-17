import ControlledSelect from "../../../ui/ControlledSelect";
import FormFieldLayout from "../../../ui/FormFieldLayout";

function PaymentStatusField() {
  return (
    <FormFieldLayout label="付款狀態" isRequired={true}>
      <ControlledSelect
        options={[
          { label: "已付款", value: "已付款" },
          { label: "未付款", value: "未付款" },
        ]}
        name="paid"
        creatable={false}
        placeholder="請選擇付款狀態"
        rules={{ required: "請選擇付款狀態" }}
        key="paid"
      />
    </FormFieldLayout>
  );
}

export default PaymentStatusField;
