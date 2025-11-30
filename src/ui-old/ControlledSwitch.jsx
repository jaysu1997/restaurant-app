import styled from "styled-components";
import { Controller } from "react-hook-form";
import { Check, X } from "lucide-react";

const StyledControlledSwitch = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8.2rem, 1fr));
  grid-template-rows: minmax(0, max-content);
  gap: 0.4rem;
  /* align-items: start; */
`;

const StyledSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 3.8rem;

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
  width: 5rem;
  height: 2.6rem;
  background: ${(props) => (props.$checked ? "#007bff" : "#ccc")};
  border-radius: 999px;
  cursor: pointer;
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
`;

function ControlledSwitch({ control, items, handleChange, disabled }) {
  return (
    <StyledControlledSwitch>
      {items.map((item, index) => (
        <Controller
          key={index}
          name={item.name}
          control={control}
          defaultValue={item.option1.value}
          render={({ field: { value, onChange } }) => {
            const checked = value === item.option2.value;

            return (
              <StyledSwitch>
                <SwitchContainer $checked={checked}>
                  <input
                    type="checkbox"
                    disabled={disabled}
                    hidden
                    checked={checked}
                    onChange={(e) => {
                      onChange(
                        e.target.checked
                          ? item.option2.value
                          : item.option1.value
                      );

                      // 如果需要在切換value同時執行函式，就使用handleChange prop
                      if (
                        typeof handleChange === "function" &&
                        !e.target.checked
                      ) {
                        handleChange();
                      }
                    }}
                  />
                  <SwitchHandle $checked={checked}>
                    {checked ? (
                      <Check size={16} color="#007bff" />
                    ) : (
                      <X size={16} color="#ccc" />
                    )}
                  </SwitchHandle>
                </SwitchContainer>
                <span>{checked ? item.option2.label : item.option1.label}</span>
              </StyledSwitch>
            );
          }}
        />
      ))}
    </StyledControlledSwitch>
  );
}

export default ControlledSwitch;
