import styled from "styled-components";
import { FiCheck, FiX } from "react-icons/fi";
import { Controller } from "react-hook-form";

const StyledControlledSwitch = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 280px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const StyledSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

// 開關容器
const SwitchContainer = styled.label`
  display: flex;
  align-items: center;
  width: 50px;
  height: 26px;
  background: ${(props) => (props.$checked ? "#007bff" : "#ccc")};
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  transition: background 0.3s ease-in-out;
`;

// 滑動圓圈
const SwitchHandle = styled.div`
  position: absolute;
  top: 3px;
  left: ${(props) => (props.$checked ? "26px" : "3px")};
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease-in-out;
`;

function ControlledSwitch({ control, fieldIndex }) {
  return (
    <>
      <span>選項填寫設定</span>
      <StyledControlledSwitch>
        <StyledSwitch>
          <span>必填</span>
          <Switch
            name={`customize.${fieldIndex}.required`}
            control={control}
            label1="選填"
            label2="必填"
          />
        </StyledSwitch>

        <StyledSwitch>
          <span>單選</span>
          <Switch
            name={`customize.${fieldIndex}.choice`}
            control={control}
            label1="多選"
            label2="單選"
          />
        </StyledSwitch>
      </StyledControlledSwitch>
    </>
  );
}

function Switch({ control, name, label1, label2 }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <SwitchContainer $checked={value === label2}>
          <input
            type="checkbox"
            hidden
            checked={value === label2}
            value={value}
            onChange={(e) => {
              onChange(e.target.checked ? label2 : label1);
            }}
          />
          <SwitchHandle $checked={value === label2}>
            {value === label2 ? (
              <FiCheck size={16} color="#007bff" />
            ) : (
              <FiX size={16} color="#ccc" />
            )}
          </SwitchHandle>
        </SwitchContainer>
      )}
    />
  );
}

export default ControlledSwitch;
