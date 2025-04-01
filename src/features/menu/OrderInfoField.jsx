// 購物車中下方的訂購訊息欄位
import styled from "styled-components";
import ControlledSelect from "../../ui/ControlledSelect";
import { generatePickupTimes, generateTableNumbers } from "../../utils/helpers";

const StyledOrderInfoField = styled.div`
  padding: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  h5 {
    font-size: 1.4rem;
  }

  textarea {
    width: 100%;
    height: 6.4rem;
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
  const optionList =
    dineOption === "內用"
      ? generateTableNumbers(10)
      : generatePickupTimes("10:00", "24:00");

  return (
    <StyledOrderInfoField>
      <h5>訂單備註：</h5>
      <textarea
        maxLength="50"
        placeholder="備註內容最多50個字"
        {...register("note")}
      />

      <h5>{dineOption === "外帶" ? "取餐時間：" : "內用桌號："}</h5>
      <ControlledSelect
        options={optionList}
        control={control}
        name={dineOption === "內用" ? "tableNumber" : "pickupTime"}
        creatable={false}
        rules={{
          required: dineOption === "內用" ? "請選取內用桌號" : "請選取取餐時間",
        }}
        key={dineOption}
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
