// 購物車中下方的訂購訊息欄位
import styled from "styled-components";
import ControlledSelect from "../../ui/ControlledSelect";
import { generatePickupTimes, generateTableNumbers } from "../../utils/helpers";
import Note from "../../ui/Note";

const StyledOrderInfoField = styled.div`
  padding: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  h5 {
    font-size: 1.4rem;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
  }
`;

const StyledPaidSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

function OrderInfoField({ register, dineOption, control }) {
  // 用餐方式的select選項
  const optionList = dineOption
    ? generatePickupTimes("10:00", "24:00")
    : generateTableNumbers(10);

  return (
    <StyledOrderInfoField>
      <h5>訂單備註：</h5>
      <Note register={register} />

      <h5>{dineOption ? "取餐時間：" : "內用桌號："}</h5>
      <ControlledSelect
        options={optionList}
        control={control}
        name={dineOption ? "pickupTime" : "tableNumber"}
        creatable={false}
        placeholder={dineOption ? "選擇取餐時間" : "選擇桌號"}
        menuPlacement="top"
        rules={{
          required: dineOption ? "請選擇取餐時間" : "請選擇內用桌號",
        }}
        key={dineOption ? "外帶" : "內用"}
      />

      <h5>付款狀態：</h5>
      <StyledPaidSection>
        <label htmlFor="yes">
          <input
            type="radio"
            id="yes"
            value="已付款"
            {...register("paid", { required: "請選擇付款狀態" })}
          />
          <span>已付款</span>
        </label>
        <label htmlFor="no">
          <input
            type="radio"
            id="no"
            value="未付款"
            {...register("paid", { required: "請選擇付款狀態" })}
          />
          <span>未付款</span>
        </label>
      </StyledPaidSection>
    </StyledOrderInfoField>
  );
}

export default OrderInfoField;
