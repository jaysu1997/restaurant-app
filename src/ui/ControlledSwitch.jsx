import styled from "styled-components";
import { FiCheck, FiX } from "react-icons/fi";
import { Controller } from "react-hook-form";

const StyledControlledSwitch = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8.2rem, 1fr));
  gap: 1rem;
  align-items: start;
`;

const StyledSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  @media (max-width: 288px) {
    justify-content: start;
  }

  span {
    font-size: 1.4rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
  }
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

function ControlledSwitch({ control, items }) {
  return (
    <StyledControlledSwitch>
      {items.map((item, index) => (
        <Controller
          key={index}
          name={item.name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <StyledSwitch>
              <Switch
                value={value}
                onChange={onChange}
                label1={item.label1}
                label2={item.label2}
              />
              <span>{value === item.label2 ? item.label2 : item.label1}</span>
            </StyledSwitch>
          )}
        />
      ))}
    </StyledControlledSwitch>
  );
}

function Switch({ value, onChange, label1, label2 }) {
  const checked = value === label2;

  return (
    <SwitchContainer $checked={checked}>
      <input
        type="checkbox"
        hidden
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked ? label2 : label1);
        }}
      />
      <SwitchHandle $checked={checked}>
        {checked ? (
          <FiCheck size={16} color="#007bff" />
        ) : (
          <FiX size={16} color="#ccc" />
        )}
      </SwitchHandle>
    </SwitchContainer>
  );
}

export default ControlledSwitch;
