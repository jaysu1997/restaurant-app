// 購物車中下方的訂購訊息欄位
import styled from "styled-components";
import ControlledSelect from "../../ui/ControlledSelect";
import Note from "../../ui/Note";
import FormTypography from "../../ui/FormTypography";
import QueryStatusFallback from "../../ui/QueryStatusFallback";
import { useSettings } from "../../context/SettingsContext";

const StyledOrderInfoField = styled.div`
  padding: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  h5 {
    font-size: 1.4rem;
    display: flex;
    gap: 0.2rem;
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

function OrderInfoField({ register, takeOut, control }) {
  const { settings } = useSettings();

  return (
    <StyledOrderInfoField>
      <h5>訂單備註</h5>
      <Note register={register} />

      <h5>
        {takeOut ? "取餐時間" : "內用桌號"}
        <FormTypography $titleStyle="highlight">*</FormTypography>
      </h5>
      <ControlledSelect
        options={takeOut ? settings.pickupTime : settings.dineInTable}
        control={control}
        name={takeOut ? "pickupTime" : "tableNumber"}
        creatable={false}
        placeholder={takeOut ? "選擇取餐時間" : "選擇桌號"}
        rules={{
          required: takeOut ? "請選擇取餐時間" : "請選擇內用桌號",
        }}
      />

      <h5>
        付款狀態
        <FormTypography $titleStyle="highlight">*</FormTypography>
      </h5>
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
