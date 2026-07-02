import ControlledSelect from "../../../ui/ControlledSelect";
import FormFieldLayout from "../../../components/FormFieldLayout";

function PaymentStatusField() {
  return (
    <FormFieldLayout label="付款狀態" id="paid" isRequired={true}>
      <ControlledSelect
        inputId="paid"
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
