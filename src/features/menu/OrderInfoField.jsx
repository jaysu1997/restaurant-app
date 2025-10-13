// 購物車中下方的訂購訊息欄位
import styled from "styled-components";
import ControlledSelect from "../../ui-old/ControlledSelect";
import Note from "../../ui-old/Note";
import FormTypography from "../../ui-old/FormTypography";
import DiningMethodSwitch from "../../ui-old/DiningMethodSwitch";
import { generatePickupTimeOptions } from "../../context/settingsHelpers";

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

function OrderInfoField({
  register,
  takeOut,
  control,
  setValue,
  dishes,
  settingsData,
}) {
  const pickupTimeOptions = generatePickupTimeOptions(
    settingsData.todayOpenInfo
  );

  const isDisabled =
    !settingsData.todayOpenInfo.isBusinessDay || pickupTimeOptions.length === 0;

  return (
    <StyledOrderInfoField>
      <Row>
        <label>用餐方式</label>
        <DiningMethodSwitch
          takeOut={takeOut}
          control={control}
          setValue={setValue}
          isDisabled={dishes.length === 0}
        />
      </Row>

      <Row>
        <label>
          {takeOut ? "取餐時間" : "內用桌號"}
          <FormTypography $titleStyle="highlight">*</FormTypography>
        </label>
        <ControlledSelect
          options={
            takeOut ? pickupTimeOptions : settingsData.dineInTableOptions
          }
          control={control}
          name={takeOut ? "pickupTime" : "tableNumber"}
          creatable={false}
          placeholder={
            !isDisabled
              ? takeOut
                ? "選擇取餐時間"
                : "選擇桌號"
              : "非營業時間無法點餐"
          }
          disabled={isDisabled}
          rules={{
            required: takeOut ? "請選擇取餐時間" : "請選擇內用桌號",
          }}
        />
      </Row>

      <Row>
        <label>
          付款狀態
          <FormTypography $titleStyle="highlight">*</FormTypography>
        </label>
        <ControlledSelect
          options={[
            { label: "已付款", value: "已付款" },
            { label: "未付款", value: "未付款" },
          ]}
          control={control}
          name="paid"
          creatable={false}
          placeholder="請選擇付款狀態"
          disabled={isDisabled}
          rules={{
            required: "請選擇付款狀態",
          }}
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
