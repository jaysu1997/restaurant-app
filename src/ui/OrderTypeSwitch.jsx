// 內用外帶的switch ui元件
import { Controller } from "react-hook-form";
import styled from "styled-components";

const StyledToggleSwitch = styled.label`
  height: 3.2rem;
  width: 9.6rem;
  background-color: #d6d3d1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};

  input:checked + span {
    transform: translateX(4.5rem);
  }
`;

const Option = styled.div`
  height: 2.6rem;
  width: 9rem;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.2;
  z-index: 1;
`;

const Slider = styled.span`
  position: absolute;
  height: 2.6rem;
  width: 4.5rem;
  background-color: #fff;
  border-radius: 15px;
  top: 0.3rem;
  left: 0.3rem;
  transition: all 0.3s;
`;

function OrderTypeSwitch({
  control,
  setValue,
  dineOption = false,
  isDisabled = false,
}) {
  return (
    <Controller
      name="orderType"
      control={control}
      defaultValue={dineOption ? "外帶" : "內用"}
      render={({ field }) => (
        <StyledToggleSwitch $disabled={isDisabled}>
          <input
            type="checkbox"
            hidden
            checked={field.value === "外帶"}
            onChange={(e) => {
              field.onChange(e.target.checked ? "外帶" : "內用");
              setValue(dineOption ? "pickupTime" : "tableNumber", null);
            }}
            disabled={isDisabled}
          />
          <Slider />
          <Option disabled={isDisabled}>
            <span>內用</span>
          </Option>
          <Option>
            <span>外帶</span>
          </Option>
        </StyledToggleSwitch>
      )}
    />
  );
}

export default OrderTypeSwitch;
