// 內用外帶的switch ui元件
import { Controller } from "react-hook-form";
import styled from "styled-components";

const StyledToggleSwitch = styled.label`
  user-select: none;
  height: 3.8rem;
  width: 12.6rem;
  padding: 0.5rem;
  background-color: #d6d3d1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 999px;
  overflow: hidden;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};

  input:checked + span {
    transform: translateX(5.8rem);
  }
`;

const Option = styled.div`
  height: 100%;
  width: 100%;
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
  height: 2.8rem;
  width: 5.8rem;
  background-color: #fff;
  border-radius: 999px;
  top: 0.5rem;
  left: 0.5rem;
  transition: all 0.3s;
`;

function DiningMethodSwitch({
  control,
  setValue,
  takeOut = false,
  isDisabled = false,
}) {
  return (
    <Controller
      name="diningMethod"
      control={control}
      defaultValue={takeOut ? "外帶" : "內用"}
      render={({ field }) => (
        <StyledToggleSwitch $disabled={isDisabled}>
          <input
            type="checkbox"
            hidden
            checked={field.value === "外帶"}
            onChange={(e) => {
              field.onChange(e.target.checked ? "外帶" : "內用");
              setValue(takeOut ? "pickupTime" : "tableNumber", null);
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

export default DiningMethodSwitch;
