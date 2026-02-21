// 購物車中下方的訂購訊息欄位
import styled from "styled-components";
import ControlledSelect from "../../ui/ControlledSelect";
import Note from "../../ui/Note";
import DiningMethodSegmented from "../../ui/DiningMethodSegmented";
import { useFormContext } from "react-hook-form";
import { generatePickupTimeOptions } from "../../context/settings/settingsHelpers";

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

function OrderInfoField({ hasItems, derivedSettings }) {
  const { register, watch } = useFormContext();
  const takeOut = watch("diningMethod") === "外帶";
  const { todayOpenInfo, dineInTableOptions } = derivedSettings;

  const pickupTimeOptions = generatePickupTimeOptions(todayOpenInfo);

  const isOrderingAvailable =
    !todayOpenInfo.isBusinessDay || pickupTimeOptions.length === 0;

  return (
    <StyledOrderInfoField>
      <Row>
        <label>用餐方式</label>
        <DiningMethodSegmented isDisabled={!hasItems || isOrderingAvailable} />
      </Row>

      <Row>
        <label>
          {takeOut ? "取餐時間" : "內用桌號"}
          <span className="emphasize">*</span>
        </label>

        <ControlledSelect
          options={takeOut ? pickupTimeOptions : dineInTableOptions}
          name={takeOut ? "pickupTime" : "tableNumber"}
          creatable={false}
          placeholder={
            !isOrderingAvailable
              ? takeOut
                ? "選擇取餐時間"
                : "選擇桌號"
              : "非營業時間"
          }
          disabled={isOrderingAvailable}
          rules={{ required: true }}
          key={takeOut ? "pickupTime" : "tableNumber"}
        />
      </Row>

      <Row>
        <label>
          付款狀態
          <span className="emphasize">*</span>
        </label>

        <ControlledSelect
          options={[
            { label: "已付款", value: "已付款" },
            { label: "未付款", value: "未付款" },
          ]}
          name="paid"
          creatable={false}
          placeholder={!isOrderingAvailable ? "請選擇付款狀態" : "非營業時間"}
          disabled={isOrderingAvailable}
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
