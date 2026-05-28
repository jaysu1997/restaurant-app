// 購物車中下方的訂購訊息欄位
import styled from "styled-components";
import Note from "../../../components/Note";
import DiningMethodSegmented from "../../../ui/DiningMethodSegmented";
import { useFormContext, useWatch } from "react-hook-form";
import ReqiuredMark from "../../../ui/RequiredMark";
import useSettings from "../../../context/settings/useSettings";
import DiningInfoField from "../../orders/components/DiningInfoField";
import PaymentStatusField from "../../orders/components/PaymentStatusField";

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
  // 是否可以點餐
  const { openStatus } = useSettings();
  const isClosed = ["closed", "holiday"].includes(openStatus.status);

  const { control } = useFormContext();
  const diningMethod = useWatch({
    control,
    name: "diningMethod",
  });

  const isTakeout = diningMethod === "外帶";

  return (
    <StyledOrderInfoField>
      <Row>
        <label>用餐方式</label>
        <DiningMethodSegmented isDisabled={!hasItems || isClosed} />
      </Row>

      <Row>
        <label>
          {isTakeout ? "取餐時間" : "內用桌號"}
          <ReqiuredMark />
        </label>

        <DiningInfoField isTakeout={isTakeout} disabled={isClosed} />
      </Row>

      <Row>
        <label>
          付款狀態
          <ReqiuredMark />
        </label>

        <PaymentStatusField isClosed={isClosed} />
      </Row>

      <Row>
        <label>訂單備註</label>
        <Note />
      </Row>
    </StyledOrderInfoField>
  );
}

export default OrderInfoField;
