// 購物車中下方的訂購訊息欄位
import styled from "styled-components";
import ControlledSelect from "../../../ui/ControlledSelect";
import Note from "../../../ui/Note";
import DiningMethodSegmented from "../../../ui/DiningMethodSegmented";
import { useFormContext, useWatch } from "react-hook-form";
import ReqiuredMark from "../../../ui/RequiredMark";
import useSettings from "../../../context/settings/useSettings";
import DiningField from "../../orders/components/DiningField ";

const StyledOrderInfoField = styled.div`
  padding: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    font-size: 1.4rem;
    display: flex;
    gap: 0.2rem;
    font-weight: 600;
  }
`;

function OrderInfoField({ hasItems }) {
  const { register, control } = useFormContext();
  const { openStatus } = useSettings();

  const diningMethod = useWatch({
    control,
    name: "diningMethod",
  });

  const takeOut = diningMethod === "外帶";

  // 是否可以點餐
  const isClosed = ["closed", "holiday"].includes(openStatus.status);

  return (
    <StyledOrderInfoField>
      <Row>
        <label>用餐方式</label>
        <DiningMethodSegmented isDisabled={!hasItems || isClosed} />
      </Row>

      <Row>
        <label>
          {takeOut ? "取餐時間" : "內用桌號"}
          <ReqiuredMark />
        </label>

        <DiningField
          takeOut={takeOut}
          selectedOption={null}
          disabled={isClosed}
        />
      </Row>

      <Row>
        <label>
          付款狀態
          <ReqiuredMark />
        </label>

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
      </Row>

      <Row>
        <Note register={register}>
          <label>訂單備註</label>
        </Note>
      </Row>
    </StyledOrderInfoField>
  );
}

export default OrderInfoField;
