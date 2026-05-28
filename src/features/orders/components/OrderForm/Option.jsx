// ok
import styled from "styled-components";
import { Check, Square } from "lucide-react";

const StyledOption = styled.label`
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  grid-template-rows: 2.8rem;
  align-items: center;
  gap: 1.2rem;
  position: relative;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${({ $hoverBgColor }) => $hoverBgColor};
  }

  span {
    font-weight: 400;
    font-size: 1.4rem;
  }

  svg:first-of-type {
    color: ${({ $checked }) => ($checked ? "#007bff" : "currentColor")};
    fill: ${({ $checked }) => ($checked ? "#007bff" : "transparent")};
    width: 2rem;
    height: 2rem;
  }

  svg:last-of-type {
    position: absolute;
    left: 0.8rem;
    color: #fff;
    opacity: ${({ $checked }) => ($checked ? "1" : "0")};
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const OptionName = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

function Option({ hoverBgColor, optionData, onToggle, selectedOptions }) {
  const { optionId, name, extraPrice } = optionData;

  // 當前選項是否是被選中的選項
  const isChecked = selectedOptions.some(
    (option) => option.optionId === optionId,
  );

  return (
    <StyledOption
      $hoverBgColor={hoverBgColor}
      htmlFor={optionId}
      $checked={isChecked}
    >
      <input
        type="checkbox"
        hidden
        id={optionId}
        // 避免數據尚未處理完成時isChecked = undefined報出受控元件error，所以設false為默認值
        checked={isChecked ?? false}
        onChange={(e) => onToggle(e)}
      />

      <Square />
      <Check strokeWidth={3} />

      <OptionName>{name}</OptionName>
      <span>{extraPrice === 0 ? "免費" : `+ $ ${extraPrice}`}</span>
    </StyledOption>
  );
}

export default Option;
