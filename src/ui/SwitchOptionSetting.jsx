import { Controller } from "react-hook-form";
import styled from "styled-components";

const ToggleWrapper = styled.div`
  position: relative;
  width: 9rem;
  height: 3.2rem;
  background-color: #f3f4f6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  border: 2px solid rgba(0, 0, 0, 0.6);
`;

const Slider = styled.div`
  position: absolute;
  width: 4.1rem;
  height: 2.4rem;
  background-color: #2563eb;
  top: 2px;
  left: 2px;
  border-radius: 5px;
  transition: transform 0.3s;
  transform: ${(props) => (props.$isActive ? "none" : "translateX(4.1rem)")};
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.55);
`;

const Option = styled.button`
  z-index: 1;
  width: 4.1rem;
  height: 2.4rem;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.$isActive ? "#fff" : "#000")};
  opacity: ${(props) => (props.$isActive ? "1" : "0.35")};
`;

function ToggleSwitch({ value, onChange, label1, label2 }) {
  const isActive = value === label1;

  return (
    <ToggleWrapper>
      <Slider value={value} $isActive={isActive} />
      <Option
        type="button"
        $isActive={isActive}
        onClick={() => onChange(label1)}
      >
        {label1}
      </Option>
      <Option
        type="button"
        $isActive={!isActive}
        onClick={() => onChange(label2)}
      >
        {label2}
      </Option>
    </ToggleWrapper>
  );
}

const StyledSwitch = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;

  gap: 1.2rem;

  @media (min-width: 300px) {
    flex-direction: row;
  }
`;

function SwitchOptionSetting({ control, fieldIndex }) {
  return (
    <>
      <span>選項填寫設定</span>
      <StyledSwitch>
        <Controller
          name={`customize.${fieldIndex}.required`}
          control={control}
          render={({ field: { value, onChange } }) => (
            <ToggleSwitch
              value={value}
              onChange={onChange}
              label1="必填"
              label2="選填"
            />
          )}
        />

        <Controller
          name={`customize.${fieldIndex}.choice`}
          control={control}
          render={({ field: { value, onChange } }) => (
            <ToggleSwitch
              value={value}
              onChange={onChange}
              label1="單選"
              label2="多選"
            />
          )}
        />
      </StyledSwitch>
    </>
  );
}

export default SwitchOptionSetting;
