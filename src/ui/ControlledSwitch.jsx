import styled from "styled-components";
import { useController, useFormContext } from "react-hook-form";
import { Check, X } from "lucide-react";

const StyledSwitch = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;

  @media (max-width: 288px) {
    justify-content: start;
  }

  span {
    font-size: 1.4rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
    user-select: none;
  }
`;

// 開關容器
const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 5rem;
  height: 2.6rem;
  background: ${(props) => (props.$checked ? "#007bff" : "#ccc")};
  border-radius: 999px;
  position: relative;
  transition: background 0.3s ease-in-out;
`;

// 滑動圓圈
const SwitchHandle = styled.div`
  position: absolute;
  top: 0.3rem;
  left: ${(props) => (props.$checked ? "2.6rem" : "0.3rem")};
  width: 2rem;
  height: 2rem;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease-in-out;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    flex-shrink: 0;
  }
`;

function ControlledSwitch({ options, handleChange }) {
  const { control } = useFormContext();

  const { field } = useController({
    name: options.name,
    control,
    defaultValue: options.option1.value,
  });

  const checked = field.value === options.option2.value;

  return (
    <StyledSwitch>
      <SwitchContainer $checked={checked}>
        <input
          type="checkbox"
          hidden
          checked={checked}
          onChange={(e) => {
            const nextValue = e.target.checked
              ? options.option2.value
              : options.option1.value;

            field.onChange(nextValue);

            if (typeof handleChange === "function" && !e.target.checked) {
              handleChange();
            }
          }}
        />
        <SwitchHandle $checked={checked}>
          {checked ? <Check color="#007bff" /> : <X color="#ccc" />}
        </SwitchHandle>
      </SwitchContainer>

      <span>{checked ? options.option2.label : options.option1.label}</span>
    </StyledSwitch>
  );
}

export default ControlledSwitch;
